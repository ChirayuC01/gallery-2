"use client";

import { useState, useEffect, useRef } from "react";

interface VideoThumbnailProps {
  videoUrl: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoUrl }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const generateThumbnail = () => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.currentTime = 2; // Capture frame at 2 seconds

      video.onloadeddata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setThumbnail(canvas.toDataURL("image/jpeg")); // Convert to base64
        }
      };
    };

    generateThumbnail();
  }, [videoUrl]);

  return (
    <div className="relative w-full h-40">
      {/* Show Thumbnail or Video */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <video ref={videoRef} src={videoUrl} className="hidden" />
      )}
    </div>
  );
};

export default VideoThumbnail;
