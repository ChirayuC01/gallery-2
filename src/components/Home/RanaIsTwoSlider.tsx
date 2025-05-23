import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import comingSoon from "../../../public/images/Rana is two.jpeg";
import { useRef } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function VideoCarousel() {
  const swiperRef = useRef<SwiperClass | null>(null);

  const videoLinks = [
    {
      url: "https://drive.google.com/file/d/1wHpSgiIN-cpmMmy8Mq6G5PWYZ0E9w6Mj/preview",
      title: "Rana @ 13 months (May 24)",
    },
    {
      url: "https://drive.google.com/file/d/1H7rIQ1qMPHJjaPOzWQpnE_WNGhaxDwFk/preview",
      title: "Rana @ 14 months (June 24)",
    },
    {
      url: "https://drive.google.com/file/d/11nGC43q3owlC1ZAn-0FOEBGedd-RQU9U/preview",
      title: "Rana @ 15 months (July 24)",
    },
    {
      url: "https://drive.google.com/file/d/1HfzCPBdPQAaj5NJllUXGRvbJI1QHr0n6/preview",
      title: "Rana @ 16 months (August 24)",
    },
    {
      url: "https://drive.google.com/file/d/1jBYmjUL2_e0sGd-t8fGxLVJQbIMHFHSI/preview",
      title: "Rana @ 17 months (September 24)",
    },
    {
      url: "https://drive.google.com/file/d/1K-WuySAcJJkBMg3iZvipabZPx3nZi1_O/preview",
      title: "Rana @ 18 months (October 24)",
    },
    {
      url: "https://drive.google.com/file/d/1tK_c1sZLSydhj8Ar2PSxg4Jo_8otnreK/preview",
      title: "Rana @ 19 months (November 24)",
    },
    {
      url: "https://drive.google.com/file/d/1xUebgm2wmFqLXLlGgxuFCf1y236DcxTX/preview",
      title: "Rana @ 20 months (December 24)",
    },
    {
      url: "https://drive.google.com/file/d/1bAEQe-pW9JeK7whTWOTYjmVmdzdqMIz_/preview",
      title: "Rana @ 21 months (January 25)",
    },
    {
      url: "https://drive.google.com/file/d/1s2WcW1oBspX09AvyPbVS2RZjNhtH9d_M/preview",
      title: "Rana @ 22 months (February 25)",
    },
    {
      url: "https://drive.google.com/file/d/148ZJIhY5ZoB5s0as9nVjrbAOPLgKXNU7/preview",
      title: "Rana @ 23 months (March 25)",
    },
    {
      url: "https://drive.google.com/file/d/1ocFVmhYqAZdE_VGELufTML3HAeTuWe2z/preview",
      title: "Rana @ 24 months (April 25)",
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-gray-100 text-center px-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 flex flex-col gap-5 py-2">
        <p className="text-5xl font-bold text-red-600">Rana is Two</p>
        Growing Up : Year ONE to TWO Monthly Clips
      </h2>

      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          initialSlide={1}
          breakpoints={{
            640: {
              slidesPerView: 3.2,
              centeredSlides: true,
              initialSlide: 1,
            },
          }}
          grabCursor={true}
          touchEventsTarget="container"
          cssMode={true}
          className="carousel-with-peek"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {videoLinks.map((video, index) => (
            <SwiperSlide key={index} className="pb-6">
              <div className="h-64 sm:h-72 md:h-96 rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src={video.url}
                  className="w-full h-full"
                  allow="autoplay"
                  allowFullScreen={true}
                  title={video.title}
                ></iframe>
              </div>
              <p className="mt-2 text-sm md:text-base font-medium text-gray-700">
                {video.title}
              </p>
            </SwiperSlide>
          ))}

          {/* Coming Soon Slide */}
          <SwiperSlide className="pb-6">
            <div className="h-64 sm:h-72 md:h-96 flex items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={comingSoon}
                alt="Coming Soon"
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-2 text-sm md:text-base font-medium text-gray-700">
              Coming Soon...
            </p>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-gray-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow-md hover:bg-gray-900 transition-all cursor-pointer"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-gray-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow-md hover:bg-gray-900 transition-all cursor-pointer"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .carousel-with-peek {
          padding-bottom: 10px;
          padding-left: 5px;
          padding-right: 5px;
          overflow: visible !important;
        }

        /* Visual indicator of more content */
        .swiper-slide {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        /* Partial slides should be slightly dimmed to focus on full slides */
        .swiper-slide-visible:not(.swiper-slide-active):not(
            .swiper-slide-next
          ):not(.swiper-slide-prev) {
          opacity: 0.7;
        }

        /* Add subtle scaling effect to active slides */
        .swiper-slide-active {
          transform: scale(1.02);
          z-index: 1;
        }

        @media (max-width: 639px) {
          /* On mobile, only dim slides beyond active and immediate neighbors */
          .swiper-slide-visible:not(.swiper-slide-active):not(
              .swiper-slide-next
            ):not(.swiper-slide-prev) {
            opacity: 0.7;
          }
        }

        /* Hide the default Swiper navigation */
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }
      `}</style>
    </section>
  );
}
