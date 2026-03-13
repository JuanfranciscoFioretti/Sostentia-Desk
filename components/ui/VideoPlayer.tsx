'use client';

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
  // Extract YouTube ID from URL
  const getYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&\?\/\r\n]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(url);
  const embedUrl = youtubeId 
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}`
    : url;

  return (
    <Card className={cn('overflow-hidden p-0', className)} hover={false}>
      <div className="relative aspect-video bg-black">
        {youtubeId ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <video
            autoPlay={autoplay}
            controls={controls}
            className="w-full h-full"
            poster={thumbnail}
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </Card>
  );
}
