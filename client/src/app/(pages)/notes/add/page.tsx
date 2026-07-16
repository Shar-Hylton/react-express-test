"use client";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useNoteMutations } from "@/Hooks/useNoteMutations";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { sanitizeInput } from "@/lib/validation";

type NoteFormData = {
  title: string;
  content: string;
};

export default function AddNote() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { createMutation } = useNoteMutations();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth/login");
    }
  }, [user, router, isLoading]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>();

  const titleValue = useWatch({ control, name: "title" })?.length || 0;
  const contentValue = useWatch({ control, name: "content" })?.length || 0;

  const onSubmit = async (data: NoteFormData) => {

    const sanitizedData = {
      title: sanitizeInput(data.title),
      content: sanitizeInput(data.content),
    };

    createMutation.mutate(sanitizedData, {
      onSuccess: (res) => {
        toast.success(res.message);
        router.replace("/notes");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <>
      <Card className="relative max-w-xl w-sm md:w-md mx-auto mt-24 mb-16">
        <IoArrowBackCircleOutline
          size={30}
          onClick={() => router.push("/notes")}
          className="absolute left-6 top-6 cursor-pointer text-zinc-600 hover:text-zinc-900 transition-colors"
        />
        <CardHeader>
          <CardTitle>
            <h3 className="text-center text-xl">Create Your Note</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Input
                className="pr-14"
                maxLength={50}
                placeholder="Enter Your Title Here"
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
                  className={`absolute bottom-1 right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground ${titleValue < 15 ? "text-red-600" : ""}`}
                >
                  {titleValue}/50
                </span>
              )}
              {errors.title && (
                <p className="text-sm font-medium m-1 text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <Textarea
                maxLength={1024}
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
                <p className="text-sm font-medium m-1 text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Note"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
