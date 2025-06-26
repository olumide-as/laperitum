'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96 w-full flex items-center justify-center text-center mb-12"
        style={{ backgroundImage: "url(/assets/publicationbg.jpg)" }}
      >
        <h1 className="text-4xl font-bold text-[#2F3545]">Privacy Policy</h1>
      </div>

      {/* Privacy Policy Content */}
      <div className="px-8 md:px-16 lg:px-32">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#2F3545]">Introduction</h2>
          <p>
            At La Peritum, we are committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and protect your personal information
            when you use our services.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone
            number, and other details when you interact with our website or use our
            services.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">How We Use Your Information</h2>
          <p>
            The information we collect is used solely for providing our services, improving
            user experience, and communicating with you. We do not share your personal
            information with third parties unless required by law.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">Data Security</h2>
          <p>
            We take the security of your data seriously and have implemented appropriate
            security measures to protect your personal information from unauthorized
            access or alteration.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information.
            To exercise these rights, contact us at{' '}
            <a
              href="mailto:info@laperitum.com"
              className="text-[#C1A17C] underline hover:text-[#a6875e]"
            >
              info@laperitum.com
            </a>.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted
            on this page with an updated date.
          </p>
        </div>
      </div>
    </div>
  );
}