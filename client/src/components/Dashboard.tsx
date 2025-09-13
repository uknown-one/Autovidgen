import { useState, useEffect } from "react";
import { Plus, Clock, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Project, InsertProject } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface CreateProjectForm {
  title: string;
  description: string;
  category: string;
  targetLength: string;
  tone: string;
}

export default function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json()) as Promise<Project[]>
  });

  const createProjectMutation = useMutation({
    mutationFn: (projectData: InsertProject) => 
      apiRequest('POST', '/api/projects', projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setShowCreateModal(false);
      toast({
        title: "Project created successfully",
        description: "Your new project is ready for script generation."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create project",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleCreateProject = (projectData: CreateProjectForm) => {
    const insertData: InsertProject = {
      title: projectData.title,
      description: projectData.description,
      category: projectData.category,
      targetLength: projectData.targetLength,
      tone: projectData.tone,
      script: null,
      audioUrl: null,
      status: "draft"
    };
    createProjectMutation.mutate(insertData);
  };

  const handleProjectClick = (project: Project) => {
    console.log('Project clicked:', project.title);
  };

  // Format created date for display
  const formatCreatedAt = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === "complete").length,
    inProgressProjects: projects.filter(p => p.status !== "complete" && p.status !== "draft").length,
    drafts: projects.filter(p => p.status === "draft").length,
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Loading your projects...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1" data-testid="text-dashboard-subtitle">
            Create compelling horror and conspiracy content
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} data-testid="button-new-project-header">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-projects">{stats.totalProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Video className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1" data-testid="text-completed-projects">{stats.completedProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2" data-testid="text-progress-projects">{stats.inProgressProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-draft-projects">{stats.drafts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold" data-testid="text-recent-projects-title">Recent Projects</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description || ""}
              status={project.status as "draft" | "complete" | "script-ready" | "voiceover-done"}
              createdAt={formatCreatedAt(project.createdAt)}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first video project to get started with automated content creation.
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Project
            </Button>
          </div>
        )}
      </div>

      <CreateProjectModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}