import React from "react";
import { Link } from "react-router-dom";

function ContactPage() {
  return (
    <main className="w-full bg-white text-[#121212]">
      <section className="bg-[#E5E7EB] py-20 text-center">
        <p className="text-[#BA9242] font-bold tracking-[0.3em] text-sm mb-4">
          SABAY FASHION
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-5">CONTACH US</h1>

        <p className="text-gray-600 max-w-2xl mx-auto px-6">
          Have a question? Get in touch with the Sabay Fashion team.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-[#BA9242] font-bold tracking-[0.3em] text-sm mb-4">
              GET IN TOUCH
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We'd Love To Hear From You
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you have a question about our clothing, orders, or
              collections, feel free to contact us. Our team is happy to help.
            </p>

            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-full bg-[#BA9242]/10
                flex items-center justify-center text-xl"
              >
                ✉
              </div>

              <div>
                <h3 className="font-bold mb-1">Email</h3>

                <p className="text-gray-500">sabayfashion@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-full bg-[#BA9242]/10
                flex items-center justify-center text-xl"
              >
                ☎
              </div>

              <div>
                <h3 className="font-bold mb-1">Phone</h3>

                <p className="text-gray-500">+855 12 345 678</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full bg-[#BA9242]/10
                flex items-center justify-center text-xl"
              >
                📍
              </div>

              <div>
                <h3 className="font-bold mb-1">Location</h3>

                <p className="text-gray-500">Phnom Penh, Cambodia</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F8F8] rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6">Send Us A Message</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white border border-gray-300
                  px-4 py-3 rounded-lg
                  focus:outline-none focus:border-[#BA9242]
                  transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-300
                  px-4 py-3 rounded-lg
                  focus:outline-none focus:border-[#BA9242]
                  transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="What is your message about?"
                  className="w-full bg-white border border-gray-300
                  px-4 py-3 rounded-lg
                  focus:outline-none focus:border-[#BA9242]
                  transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full bg-white border border-gray-300
                  px-4 py-3 rounded-lg
                  focus:outline-none focus:border-[#BA9242]
                  transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#BA9242]
                hover:bg-[#9F7835]
                text-white font-semibold
                py-3 rounded-lg
                transition duration-300"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-16 text-center">
        <Link
          to="/about"
          className="text-[#BA9242] font-semibold
          hover:text-[#9F7835] transition"
        >
          ← Back to About Us
        </Link>
      </section>
    </main>
  );
}

export default ContactPage;
