"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { mediaList } from "@/lib/mediaList";
import { extractThumbnail } from "@/utils/extractThumbnail";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
  const videoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const placeholder = "/placeholder.jpg"; // Default thumbnail before generation

  // Extract all videos from categories
  const videoList = Object.entries(mediaList.video).flatMap(([_, videos]) =>
    videos.map((videoUrl) => ({ url: videoUrl }))
  );

  // Intersection Observer callback
  const handleIntersection = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const newThumbnails: { [key: string]: string } = {};

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const videoUrl = entry.target.getAttribute("data-url");
          if (videoUrl && !thumbnails[videoUrl]) {
            try {
              const thumbnail = await extractThumbnail(videoUrl);
              newThumbnails[videoUrl] = thumbnail;
            } catch (error) {
              console.error("Error generating thumbnail:", error);
              newThumbnails[videoUrl] = placeholder;
            }
          }
        }
      }

      if (Object.keys(newThumbnails).length > 0) {
        setThumbnails((prev) => ({ ...prev, ...newThumbnails }));
      }
    },
    [thumbnails]
  );

  // Initialize Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Observe within viewport
      rootMargin: "100px", // Preload thumbnails before they appear
      threshold: 0.5, // 50% visibility before loading
    });

    Object.values(videoRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [handleIntersection, videoList]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Gallery</h1>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {videoList.map((video, index) => (
          <div
            key={index}
            ref={(el) => {
              videoRefs.current[video.url] = el;
            }}
            data-url={video.url}
            className="relative w-full h-40 overflow-hidden rounded-lg shadow-md cursor-pointer"
            onClick={() => setSelectedVideo(video.url)}
          >
            <ReactPlayer
              url={video.url}
              light={thumbnails[video.url] || placeholder} // Show generated thumbnail
              width="100%"
              height="100%"
              playIcon={<button className="text-white text-4xl">▶</button>}
            />
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-4/5 md:w-3/5 lg:w-2/5">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              ✖
            </button>
            <ReactPlayer
              url={selectedVideo}
              controls
              playing
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
