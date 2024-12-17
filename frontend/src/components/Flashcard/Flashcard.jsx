import { useState } from "react";

const Flashcard = ({ card }) => {
  const [currentSide, setCurrentSide] = useState(0);

  const sides = [card.front, card.back, card.tips].filter(Boolean);

  const handleNext = () => {
    setCurrentSide((prev) => (prev + 1) % sides.length);
  };

  const handlePrev = () => {
    setCurrentSide((prev) => (prev - 1 + sides.length) % sides.length);
  };

  return (
    <div className="max-w-md bg-white border-2 border-blue-300 rounded-lg shadow-lg overflow-hidden flex flex-col h-full min-h-[250px]">
      {/* Card Content */}
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <pre className="text-lg font-sans text-wrap font-medium text-gray-700">
          {sides[currentSide]}
        </pre>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-5 items-center p-3 bg-blue-200">
        <button
          onClick={handlePrev}
          className="text-blue-600 hover:text-blue-800 text-2xl transition"
          aria-label="Previous"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="27px"
            width="27px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* <p className="text-gray-600">{`${currentSide + 1} / ${sides.length}`}</p> */}

        <button
          onClick={handleNext}
          className="text-blue-600 hover:text-blue-800 text-2xl transition"
          aria-label="Next"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="27px"
            width="27px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
