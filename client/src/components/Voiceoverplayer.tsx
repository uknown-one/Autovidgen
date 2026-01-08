import { useState, useRef } from "react";
import { Play, Pause, Download, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface VoiceoverPlayerProps {
  audioUrl?: string;
  title?: string;
  duration?: number;
  voice?: string;
  onRegenerate?: () => void;
  onDownload?: () => void;
}

export default function VoiceoverPlayer({
  audioUrl,
  title = "Generated Voiceover",
  duration = 0,
  voice = "Natural Female Voice",
  onRegenerate,
  onDownload
}: VoiceoverPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audioUrl) {
      setIsPlaying(!isPlaying);
      console.log(isPlaying ? 'Audio paused' : 'Audio playing');
    } else {
      console.log('No audio available to play');
    }
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    onRegenerate?.();
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Voiceover regenerated');
    }, 3000);
  };

  const handleDownload = () => {
    if (audioUrl) {
      onDownload?.();
      console.log('Audio downloaded');
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? 'Audio unmuted' : 'Audio muted');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg" data-testid="text-voiceover-title">{title}</CardTitle>
          <Badge variant="outline" data-testid="text-voice-type">{voice}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Waveform/Progress Visualization */}
        <div className="space-y-2">
          <div className="h-20 bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
            {isGenerating ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                <span>Generating voiceover...</span>
              </div>
            ) : audioUrl ? (
              <>
                {/* Waveform visualization placeholder */}
                <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 flex items-center justify-center">
                  <div className="text-xs text-muted-foreground">Audio Waveform</div>
                </div>
                <div 
                  className="absolute inset-0 bg-background/80" 
                  style={{ width: `${100 - progress}%`, right: 0 }}
                />
              </>
            ) : (
              <div className="text-muted-foreground text-sm">No audio generated yet</div>
            )}
          </div>
          
          {audioUrl && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span data-testid="text-current-time">{formatTime(currentTime)}</span>
              <span data-testid="text-total-duration">{formatTime(duration)}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {audioUrl && (
          <Progress value={progress} className="w-full" data-testid="progress-audio" />
        )}

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant={audioUrl ? "default" : "secondary"}
              onClick={handlePlayPause}
              disabled={!audioUrl || isGenerating}
              data-testid="button-play-pause-audio"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <div className="flex items-center gap-2 ml-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleMuteToggle}
                data-testid="button-mute-toggle"
              >
                {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
                data-testid="slider-volume"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRegenerate}
              disabled={isGenerating}
              data-testid="button-regenerate-audio"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Regenerate'}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              disabled={!audioUrl}
              data-testid="button-download-audio"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-muted-foreground">Quality:</span>
            <div className="font-medium" data-testid="text-audio-quality">High (44.1kHz)</div>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Format:</span>
            <div className="font-medium" data-testid="text-audio-format">MP3</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
