import { useState } from "react";
import { Logo } from "../../components";

const TutorForm = () => {
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
    <div className="bg-[#0A3C4B] pb-8 px-4 md:px-0 min-h-screen">
      <div className="py-2 px-6">
        <Logo />
      </div>
      <div className="p-8 max-w-2xl mx-auto rounded-lg shadow-lg bg-[#0D4E5C]">
        <h2 className="text-2xl font-bold mb-4 text-teal-300 text-center">
          Sign up for CFP® Tutor 1:1 at $50 an hour
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              name="form-type"
              defaultValue="Tutor Form"
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
        <div className="mt-4 text-[#A8DADC] text-center">{result}</div>
      </div>
    </div>
  );
};
export default TutorForm;
