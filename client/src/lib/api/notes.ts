import type { Note } from "@/types/dataTypes";

export const getNotes = async (): Promise<Note[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_SERVER_URL}/notes`;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${token}`,
    },
    //   credentials: "include", // without this req.session.user._id is undefined
    });
    const data = await response.json();

    console.log("Response received: ", response.status);

    if (!response.ok) {
      const message = data?.errors[0]?.msg ?? "No notes yet";
      console.error(message);
      throw new Error(message);
    }

    return data?.notes ?? [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// create note
export const createNote = async (data: { title: string; content: string }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/notes/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    const resData = await response.json();

    if (!response.ok) {
      const message =
        resData?.errors?.[0]?.msg ||
        resData?.error ||
        "Failed to create note";
      console.error(message);
      throw new Error(message);
    }

    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// UPDATE
export const updateNote = async ({
  id,
  data,
}: {
  id: string;
  data: {
    title: string;
    content: string;
  };
}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/notes/edit/${id}`,
      {
        method: "PUT",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    const resData = await response.json();

    if (!response.ok) {
      const message =
        resData?.errors?.[0]?.msg ||
        resData?.error ||
        "Failed to update note";
      console.error(message);
      throw new Error(message);
    }
    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNote = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/notes/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const resData = await response.json();

    if (!response.ok) {
      const message =
        resData?.error ||
        resData?.errors[0]?.msg ||
        "Failed to delete note";
      console.error(message);
      throw new Error(message);
    }

    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
