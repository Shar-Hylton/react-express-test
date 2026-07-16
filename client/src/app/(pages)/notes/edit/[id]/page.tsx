"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useNoteMutations } from "@/Hooks/useNoteMutations";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNotesQuery } from "@/Hooks/useNotesQuery";
import { sanitizeInput } from "@/lib/validation";

type EditNoteForm = {
  title: string;
  content: string;
};

export default function EditNote() {
  const { id } = useParams();
  const router = useRouter();
  // const { notes, isLoading, updateNote } = useNotes();

  const { updateMutation } = useNoteMutations();

  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth/login");
    }
  }, [user, router, isLoading]);

  if (!user) redirect("/auth/login");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditNoteForm>();

  const { data: notes = [] } = useNotesQuery();
  const note = notes?.find((n) => n?._id === String(id));

  const titleValue = useWatch({ control, name: "title" })?.length || 0;
  const contentValue = useWatch({ control, name: "content" })?.length || 0;

  // Populate form once note is available
  useEffect(() => {
    if (!isLoading && !note) {
      const timer = setTimeout(() => router.replace("/notes"), 2000);
      return () => clearTimeout(timer);
    }
    reset({
      title: note?.title,
      content: note?.content,
    });
  }, [note, isLoading, reset, router]);

  if (isLoading) {
    return (
      <div className=" w-full flex items-center justify-center mt-30">
        <Spinner className="size-16 text-blue" />
      </div>
    );
  }

  if (!note)
    return (
      <h1 className="text-center text-4xl mx-auto mt-10">Note not found</h1>
    );

  const onSubmit = async (data: EditNoteForm) => {
    
    const sanitizedData = {
      title: sanitizeInput(data.title),
      content: sanitizeInput(data.content),
    }
    
    updateMutation.mutate(
      { id: id as string, data: sanitizedData },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          router.replace("/notes");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };
  //   const result = await updateNote(id as string, data);
  //   const success = result.success;
  //   const msg = result.message;
  //   if (!success) {
  //     toast.error(msg);
  //     return;
  //   }

  //   toast.success(msg);

  // };

  return (
    <>
      <Card
        className=" 
          w-xs 
          md:w-md  
          relative
          max-w-sm
          sm:max-w-xl
          mx-auto
          mt-10
          sm:mt-16
          lg:mt-20
          mb-24
          sm:mb-16
          px-2
          sm:px-0 "
      >
        <CardHeader>
          <IoArrowBackCircleOutline
            size={30}
            onClick={() => router.push("/notes")}
            className="absolute left-6 top-6 cursor-pointer text-zinc-600 hover:text-zinc-900 transition-colors"
          />
          <CardTitle className="mt-12">Edit Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
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
                  setValueAs: (value) => sanitizeInput(value),
                })}
              />

              {titleValue > 0 && (
                <span
                  className={`flex justify-end text-xs text-muted-foreground mt-1 ${titleValue < 15 ? "text-red-600" : ""}`}
                >
                  {titleValue}/50
                </span>
              )}
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
                  setValueAs: (value) => sanitizeInput(value),
                })}
              />

              {contentValue > 0 && (
                <span
                  className={`flex justify-end text-xs text-muted-foreground mt-1 ${
                    contentValue < 250 ? "text-red-600" : ""
                  }`}
                >
                  {contentValue}/1024
                </span>
              )}

              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? "Updating..." : "Update Note"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
