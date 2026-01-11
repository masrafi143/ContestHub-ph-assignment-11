import React from "react";
import useAuth from "../../hooks/useAuth";

const PrivacyPolicy = () => {
  const { dark } = useAuth();

  const container = dark
    ? "bg-gradient-to-br from-[#0b132b] via-[#1a1f3d] to-[#2d1b69] text-gray-200"
    : "bg-gray-50 text-gray-800";

  const card = dark
    ? "bg-white/10 border border-white/20 backdrop-blur-lg"
    : "bg-white border border-gray-200 shadow";

  const heading = dark ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen py-20 px-4 ${container}`}>
      <div className={`max-w-5xl mx-auto rounded-2xl p-8 ${card}`}>
        <h1 className={`text-4xl font-bold mb-6 ${heading}`}>
          Privacy Policy
        </h1>
        <p className="text-sm mb-10 text-gray-400">
          Last updated: January 2026
        </p>

        {/* 1 */}
        <Section title="1. Introduction">
          We respect your privacy and are committed to protecting your personal
          data. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our platform.
        </Section>

        {/* 2 */}
        <Section title="2. Information We Collect">
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal identification information (name, email address).</li>
            <li>Account credentials and authentication data.</li>
            <li>Usage data such as pages visited and actions taken.</li>
            <li>Device and browser information.</li>
          </ul>
        </Section>

        {/* 3 */}
        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our services.</li>
            <li>To personalize your experience.</li>
            <li>To improve platform performance and features.</li>
            <li>To communicate with you regarding updates or support.</li>
          </ul>
        </Section>

        {/* 4 */}
        <Section title="4. Data Sharing and Disclosure">
          We do not sell your personal information. We may share your data with
          trusted service providers or if required by law or legal process.
        </Section>

        {/* 5 */}
        <Section title="5. Data Security">
          We implement industry-standard security measures to protect your data
          against unauthorized access, alteration, or destruction.
        </Section>

        {/* 6 */}
        <Section title="6. Cookies and Tracking Technologies">
          We use cookies and similar technologies to enhance user experience,
          analyze trends, and administer the website.
        </Section>

        {/* 7 */}
        <Section title="7. Your Rights">
          You have the right to access, correct, or delete your personal data.
          You may also object to certain processing activities.
        </Section>

        {/* 8 */}
        <Section title="8. Children's Privacy">
          Our platform is not intended for children under the age of 13. We do
          not knowingly collect personal information from children.
        </Section>

        {/* 9 */}
        <Section title="9. Changes to This Policy">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page.
        </Section>

        {/* 10 */}
        <Section title="10. Contact Us">
          If you have any questions about this Privacy Policy, please contact us
          through our support channels.
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-3 text-indigo-400">{title}</h2>
    <div className="leading-relaxed text-sm md:text-base">{children}</div>
  </div>
);

export default PrivacyPolicy;
