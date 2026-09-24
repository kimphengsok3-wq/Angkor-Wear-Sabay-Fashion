import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <main className="w-full bg-white text-[#121212]">
      <section className="bg-gray-900 py-20 text-center">
        <p className="text-gray-300 font-bold tracking-[0.3em] text-sm mb-4">
          SABAY FASHION
        </p>

        <h1 className="text-blue-500 text-4xl md:text-5xl font-bold mb-5">ABOUT US</h1>

        <p className="text-gray-300 max-w-2xl mx-auto px-6 leading-relaxed">
          Discover the story behind Sabay Fashion and our passion for
          Cambodian-inspired clothing.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/5264909/pexels-photo-5264909.jpeg"
              alt="Sabay Fashion Collection"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div>
            <p className="text-blue-500 font-bold tracking-[0.3em] text-sm mb-4">
              OUR STORY
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fashion Inspired by Cambodia
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5">
              Sabay Fashion is a clothing brand inspired by Cambodian culture
              and modern fashion. We create clothing that is comfortable,
              stylish, and easy to wear every day.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Our goal is to bring Cambodian-inspired designs together with
              modern fashion and make them accessible to everyone. Every piece
              represents our passion for style, culture, and creativity.
            </p>

            <div className="w-20 h-1 bg-blue-500"></div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F8F8] py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-blue-500 font-bold tracking-[0.3em] text-sm mb-4">
            OUR MISSION
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Style • Culture • Comfort
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We believe fashion should express who you are while celebrating
            where you come from. Sabay Fashion combines culture, creativity, and
            everyday comfort in one collection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-blue-500 text-3xl mb-4">✦</div>

              <h3 className="text-xl font-bold mb-3">Style</h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                Modern designs made for everyday fashion and confidence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-blue-500 text-3xl mb-4">◈</div>

              <h3 className="text-xl font-bold mb-3">Culture</h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                Inspired by Cambodian culture, identity, and creativity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-blue-500 text-3xl mb-4">♢</div>

              <h3 className="text-xl font-bold mb-3">Comfort</h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                Comfortable clothing designed for everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center px-6">
        <p className="text-blue-500 font-bold tracking-[0.3em] text-sm mb-4">
          CONTACT
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-5">
          Let's Talk Fashion
        </h2>

        <p className="text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
          Have a question about our products or collection? We'd love to hear
          from you.
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center gap-4
          border-2 border-blue-500
          text-[#121212]
          px-8 py-3
          rounded-full
          font-semibold
          hover:bg-blue-500
          hover:text-white
          transition-all duration-300"
        >
          <span>CONTACT US</span>

          <span className="text-xl transition-transform duration-300">→</span>
        </Link>
      </section>
    </main>
  );
}

export default AboutPage;