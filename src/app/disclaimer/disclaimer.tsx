export default function DisclaimerPage() {
    const lastModified = "14 November 2024"; // You can update this dynamically if needed


  const disclaimerSections = [
    {
      title: "General Disclaimer",
      content: `The information provided on this website is intended solely for general informational purposes. La Peritum Law Practice endeavors to keep the information accurate and current, but makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.`,
    },
    {
      title: "No Legal Advice",
      content: `Nothing on this website constitutes or is intended to constitute legal advice. All content, including publications, blogs, FAQs, and other material, is for informational purposes only and does not create a solicitor-client relationship. Visitors should not act or refrain from acting based on any content without seeking appropriate legal advice from a qualified lawyer licensed to practice in Nigeria. La Peritum Law Practice disclaims all liability in respect to actions taken or not taken based on any or all of the contents of this site.`,
    },
    {
      title: "Solicitor-Client Relationship",
      content: `Use of this website or communication with La Peritum Law Practice via email or contact forms does not establish a solicitor-client relationship. Such a relationship is only formed once a formal agreement has been entered into and terms of engagement agreed upon. Confidential or time-sensitive information should not be sent through the website or contact forms.`,
    },
    {
      title: "Professional Standards and Jurisdiction",
      content: `La Peritum Law Practice is licensed to practice law in Nigeria and operates under the regulatory framework of the Nigerian Bar Association (NBA) and applicable laws. The legal information provided on this site may not be relevant or applicable to jurisdictions outside Nigeria. We do not accept responsibility for compliance with the legal or regulatory requirements of other countries.`,
    },
    {
      title: "External Links",
      content: `Our website may contain links to external websites operated by third parties. These links are provided for your convenience only. La Peritum Law Practice has no control over the content, privacy policies, or practices of such third-party websites and accepts no responsibility for them. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.`,
    },
    {
      title: "Limitation of Liability",
      content: `Under no circumstances shall La Peritum Law Practice, its partners, associates, employees, or agents be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.`,
    },
    {
      title: "Intellectual Property",
      content: `All content, including logos, text, graphics, and other materials on this website, are the intellectual property of La Peritum Law Practice unless otherwise indicated. No part of this website may be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way without the prior written consent of the firm.`,
    },
    {
      title: "Changes to the Disclaimer",
      content: `La Peritum Law Practice reserves the right to modify, update, or amend this disclaimer at any time without prior notice. Continued use of this website after changes have been made constitutes acceptance of the updated disclaimer. Visitors are encouraged to review this page periodically for any changes.`,
    },
  ];

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
      <div className="px-8 md:px-16 lg:px-32 space-y-10">
        {disclaimerSections.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold text-[#2F3545]">
              {section.title}
            </h2>
            <p className="mt-2 whitespace-pre-line">{section.content}</p>
          </div>
        ))}

                  {/* Last Modified Date */}
          <p className="mt-12 text-sm text-gray-500 text-center">
            Last Modified: {lastModified}
          </p>
      </div>
    </div>
  );
}