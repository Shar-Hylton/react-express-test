"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import { useForm } from "react-hook-form";
import { useNotes } from "../../../../../notesContext/NotesContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type EditNoteForm = {
  title: string;
  content: string;
};

export default function EditNote() {
  const params = useParams();
  const router = useRouter();
  const { notes, updateNote, errorMsg } = useNotes();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const note = notes.find((n) => n._id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditNoteForm>();

  // Populate form once note is available
  useEffect(() => {
    if(!note){
      
    }
    if (note) {
      reset({
        title: note.title,
        content: note.content,
      });
    }else{
      router.replace("/notes");
    }
  }, [note, reset, router]);

  if (!note) return <p className="text-center mt-10">Note not found</p>;

  const onSubmit = async (data: EditNoteForm) => {
    await updateNote(id as string, data);
    router.push("/notes");
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
              {isSubmitting ? "Update..." : "Update Note"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
