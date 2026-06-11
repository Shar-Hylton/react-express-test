"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NotesList from "@/components/NotesList";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function Notes() {

  const { user, isLoggingOut, isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return null;
  }

  const handleAdd = () => {
    router.push("/notes/add");
  };

  return (
    <>
    {isLoggingOut || user == null ? (
       <div className=" w-full flex items-center justify-center mt-30">
        <Spinner className="size-16 text-blue" />
      </div>
    ):(

    <div className="mt-10 mx-auto bg-yellow-700">
      <div className="flex justify-center mb-10">
        <Button className="cursor-pointer" onClick={handleAdd}>
          Create Note
        </Button>
      </div>
      <NotesList />
    </div>
    )}
    </>
  );
}
