import { useState } from "react";
import { Logo } from "../";

const ConsultationForm = () => {
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
          Book a 30-Minute Consultation
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              name="form-type"
              defaultValue="Consultation Form"
              hidden
            />
          </div>

          <div>
            <label
              className="block text-[#D1E7EA] font-medium mb-2"
              htmlFor="advice"
            >
              What type of financial advice do you need?
            </label>
            <select
              id="advice"
              name="What type of financial advice do you need?"
              className="w-full p-3 border border-[#A8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8DADC] bg-[#073B46] text-white placeholder-[#B0D2D6]"
            >
              <option>Buying a car</option>
              <option>Buying a house</option>
              <option>Retirement</option>
              <option>A bit of everything</option>
            </select>
          </div>
          <div>
            <label
              className="block text-[#D1E7EA] font-medium mb-2"
              htmlFor="career"
            >
              What stage of your career are you in?
            </label>
            <select
              id="career"
              name="What stage of your career are you in?"
              className="w-full p-3 border border-[#A8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8DADC] bg-[#073B46] text-white placeholder-[#B0D2D6]"
            >
              <option>Early</option>
              <option>Late</option>
              <option>Mid</option>
              <option>I have no idea</option>
            </select>
          </div>
          <div>
            <label
              className="block text-[#D1E7EA] font-medium mb-2"
              htmlFor="scope"
            >
              What is the scope of the services you need?
            </label>
            <input
              type="text"
              id="scope"
              name="What is the scope of the services you need?"
              className="w-full p-3 border border-[#A8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8DADC] bg-[#073B46] text-white placeholder-[#B0D2D6]"
            />
          </div>
          <div>
            <label
              className="block text-[#D1E7EA] font-medium mb-2"
              htmlFor="when"
            >
              When do you need this completed by?
            </label>
            <input
              type="text"
              id="when"
              name="When do you need this completed by?"
              className="w-full p-3 border border-[#A8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8DADC] bg-[#073B46] text-white placeholder-[#B0D2D6]"
            />
          </div>
          <div>
            <label
              className="block text-[#D1E7EA] font-medium mb-2"
              htmlFor="advisor"
            >
              How would you like to work with the financial advisor?
            </label>
            <select
              id="advisor"
              name="How would you like to work with the financial advisor?"
              className="w-full p-3 border border-[#A8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8DADC] bg-[#073B46] text-white placeholder-[#B0D2D6]"
            >
              <option>Virtual</option>
              <option>In person</option>
            </select>
          </div>
          <div>
            <label
              className="block text-[#D1E7EA] font-medium mb-2"
              htmlFor="other"
            >
              Any other details about your financial advisor needs?
            </label>
            <input
              type="text"
              id="other"
              name="Any other details about your financial advisor needs?"
              className="w-full p-3 border border-[#A8DADC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8DADC] bg-[#073B46] text-white placeholder-[#B0D2D6]"
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

export default ConsultationForm;
