// HomePage.jsx
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Header from "./Header";
import { BASE_URL } from "../utils/constants";

const HomePage = () => {
  const { setUserInfo } = useUser();
  const navigate = useNavigate();

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
        navigate("/studentdashboard");
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
    <div className="p-8">
      <Header />
      <section className="flex flex-col gap-y-8 md:flex-row justify-between items-start lg:space-x-8 pt-4">
        {/* Left Side */}
        <div className="lg:w-1/2 bg-backgroundBlue p-6 rounded-md">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">
            Connect with a CFP® Professional for Expert Financial Planning
          </h1>
          <p className="text-gray-700 mb-4">
            Work with a certified expert to achieve your financial goals. From
            retirement planning to investment strategies, we provide
            personalized advice tailored to your needs.
          </p>
          <Link
            to="/consultation-form"
            className="bg-pink text-white py-2 px-4 rounded"
          >
            Book a Free 30 min Consultation
          </Link>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 bg-backgroundBlue p-6 rounded-md">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">
            Prepare for the CFP® Exam with Confidence
          </h1>
          <p className="text-gray-700 mb-4">
            Sign up for our comprehensive CFP® exam prep course. Master the
            fundamentals, tackle practice questions, and build the skills needed
            to ace the exam.
          </p>
          <button
            onClick={googleLogin}
            aria-label="Sign in with Google"
            className="bg-pink text-white py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
        </div>
      </section>

      {/* Additional Sections */}
      {/* <section className="mt-10"> */}
      {/* Exclusive Access */}
      {/* <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Exclusive Global Access to CFP Professionals
        </h2>
        <p className="text-gray-700">
          As a boutique firm, we pride ourselves on taking on a select number of
          clients...
        </p>
      </section> */}

      {/* Add additional content here */}
    </div>
  );
};

export default HomePage;
