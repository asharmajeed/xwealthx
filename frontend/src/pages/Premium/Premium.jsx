import { useState } from "react";

const Premium = () => {
  const pricingPlans = [
    { title: "2 Week Exam Cram", price: "$49", plan: "$49" },
    { title: "1 Month Exam Drills", price: "$99", plan: "$99" },
    { title: "2 Months Exam Drills", price: "$199 (Save 10%)", plan: "$199" },
    {
      title: "3 Months Focused Practice",
      price: "$250 (Save 15%)",
      plan: "$250",
    },
    {
      title: "5 Months Strategic Practice",
      price: "$350 (Save 25%)",
      plan: "$350",
    },
    { title: "6 Months Ultimate Prep", price: "$400 (Save 30%)", plan: "$400" },
  ];

  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState("");

  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");

  const handlePlanClick = async (plan) => {
    setShowForm(true);
    setPlan(plan);
    setResult("");
  };

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
      setResult("Form Submitted Successfully. You will get the email soon.");
      setEmail("");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {showForm ? (
        <>
          <h2 className="text-2xl font-bold text-blue-900 text-center pb-3">
            Upgrade to Premium?
          </h2>
          <div className="bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Request Invoice
              </h1>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                  <input
                    type="text"
                    name="form-type"
                    defaultValue="Premium Subscription"
                    hidden
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="plan"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Plan Name
                  </label>
                  <input
                    id="plan"
                    type="text"
                    name="plan"
                    placeholder="Enter plan name"
                    value={plan}
                    readOnly
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                >
                  Request Invoice
                </button>
              </form>
            </div>
          </div>
          <div className="mt-4 text-center">{result}</div>
          <h1
            onClick={() => setShowForm(false)}
            className="text-pink-500 underline text-center cursor-pointer pt-2"
          >
            Go back to Plans
          </h1>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            CFP® Exam Prep Membership Benefits
          </h2>
          <div className="space-y-4">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="p-4 border rounded flex justify-between items-center cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => handlePlanClick(plan.plan)}
              >
                <span className="text-gray-800">{plan.title}</span>
                <span className="text-teal font-semibold">{plan.price}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Premium;
