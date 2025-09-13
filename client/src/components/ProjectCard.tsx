import { Calendar, Clock, MoreHorizontal, Play } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status: "draft" | "script-ready" | "voiceover-done" | "complete";
  thumbnail?: string;
  duration?: string;
  createdAt: string;
  onClick?: () => void;
}

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  "script-ready": "bg-chart-2 text-white",
  "voiceover-done": "bg-chart-3 text-white", 
  complete: "bg-chart-1 text-white",
};

const statusLabels = {
  draft: "Draft",
  "script-ready": "Script Ready",
  "voiceover-done": "Audio Ready",
  complete: "Complete",
};

export default function ProjectCard({
  id,
  title,
  description,
  status,
  thumbnail,
  duration,
  createdAt,
  onClick,
}: ProjectCardProps) {
  const handleAction = (action: string) => {
    console.log(`${action} triggered for project ${id}`);
  };

  return (
    <Card className="hover-elevate cursor-pointer" onClick={onClick} data-testid={`card-project-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate" data-testid={`text-project-title-${id}`}>
              {title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2" data-testid={`text-project-description-${id}`}>
              {description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button size="icon" variant="ghost" className="h-6 w-6" data-testid={`button-project-menu-${id}`}>
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAction("edit")} data-testid={`button-edit-${id}`}>
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("duplicate")} data-testid={`button-duplicate-${id}`}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("export")} data-testid={`button-export-${id}`}>
                Export
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => handleAction("delete")} data-testid={`button-delete-${id}`}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-muted-foreground">
              <Play className="h-8 w-8" />
            </div>
          )}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
              {duration}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between">
        <Badge 
          className={statusColors[status]} 
          data-testid={`badge-status-${id}`}
        >
          {statusLabels[status]}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span data-testid={`text-created-date-${id}`}>{createdAt}</span>
        </div>
      </CardFooter>
    </Card>
  );
}