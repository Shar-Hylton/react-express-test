import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api/notes";
import { useAuth } from "@/context/AuthContext";

export const useNotesQuery = () => {
    const { isAuthenticated, isLoading } = useAuth();

    return useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
        enabled: isAuthenticated && !isLoading,
    });
};