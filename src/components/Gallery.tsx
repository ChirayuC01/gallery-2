"use client";

import { useState } from "react";
import Image from "next/image";
import { mediaList } from "@/lib/mediaList";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Image Gallery
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Object.entries(mediaList.images)
          .flatMap(([category, images]) =>
            images.map((src, index) => ({
              src,
              title: `${category} - Image ${index + 1}`, // Generating a title
            }))
          )
          .map(({ src, title }, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={title}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Image Title */}
              <p className="text-center text-sm mt-2 font-medium text-gray-700">
                {title}
              </p>
            </div>
          ))}
      </div>

      {/* Image Modal (Full View) */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="w-4/5 md:w-3/5 lg:w-2/5 ">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
            {/* Full-Size Image */}
            <Image
              src={selectedImage}
              alt="Selected"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
