import { useState } from "react";
import { Search, Filter, Clock, User, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
  uses: number;
  preview?: string;
}

export interface TemplateGalleryProps {
  templates?: Template[];
  onSelectTemplate?: (template: Template) => void;
}

const defaultTemplates: Template[] = [
  {
    id: "1",
    title: "Ancient Mysteries Investigation",
    description: "Deep dive into unexplained historical events and lost civilizations with compelling evidence.",
    category: "Conspiracy",
    duration: "15-25 min",
    difficulty: "intermediate",
    rating: 4.9,
    uses: 2340,
  },
  {
    id: "2", 
    title: "Government Cover-Up Exposé",
    description: "Structured format for revealing hidden truths and classified information with documented sources.",
    category: "Conspiracy",
    duration: "20-30 min",
    difficulty: "advanced",
    rating: 4.8,
    uses: 1890,
  },
  {
    id: "3",
    title: "True Horror Story Narration",
    description: "Atmospheric storytelling format for real paranormal encounters and unexplained phenomena.",
    category: "Horror",
    duration: "10-15 min", 
    difficulty: "beginner",
    rating: 4.7,
    uses: 3200,
  },
  {
    id: "4",
    title: "Creepypasta Reading",
    description: "Professional narration style for fictional horror stories with immersive sound design.",
    category: "Horror",
    duration: "8-12 min",
    difficulty: "beginner",
    rating: 4.6,
    uses: 2750,
  },
  {
    id: "5",
    title: "Secret Society Breakdown",
    description: "Analytical format for exploring hidden organizations and their influence on world events.",
    category: "Conspiracy",
    duration: "25-35 min",
    difficulty: "advanced",
    rating: 4.9,
    uses: 1650,
  },
  {
    id: "6",
    title: "Urban Legend Deep Dive",
    description: "Investigative approach to local legends and their possible connections to real events.",
    category: "Horror",
    duration: "12-18 min",
    difficulty: "intermediate",
    rating: 4.8,
    uses: 2100,
  },
];

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", 
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function TemplateGallery({ 
  templates = defaultTemplates, 
  onSelectTemplate 
}: TemplateGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || template.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate?.(template);
    console.log(`Template selected: ${template.title}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-templates"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48" data-testid="select-category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-48" data-testid="select-difficulty">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className="hover-elevate cursor-pointer"
            onClick={() => handleSelectTemplate(template)}
            data-testid={`card-template-${template.id}`}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg" data-testid={`text-template-title-${template.id}`}>
                    {template.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1" data-testid={`text-template-description-${template.id}`}>
                    {template.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" data-testid={`badge-category-${template.id}`}>
                    {template.category}
                  </Badge>
                  <Badge 
                    className={difficultyColors[template.difficulty]}
                    data-testid={`badge-difficulty-${template.id}`}
                  >
                    {template.difficulty}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span data-testid={`text-duration-${template.id}`}>{template.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span data-testid={`text-uses-${template.id}`}>{template.uses} uses</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium" data-testid={`text-rating-${template.id}`}>
                    {template.rating}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button 
                className="w-full" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectTemplate(template);
                }}
                data-testid={`button-use-template-${template.id}`}
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground" data-testid="text-no-templates">
            No templates found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}