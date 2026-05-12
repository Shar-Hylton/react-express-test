"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useNotes } from "../../../../../notesContext/NotesContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

type EditNoteForm = {
  title: string;
  content: string;
};

export default function EditNote() {
  const {id} = useParams();
  const router = useRouter();
  const { notes, isLoading, updateNote, errorMsg } = useNotes();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditNoteForm>();

  const note = notes?.find((n) => n?._id === String(id));

  // Populate form once note is available
  useEffect(() => {
    
    if(!isLoading && !note){
      const timer = setTimeout(()=> router.replace("/notes"), 2000);
      return () => clearTimeout(timer);
    }
      reset({
        title: note?.title,
        content: note?.content,
      });
  
  }, [note, isLoading, reset, router]);


   if(isLoading){
    return (
      <div className=" w-full flex items-center justify-center mt-30">
        <Spinner className="size-16 text-blue" />
      </div>
    );
  }


  if (!note) return <h1 className="text-center text-4xl mx-auto mt-10">Note not found</h1>;

  const onSubmit = async (data: EditNoteForm) => {
    const success: boolean = await updateNote(id as string, data);
    if(!success) return;
    router.replace("/notes");
  };

  return (
    <>
      <Card className="max-w-xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <div>
              <Input
                placeholder="Enter Title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 15,
                    message: "Title must be at least 15 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Can't exceed 50 characters",
                  },
                })}
              />
            </div>
            <div>
              <Textarea
                placeholder="Enter note content here"
                {...register("content", {
                  required: "Content is required",
                  minLength: {
                    value: 250,
                    message: "Content must be at least 250 characters",
                  },
                  maxLength: {
                    value: 1024,
                    message: "Can't exceed 1024 characters",
                  },
                })}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Note"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
