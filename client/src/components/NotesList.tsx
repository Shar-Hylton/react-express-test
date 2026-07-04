import NoteCard from "./NoteCard";
import ExpandedNote from "./ExpandedNote";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";
import { toast } from "react-toastify";
import { defaultNotes } from "@/constants";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNoteMutations } from "@/Hooks/useNoteMutations";
import { useNotesQuery } from "@/Hooks/useNotesQuery";

export default function NotesList() {
  const { data: notes = [], isLoading } = useNotesQuery()
  const { user, isAuthenticated } = useAuth();

  const notesToRender = isAuthenticated ? notes : defaultNotes;
  const [expandedNote, setExpandedNote] = useState<
    (typeof notesToRender)[number] | null
  >(null);
  const { deleteMutation } = useNoteMutations();

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: (res) => {
        toast.success(res.message);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  const handleEdit = (id: string) => {
    router.push(`notes/edit/${id}`);
  };

  if (isLoading) {
    return (
      <div className=" w-full flex items-center justify-center mt-30">
        <Spinner className="size-16 text-blue" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8">
        {notesToRender.map((note, index) => {
          const currentUser = user?._id;
          const isOwner =
            note.user?._id === currentUser || user?.role === "admin";

          return (
            <motion.div
              key={note._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
            >
              <NoteCard
                key={note?._id}
                id={note?._id}
                title={note?.title}
                content={note?.content}
                user={note?.user}
                isOwner={isOwner}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onExpand={() => setExpandedNote(note)}
              />
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {expandedNote && (
          <ExpandedNote
            note={expandedNote}
            onClose={() => setExpandedNote(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
