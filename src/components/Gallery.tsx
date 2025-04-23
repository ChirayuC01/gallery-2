"use client";

import { useState } from "react";
import Image from "next/image";
import { mediaList } from "@/lib/mediaList";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

const Gallery = () => {
  const images = Object.entries(mediaList.images).flatMap(([category, imgs]) =>
    imgs.map((src) => {
      const filename = src.split("/").pop() || ""; // Get the last part of the path
      const title = filename.replace(/\.(jpeg|jpg|png|gif)$/i, ""); // Remove file extension
      return { src, title };
    })
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const showNextImage = () => {
    if (selectedIndex !== null) {
      setLoading(true);
      setSelectedIndex((prev) => (prev! + 1) % images.length);
      setIsExpanded(false);
    }
  };

  const showPrevImage = () => {
    if (selectedIndex !== null) {
      setLoading(true);
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
      setIsExpanded(false);
    }
  };

  // Helper function to determine if a title should be displayed
  const shouldDisplayTitle = (title: any) => {
    return !title.startsWith("IMG-") && !title.startsWith("WhatsApp Image");
  };

  return (
    <div className="container mx-auto md:p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Image Gallery
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map(({ src, title }, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col items-center"
            onClick={() => {
              setSelectedIndex(index);
              setLoading(true);
              setIsExpanded(false);
            }}
          >
            <Image
              src={src}
              alt={title}
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 rounded-md"
            />
            {/* Image Title (Truncated) - Only show if it doesn't start with IMG- */}
            {shouldDisplayTitle(title) && (
              <p
                className="text-center text-sm mt-2 font-medium text-gray-700 w-full truncate px-2"
                title={title} // Show full title on hover
              >
                {title}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal (Full View) */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
          <div className="w-4/5 md:w-3/5 lg:w-2/5 bg-white p-4 rounded-lg shadow-xl flex flex-col items-center">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-black text-2xl bg-gray-200 hover:bg-gray-300 p-2 rounded-full cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              <X />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all"
              onClick={showPrevImage}
            >
              <ChevronLeft className="w-8 h-8 text-white cursor-pointer" />
            </button>

            {/* Loader */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Loader2 className="w-12 h-12 animate-spin text-white cursor-pointer" />
              </div>
            )}

            {/* Full-Size Image with max height 90vh */}
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].title}
              width={800}
              height={600}
              className="w-full max-h-[90vh] object-contain rounded-lg"
              onLoadingComplete={() => setLoading(false)}
            />

            {/* Image Title (Expandable on Click) - Only show if it doesn't start with IMG- */}
            {shouldDisplayTitle(images[selectedIndex].title) && (
              <p
                className={`text-center text-lg font-semibold mt-3 text-gray-800 max-w-full cursor-pointer ${
                  isExpanded ? "whitespace-normal break-words" : "truncate"
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "" : images[selectedIndex].title}
              >
                {images[selectedIndex].title}
              </p>
            )}

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all"
              onClick={showNextImage}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
