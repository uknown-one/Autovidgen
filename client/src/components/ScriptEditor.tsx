import { useState } from "react";
import { Save, Download, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export interface ScriptEditorProps {
  initialScript?: string;
  title?: string;
  onSave?: (script: string) => void;
  onGenerate?: (prompt: string) => void;
}

export default function ScriptEditor({ 
  initialScript = "", 
  title = "New Video Script",
  onSave,
  onGenerate 
}: ScriptEditorProps) {
  const [script, setScript] = useState(initialScript);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wordCount, setWordCount] = useState(initialScript.split(' ').filter(Boolean).length);

  const handleScriptChange = (value: string) => {
    setScript(value);
    setWordCount(value.split(' ').filter(Boolean).length);
  };

  const handleSave = () => {
    onSave?.(script);
    console.log('Script saved');
  };

  const handleDownload = () => {
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-script.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('Script downloaded');
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? 'Playback paused' : 'Playback started');
  };

  const handleGenerate = () => {
    onGenerate?.("Generate a YouTube video script about technology trends");
    console.log('AI script generation triggered');
  };

  const estimatedDuration = Math.ceil(wordCount / 150); // ~150 words per minute

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg" data-testid="text-script-title">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" data-testid="text-word-count">
              {wordCount} words
            </Badge>
            <Badge variant="outline" data-testid="text-estimated-duration">
              ~{estimatedDuration}min
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleGenerate}
            data-testid="button-generate-script"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Generate with AI
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handlePlayPause}
            data-testid="button-play-pause"
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Preview'}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleDownload}
            data-testid="button-download-script"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
            data-testid="button-save-script"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <Textarea
          value={script}
          onChange={(e) => handleScriptChange(e.target.value)}
          placeholder="Start writing your video script here, or use the AI generator to get started..."
          className="flex-1 resize-none font-mono text-sm leading-relaxed"
          data-testid="textarea-script-content"
        />
        
        <div className="mt-4 text-xs text-muted-foreground" data-testid="text-script-stats">
          Characters: {script.length} | Estimated reading time: {estimatedDuration} minutes
        </div>
      </CardContent>
    </Card>
  );
}