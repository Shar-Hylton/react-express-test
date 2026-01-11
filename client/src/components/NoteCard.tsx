import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  user?: { username: string; email: string };
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function NoteCard({
  id,
  title,
  content,
  user,
  onDelete,
  onEdit,
}: NoteCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardContent>{content}</CardContent>
        <CardDescription className="px-6 pb-4">
          creator: {user?.username || "unknown"}
        </CardDescription>
        <div className="flex gap-2 px-6 pb-6">
          <Button variant="destructive" size="sm" onClick={() => onEdit(id)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
