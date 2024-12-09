import { useState } from "react";

const MentorSection = () => {
  const [result, setResult] = useState("");

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
    <section className="pb-12 bg-[#0A3C4B]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg bg-[#0D4E5C]">
          {/* Header */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Are you a CFP® Professional? Become a Mentor, Shape the Future!
          </h2>
          <p className="text-[#D1E7EA] mb-6 text-center leading-relaxed">
            Join our mentorship program to inspire and guide the next generation
            of financial planners. Share your knowledge, expand your network,
            and give back to the profession you love.
          </p>

          {/* Why Mentor Section */}
          <h3 className="text-xl md:text-2xl font-semibold text-[#A8DADC] mb-4">
            Why Mentor?
          </h3>
          <ul className="list-disc pl-6 text-[#D1E7EA] space-y-4 mb-6">
            <li>
              <strong className="text-white">Empower Future Leaders:</strong>{" "}
              Help aspiring CFP® professionals navigate their career paths.
            </li>
            <li>
              <strong className="text-white">Grow Professionally:</strong> Gain
              new perspectives while sharing your own.
            </li>
            <li>
              <strong className="text-white">Flexible Commitment:</strong>{" "}
              Mentor virtually, in person, or both.
            </li>
          </ul>

          <p className="text-[#D1E7EA] font-semibold mb-6 text-center">
            Ready to make an impact? Become a mentor today!
          </p>

          {/* Mentor Sign-up Form */}
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                name="form-type"
                defaultValue="Mentor Form"
                hidden
              />
            </div>

            <div>
              <label
                className="block text-[#D1E7EA] font-medium mb-2"
                htmlFor="fullName"
              >
                Your Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="name"
                className="w-full p-3 border border-[#A8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8DADC] bg-[#073B46] text-white placeholder-[#B0D2D6]"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label
                className="block text-[#D1E7EA] font-medium mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-[#A8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8DADC] bg-[#073B46] text-white placeholder-[#B0D2D6]"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#A8DADC] text-[#0A3C4B] font-semibold rounded-lg hover:bg-[#86C2C9] transition duration-200"
            >
              Submit
            </button>
          </form>

          {/* Result Feedback */}
          <div className="mt-4 text-[#A8DADC] text-center">{result}</div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
