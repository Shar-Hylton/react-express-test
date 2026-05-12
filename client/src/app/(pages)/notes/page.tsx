'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NotesList from "@/components/NotesList";

export default function Notes() {

  const router = useRouter();

  const handleAdd = () => {
    router.push("/notes/add");
  };

  return (
    <div className="max-w-8xl mt-10 mx-auto bg-yellow-700">
      <div className="flex justify-center mb-10">
        <Button className="cursor-pointer" onClick={handleAdd}>Create Note</Button>
      </div>
      <NotesList/>
    </div>
  );
}
