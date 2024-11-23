import { useState } from "react";

const Flashcards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {cards.map((card, index) => (
        <Flashcard key={index} frontText={card.front} backText={card.back} />
      ))}
    </div>
  );
};

const Flashcard = ({ frontText, backText }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-48 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full bg-teal text-white flex items-center justify-center rounded-md p-4 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {frontText}
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full bg-pink text-white flex items-center justify-center rounded-md p-4 transform rotate-y-180 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {backText}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
