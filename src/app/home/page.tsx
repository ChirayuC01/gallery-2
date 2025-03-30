"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { mediaList } from "@/lib/mediaList";
import { useRouter } from "next/navigation";
import { encodeSpaces } from "@/helpers/encodeUrl";

// Login Modal Component
const LoginModal = ({ isOpen, onClose, onSubmit }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");

    // Add your authentication logic here
    // This is a simple example - replace with your actual authentication
    if (username === "chachu" && password === "dadarananana") {
      onSubmit(true);
    } else {
      setError("Invalid username or password");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust opacity as needed
      }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full space-y-1">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Please Login To View</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                User name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="User name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Your password"
                required
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
        <hr className="text-[#dee2e6]" />
        <div className="flex justify-end p-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const images = mediaList.images.Rana_Pics;
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = images.length;
  const router = useRouter();

  // Login modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Carousel Controls
  const handlePrev = () =>
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const handleNext = () =>
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  // Handle login success
  const handleLoginSuccess = (success: any) => {
    if (success) {
      setIsLoginModalOpen(false);
      router.push("/signpost");
    }
  };

  // Handle signpost button click
  const handleSignpostClick = () => {
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  return (
    <>
      <Head>
        <title>Rana's World</title>
      </Head>

      {/* Family Section */}
      <section className="py-16 bg-white text-center">
        {/* <h2 className="text-4xl font-bold mb-6">Me & My Family</h2> */}
        <div className="max-w-xl mx-auto">
          <Image
            src="/images/main1.jpg"
            alt="Main"
            width={600}
            height={400}
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Hero Section */}
      <div>
        <section className="section top-section">
          <div className="content-container content-theme-dark">
            <div className="content-inner">
              <div className="content-center">
                <h1>Rana's World</h1>
                <p>BEGAN</p>
                <p>
                  <span className="text-big">23</span> April
                  <span className="text-big">23</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bottom-section">
          <div className="content-container content-theme-light">
            <div className="content-inner">
              <div className="content-center">
                <h1>Rana's World</h1>
                <p>BEGAN</p>
                <p>
                  <span className="text-big">23</span> April
                  <span className="text-big">23</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Movie Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6">Rana is Born...</h2>
        <div className="w-full max-w-4xl mx-auto h-[500px]">
          <div className="relative w-full aspect-video">
            <iframe
              src="https://drive.google.com/file/d/1hq1wNUKeaTBU_mavWR5EEmdpkUc7LiA7/preview"
              className="w-full h-full rounded-lg shadow-lg"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="relative flex flex-col items-center justify-center bg-gray-100 py-16">
        <h2 className="text-4xl font-bold mb-6">Me and My Family</h2>
        <div className="relative w-[500px] h-[80vh] overflow-hidden rounded-lg ">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Carousel Image ${index + 1}`}
              layout="fill"
              objectFit="contain"
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="bg-gray-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-900 transition-all"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-900 transition-all"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Cute Clips Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6">My Cute Clips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {[
            "Face Therapy For ME",
            "First Clsss from Nana - Tongue",
            "Morning Class 1",
            "Morning Exercise",
            "Squareface Rana",
            "The Crying sausage",
          ].map((title, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 shadow-md hover:shadow-lg transition-all"
            >
              <video controls className="w-full rounded-md">
                <source
                  src={`https://ranajainwebsite.blob.core.windows.net/home/Rana%20Clips/${encodeSpaces(
                    title
                  )}.mp4`}
                  type="video/mp4"
                />
              </video>
              <p className="mt-2 text-black text-sm font-semibold">{title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6">Rana is One</h2>
        <div className="w-full max-w-4xl mx-auto h-[500px]">
          <div className="relative w-full aspect-video">
            <iframe
              src="https://drive.google.com/file/d/1i0mSM_Cw0rmL-TeZWA1tAeR6utpaN1bN/preview"
              className="w-full h-full rounded-lg shadow-lg"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Floating Home Button */}
      <div
        onClick={handleSignpostClick}
        className="fixed right-2 top-[50%] bottom-[50%] bg-red-600 text-white p-5 flex items-center rounded-lg cursor-pointer shadow-lg hover:bg-red-700 transition-all z-50"
      >
        <h2 className="text-lg font-semibold">Nana's Signpost for Rana</h2>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={handleLoginSuccess}
      />
    </>
  );
};

export default Home;
