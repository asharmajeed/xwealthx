import { Logo } from "../../components";

const TutorForm = () => {
  return (
    <div className="bg-[#0A3C4B] pb-8 px-4 md:px-0 min-h-screen">
      <div className="py-2 px-6">
        <Logo />
      </div>
      <div className="p-8 max-w-2xl mx-auto rounded-lg shadow-lg bg-[#0D4E5C]">
        <h2 className="text-2xl font-bold mb-4 text-teal-300 text-center">
          Sign up for CFP® Tutor 1:1 at $50 an hour
        </h2>
        <form className="space-y-4">
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
      </div>
    </div>
  );
};
export default TutorForm;
