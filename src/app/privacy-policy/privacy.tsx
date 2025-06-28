'use client';
    const lastModified = "14 November 2024"; // You can update this dynamically if needed


const privacySections = [
  {
    title: "Introduction",
    content: `
      At La Peritum Law Practice, protecting your privacy is a fundamental part of our commitment to ethical legal service. This Privacy Policy outlines how we collect, use, store, and protect your personal information in compliance with applicable Nigerian laws, including the Nigeria Data Protection Regulation (NDPR).
      We encourage you to read this policy carefully to understand your rights and our practices.
    `,
  },
  {
    title: "Information We Collect",
    content: `
      We collect various types of personal data, including but not limited to:
      - Personal identifiers such as your full name, date of birth, gender.
      - Contact details such as email address, phone number, and postal address.
      - Identification documents where legally required (e.g., means of identification).
      - Information related to your legal matters, case files, and correspondence.
      - Financial information strictly necessary for billing or payment purposes.
      This information is collected directly from you or through your authorized representatives.
    `,
  },
  {
    title: "Purpose of Data Collection",
    content: `
      We use your information solely to:
      - Provide and manage our legal services tailored to your specific needs.
      - Communicate updates and legal advice relevant to your cases.
      - Comply with legal and regulatory obligations under Nigerian law.
      - Manage billing, invoicing, and financial record-keeping accurately.
      - Protect our legal rights and interests as necessary.
      We do not use your data for marketing unless you have expressly consented.
    `,
  },
  {
    title: "Data Storage and Security",
    content: `
      La Peritum Law Practice employs industry-standard security protocols to safeguard your personal information.
      This includes encryption, secure servers, access controls, and regular security audits.
      Access to your data is limited strictly to authorized personnel bound by confidentiality agreements.
      We retain your data only as long as necessary for the purposes described and in compliance with Nigerian retention laws.
    `,
  },
  {
    title: "Data Sharing and Disclosure",
    content: `
      We do not sell or rent your personal data to third parties.
      Disclosure of your information is only made when:
      - Required by law or regulatory authorities in Nigeria.
      - Necessary to protect your legal rights or those of La Peritum Law Practice.
      - With your explicit consent for third parties involved in your legal matters (e.g., courts, expert witnesses).
      We ensure that any third party receiving your data maintains appropriate confidentiality and security standards.
    `,
  },
  {
    title: "Your Rights Under Nigerian Law",
    content: (
      <>
        As a data subject, you have the right to:
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Access your personal data held by us.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion or restriction of processing under certain conditions.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Object to processing of your data for legitimate interests.</li>
          <li>Request data portability to another service provider.</li>
        </ul>
        To exercise these rights, please contact us at{' '}
        <a
          href="mailto:info@laperitum.com"
          className="text-[#C1A17C] underline hover:text-[#a6875e]"
        >
          info@laperitum.com
        </a>.
      </>
    ),
  },
  {
    title: "Cookies and Tracking Technologies",
    content: `
      Our website may use cookies and similar tracking technologies to enhance your browsing experience.
      Cookies help us remember your preferences and collect analytics data.
      You can manage your cookie preferences via your browser settings.
      We do not use cookies to collect personally identifiable information without your consent.
    `,
  },
  {
    title: "Data Breach Notification",
    content: `
      In the unlikely event of a data breach affecting your personal information, La Peritum Law Practice will notify you and relevant Nigerian authorities promptly as required by law.
      We will take all necessary actions to mitigate any harm and prevent future occurrences.
    `,
  },
  {
    title: "International Data Transfers",
    content: `
      Where applicable, we ensure any transfer of your personal data outside Nigeria complies with NDPR and other relevant privacy frameworks.
      Appropriate safeguards such as data transfer agreements and encryption are implemented.
    `,
  },
  {
    title: "Changes to This Privacy Policy",
    content: `
      La Peritum Law Practice may update this Privacy Policy occasionally to reflect changes in our practices or legal requirements.
      All updates will be posted on this page with a revised 'Last Modified' date.
      We encourage you to review this policy periodically.
    `,
  },

];

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96 w-full flex items-center justify-center text-center mb-12"
        style={{ backgroundImage: "url(/assets/publicationbg.png)" }}
      >
        <h1 className="text-4xl font-bold text-[#2F3545]">Privacy Policy</h1>
      </div>

      {/* Privacy Policy Content */}
      <div className="px-8 md:px-16 lg:px-32 space-y-8">
        {privacySections.map(({ title, content }) => (
          <section key={title}>
            <h2 className="text-2xl font-semibold text-[#2F3545] mb-3">{title}</h2>
            {typeof content === "string" ? (
              <p className="whitespace-pre-line">{content.trim()}</p>
            ) : (
              content
            )}
          </section>
        ))}
        
      </div>
                        {/* Last Modified Date */}
          <p className="mt-12 text-sm text-gray-500 text-center">
            Last Modified: {lastModified}
          </p>
    </div>
  );
}