"use client";
import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";

type Note = {
  _id: string;
  title: string;
  content: string;
  user?: { username: string; email: string };
};

type NotesContextType = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  errorMsg: string;
  // setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  successMsg: string;
  // setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
  updateNote: (
    id: string,
    data: { title: string; content: string }
  ) => Promise<void>;
  createNote: (data: { title: string; content: string })=> Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};
const NOTES_CACHE_KEY = "notes_cache";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used inside NotesProvider");
  return context;
};


export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
 
  const saveNotesToCache = (notes: Note[]) =>{
    sessionStorage.setItem(NOTES_CACHE_KEY,JSON.stringify(notes))
  };

  const getNotesFromCache = (): Note[] | null => {
    const cached = sessionStorage.getItem(NOTES_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }

  // POST
  const createNote = async(data:{title:string, content:string}) =>{

    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch("http://localhost:8000/notes/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        const msg = resData?.errors[0]?.msg ?? "Failed to create note";
        setErrorMsg(msg);
        return;
      }

      setNotes((prev) => {
        const updated = [resData.newNote, ...prev];
        saveNotesToCache(updated);
        return updated;
      });

      setSuccessMsg(resData.message);
    } catch (error) {
      setErrorMsg("Server Error. Failed to create note");
      console.log(error);
    }
  }

  // UPDATE
  const updateNote = async (
    id: string,
    data: { title: string; content: string }
  ) => {

    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch(`http://localhost:8000/edit/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      if(!response.ok){
        const errMsg = resData?.errors[0]?.msg ?? "Failed to update note"
        setErrorMsg(errMsg);
      }
      // Updating state without refetching
      setNotes((prev)=>{
        const updated = prev.map((note)=>(
          note._id === id ? resData.updatedNote : note
        ));
      saveNotesToCache(updated);
      return updated;
    });
      setSuccessMsg(resData.message);
    } catch (error) {
      console.log(error);
      setErrorMsg("Server error! Failed to update note");
    }

  };

  // GET
  useEffect(() => {
    const getNotes = async () => {

      const url: string = "http://localhost:8000/notes";

      setErrorMsg("");
      try {
        const cachedNotes = getNotesFromCache();

        if (cachedNotes) {
          setNotes(cachedNotes);
          return;
        }

        const response = await fetch(url, {
          credentials: "include", // without this req.session.user._id is undefined
        });
        const data = await response.json();

        console.log("Response received: ", response.status);

        if (!response.ok) {
          const errMsg = data?.errors[0]?.msg ?? "No notes yet";
          setErrorMsg(errMsg);
          return;
        }
        
        setNotes(data?.notes ?? []);
        saveNotesToCache(data.notes ?? []);
      } catch (error) {
        console.log(error);
        setErrorMsg("Failed to fetch notes");
      }
    };
    getNotes();
  }, []);

  // Delete

  const deleteNote = async (id:string) => {
    setErrorMsg("");
    setSuccessMsg("");
                      
    try{
      const response = await fetch(`http://localhost:8000/notes/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      
      if(!response.ok){
        const errorMsg = data?.errors?.[0]?.msg ?? "Failed to delete note";
        setErrorMsg(errorMsg);
        return;
      }

      setNotes((prev)=>{
        const updated = prev.filter((note)=>note._id !== id);
        saveNotesToCache(updated);
        return updated;

      });
      setSuccessMsg(data.message ?? "Note deleted");

    }catch(error){
      setErrorMsg("Server error. Failed to delete note.");
      console.log(error);
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, errorMsg, successMsg, updateNote, createNote, deleteNote

       }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
}
