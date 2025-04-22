import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import comingSoon from '../../../public/images/Rana is two.jpeg';

export default function VideoCarousel() {
  const videoLinks = [
    {
      url: "https://drive.google.com/file/d/1VO5JszOD0jrkYD85zA1QSW69sjNr6k0D/preview",
      title: "Rana @ 13 months (May 24)"
    },
    {
      url: "https://drive.google.com/file/d/1XLmj3EG20JQS39sC2F7fAWibxfd12Pze/preview",
      title: "Rana @ 14 months (June 24)"
    },
    {
      url: "https://drive.google.com/file/d/1yTOn87kIpiENrBjy8Y_1Ya9smMrMyPdH/preview",
      title: "Rana @ 15 months (July 24)"
    },
    {
      url: "https://drive.google.com/file/d/1aci1xOCJ2U_CDwnMyfN3xd0F9IpYR2-l/preview",
      title: "Rana @ 16 months (August 24)"
    },
    {
      url: "https://drive.google.com/file/d/1SiUqKyYg2-w37NXSaqm6upKqRmaCw2sX/preview",
      title: "Rana @ 17 months (September 24)"
    },
    {
      url: "https://drive.google.com/file/d/1L6UFW4RVwfsHpgtFR9gFel3IKJHMXIIX/preview",
      title: "Rana @ 18 months (October 24)"
    },
    {
      url: "https://drive.google.com/file/d/1DpgTSKckvYSszyj0JiQMQ8p0cKeNC5Af/preview",
      title: "Rana @ 19 months (November 24)"
    },
    {
      url: "https://drive.google.com/file/d/1AVCzOq1hlJ2hLxvCeggtT5N5q3Foqls5/preview",
      title: "Rana @ 20 months (December 24)"
    },
    {
      url: "https://drive.google.com/file/d/1Q2yC8bvtZxW18q7oKr2knBtVaKD2MbJq/preview",
      title: "Rana @ 21 months (January 25)"
    },
    {
      url: "https://drive.google.com/file/d/1rsBRxGBrDm--b240ppKo3eAuneqxg5yq/preview",
      title: "Rana @ 22 months (February 25)"
    },
    {
      url: "https://drive.google.com/file/d/1SsE5nOzH6OLmgdak9keEOpZ4ZwVx39Hx/preview",
      title: "Rana @ 23 months (March 25)"
    },
    {
      url: "https://drive.google.com/file/d/1Wr3tmbSuVztXXiYH0ES_HwSLOppQKsXg/preview",
      title: "Rana @ 24 months (April 25)"
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-gray-100 text-center px-4">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
        Rana is two
      </h2>

      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 3.2 }, // 3 full slides + peek at 4th on larger screens
          }}
          grabCursor={true}
          initialSlide={0}
          touchEventsTarget="container"
          cssMode={true}
          className="carousel-with-peek"
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
          transition: opacity 0.3s ease;
        }
        
        /* Partial slide should be slightly dimmed to focus on full slides */
        .swiper-slide-visible:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-next + .swiper-slide) {
          opacity: 0.7;
        }
        
        @media (max-width: 639px) {
          /* On mobile, only dim slides beyond the 2nd slide */
          .swiper-slide-visible:not(.swiper-slide-active):not(.swiper-slide-next) {
            opacity: 0.7;
          }
        }
        
        /* Improve navigation buttons visibility */
        .swiper-button-next,
        .swiper-button-prev {
          color: #334155;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        
        /* Hide navigation on mobile */
        @media (max-width: 639px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}