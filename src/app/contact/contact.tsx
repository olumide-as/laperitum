'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  captchaAnswer: string;
}

interface Captcha {
  a: number;
  b: number;
  result: number;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    captchaAnswer: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState<Captcha | null>(null);

  // Generate a new captcha on mount or after successful submit
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setCaptcha({ a, b, result: a + b });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simple email validation
  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate entire form before submit
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      isEmailValid(formData.email) &&
      formData.message.trim() !== '' &&
      captcha !== null &&
      formData.captchaAnswer.trim() !== ''
    );
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!captcha) {
      toast.error('Captcha not ready. Please refresh the page.');
      return;
    }

    if (parseInt(formData.captchaAnswer) !== captcha.result) {
      toast.error('Incorrect answer to the anti-spam question.');
      return;
    }

    if (!isFormValid()) {
      toast.error('Please fill out all required fields with valid data.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Message sent successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          captchaAnswer: '',
        });
        generateCaptcha();
      } else {
        toast.error(result.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error submitting form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative bg-cover bg-top min-h-screen pt-32 pb-24"
      style={{ backgroundImage: `url('/assets/contactbg.png')` }}
    >
      <div className="relative z-10 flex justify-center items-center text-[#2F3545] h-full px-8">
        <div className="w-full max-w-6xl">
          {/* Text Column */}
          <div className="w-full md:w-1/2 mb-8">
            <h1 className="text-4xl font-bold mb-4">Feel free to write to us</h1>
            <p className="text-lg mb-6">
              Your feedback is important to us. Kindly fill out the form, and we’ll reach out to you at our earliest convenience.
            </p>
          </div>

          {/* Form Column */}
          <div className="w-full md:w-2/5 bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <div className="flex flex-col w-full sm:w-1/2 mb-4 sm:mb-0">
                  <label htmlFor="firstName" className="mb-2 text-sm font-medium">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <label htmlFor="lastName" className="mb-2 text-sm font-medium">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="mb-2 text-sm font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="mb-2 text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+123456789"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="mb-2 text-sm font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* Math CAPTCHA */}
              {captcha && (
                <div className="mb-6">
                  <label htmlFor="captchaAnswer" className="block mb-2 text-sm font-medium">
                    What is {captcha.a} + {captcha.b}? *
                  </label>
                  <input
                    type="number"
                    name="captchaAnswer"
                    value={formData.captchaAnswer}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#2F3545] text-white py-3 rounded-md hover:bg-[#3a424c]"
                disabled={isLoading || !isFormValid()}
                aria-busy={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default Contact;