import { Flashcard } from "../../components";
import { flashcards } from "./cards";

function Flashcards() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Flashcards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {flashcards.map((card, index) => (
          <Flashcard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

export default Flashcards;
