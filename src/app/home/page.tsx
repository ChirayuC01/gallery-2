"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { mediaList } from "@/lib/mediaList";
import { useRouter } from "next/navigation";

const Home = () => {
  const images = mediaList.images.Rana_Pics;
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = images.length;
  const router = useRouter();

  // Carousel Controls
  const handlePrev = () =>
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const handleNext = () =>
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

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

      {/* Movie Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6">Rana is Born...</h2>
        <div className="max-w-4xl mx-auto">
          <video controls className="w-full rounded-lg shadow-lg">
            <source src="/video/RANA MOVIE SHORT EDIT.mp4" type="video/mp4" />
          </video>
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
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6">My Cute Clips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {[
            "Face Therapy For ME",
            "First Clsss from Nana - Tongue",
            "Morning Class 1",
            "Morning Exercise",
            "Squareface Rana",
            "The Crying Sausage",
          ].map((title, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 shadow-md hover:shadow-lg transition-all"
            >
              <video controls className="w-full rounded-md">
                <source
                  src={`/video/Rana Clips/${title}.mp4`}
                  type="video/mp4"
                />
              </video>
              <p className="mt-2 text-black text-sm font-semibold">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Home Button */}
      {/* Floating Home Button */}
      <div
        onClick={() => router.push("/signpost")}
        className="fixed right-2 top-[50%] bottom-[50%] bg-red-600 text-white p-5 flex items-center rounded-lg cursor-pointer shadow-lg hover:bg-red-700 transition-all z-50"
      >
        <h2 className="text-lg font-semibold">Nana's Signpost for Rana</h2>
      </div>
    </>
  );
};

export default Home;
