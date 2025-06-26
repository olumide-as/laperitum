'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What services does La Peritum provide?',
      answer:
        'La Peritum provides legal and corporate business advisory services, including risk analysis, mitigation strategies, and international best practice solutions.',
    },
    {
      question: 'How can I contact La Peritum?',
      answer:
        'You can contact La Peritum through our contact page, via email at info@laperitum.com, or call us at +234 803 770 9418.',
    },
    {
      question: 'Where are you located?',
      answer:
        'We are located at 14a Da Silva Street, Off Chris Madueke Drive, Lekki Phase 1, Lagos.',
    },
    {
      question: 'How can I book a consultation?',
      answer:
        'You can book a consultation with us by visiting our website and filling out the consultation form or contacting us directly by phone or email.',
    },
    {
      question: 'Do you offer legal consultations?',
      answer:
        'Yes, we offer consultations to individuals and businesses in need of legal advice, including corporate governance and risk management.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96 w-full flex items-center justify-center text-center mb-12"
        style={{ backgroundImage: "url(/assets/publicationbg.png)" }}
      >
        <h1 className="text-4xl font-bold text-[#2F3545]">Frequently Asked Questions</h1>
      </div>

      {/* FAQ Section */}
      <div className="px-8 md:px-16 lg:px-32">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-[#C1A17C] overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="font-semibold text-[#2F3545]">{faq.question}</h3>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {activeIndex === index && (
                <div className="p-4 bg-[#f8f8f8]">
                  <p className="text-sm text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}