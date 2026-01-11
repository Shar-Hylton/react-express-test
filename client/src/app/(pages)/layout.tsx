import react from 'react'
import Navbar from "@/components/Navbar";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      < >
        <Navbar />

        {children}
      </>
   
  );
}
