"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NotesList from "@/components/NotesList";
import { useAuth } from "@/context/AuthContext";

export default function Notes() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAdd = () => {
    router.push(isAuthenticated ? "/notes/add" : "/auth/login");
  };

  return (
    <>
      <div className="m-10 mb-24 mx-auto">
        <div className="flex justify-center mb-10">
          <Button className="btn-blue" onClick={handleAdd}>
            Create Note
          </Button>
        </div>
        <NotesList />
      </div>
    </>
  );
}
