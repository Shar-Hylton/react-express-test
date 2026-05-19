import NoteCard from "./NoteCard";
import { useNotes } from "../notesContext/NotesContext";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

export default function NotesList() {
  const { isLoading, notes, deleteNote } = useNotes();

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;
    await deleteNote(id);
  };
  const handleEdit = (id: string) => {
    router.push(`notes/edit/${id}`);
  };

  if(isLoading){
    return (
      <div className=" w-full flex items-center justify-center mt-30">
        <Spinner className="size-16 text-blue" />
      </div>
    );
  }
  // console.log(notes);
// If a there is no note created, users should see Create the first Note.
  // if(!isLoading && !notes){
  //   return (
  //     <div className=" w-full flex items-center justify-center mt-30">
  //       <h3 className="text-blue-500">Be The First To Create a Note</h3>
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {notes.map((note) => (
        <NoteCard
          key={note?._id}
          id={note?._id}
          title={note?.title}
          content={note?.content}
          user={note?.user}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}
