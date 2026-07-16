import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Note } from "@/types/dataTypes";
import { useEffect } from "react";

type ExpandedNoteProps = {
  note: Note;
  onClose: () => void;
};

export default function ExpandedNote({ note, onClose }: ExpandedNoteProps) {
    useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [onClose]);

  return (
    <>
      <motion.div
        className="
        fixed
        inset-0
        z-40
       bg-black/30
        backdrop-blur-xl
        "
        initial={{
          opacity: 0,
          backdropFilter: "blur(0px)",
        }}
        animate={{
          opacity: 1,
          backdropFilter: "blur(14px)",
        }}
        exit={{
          opacity: 0,
          backdropFilter: "blur(0px)",
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={onClose}
      />

      <div className="mobile-friendly fixed inset-0 z-40  flex items-center justify-center p-8 pointer-events-none">
        <motion.div
          layoutId={`note-${note._id}`}
          className="rounded-3xl overflow-hidden pointer-events-auto"
          initial={{
            scale: 0.92,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
          }}
          transition={{
            layout: {
              type: "spring",
              stiffness: 240,
              damping: 28,
            },
            opacity: {
              duration: 0.18,
            },
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card
            className="
             relative
             max-w-[90vw]
             sm:max-w-[50vw]
             md:max-w-[40vw]
             max-h-[70vh]
             flex
             flex-col
             overflow-hidden
             rounded-3xl
             shadow-[0_50px_120px_rgba(0,0,0,.30)]
             border
             bg-white
            "
          >
            <Button
              variant="ghost"
              size="icon"
              className="
              absolute
              top-1
              right-1
              z-10
              rounded-full
              cursor-pointer
              py-0!
            "
              onClick={onClose}
            >
              <X size={20} />
            </Button>
            <CardHeader className="flex justify-center mx-2 border-b">
              <CardTitle className="text-2xl text-center">
                {note.title}
              </CardTitle>
            </CardHeader>

            <CardContent
              className="
             flex-1
             overflow-y-auto
             custom-scrollbar
             py-2
           

             "
            >
              <p className="w-full leading-8 whitespace-pre-wrap text-justify wrap-break-word">
                {note.content}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
