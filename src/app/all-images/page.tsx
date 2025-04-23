import Gallery from "@/components/Gallery";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const Page = () => {
  return (
    <ProtectedRoute>
      <div>
        <Gallery />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
