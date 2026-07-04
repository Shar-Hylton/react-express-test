import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote, updateNote, deleteNote } from "@/lib/api/notes";

export function useNoteMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
