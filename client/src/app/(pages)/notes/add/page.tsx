"use client";

import { useForm } from "react-hook-form";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/notesContext/NotesContext";
import { useRouter } from "next/navigation";

type NoteFormData = {
  title: string;
  content: string;
};

export default function AddNote() {
  const { errorMsg, successMsg, createNote } = useNotes();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>();

  const router = useRouter();

  const onSubmit = async (data: NoteFormData) => {
    await createNote(data);
    reset();
    router.push("/notes");
  };

  return (
    <>
      <Card className="max-w-xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Create Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Enter note Title"
                {...register("title", {
                  required: "title is required",
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
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <Textarea
                placeholder="Enter Your Content Here"
                rows={6}
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
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>

            {errorMsg && <p className="text-sm text-red-500"> {errorMsg}</p>}
            {successMsg && (
              <p className="text-sm text-green-500"> {successMsg}</p>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Note"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
