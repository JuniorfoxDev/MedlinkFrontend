import React from 'react'
import Navbar from '../components/Navbar';
import FeatureCard from '../components/Featured';
const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-slate-50"
      style={{ fontFamily: "Manrope, Noto Sans, sans-serif" }}
    >
      <Navbar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center gap-6 bg-cover bg-center py-20 px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDIU1HZK9Zr1l9lbF-kk477QsgGE6DkwX68ytIOwyERQF_vtTXjN53rdwB8pQppw0-yacdYk9RHMZl1BOyuQLQmVJLijn_Tms_bWYN8SGHW3yG11JTiytzPEleqS1r70gsmNj0WbxGJiQErREtHJaTuwTrmGvvLMj25pGU_7XIxfL_0Ir4cCa14sjOg1Vnxf3NQfxY1mliyt3NfoVD7HokIhUNuqIbXZamCBoAahQlIQtZqtyscFP8z45MTC6RhLmO5iVFfLztHng')",
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-black">
          Connect with verified doctors and students
        </h1>
        <p className="text-white max-w-2xl">
          Join a network of medical professionals and students to collaborate,
          share knowledge, and advance your career.
        </p>
        <button className="mt-4 rounded-lg bg-[#0b80f4] text-white px-6 py-3 font-bold">
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#0d141c] mb-4">Features</h2>
        <p className="text-gray-600 mb-8">
          Explore the features that make our platform the go-to network for
          medical professionals.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Secure Messaging"
            description="Communicate with colleagues and mentors securely and privately."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z" />
              </svg>
            }
          />
          <FeatureCard
            title="Case Sharing"
            description="Share and discuss complex cases with peers to gain insights."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40..." />
              </svg>
            }
          />
          <FeatureCard
            title="Verified Jobs"
            description="Access exclusive job opportunities from trusted healthcare institutions."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M216,56H176V48a24,24,0,0,0-24-24H104..." />
              </svg>
            }
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-white">
        <h2 className="text-3xl font-bold text-[#0d141c] mb-4">
          Ready to elevate your medical career?
        </h2>
        <p className="text-gray-600 mb-6">
          Sign up today and start connecting with a community of verified
          professionals and students.
        </p>
        <button className="bg-[#0b80f4] text-white px-6 py-3 rounded-lg font-bold">
          Join Now
        </button>
      </section>

      
    </div>
  );
}

export default Home