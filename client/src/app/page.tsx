'use client'
import React from 'react';
import Main from '@/components/Main';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans dark:bg-black">
      <Navbar />
      <main className="flex w-full max-w-3xl flex-col items-center justify-between bg-zinc-250 dark:bg-black ">
        <Main />
        <div className='flex items-center text-zinc-900 mt-8 bg-white h-10 border-4 border-red-600 rounded'>
        <Link href="/notes" className='text-zinc-900 p-3 '> {"=> Notes Page"}</Link>
        </div>
      </main>
    </div>
  );
}
