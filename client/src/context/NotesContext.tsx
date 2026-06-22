"use client";
import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";

type User = {
  _id: string; 
  username: string; 
  email: string 
}

type Note = {
  _id: string;
  title: string;
  content: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
};


type NotesContextType = {
  notes: Note[];
  isLoading: boolean;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  updateNote: (
    id: string,
    data: { title: string; content: string },
  ) => Promise<{success:boolean, message:string}>;
  createNote: (data: { title: string; content: string }) => Promise<{success:boolean; message:string}>;
  deleteNote: (id: string) => Promise<{success:boolean; message:string}>;
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
  const [isLoading, setIsLoading] = useState(true);

  const saveNotesToCache = (notes: Note[]) => {
    sessionStorage.setItem(NOTES_CACHE_KEY, JSON.stringify(notes));
  };

  const getNotesFromCache = (): Note[] | null => {
    const cached = sessionStorage.getItem(NOTES_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  };

  // POST
  const createNote = async (data: { title: string; content: string }) => {
   
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
        const msg = resData?.errors?.[0]?.msg || resData?.error || "Failed to create note";
        console.log(msg);
        return{
          success:false,
          message: msg,
        };
      }

      setNotes((prev) => {
        const updated = [resData.myNote, ...prev];
        saveNotesToCache(updated);
        return updated;
      });

      return {
        success:true,
        message: resData?.message,
      }
    } catch (error) {
      console.log(error);
      return {
       success: false,
       message: "Server error, Failed to create note",

      }
    }
  };

  // UPDATE
  const updateNote = async (
    id: string,
    data: { title: string; content: string },
  ) => {
   
    try {
      const response = await fetch(`http://localhost:8000/notes/edit/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
     
      const resData = await response.json();
      
      if (!response.ok) {
        const msg = resData?.errors?.[0]?.msg || resData?.error || "Failed to update note";
        console.log(msg);
        return {
          success:false,
          message: msg
        };
      }
      // Updating state without refetching
      setNotes((prev) => {
        const updated = prev.map((note) =>
          note?._id === id ? resData.updatedNote : note,
        );
        saveNotesToCache(updated);
        return updated;
      });
      
      return {
          success:true,
          message: resData.message || "Note updated successfully"
        };
    } catch (error) {
      console.log(error);
      return {
          success:false,
          message: "Failed to update note",
        };
    }
    
  };

  // GET
  useEffect(() => {
    const getNotes = async () => {
      const url: string = "http://localhost:8000/notes";

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
          const msg = data?.errors[0]?.msg ?? "No notes yet";
          console.log(msg);
          return;
        }

        setNotes(data?.notes ?? []);
        saveNotesToCache(data.notes ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getNotes();
  }, []);

  // Delete

  const deleteNote = async (id: string) => {

    try {
      const response = await fetch(`http://localhost:8000/notes/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const resData = await response.json();

      if (!response.ok) {
        const msg = resData?.error || resData?.errors[0]?.msg || "Failed to delete note";
        console.log(msg);
        return {
          success:false,
          message: msg
        };
      }

      setNotes((prev) => {
        const updated = prev.filter((note) => note._id !== id);
        saveNotesToCache(updated);
        return updated;
      });
      
        return{
          success:true,
          message: resData?.message || "Note successfully deleted!"
        }
      
    } catch (error) {
      console.log(error);
      return{
        success: false,
        message: "Server error, please try again later."
      }
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        setNotes,
        updateNote,
        createNote,
        deleteNote,
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
