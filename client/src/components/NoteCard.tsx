import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Info, X } from "lucide-react";
import { Button } from "./ui/button";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  user?: {
    username: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
  isOwner: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function NoteCard({
  id,
  title,
  content,
  user,
  createdAt,
  updatedAt,
  isOwner,
  onDelete,
  onEdit,
}: NoteCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const wordCount = content.trim().split(/\s+/).length;

  const isLongNote = content.length > 500;

  const previewContent = isLongNote
    ? content.split(/\s+/).slice(0, 500).join(" ")
    : content;

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      className="w-sm"
    >
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="group relative flex flex-col min-h-105 overflow-hidden cursor-pointer">

              {/* INFO BUTTON */}
              <Button
                variant="ghost"
                size="icon"
                className="
                  absolute
                  right-3
                  top-3
                  z-20
                  opacity-0
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                  cursor-pointer
                  rounded-full
                  bg-white/70
                  backdrop-blur-sm
                "
                onClick={() => setIsFlipped(true)}
              >
                <Info size={18} />
              </Button>

              <CardHeader className="underline text-center">
                <CardTitle className="text-xl font-bold pr-8">
                  {title}
                </CardTitle>
              </CardHeader>

              <CardContent className="grow relative">
                <p className="text-sm text-gray-700 whitespace-pre-wrap text-justify">
                  {previewContent}
                </p>

                {isLongNote && (
                  <>
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        h-44
                        bg-linear-to-t
                        from-white
                        via-white
                        via-70%
                        to-transparent
                      "
                    />

                    <div
                      className="
                        absolute
                        bottom-6
                        left-1/2
                        -translate-x-1/2
                        z-20
                      "
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="
                              cursor-pointer
                              border
                              border-white/40
                              bg-white/30
                              backdrop-blur-md
                              text-slate-900
                              shadow-lg
                              hover:bg-white/50
                              transition-all
                            "
                          >
                            Read More
                          </Button>
                        </DialogTrigger>

                        <DialogContent
                          className="
                            max-w-4xl
                            max-h-[85vh]
                            overflow-y-auto
                            custom-scrollbar
                          "
                        >
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.7,
                              y: 120,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                          >
                            <DialogHeader>
                              <DialogTitle>
                                {title}
                              </DialogTitle>
                            </DialogHeader>

                            <div className="mt-4">
                              <p className="whitespace-pre-wrap leading-7 text-justify">
                                {content}
                              </p>
                            </div>
                          </motion.div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </CardContent>

              <CardDescription className="px-6 pb-4 capitalize">
                Author: {user?.username || "Unknown"}
              </CardDescription>

              {isOwner && (
                <div className="mt-auto flex gap-2 px-6 pb-6">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onEdit(id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{
              opacity: 0,
              rotateY: -90,
            }}
            animate={{
              opacity: 1,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              rotateY: 90,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <Card className="relative flex flex-col min-h-105">

              <Button
                variant="ghost"
                size="icon"
                className="
                  absolute
                  right-3
                  top-3
                  z-20
                  cursor-pointer
                "
                onClick={() => setIsFlipped(false)}
              >
                <X size={18} />
              </Button>

              <CardHeader>
                <CardTitle className="text-center underline">
                  Note Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">

                <div>
                  <strong>Author</strong>
                  <p>{user?.username || "Unknown"}</p>
                </div>

                <div>
                  <strong>Email</strong>
                  <p>{user?.email || "Unknown"}</p>
                </div>

                <div>
                  <strong>Word Count</strong>
                  <p>{wordCount}</p>
                </div>

                <div>
                  <strong>Character Count</strong>
                  <p>{content.length}</p>
                </div>

                <div>
                  <strong>Created</strong>
                  <p>
                    {createdAt
                      ? new Date(createdAt).toLocaleString()
                      : "Unknown"}
                  </p>
                </div>

                <div>
                  <strong>Updated</strong>
                  <p>
                    {updatedAt
                      ? new Date(updatedAt).toLocaleString()
                      : "Unknown"}
                  </p>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}