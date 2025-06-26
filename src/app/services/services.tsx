'use client';

import { JSX, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  title: string;
  smallText: string;
fullText: JSX.Element;
  image: string;
}

const services = [
  {
    title: "Business Advisory and Corporate Finance",
    smallText: "At La Peritum Law Practice, we offer tailored Business Advisory Services to emerging and large corporates as well as High Net Worth Individuals (HNIs). ",
    fullText: (
      <div>
        <p>At La Peritum Law Practice, we offer tailored Business Advisory Services to emerging and large corporates as well as High Net Worth Individuals (HNIs). With extensive experience on both the buy and sell sides of corporate finance, our firm provides due diligence services, transaction advisory, and comprehensive documentation support.</p>
        <br/>
        <p>We advise on all aspects of corporate and commercial law, assisting businesses in achieving their goals in capital formation, whether they are in the early stages or pursuing expansion. Additionally, we help clients identify the most suitable legal structures to mitigate risks specific to their operations.</p>
        <br/>
        <p>When businesses seek to diversify, our bespoke legal advice ensures full awareness of associated risks and provides strategic solutions for optimal decision-making. Our lawyers are also highly skilled in handling matters related to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Project Finance</li>
          <li>Foreign investment and divestment</li>
          <li>Corporate restructuring</li>
          <li>Joint ventures</li>
          <li>Immigration and labour law</li>
        </ul>
        <br/>
        <p>At La Peritum Law Practice, we combine legal insight with practical business acumen to deliver optimal results for our clients.</p>
      </div>
    ),
    image: "/assets/services1.png",
  },
  {
    title: "Company Secretarial and Regulatory Compliance",
    smallText: "La Peritum Law Practice offers comprehensive company secretarial and regulatory compliance services to businesses across various sectors.",
    fullText: (
      <div>
        <p>La Peritum Law Practice offers comprehensive company secretarial and regulatory compliance services to businesses across various sectors. We assist clients in selecting the most suitable legal structures for their operations and help with company incorporation at the Corporate Affairs Commission (CAC). Our services extend to providing nominee services, registering with tax authorities, and securing business permits and expatriate quotas from the Ministry of Interior.</p>
        <br/>
        <p>We also advise on corporate governance matters, including organizing board and shareholder meetings, filing annual returns, and ensuring compliance with legal and regulatory requirements. Our firm is dedicated to supporting clients with expert guidance on company law and related compliance issues.</p>
      </div>
    ),
    image: "/assets/services2.png",
  },
  {
    title: "Intellectual Property Rights Protection",
    smallText: "La Peritum Law Practice offers comprehensive legal solutions to safeguard the ideas, inventions, and creative expressions of our clients.",
    fullText: (
      <div>
        <p>In an era where intellectual property theft is a constant threat, La Peritum Law Practice offers comprehensive legal solutions to safeguard the ideas, inventions, and creative expressions of our clients. We provide a full range of intellectual property services, including conducting thorough searches, filing and registering applications, renewing and opposing trademark applications, and ensuring compliance with relevant governmental agencies.</p>
        <br/>
        <p>Additionally, we draft, review, and advise on all business and legal documents necessary to protect our clients’ intellectual property, ensuring that their rights are fully secured in the competitive marketplace.</p>
      </div>
    ),
    image: "/assets/services3.png",
  },
  {
    title: "Financial Technology Legal Services (Fintech Legal Services)",
    smallText: "The rapid evolution of technology in the financial sector has significantly disrupted traditional banking, leading to a profound transformation in financial services. ",
    fullText: (
      <div>
        <p>The rapid evolution of technology in the financial sector has significantly disrupted traditional banking, leading to a profound transformation in financial services. At La Peritum Law Practice, we recognize the unique challenges and opportunities this shift presents, and we are committed to providing bespoke legal services that support fintech innovators and ensure the smooth operation of their businesses in Nigeria.</p>
        <br/>
        <p>Our clientele ranges from start-ups and investors to financial institutions and other key players in the fintech sector. We offer tailored legal solutions to help clients navigate regulatory frameworks, secure funding, protect intellectual property, and manage risks, ensuring their businesses thrive in a dynamic marketplace.</p>
        <br/>
        <p>Our lawyers have the expertise to advise, represent, and guide clients in achieving their data protection and cybersecurity objectives, ensuring compliance and security in a rapidly changing landscape.</p>
      </div>
    ),
    image: "/assets/services4.png",
  },
  {
    title: "Intermediary Support Services",
    smallText: "At La Peritum Law Practice, we offer corporate intermediary services designed to help both local and international clients focus on their core business operations. ",
    fullText: (
      <div>
        <p>At La Peritum Law Practice, we offer corporate intermediary services designed to help both local and international clients focus on their core business operations. Our services ensure that your business runs smoothly, free from administrative distractions. We handle a variety of intermediary tasks, including but not limited to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Money Lenders License</li>
          <li>Digital Money Lender’s License</li>
          <li>Tax Identification Number (TIN) registration</li>
          <li>Special Control Unit Against Money Laundering (SCUML) registration</li>
          <li>Courier License</li>
          <li>Bank account opening</li>
          <li>Procurement of licenses and statutory approvals necessary for business operations</li>
        </ul>
        <br/>
        <p>By entrusting these essential tasks to us, we ensure that our clients’ administrative and regulatory needs are met efficiently, allowing them to concentrate on what matters most—growing their business.</p>
      </div>
    ),
    image: "/assets/services5.png",
  },
  {
    title: "Family Law",
    smallText: "La Peritum Law Practice is a top-tier law firm offering comprehensive solutions to our clients’ family law needs. ",
    fullText: (
      <div>
        <p>La Peritum Law Practice is a top-tier law firm offering comprehensive solutions to our clients’ family law needs. Our services cover a wide range of matters, including marriage and divorce, child custody, surrogacy and adoption, guardianship, child welfare, prenuptial agreements, and other related family law issues.</p>
      </div>
    ),
    image: "/assets/services6.png",
  },
  {
    title: "Estate Planning and Wealth Transfer",
    smallText: "At La Peritum Law Practice, we recognize the significance of safeguarding our clients’ assets, accumulated through years of hard work, by managing them efficiently during their lifetime, in cases of incapacitation, and after death.",
    fullText: (
      <div>
        <p>At La Peritum Law Practice, we recognize the significance of safeguarding our clients’ assets, accumulated through years of hard work, by managing them efficiently during their lifetime, in cases of incapacitation, and after death. Our lawyers are highly experienced in ensuring that our clients’ estates are administered in accordance with their wishes.</p>
      </div>
    ),
    image: "/assets/services7.png",
  },
  {
    title: "Litigation and Alternative Dispute Resolution",
    smallText: "Business disputes can stall progress, and at La Peritum Law Practice, our Litigation and Alternative Dispute Resolution (ADR) team is committed to resolving these issues swiftly and effectively.",
    fullText: (
      <div>
        <p>Business disputes can stall progress, and at La Peritum Law Practice, our Litigation and Alternative Dispute Resolution (ADR) team is committed to resolving these issues swiftly and effectively. We help our clients restore productive business relationships and minimize disruptions.</p>
        <br/>
        <p>Recognizing that litigation isn’t always the best solution, we assess each matter and advise on the most suitable approach—whether through litigation, mediation, arbitration, or other forms of ADR. Our goal is to deliver prompt, cost-effective resolutions that meet the client’s needs while maintaining a focus on long-term success.</p>
        <br/>
        <p>Trust, Dedication, and Excellence form the foundation of our practice at La Peritum Law Practice.</p>
      </div>
    ),
    image: "/assets/services8.png",
  },
  {
    title: "Energy and Natural Resources",
    smallText: "Energy and natural resource transactions are intricate and require a high level of expertise to navigate successfully. ",
    fullText: (
      <div>
        <p>Energy and natural resource transactions are intricate and require a high level of expertise to navigate successfully. At La Peritum Law Practice, our Energy and Natural Resources team brings extensive knowledge and experience to this complex field. We provide comprehensive legal advisory services to clients across all aspects of the energy sector, including:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Power generation and transmission</li>
          <li>Renewable energy</li>
          <li>Oil and gas</li>
          <li>Natural resource exploitation</li>
          <li>Energy-related financing</li>
        </ul>
      </div>
    ),
    image: "/assets/services9.png",
  },
  {
    title: "Real Estate",
    smallText: "Real estate transactions are inherently complex, involving multiple parties with varying interests and concerns. ",
    fullText: (
      <div>
        <p>Real estate transactions are inherently complex, involving multiple parties with varying interests and concerns. At La Peritum Law Practice, our team has extensive knowledge and experience in this sector, providing a comprehensive range of services. These include negotiation, drafting, reviewing, and executing contracts, as well as title perfection and facilitating financing and property development.</p>
        <br/>
        <p>We work closely with our clients to ensure that their interests are well-represented and that every aspect of the transaction is handled with precision and professionalism.</p>
      </div>
    ),
    image: "/assets/services10.png",
  },
  {
    title: "Cybercrime/Data Protection Advisory",
    smallText: "Cybercrime and Data Privacy are rapidly evolving areas of law in Nigeria. At La Peritum Law Practice, we are proud to have a team of highly skilled and experienced lawyers specializing in these fields.",
    fullText: (
      <div>
        <p>Cybercrime and Data Privacy are rapidly evolving areas of law in Nigeria. At La Peritum Law Practice, we are proud to have a team of highly skilled and experienced lawyers specializing in these fields. With the increasing incidence of cybercrime and the growing concerns over the infringement of personal data rights, we are committed to listening to our clients’ concerns, providing thorough analysis, and offering tailored legal advice.</p>
        <br/>
        <p>Our team possesses the expertise to advise, represent, and guide clients through complex cybercrime and data privacy matters, ensuring they achieve their goals while staying compliant with the relevant legal frameworks.</p>
      </div>
    ),
    image: "/assets/services11.png",
  },
  {
    title: "Entertainment Law",
    smallText: "Our entertainment team is highly skilled in assisting clients with making commercially sound decisions by offering tailored solutions to address issues such as license infringements, copyright disputes, domain name conflicts, and intellectual property rights protection.",
    fullText: (
      <div>
        <p>Our entertainment team is highly skilled in assisting clients with making commercially sound decisions by offering tailored solutions to address issues such as license infringements, copyright disputes, domain name conflicts, and intellectual property rights protection.</p>
        <br/>
        <p>We also provide legal advisory services on a range of matters, including film financing and distribution, brand protection and management, broadcasting, endorsements, data protection and privacy, concert contracts, procurement, and entertainment partnerships.</p>
        <br/>
        <p>Our team has extensive experience representing clients in both contentious and non-contentious matters across various sectors, including film, music, gaming, leisure, hospitality, and digital and print media.</p>
      </div>
    ),
    image: "/assets/services12.png",
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const closeModal = () => setSelectedService(null);

  return (
    <div className="pt-32 pb-24 px-8 md:px-16 lg:px-32">
      <h1 className="text-4xl font-bold text-center text-[#2F3545] mb-12">
        Premium Legal Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg transition-shadow duration-300 hover:shadow-lg overflow-hidden border border-[#C1A17C]"
          >
            <div className="relative">
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={300}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#C1A17C] bg-opacity-90 text-white text-center py-2">
                <h3 className="text-left pl-4">{service.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-4">{service.smallText}</p>
              <button
                onClick={() => setSelectedService(service)}
                className="bg-[#2F3545] text-white py-2 px-4 rounded-md hover:bg-opacity-80"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 relative max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold"
            >
              &times;
            </button>

            <Image
              src={selectedService.image}
              alt={selectedService.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-4 text-[#2F3545]">
              {selectedService.title}
            </h2>
            <div className="text-gray-700 text-justify mb-4">
              {selectedService.fullText}
            </div>
            <button
              onClick={closeModal}
              className="bg-[#2F3545] text-white py-2 px-4 rounded-md w-full text-center mt-4 hover:bg-opacity-80"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div
        className="relative bg-cover bg-center bg-no-repeat py-16 px-8 text-center rounded-lg mt-20"
        style={{ backgroundImage: 'url(/assets/ctabg.png)' }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Navigate Your Legal Challenges with Confidence?
        </h2>
        <p className="text-lg text-white mb-8 max-w-3xl mx-auto">
          Our team is here to provide the strategic guidance and support you need in every legal matter. Partner with us today to take the next step towards success.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/contact">
            <button className="bg-[#2F3545] text-white py-2 px-6 rounded-md hover:bg-opacity-90">
              Get in Touch
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-[#C1A17C] text-[#2F3545] py-2 px-6 rounded-md hover:bg-opacity-90">
              Schedule a Consultation
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}