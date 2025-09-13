import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  category: z.string().min(1, "Category is required"),
  targetLength: z.string().min(1, "Target length is required"),
  tone: z.string().min(1, "Tone is required"),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

export interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (project: CreateProjectForm) => void;
}

const categories = [
  { value: "conspiracy", label: "Conspiracy Theory" },
  { value: "horror", label: "Horror Stories" },
  { value: "paranormal", label: "Paranormal Investigation" },
  { value: "mystery", label: "Unsolved Mysteries" },
  { value: "cryptid", label: "Cryptid Research" },
  { value: "occult", label: "Occult Studies" },
];

const targetLengths = [
  { value: "short", label: "Short (1-3 min)" },
  { value: "medium", label: "Medium (5-10 min)" },
  { value: "long", label: "Long (15-20 min)" },
  { value: "extended", label: "Extended (30+ min)" },
];

const tones = [
  { value: "mysterious", label: "Mysterious & Suspenseful" },
  { value: "dramatic", label: "Dramatic & Intense" },
  { value: "eerie", label: "Eerie & Atmospheric" },
  { value: "investigative", label: "Investigative & Factual" },
  { value: "dark", label: "Dark & Foreboding" },
  { value: "thrilling", label: "Thrilling & Exciting" },
];

export default function CreateProjectModal({
  open,
  onOpenChange,
  onCreateProject,
}: CreateProjectModalProps) {
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      targetLength: "",
      tone: "",
    },
  });

  const onSubmit = async (data: CreateProjectForm) => {
    setIsCreating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onCreateProject(data);
      form.reset();
      onOpenChange(false);
      console.log('Project created:', data);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="modal-create-project">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">Create New Video Project</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your video title..." 
                      {...field} 
                      data-testid="input-project-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what your video will be about..."
                      rows={3}
                      {...field}
                      data-testid="textarea-project-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-project-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Length</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-target-length">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {targetLengths.map((length) => (
                          <SelectItem key={length.value} value={length.value}>
                            {length.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone & Style</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-tone">
                        <SelectValue placeholder="Select video tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone.value} value={tone.value}>
                          {tone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isCreating}
                data-testid="button-cancel-project"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isCreating}
                data-testid="button-create-project"
              >
                {isCreating ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}