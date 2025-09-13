import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Dashboard from "@/components/Dashboard";
import TemplateGallery from "@/components/TemplateGallery";
import ScriptEditor from "@/components/ScriptEditor";
import VoiceoverPlayer from "@/components/VoiceoverPlayer";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/projects" component={Dashboard} />
      <Route path="/templates" component={TemplateGallery} />
      <Route path="/editor" component={() => (
        <div className="h-full p-6">
          <ScriptEditor title="Video Script Editor" />
        </div>
      )} />
      <Route path="/voiceover" component={() => (
        <div className="h-full p-6">
          <VoiceoverPlayer 
            title="Voiceover Studio"
            audioUrl="https://example.com/sample.mp3"
            duration={240}
          />
        </div>
      )} />
      <Route path="/settings" component={() => (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <p className="text-muted-foreground">Settings page coming soon...</p>
        </div>
      )} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
