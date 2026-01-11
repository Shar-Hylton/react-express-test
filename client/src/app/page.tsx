'use client'
import NoteList from '@/components/NotesList';
import react from 'react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-zinc-250 dark:bg-black ">
        <NoteList/>
  
      </main>
    </div>
  );
}
