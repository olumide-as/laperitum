export default function DisclaimerPage() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96 w-full flex items-center justify-center text-center mb-12"
        style={{ backgroundImage: "url(/assets/publicationbg.png)" }}
      >
        <h1 className="text-4xl font-bold text-[#2F3545]">Disclaimer</h1>
      </div>

      {/* Disclaimer Content */}
      <div className="px-8 md:px-16 lg:px-32">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#2F3545]">General Disclaimer</h2>
          <p>
            The information provided on this website is for general informational purposes only.
            While we strive to ensure that the information is accurate and up-to-date,
            we make no warranties or representations regarding the accuracy or completeness of the content.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">No Legal Advice</h2>
          <p>
            The content on this website does not constitute legal advice. Always consult with
            a qualified attorney for advice specific to your situation.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">External Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for
            the content, policies, or practices of any third-party websites.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">Limitation of Liability</h2>
          <p>
            We will not be held liable for any damages arising from the use or inability to
            use this website or the information contained herein.
          </p>

          <h2 className="text-2xl font-semibold text-[#2F3545]">Changes to the Disclaimer</h2>
          <p>
            We may update this disclaimer at any time without prior notice. Any changes will
            be posted on this page with an updated date.
          </p>
        </div>
      </div>
    </div>
  );
}