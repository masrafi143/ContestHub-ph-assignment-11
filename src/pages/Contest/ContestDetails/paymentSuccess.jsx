import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router'; // Link যোগ করলাম
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true); // loading state যোগ করলাম
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
            contestName: res.data.contestName, // backend থেকে contest name পাঠাও (optional)
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600">
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Simple Confetti Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="confetti"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="card bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-lg">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Payment Successful! 🎉
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            Congratulations! You have successfully registered for <strong>{paymentInfo.contestName}</strong>.
          </p>

          {/* Payment Details */}
          <div className="bg-gray-100 rounded-2xl p-6 mb-8 space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Transaction ID:</span> 
              <span className="ml-2 text-blue-600">{paymentInfo.transactionId}</span>
            </p>
            {/* {paymentInfo.trackingId && ( */}
              <p className="text-lg">
                <span className="font-semibold">Contest Registration ID:</span> 
                <span className="ml-2 text-blue-600">{paymentInfo.trackingId}</span>
              </p>
            {/* )} */}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard/my-participated"
              className="btn btn-primary btn-lg rounded-full px-8 shadow-lg hover:shadow-xl transition"
            >
              View My Contests
            </Link>
            <Link
              to="/"
              className="btn btn-ghost btn-lg rounded-full px-8 border-2 border-white"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-10 text-gray-600">
            Thank you for participating! Good luck! 🍀
          </p>
        </div>
      </div>

      {/* Optional CSS for confetti (Tailwind-এর সাথে simple animation) */}
      <style jsx>{`
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #f00;
          animation: confetti-fall 3s linear infinite;
        }
        .confetti:nth-child(1) { left: 10%; animation-delay: 0s; background: #ff0; }
        .confetti:nth-child(2) { left: 20%; animation-delay: 0.5s; background: #0f0; }
        .confetti:nth-child(3) { left: 30%; animation-delay: 1s; background: #00f; }
        .confetti:nth-child(4) { left: 40%; animation-delay: 1.5s; background: #ff0; }
        .confetti:nth-child(5) { left: 50%; animation-delay: 0.2s; background: #f0f; }
        .confetti:nth-child(6) { left: 60%; animation-delay: 1.2s; background: #0ff; }
        .confetti:nth-child(7) { left: 70%; animation-delay: 0.8s; background: #ff0; }
        .confetti:nth-child(8) { left: 80%; animation-delay: 0.4s; background: #0f0; }
        .confetti:nth-child(9) { left: 90%; animation-delay: 1.8s; background: #00f; }

        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;