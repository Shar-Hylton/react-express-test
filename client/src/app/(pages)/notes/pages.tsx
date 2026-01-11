import NoteCard from "@/components/NoteCard";
import { useNotes } from "@/notesContext/NotesContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Notes() {
  const { notes, deleteNote } = useNotes();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    await deleteNote(id);
  };

  const handleEdit = (id: string) => {
    router.push("notes/add");
  };
  const handleAdd = () => {
    router.push("/notes/add");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-end mb-6">
        <Button onClick={handleAdd}>Add Note</Button>
      </div>
      <div className="grid gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            user={note.user}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
