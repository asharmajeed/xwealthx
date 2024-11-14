// MentorForm.jsx
import React from 'react';

const MentorForm = () => {
  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-teal">Become a Mentor</h2>
      <form className="space-y-4">
        <label className="block">
          Full Name:
          <input type="text" className="w-full p-2 border rounded mt-2" />
        </label>
        <label className="block">
          Email:
          <input type="email" className="w-full p-2 border rounded mt-2" />
        </label>
        <button type="submit" className="bg-pink text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MentorForm;
