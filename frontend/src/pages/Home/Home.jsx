import { MentorSection, Logo } from "../../components";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { BASE_URL } from "../../utils/constants";

function Home() {
  const { setUserInfo } = useUser();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const response = await fetch(
          `${BASE_URL}/api/auth/google?code=${authResult.code}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to authenticate with Google");
        }

        const result = await response.json();

        const { _id, name, email, image, token } = result;

        const userObj = { _id, name, email, image, token };
        setUserInfo(userObj);

        // Use secure storage for sensitive information.
        localStorage.setItem("user-info", JSON.stringify(userObj));
      } else {
        console.error("No authorization code received", authResult);
        throw new Error("No authorization code received");
      }
    } catch (error) {
      console.error("Error during Google login", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => console.error("Google Login Error:", error),
    flow: "auth-code",
  });

  return (
    <div className="min-h-screen bg-[#0A3C4B]">
      <div className="md:p-4">
        <div className="p-4 md:p-8">
          <Logo />
          <section className="flex flex-col gap-y-8 md:flex-row md:gap-x-6 justify-between items-start pt-4">
            {/* Left Side */}
            <div className="flex-1 bg-[#0D4E5C] p-6 rounded-md shadow-md">
              <h1 className="text-xl md:text-2xl font-bold text-teal-300 mb-4">
                Connect with a CFP® Professional for Expert Financial Planning
              </h1>
              <p className="text-teal-100 mb-4">
                Work with a certified expert to achieve your financial goals.
                From retirement planning to investment strategies, we provide
                personalized advice tailored to your needs.
              </p>
              <Link
                to="/consultation-form"
                target="_blank"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
              >
                Book a Free 30 min Consultation
              </Link>
              {/* Image */}
              <div className="mt-6">
                <img
                  src="/financial-planning.avif"
                  alt="Financial Planning"
                  className="rounded-md shadow-md w-full h-[15rem] md:h-[23rem] object-cover"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 bg-[#0D4E5C] p-6 rounded-md shadow-md">
              <h1 className="text-xl md:text-2xl font-bold text-teal-300 mb-4">
                Prepare for the CFP® Exam with Confidence
              </h1>
              <p className="text-teal-100 mb-4">
                Sign up for our comprehensive CFP® exam prep course. Master the
                fundamentals, tackle practice questions, and build the skills
                needed to ace the exam.
              </p>
              <button
                onClick={googleLogin}
                aria-label="Sign in with Google"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
              >
                Sign in with Google
              </button>
              {/* Image */}
              <div className="mt-6">
                <img
                  src="/exam-preparation.jpg"
                  alt="Exam Preparation"
                  className="rounded-md shadow-md w-full h-[15rem] md:h-[23rem] object-cover"
                />
              </div>
            </div>
          </section>
        </div>
        <section className="py-12" style={{ backgroundColor: "#0A3C4B" }}>
          <div className="container mx-auto px-4">
            {/* Exclusive Global Access Section */}
            <div className="grid gap-8 lg:grid-cols-2 mb-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4">
                  Exclusive Global Access to CFP® Professionals
                </h2>
                <p className="text-teal-100">
                  As a boutique firm, we pride ourselves on taking on a select
                  number of clients, ensuring each one receives the highest
                  level of personalized attention. We connect you with CFP®
                  professionals worldwide, bound by fiduciary duty, to address
                  your unique needs and help you maximize your goals.
                </p>
              </div>
              <div>
                <img
                  src="/cfp-professionals.jpg"
                  alt="Global Access to CFP® Professionals"
                  className="rounded-lg shadow-lg w-full h-[15rem] md:h-[23rem] object-cover"
                />
              </div>
            </div>

            {/* Goals-Based Investing Section */}
            <div className="grid gap-8 lg:grid-cols-2 mb-8 items-center">
              <div className="order-last lg:order-first">
                <img
                  src="/goal-based-investing.jpg"
                  alt="Goals-Based Investing"
                  className="rounded-lg shadow-lg w-full  h-[15rem] md:h-[23rem] object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4">
                  Goals-Based Investing and Personalized Advice
                </h2>
                <p className="text-teal-100">
                  We work closely with you to uncover your priorities, passions,
                  and pain points. From there, we design bespoke strategies that
                  seamlessly align your financial goals with tailored wealth
                  management solutions, guiding you on a path to success.
                </p>
              </div>
            </div>

            {/* Exclusive Wealth Structuring Section */}
            <div className="grid gap-8 lg:grid-cols-2 mb-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4">
                  Exclusive Wealth Structuring
                </h2>
                <p className="text-teal-100">
                  Our team of professionals is dedicated to ensuring your
                  family's well-being and securing your legacy. No matter where
                  you are globally, we’ll refine and optimize your wealth plan,
                  giving you greater confidence in your family’s future. With
                  our tailored approach, you'll feel like a member of an
                  exclusive club.
                </p>
              </div>
              <div>
                <img
                  src="/exclusive-wealth-management.avif"
                  alt="Wealth Structuring"
                  className="rounded-lg shadow-lg w-full  h-[15rem] md:h-[23rem] object-cover"
                />
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-[#0D4E5C] rounded-lg shadow-md p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                WHY CHOOSE US?
              </h2>
              <ul className="list-disc list-inside space-y-2 text-[#D1E7EA]">
                <li>5,500+ MCQs for top-notch CFP® prep!</li>
                <li>Targeted Focus Drills for every subject!</li>
                <li>85 Questions in 3 Hours Drill—Get exam-ready!</li>
                <li>Boost retention with Flashcard Drills!</li>
                <li>Recap and Recall to tackle weak spots!</li>
                <li>Master concepts with real-world Case Studies!</li>
                <li>
                  Access a dedicated database for Calculator-based Questions!
                </li>
                <li>Connect with a CFP® Mentor today!</li>
                <li>Find your Study Buddy and Stay Focused!</li>
              </ul>
            </div>
          </div>
        </section>
        <MentorSection />
      </div>
    </div>
  );
}

export default Home;
