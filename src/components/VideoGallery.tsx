"use client";
import { mediaList } from "@/lib/mediaList";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

export default function VideoGallery() {
  const videos = mediaList.video["Rana's What's app Videos"] || [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
      setIsExpanded(false);
    }
  };

  const showPrevVideo = () => {
    if (selectedIndex !== null) {
      setLoading(true);
      setSelectedIndex((prev) => (prev! - 1 + videos.length) % videos.length);
      setIsExpanded(false);
    }
  };

  return (
    <div className="container mx-auto md:p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Video Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => {
          const url = video.replace(/ /g, "%20");
          const videoName = video.split("/").pop()?.replace(/.mp4$/, "");

          return (
            <div
              key={index}
              className="relative border rounded-lg overflow-hidden hover:shadow-lg cursor-pointer flex flex-col items-center"
              onClick={() => {
                setSelectedIndex(index);
                setLoading(true);
                setIsExpanded(false);
              }}
            >
              {thumbnails[url] ? (
                <img
                  className="w-full h-40 object-cover rounded-md"
                  src={thumbnails[url]}
                  alt={videoName}
                />
              ) : (
                <video
                  className="w-full h-40 object-cover rounded-md"
                  src={url}
                  muted
                  loop
                  playsInline
                />
              )}

              {/* Video Title (Truncated) */}
              <p
                className="text-center text-sm mt-2 font-medium text-gray-700 w-full truncate px-2"
                title={videoName} // Show full title on hover
              >
                {videoName}
              </p>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-black text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-full cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              <X />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all"
              onClick={showPrevVideo}
            >
              <ChevronLeft className="w-8 h-8 text-white cursor-pointer" />
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
              className="w-full h-auto max-h-[90vh] rounded-lg"
              controls
              autoPlay
              onLoadedData={() => setLoading(false)}
            >
              <source src={videos[selectedIndex]} type="video/mp4" />
            </video>

            {/* Video Title (Expandable on Click) */}
            <p
              className={`text-center text-lg font-semibold mt-3 text-white cursor-pointer ${
                isExpanded ? "whitespace-normal break-words" : "truncate"
              }`}
              onClick={() => setIsExpanded(!isExpanded)}
              title={
                isExpanded
                  ? ""
                  : videos[selectedIndex].split("/").pop()?.replace(/.mp4$/, "")
              }
            >
              {videos[selectedIndex].split("/").pop()?.replace(/.mp4$/, "")}
            </p>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-all"
              onClick={showNextVideo}
            >
              <ChevronRight className="w-8 h-8 text-white cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
