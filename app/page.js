"use client";
import { useState, useEffect } from "react";
import { FaBullseye, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import {  db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Navbar from "@/components/Navbar";
function App() {
  const isWhitespaceString = (str) => !str.replace(/\s/g, "").length;
  const router = useRouter();
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit_show, setEdit_show] = useState(false)
  const [showFinsihed, setShowFinsihed] = useState(true)
  const { signOut, authUser, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
    if (!!authUser) {
      fetchtodos(authUser.uid);
    }
  }, [authUser, isLoading]);
  const addTodo = async () => {
    try {
      setEdit_show(false)
      if (isWhitespaceString(todoInput)) {
        alert("Please enter a todo");
        return;
      }
      const docRef = await addDoc(collection(db, "todos"), {
        owner: authUser.uid,
        content: todoInput,
        completed: false,
      });
      console.log("Document written with ID: ", docRef.id);
      fetchtodos(authUser.uid);
      setTodoInput("");
    } catch (error) {
      alert("Some error occured");
    }
  };

  const markAsCompleteHandler = async (e, docid) => {
    try {
      const docRefd = doc(db, "todos", docid);
      await updateDoc(docRefd, { completed: e.target.checked });
      fetchtodos(authUser.uid );
    } catch (error) {
      alert("Some error occured");
    }
  };
  const update = async (id,content) => {
    try {
      setEdit_show(true)
      setTodoInput(content)
      await deleteDoc(doc(db, "todos", id));
      
      fetchtodos(authUser.uid);
    } catch (error) {
      alert("Some error occured");
    }
  }
  const delete_todo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      fetchtodos(authUser.uid);
    } catch (error) {
      alert("Some error occured");
    }
  };
  const fetchtodos = async (uid) => {
    try {
      const q = query(collection(db, "todos"), where("owner", "==", uid));
      let data = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push({ ...doc.data(), id: doc.id });
      });
      setTodos(data);
    } catch (error) {
      alert("Some error occured");
    }
  };
  return !authUser ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-3xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{ edit_show? "Edit": "Add"} a Todo</h2>
          <div className="flex">
            <input
              onChange={(e) => setTodoInput(e.target.value)}
              value={todoInput}
              type="text"
              autoFocus
              className="w-full rounded-full px-5 py-1"
            />
            <button
              onClick={addTodo}
              disabled={!todoInput}
              className="bg-orange-500 mx-2 rounded-full hover:bg-orange-600 disabled:bg-orange-300 p-4 py-2 text-sm font-bold text-white"
            >
              Save
            </button>
          </div>
        </div>
        <input className="my-4" id="show"  checked={showFinsihed} onChange={(e) => setShowFinsihed(e.target.checked)} type="checkbox" />
        <label className="mx-2 font-bold" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (showFinsihed || !item.completed ) &&(
              <div key={item.id} className={"todo flex my-3 justify-between"}>
                <div className="flex gap-5">
                  <input type="checkbox" checked={item.completed} onChange={(e) => markAsCompleteHandler(e, item.id)} />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.content}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={() => update( item.id, item.content)}
                    
                    className="bg-orange-500 hover:bg-orange-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      delete_todo(item.id);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
