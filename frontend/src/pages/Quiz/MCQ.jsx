import { useEffect, useState } from "react";

const MCQ = ({
  options,
  selectedAnswer,
  correctAnswer,
  isSubmitted,
  onAnswerSelect,
}) => {
  const [strikeoutOptions, setStrikeoutOptions] = useState([]); // Store indices of struck-out options

  const handleStrikeOut = (index, e) => {
    e.preventDefault(); // Prevent the default context menu on right-click
    if (strikeoutOptions.includes(index)) {
      setStrikeoutOptions(strikeoutOptions.filter((opt) => opt !== index)); // Remove from strikeout
    } else {
      setStrikeoutOptions([...strikeoutOptions, index]); // Add to strikeout
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setStrikeoutOptions([])
    }
  }, [isSubmitted])
  

  return (
    <form id="options" className="mt-4">
      {options?.map((option, index) => (
        <label
          key={index}
          className={`block mb-2 p-2 border rounded-lg ${
            isSubmitted
              ? index === correctAnswer
                ? "bg-green-300"
                : index === selectedAnswer && selectedAnswer !== correctAnswer
                ? "bg-red-300"
                : ""
              : selectedAnswer === index
              ? "bg-blue-300"
              : ""
          } ${
            strikeoutOptions.includes(index) ? "line-through text-gray-600" : ""
          }`} // Apply strikeout class
          onContextMenu={(e) => handleStrikeOut(index, e)} // Right-click to strike out
        >
          <input
            type="radio"
            name="option"
            value={index}
            checked={selectedAnswer === index}
            onChange={() => onAnswerSelect(index)}
            disabled={isSubmitted} // Disable selection after submission
            className="mr-2"
          />
          <span>{option}</span>
        </label>
      ))}
    </form>
  );
};

export default MCQ;
