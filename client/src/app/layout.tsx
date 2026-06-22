import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NotesProvider } from "../context/NotesContext";
import { AuthProvider } from "../context/AuthContext";
// import { Toaster } from "@/components/ui/sonner";
import {ToastContainer} from "react-toastify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Notes App",
  description: "A Notes Application For All Users",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200`}
      >
        {" "}
        <AuthProvider>
          <NotesProvider>
            {children}
            {/* <Toaster richColors position="bottom-right" /> */}
            <ToastContainer aria-label={"notification"} className={"mt-20"}  />
          </NotesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
