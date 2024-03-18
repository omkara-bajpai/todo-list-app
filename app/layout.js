import "./globals.css";
import { AuthUserProvider } from "@/firebase/auth";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthUserProvider>{children}</AuthUserProvider>
      </body>
    </html>
  );
}
export const metadata = {
  title: "iTask - Your Task Planner",
};
