"use client";
import { mediaList } from "@/lib/mediaList";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function VideoGallery() {
  const videos = mediaList.video["Rana's What's app Videos"] || [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateThumbnails = async () => {
      const newThumbnails: { [key: string]: string } = {};

      for (const videoUrl of videos) {
        const url = videoUrl.replace(/ /g, "%20");

        await new Promise((resolve) => {
          const video = document.createElement("video");
          video.src = url;
          video.crossOrigin = "anonymous";
          video.muted = true;
          video.preload = "metadata";
          video.currentTime = 2;

          video.addEventListener("loadeddata", () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(null);

            canvas.width = video.videoWidth / 2;
            canvas.height = video.videoHeight / 2;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            newThumbnails[url] = canvas.toDataURL("image/jpeg");
            setThumbnails((prev) => ({ ...prev, [url]: newThumbnails[url] }));
            resolve(null);
          });

          video.addEventListener("error", () => resolve(null));
        });
      }
    };

    generateThumbnails();
  }, [videos]);

  const showNextVideo = () => {
    if (selectedIndex !== null) {
      setLoading(true);
      setSelectedIndex((prev) => (prev! + 1) % videos.length);
    }
  };

  const showPrevVideo = () => {
    if (selectedIndex !== null) {
      setLoading(true);
      setSelectedIndex((prev) => (prev! - 1 + videos.length) % videos.length);
    }
  };

  return (
    <div className="container mx-auto md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {videos.map((video, index) => {
          const url = video.replace(/ /g, "%20");
          const videoName = video.split("/").pop()?.replace(/.mp4$/, "");

          return (
            <button
              key={index}
              className="relative border rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={() => {
                setSelectedIndex(index);
                setLoading(true);
              }}
            >
              {thumbnails[url] ? (
                <img
                  className="w-full h-40 object-cover"
                  src={thumbnails[url]}
                  alt={videoName}
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                  Loading...
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold">
                {videoName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Video Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
              onClick={() => setSelectedIndex(null)}
            >
              ✖
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all"
              onClick={showPrevVideo}
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Loader */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Loader2 className="w-12 h-12 animate-spin text-white" />
              </div>
            )}

            {/* Video Player (Force reload with key) */}
            <video
              key={videos[selectedIndex]} // 🔥 Forces video to reload on src change
              className="w-full h-auto max-h-[90vh]"
              controls
              autoPlay
              onLoadedData={() => setLoading(false)}
            >
              <source src={videos[selectedIndex]} type="video/mp4" />
            </video>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all"
              onClick={showNextVideo}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
