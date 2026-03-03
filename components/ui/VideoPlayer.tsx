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
  return (
    <Card className={cn('overflow-hidden p-0', className)} hover={false}>
      <div className="relative aspect-video bg-black">
        <video
          autoPlay={autoplay}
          controls={controls}
          className="w-full h-full"
          poster={thumbnail}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Card>
  );
}
