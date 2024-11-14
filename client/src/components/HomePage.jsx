// HomePage.jsx
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Header from "./Header";

const HomePage = () => {
  const { setUserInfo } = useUser();
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token, image };
        setUserInfo(obj)
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/studentdashboard");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <div className="p-8">
      <Header />
      <section className="flex justify-between items-start space-x-8 pt-4">
        {/* Left Side */}
        <div className="w-1/2 bg-backgroundBlue p-6 rounded-md">
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
        <div className="w-1/2 bg-backgroundBlue p-6 rounded-md">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">
            Prepare for the CFP® Exam with Confidence
          </h1>
          <p className="text-gray-700 mb-4">
            Sign up for our comprehensive CFP® exam prep course. Master the
            fundamentals, tackle practice questions, and build the skills needed
            to ace the exam.
          </p>
          <button onClick={googleLogin} className="bg-pink text-white py-2 px-4 rounded">
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
