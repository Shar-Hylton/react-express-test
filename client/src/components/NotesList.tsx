import NoteCard from "./NoteCard";
import {useNotes} from "../notesContext/NotesContext";
import { useRouter } from "next/navigation";

export default function NotesList() {
    const { notes, deleteNote } = useNotes();

    const router = useRouter();

    const handleDelete = async (id: string) =>{
      const confirmed = confirm("Are you sure you want to delete this note?");
      if(!confirmed)return;
      await deleteNote(id);
    };
    const handleEdit = (id: string) => {
    router.push("notes/add");
  };

  return (
    <div className="grid gap-4">
        {notes.map((note) =>(
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
  );
}
