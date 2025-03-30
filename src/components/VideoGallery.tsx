import { mediaList } from "@/lib/mediaList";
import { useState, useEffect } from "react";

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const generateThumbnails = async () => {
      const newThumbnails: { [key: string]: string } = {};

      const videos = mediaList.video["Rana's What's app Videos"] || [];
      for (const videoUrl of videos) {
        const url = videoUrl.replace(/ /g, "%20");

        await new Promise((resolve) => {
          const video = document.createElement("video");
          video.src = url;
          video.crossOrigin = "anonymous";
          video.muted = true;
          video.preload = "metadata"; // Load only metadata first
          video.currentTime = 2; // Capture frame at 2 seconds

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
  }, []);

  const videos = mediaList.video["Rana's What's app Videos"] || [];

  return (
    <div className="container mx-auto p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Rana's WhatsApp Videos</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {videos.map((video, index) => {
          const url = video.replace(/ /g, "%20");
          const videoName = video.split("/").pop()?.replace(/.mp4$/, "");

          return (
            <button
              key={index}
              className="relative border rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={() => setSelectedVideo(url)}
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

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <button
              className="absolute top-2 right-2 text-white text-2xl cursor-pointer"
              onClick={() => setSelectedVideo(null)}
            >
              ✖
            </button>
            <video className="w-full h-auto max-h-[90vh]" controls autoPlay>
              <source src={selectedVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
