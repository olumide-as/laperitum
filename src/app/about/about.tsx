"use client";

import Image from "next/image";

export default function About() {
  return (
    <div>
      {/* Firm Overview Section */}
      <section className="py-48 px-4 md:px-8 text-center bg-[#F9F5EB]/30">
        <div className="md:max-w-[50%] mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-[#2F3545]">
            Firm Overview
          </h2>
          <p className="mb-8 text-lg text-justify">
            La Peritum Law Practice is committed to providing cutting-edge
            solutions with a focus on professionalism, integrity, and adherence
            to international best practices.
            <br />
            <br />
            Our approach is defined by a deep understanding of each client’s
            unique needs, customized innovative solutions, and an unwavering
            commitment to excellence and professionalism.
          </p>

          <h3 className="text-3xl font-semibold pt-8 text-[#2F3545]">
            Who we Are
          </h3>

          <div className="flex justify-between items-center">
            <blockquote className="text-7xl italic text-left">“</blockquote>
          </div>

          <p className="mb-4 text-lg">
            La Peritum Law Practice is a dynamic full-service law firm offering
            comprehensive legal and corporate advisory services. We provide
            solutions focused on professionalism, integrity, and adherence to
            international best practices.
          </p>
          <blockquote className="text-7xl italic text-right">”</blockquote>
        </div>
      </section>

      {/* Banner Section */}
      <section
        className="text-center py-40 text-white relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/aboutbanner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <h2 className="text-3xl font-semibold italic">
          “Delivering Excellence in Legal Solutions”
        </h2>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#2F3545]">Our Story</h2>
        <p className="text-justify mb-8 md:max-w-[60%] mx-auto">
          La Peritum Law Practice was founded on the principles of excellence,
          integrity, and a vision to redefine the standard of legal services in
          Nigeria... {/* truncated for brevity */}
        </p>
      </section>

      {/* Vision, Mission, Core Values Section */}
      <section className="py-16 grid grid-cols-1 md:grid-cols-3">
        {["Vision", "Mission", "Core Values"].map((label, i) => {
          const background = [
            "/assets/visionbg.png",
            "/assets/missionbg.png",
            "/assets/valuebg.png",
          ][i];
          const content = [
            "To be the foremost law firm in Nigeria, leading the way in legal innovation, client satisfaction, and ethical standards.",
            "Our mission at La Peritum Law Practice is to provide exceptional client-focused legal services that empower our clients to achieve their goals while upholding the highest standards of integrity, innovation, and professionalism.",
            "Excellence, Integrity, Client-Centric, Innovation, Professionalism and Dedication.",
          ][i];

          return (
            <div key={label} className="relative flex flex-col h-96">
              <div
                className="relative bg-cover bg-center h-full flex flex-col justify-center p-8 md:p-12"
                style={{ backgroundImage: `url('${background}')` }}
              >
                <div className="absolute inset-0 bg-black/30 bg-opacity-0 z-0" />
                <h3 className="text-4xl font-bold text-[#2F3545] text-center py-4 z-10">
                  {label}
                </h3>
                <div className="relative h-3/4 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/blurbg.png')" }}
                  ></div>
                  <div className="absolute inset-0 backdrop-blur-md rounded-lg flex items-center justify-center bg-white/30 bg-opacity-10 border border-white">
                    <p
                      className={`text-center ${
                        label === "Mission" ? "text-[#2F3545]" : "text-white"
                      } p-4`}
                    >
                      {content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Meet the Founder Section */}
      <section className="py-8 px-8 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2F3545]">
            Meet the Founder
          </h2>
        </div>

        <div className="md:flex md:px-20">
          <div className="md:w-1/2 mb-8 md:pr-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#2F3545]">
              Bolanle Opadokun B.Sc, LLB, BL, LLM
            </h3>
            <p className="text-justify">
              Bolanle is a seasoned commercial lawyer with extensive experience
              in high-value contract drafting, advisory, and dispute resolution.
              Her expertise spans key sectors including maritime,
              telecommunications, fintech, energy, real estate, and intellectual
              property rights protection. 
              <br/><br/>
              Bolanle regularly provides counsel to
              international financial institutions and multinational oil
              companies on complex and contentious matters, helping them
              navigate regulatory landscapes and resolve disputes efficiently.
              Additionally, she assists international companies seeking to
              establish or expand their presence in Nigeria. 
              <br/><br/>
              With a sharp legal
              acumen and a problem-solving mindset, Bolanle is adept at
              negotiating complex, high-stakes deals involving International Oil
              Companies (IOCs), the Nigerian Parliament, financial institutions,
              and global telecommunications giants. She earned both her law
              degree and an LLM in International and Commercial Law from the
              University of Buckingham, United Kingdom. 
              <br/><br/>
              Bolanle is a member of
              the Nigerian Bar Association, Nigerian Gas Association, Society of
              Petroleum Engineers, Financial Reporting Council of Nigeria, and
              the Institute of Chartered Secretaries and Administrators of
              Nigeria.
            </p>
          </div>

          <div className="md:w-1/2">
            <Image
              src="/assets/founderImage.png"
              alt="Bolanle Opadokun"
              className="rounded-lg object-cover shadow-2xl"
              width={500}
              height={800}
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
