import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Notes() {
  const getNotes = async () => {
    try {
      const response = await fetch("");

      if (!response.ok) {
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{"Blog Name Here"}</CardTitle>
          <CardDescription>{"Short Description"}</CardDescription>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
