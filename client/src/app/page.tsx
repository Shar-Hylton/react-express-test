'use client'

import Main from '@/components/Main';
import Navbar from '@/components/Navbar';


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans dark:bg-black">
      <Navbar />
      <Main />
      
    </div>
  );
}
