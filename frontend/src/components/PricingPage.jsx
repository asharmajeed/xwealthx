// PricingPage.jsx
import React from 'react';

const PricingPage = () => {
  const pricingPlans = [
    { title: "2 Week Exam Cram", price: "$49" },
    { title: "1 Month Exam Drills", price: "$99" },
    { title: "2 Months Exam Drills", price: "$199 (Save 10%)" },
    { title: "3 Months Focused Practice", price: "$250 (Save 15%)" },
    { title: "5 Months Strategic Practice", price: "$350 (Save 25%)" },
    { title: "6 Months Ultimate Prep", price: "$400 (Save 30%)" },
  ];

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">CFP® Exam Prep Membership Benefits</h2>
      <div className="space-y-4">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="p-4 border rounded flex justify-between items-center">
            <span className="text-gray-800">{plan.title}</span>
            <span className="text-teal font-semibold">{plan.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
