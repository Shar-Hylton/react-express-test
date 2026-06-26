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
import { X } from "lucide-react";
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

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.trim().length;
  const isLongNote = charCount > 500;

  const previewContent = isLongNote
    ? content.split(/\s+/).slice(0, 500).join(" ")
    : content;

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      whileTap={{
        scale: 0.98,
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
            <Card
              className="
                group
                flex
                flex-col
                h-120
                overflow-hidden
                cursor-pointer
                transition-shadow
                hover:shadow-xl
              "
            >
              <div
                className="flex-1 flex flex-col cursor-pointer"
                onClick={(e) => {
                  const target = e.target as HTMLElement;

                  if (
                    target.closest("button") ||
                    target.closest("[role='dialog']")
                  ) {
                    return;
                  }

                  setIsFlipped(true);
                }}
              >
                {/* HEADER */}
                <CardHeader className="underline text-center shrink-0">
                  <CardTitle className="text-xl font-bold">{title}</CardTitle>
                </CardHeader>

                {/* CONTENT */}
                <CardContent
                  className="
                    flex-1
                    relative
                    overflow-hidden
                    min-h-0
                    "
                >
                  <div
                    className="
                      relative
                      h-full
                      overflow-hidden
                      "
                  >
                    <p
                      className="
                       text-sm
                       text-gray-700
                       whitespace-pre-wrap
                       text-justify
                       overflow-hidden
                      "
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 14,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
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
                           h-24
                           bg-linear-to-t
                           from-white
                           via-white/90
                           to-transparent
                           pointer-events-none
                          "
                        />

                        <div
                          className="
                           absolute
                           bottom-4
                           left-1/2
                           -translate-x-1/2
                           z-20
                           opacity-0
                           group-hover:opacity-100
                           transition-opacity
                           duration-200
                          "
                        >
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
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
                                 rounded-full
                                 "
                              >
                                Read Full Note
                              </Button>
                            </DialogTrigger>

                            <DialogContent
                              className="
    w-sm
    sm:max-w-[80vw]
    max-h-[80vh]
    overflow-y-auto
    custom-scrollbar
    p-0
    border-white/20
    shadow-2xl
  "
                            >
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  scale: 0.68,
                                  y: 120,
                                  rotateX: 8,
                                  filter: "blur(10px)",
                                }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                  y: 0,
                                  rotateX: 0,
                                  filter: "blur(0px)",
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 170,
                                  damping: 22,
                                  mass: 0.9,
                                }}
                                className="p-6"
                              >
                                <DialogHeader>
                                  <DialogTitle>{title}</DialogTitle>
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
                  </div>
                </CardContent>

                {/* CARD FOOTER */}
                <div className="relative bottom-[-30] mt-auto border-t px-6 py-3 h-30 bg-gray-200">
                  <CardDescription className="capitalize">
                    Author: {user?.username || "Unknown"}
                  </CardDescription>

                  {isOwner && (
                    <div className="flex pt-4 gap-4 pb-4 ">
                      <Button
                        variant="none"
                        size="sm"
                        className="btn-blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(id);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="none"
                        size="sm"
                        className="btn-red"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
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
            <Card
              className="
                relative
                flex
                flex-col
                h-120
                cursor-pointer
              "
              onClick={() => setIsFlipped(false)}
            >
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
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
