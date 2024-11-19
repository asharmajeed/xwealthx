// ConsultationForm.jsx
import React from "react";
import Header from "./Header";

const ConsultationForm = () => {
  return (
    <>
      <Header />
      <div className="p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-teal text-center">
          Book a 30-Minute Consultation
        </h2>
        <form className="space-y-4">
          <label className="block text-white">
            What type of financial advice do you need?
            <select className="w-full p-2 border rounded mt-2 text-black">
              <option>Buying a car</option>
              <option>Buying a house</option>
              <option>Retirement</option>
              <option>A bit of everything</option>
            </select>
          </label>
          <label className="block text-white">
            What stage of your career are you in?
            <select className="w-full p-2 border rounded mt-2 text-black">
              <option>Early</option>
              <option>Late</option>
              <option>Mid</option>
              <option>I have no idea</option>
            </select>
          </label>
          <label className="block text-white">
            What is the scope of the services you need?
            <input
              type="text"
              className="w-full p-2 border rounded mt-2 text-black"
            />
          </label>
          <label className="block text-white">
            When do you need this completed by?
            <input
              type="text"
              className="w-full p-2 border rounded mt-2 text-black"
            />
          </label>
          <label className="block text-white">
            How would you like to work with the financial advisor?
            <select className="w-full p-2 border rounded mt-2 text-black">
              <option>Virtual</option>
              <option>In person</option>
            </select>
          </label>
          <label className="block text-white">
            Any other details about your financial advisor needs?
            <input
              type="text"
              className="w-full p-2 border rounded mt-2 text-black"
            />
          </label>
          {/* Add other form fields similarly */}
          <button
            type="submit"
            className="bg-pink text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ConsultationForm;
