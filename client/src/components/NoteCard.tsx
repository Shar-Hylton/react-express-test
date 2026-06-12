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
  isOwner: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function NoteCard({
  id,
  title,
  content,
  user,
  isOwner,
  onDelete,
  onEdit,
}: NoteCardProps) {
  return (
    <Card className="flex flex-col items-center w-sm h-auto">
      <CardHeader className="w-80 underline text-center p-2">
        <CardTitle className="text-xl font-bold"><h3>{title}</h3></CardTitle>
      </CardHeader>
        <CardContent className="grow"><p>{content}</p></CardContent>
        
        <CardDescription className=" text-left w-full px-6 pb-4">
          creator: {user?.username || "unknown"}
        </CardDescription>
        {/* {isOwner && (
          <div className="flex mt-auto gap-2 px-6 pb-6">
          <Button variant="destructive" size="sm" onClick={() => onEdit(id)}>
            Edit
          </Button>
          <Button className="mx-4" variant="destructive" size="sm" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
        )} */}
        <div className="flex mt-auto gap-2 px-6 pb-6">
          <Button disabled={!isOwner} variant="destructive" size="sm" onClick={() => onEdit(id)}>
            Edit
          </Button>
          <Button disabled={!isOwner} className="mx-4" variant="destructive" size="sm" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
        
     
    </Card>
  );
}
