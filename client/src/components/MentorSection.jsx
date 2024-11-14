// MentorSection.jsx
import React from "react";

const MentorSection = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "10ffb4de-76de-4094-96a0-b8d934a04748");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <h2 className="text-2xl font-bold text-teal mb-4">
          Are you a CFP® Professional? Become a Mentor, Shape the Future!
        </h2>
        <p className="text-gray-700 mb-4">
          Are you a CFP® Professional? Join our mentorship program to inspire
          and guide the next generation of financial planners. Share your
          knowledge, expand your network, and give back to the profession you
          love.
        </p>

        {/* Why Mentor Section */}
        <h3 className="text-xl font-semibold text-teal-dark mb-2">
          Why Mentor?
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>
            <strong>Empower Future Leaders</strong> - Help aspiring CFP®
            professionals navigate their career paths.
          </li>
          <li>
            <strong>Grow Professionally</strong> - Gain new perspectives while
            sharing your own.
          </li>
          <li>
            <strong>Flexible Commitment</strong> - Mentor virtually, in person,
            or both.
          </li>
        </ul>

        <p className="text-gray-700 font-semibold mb-6">
          Ready to make an impact? Become a mentor today!
        </p>

        {/* Mentor Sign-up Form */}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="fullName"
            >
              Your Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-light"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-light"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition duration-200"
          >
            Submit
          </button>
        </form>
        <span>{result}</span>
      </div>
    </section>
  );
};

export default MentorSection;
