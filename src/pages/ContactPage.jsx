import React from 'react'

function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold">
            Contact <span className="text-blue-400">Us</span>
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a question about our products or your order?
            We would love to hear from you.
          </p>

        </div>
      </section>


      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div>

            <h2 className="text-3xl font-bold text-gray-900">
              Get in Touch
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              Whether you have a question about our clothes,
              need help with your order, or just want to say hello,
              feel free to contact us.
            </p>


            {/* Information Cards */}
            <div className="mt-8 space-y-5">

              {/* Location */}
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 bg-blue-100
                  rounded-lg flex items-center justify-center
                  text-xl">
                  📍
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Our Location
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Phnom Penh, Cambodia
                  </p>
                </div>

              </div>


              {/* Phone */}
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 bg-blue-100
                  rounded-lg flex items-center justify-center
                  text-xl">
                  📞
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Phone Number
                  </h3>

                  <p className="text-gray-500 mt-1">
                    +855 12 345 678
                  </p>
                </div>

              </div>


              {/* Email */}
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 bg-blue-100
                  rounded-lg flex items-center justify-center
                  text-xl">
                  ✉️
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Email Address
                  </h3>

                  <p className="text-gray-500 mt-1">
                    sabayfashion@gmail.com
                  </p>
                </div>

              </div>


              {/* Opening Hours */}
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 bg-blue-100
                  rounded-lg flex items-center justify-center
                  text-xl">
                  🕒
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Opening Hours
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Monday - Sunday
                  </p>

                  <p className="text-gray-500">
                    8:00 AM - 9:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Fill out the form below and we will get back to you.
            </p>


            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                alert("Message sent successfully!")
                e.target.reset()
              }}
            >

              {/* Name */}
              <div>
                <label className="block text-sm font-medium
                  text-gray-700 mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300
                  rounded-lg px-4 py-3 outline-none
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                />
              </div>


              {/* Email */}
              <div>
                <label className="block text-sm font-medium
                  text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300
                  rounded-lg px-4 py-3 outline-none
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                />
              </div>


              {/* Subject */}
              <div>
                <label className="block text-sm font-medium
                  text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="What is your message about?"
                  className="w-full border border-gray-300
                  rounded-lg px-4 py-3 outline-none
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                />
              </div>


              {/* Message */}
              <div>
                <label className="block text-sm font-medium
                  text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300
                  rounded-lg px-4 py-3 outline-none
                  resize-none
                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-100"
                ></textarea>
              </div>


              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600
                hover:bg-blue-700 text-white
                font-semibold py-3 rounded-lg
                transition duration-300"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* FAQ Section */}
      <section id='faq' className="bg-white py-16">

        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-4">

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold">
                How can I place an order?
              </h3>

              <p className="text-gray-500 mt-2">
                Browse our products, select your favorite item,
                choose your size and add it to your cart.
              </p>
            </div>


            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold">
                How long does delivery take?
              </h3>

              <p className="text-gray-500 mt-2">
                Delivery time depends on your location.
                Our team will provide delivery information
                after your order is confirmed.
              </p>
            </div>


            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold">
                Can I return an item?
              </h3>

              <p className="text-gray-500 mt-2">
                Please contact our support team for information
                about our return policy.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default ContactPage