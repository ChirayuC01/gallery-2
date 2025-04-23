import ProtectedRoute from "@/components/ProtectedRoute";
import VideoGallery from "@/components/VideoGallery";
import React from "react";

const Page = () => {
  return (
    <ProtectedRoute>
      <div>
        <VideoGallery />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
