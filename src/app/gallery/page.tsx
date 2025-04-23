"use client";
import Gallery from "@/components/Gallery";
import ProtectedRoute from "@/components/ProtectedRoute";
import VideoGallery from "@/components/VideoGallery";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  return (
    <ProtectedRoute>
      <div className=" mx-auto px-4 py-8">
        <div className="flex justify-center mb-6 relative">
          <div className="flex gap-2 bg-gray-100 p-2 rounded-full shadow-inner">
            <button
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 cursor-pointer ${
                activeTab === "photos"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("photos")}
            >
              Photos
            </button>
            <button
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 cursor-pointer ${
                activeTab === "videos"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              Videos
            </button>
          </div>
        </div>

        <div className="transition-opacity duration-300 ease-in-out">
          {activeTab === "photos" ? <Gallery /> : <VideoGallery />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
