'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
}

export function VideoPlayer({
  url,
  thumbnail,
  title,
  className,
  autoplay = false,
  controls = true,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoplay);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [ready, setReady] = useState(false);

  return (
    <Card className={cn('overflow-hidden p-0', className)} hover={false}>
      <div className="relative aspect-video bg-black group">
        <ReactPlayer
          url={url}
          playing={playing}
          muted={muted}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onProgress={(state: any) => setPlayed(state.played)}
          onReady={() => setReady(true)}
          width="100%"
          height="100%"
          light={thumbnail || undefined}
          playIcon={
            <button className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-glow-lg">
              <Play className="h-10 w-10 ml-1" />
            </button>
          }
        />

        {controls && ready && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${played * 100}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPlaying(!playing)}
                className="text-white hover:text-primary transition-colors"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>

              <button
                onClick={() => setMuted(!muted)}
                className="text-white hover:text-primary transition-colors"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </button>

              {title && (
                <span className="text-white text-sm ml-2">{title}</span>
              )}

              <button
                className="ml-auto text-white hover:text-primary transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
