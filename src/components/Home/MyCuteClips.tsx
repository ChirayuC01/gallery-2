import { useEffect, useRef, useState } from "react";

const MyCuteClips = () => {
  const videoTitles = [
    "Face Therapy For ME",
    "First Clsss from Nana - Tongue",
    "Morning Class 1",
    "Morning Exercise",
    "Squareface Rana",
    "The Crying sausage",
  ];

  const encodeSpaces = (str: string) => encodeURIComponent(str);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  useEffect(() => {
    // Auto-adjust to the start
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const scrollToVideo = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount =
      direction === "left"
        ? scrollRef.current.scrollLeft - containerWidth / 2
        : scrollRef.current.scrollLeft + containerWidth / 2;

    scrollRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center text-gray-800">
          My Cute Clips
        </h2>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => scrollToVideo("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white p-2 rounded-full shadow-lg text-gray-700 hover:bg-gray-100 hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => scrollToVideo("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white p-2 rounded-full shadow-lg text-gray-700 hover:bg-gray-100 hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Draggable container */}
          <div
            className="cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={stopDragging}
          >
            <div
              ref={scrollRef}
              className={`flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory gap-4 md:gap-6 pb-4 ${
                isDragging ? "transition-none" : "transition-all"
              }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videoTitles.map((title, idx) => (
                <div
                  key={idx}
                  className="snap-start flex-shrink-0 w-[50%] sm:w-[38%] md:w-[28%] lg:w-[15%] transition-all duration-300"
                >
                  <div
                    className={`bg-white border rounded-xl shadow-md hover:shadow-xl h-full flex flex-col justify-between overflow-hidden transform transition-all duration-300 ${
                      activeVideo === idx
                        ? "ring-4 ring-blue-400 scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                  >
                    <div className="relative pt-2 px-2">
                      <video
                        controls
                        className="w-full rounded-lg object-cover"
                        onPlay={() => setActiveVideo(idx)}
                        onPause={() => setActiveVideo(null)}
                      >
                        <source
                          src={`https://ranajainwebsite.blob.core.windows.net/home/Rana%20Clips/${encodeSpaces(
                            title
                          )}.mp4`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <div className="p-3 bg-gradient-to-t from-gray-50 to-white">
                      <p className="text-gray-800 text-sm md:text-base font-medium text-center">
                        {title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 gap-1">
            {Array.from({ length: Math.min(5, videoTitles.length) }).map(
              (_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCuteClips;
