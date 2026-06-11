import Navbar from "@/components/Navbar";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    
      <Navbar />
      
      <main className="flex pt-30">
        {children}
      </main>
    </>
  );
}
