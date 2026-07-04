import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/notes";

export const useNotesQuery = () => {
    return useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
    });
};