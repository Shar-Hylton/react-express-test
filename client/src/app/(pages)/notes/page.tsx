"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NotesList from "@/components/NotesList";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function Notes() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() =>{
    const message = sessionStorage.getItem("toast");

    if(message){
      toast.success(message);
      sessionStorage.removeItem("toast");
    }
  })

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
