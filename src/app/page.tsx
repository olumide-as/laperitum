'use client';

import Image from 'next/image';
import Link from 'next/link';

const clients = [
  { src: '/assets/client1.png', alt: 'Client 1' },
  { src: '/assets/client2.png', alt: 'Client 2' },
  { src: '/assets/client3.png', alt: 'Client 3' },
  { src: '/assets/client4.png', alt: 'Client 4' },
  { src: '/assets/client5.png', alt: 'Client 5' },
  { src: '/assets/client6.png', alt: 'Client 6' },
];

const testimonials = [
  {
    imgSrc: '/assets/client3.png',
    imgAlt: 'Client 1',
    quote:
      'Navigating the regulatory requirements in the Nigerian energy sector can be challenging, but La Peritum Law Practice made it seamless. Their energy law expertise and proactive approach helped us secure vital contracts and compliance approvals. Their team truly understands the industry.',
    author: 'Managing Director, Baba Energy Nigeria Ltd.',
    imgClassName: 'w-16',
  },
  {
    imgSrc: '/assets/client1.png',
    imgAlt: 'Client 2',
    quote:
      'Partnering with La Peritum Law Practice for our company secretarial needs has been a great decision. Their expertise in corporate governance and attention to detail have ensured our regulatory compliance. With their timely and proactive support, we can focus on growing our business with peace of mind.',
    author: 'Chairman, SAGLEV Electromobility',
    imgClassName: 'w-40 bg-[#2F3545]',
  },
  {
    imgSrc: '/assets/client6.png',
    imgAlt: 'Client 3',
    quote:
      'Obtaining a Money Lender’s Licence in Nigeria can be complex, but La Peritum Law Practice made it effortless. Their expertise, prompt guidance, and efficient handling of the application and regulatory processes ensured a smooth experience. We highly recommend their services to businesses navigating this process.',
    author: 'Managing Director, SCL Nigeria Limited',
    imgClassName: 'w-16',
  },
];

export default function Home() {
  const scrollToTestimonials = () => {
    const el = document.getElementById('testimonials');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-screen bg-[#2F3545] flex flex-col justify-center px-8 lg:px-32 text-left text-white relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.6)), url(/assets/herobg.png)",
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <div className="lg:w-1/2">
          <h1 className="text-5xl md:text-7xl text-[#2F3545] font-bold mb-4">
            LaPeritum
          </h1>
          <p className="text-lg md:text-xl text-[#2F3545] mb-8">
            We provide legal and corporate business advisory services to our clients in a professional, timely manner and at competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/contact"
              className="bg-[#C1A17C] text-[#2F3545] px-6 py-3 rounded-md border-2 border-gray-400 text-center"
            >
              Book a Consultation
            </Link>

            <Link
              href="/services"
              className="bg-[#2F3545] text-white px-6 py-3 rounded-md border-2 border-gray-700 text-center"
            >
              Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section
        className="text-center py-40 text-white relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/assets/bannerbg.png)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <h2 className="text-3xl font-semibold italic">
          “Delivering Excellence <br /> in Legal Solutions”
        </h2>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-8 md:px-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2F3545] mb-4">
          Why Choose Us?
        </h2>
        <p className="text-center text-lg text-[#C1A17C] mb-12 max-w-xl mx-auto">
          We know you have a choice. Thank you for choosing us.
        </p>

        {/* Expertise Across Industries */}
        <div className="md:flex mb-12 items-center">
          <div className="md:w-1/2 lg:w-2/5 mb-8 md:mb-0 md:pr-8 text-center md:text-left max-w-md mx-auto md:max-w-none">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#C1A17C] mb-4">
              Expertise Across Industries
            </h3>
            <p className="text-center md:text-left mb-6 max-w-sm mx-auto md:max-w-none">
              La Peritum Law Practice brings in-depth expertise across diverse sectors, ensuring comprehensive legal support tailored to each industry.
            </p>
            <Link
              href="/services"
              className="bg-[#2F3545] text-white px-6 py-2 rounded-md"
            >
              Explore Our Practice Areas
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/assets/expertisebg.png"
              alt="Expertise"
              className="rounded-lg"
              width={400}
              height={300}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Client-Centered Approach */}
        <div className="md:flex mb-12 flex-row-reverse items-center">
          <div className="md:w-1/2 lg:w-2/5 mb-8 md:mb-0 md:pl-8 text-center md:text-left max-w-md mx-auto md:max-w-none">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#C1A17C] mb-4">
              Client-Centered Approach
            </h3>
            <p className="text-center md:text-left mb-6 max-w-sm mx-auto md:max-w-none">
              Your goals are our priority. We tailor every solution to meet your specific needs.
            </p>
            <Link
              href="/contact"
              className="bg-[#2F3545] text-white px-6 py-2 rounded-md"
            >
              Schedule Your Consultation
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/assets/centeredbg.png"
              alt="Client-Centered"
              className="rounded-lg"
              width={400}
              height={300}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Proven Track Record */}
        <div className="md:flex items-center">
          <div className="md:w-1/2 lg:w-2/5 mb-8 md:mb-0 md:pr-8 text-center md:text-left max-w-md mx-auto md:max-w-none">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#C1A17C] mb-4">
              Proven Track Record
            </h3>
            <p className="text-center md:text-left mb-6 max-w-sm mx-auto md:max-w-none">
              Our consistent success in dispute resolutions, transactions, and intellectual property protection speaks to our commitment to results.
            </p>
            <button
              className="bg-[#2F3545] text-white px-6 py-2 rounded-md"
              onClick={scrollToTestimonials}
            >
              Explore Our Success Stories
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/assets/recordbg.png"
              alt="Proven Track Record"
              className="rounded-lg"
              width={400}
              height={300}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="bg-[#2F3545] py-16 text-center text-white">
        <h2 className="text-4xl font-bold mb-8">Trusted Business Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
          {clients.map(({ src, alt }) => (
            <div
              key={alt}
              className="bg-[#F4EDE3] p-6 rounded-lg flex justify-center items-center"
            >
              <Image
                src={src}
                alt={alt}
                width={200}
                height={128}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 md:px-16" id="testimonials">
        <h2 className="text-4xl font-bold text-center mb-4">Testimonials</h2>
        <p className="text-center text-lg mb-12">What they say about us</p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ imgSrc, imgAlt, quote, author, imgClassName }, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-300 p-6 text-center transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400/30"
            >
              <Image
                src={imgSrc}
                alt={imgAlt}
                width={imgClassName?.includes('w-40') ? 160 : 64}
                height={imgClassName?.includes('w-40') ? 160 : 64}
                className={`rounded-full mx-auto mb-4 ${imgClassName ?? ''}`}
              />
              <p className="mb-4">{quote}</p>
              <p className="text-sm text-gray-600">{author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}