import { Link } from "react-router-dom";
import {
  GraduationCap,
  Heart,
  Lightbulb,
  Globe2,
  Users,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold gradient-text">
                ElimuChain
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/get-started" className="btn-primary">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Revolutionizing Education Through Blockchain
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ElimuChain was born from a vision to transform how academic
              credentials are issued, verified, and managed globally.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold gradient-text mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We envision a world where academic credentials are secure,
                instantly verifiable, and globally recognized. ElimuChain
                leverages blockchain technology to eliminate credential fraud
                and streamline verification processes.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Globe2, text: "Global Accessibility" },
                  { icon: Lightbulb, text: "Innovation in Education" },
                  { icon: Users, text: "Empowering Institutions" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                      <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-on-scroll">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                alt="Team collaboration"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold gradient-text mb-6">
              Meet Our Founders
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate innovators committed to transforming education through
              technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: "Khalid Hussein",
                role: "Co-Founder & CEO",
                image:
                  "https://raw.githubusercontent.com/kh3rld/kh3rld.github.io/main/web/static/img/k_nerd.png",
                bio: "A visionary leader with extensive experience in EdTech and blockchain technology. Hussein's passion for education and innovation drives ElimuChain's mission to revolutionize academic credentials.",
                links: {
                  github: "https://github.com/kh3rld",
                  linkedin: "https://linkedin.com/in/kherldhussein",
                  email: "mailto:khalid@elimuchain.com",
                },
              },
              {
                name: "Doreen Onyango",
                role: "Co-Founder & CTO",
                image:
                  "https://raw.githubusercontent.com/Doreen-Onyango/Doreen-Onyango.github.io/main/image.png",
                bio: "A blockchain expert and software architect with a deep understanding of educational systems. Doreen leads the technical vision of ElimuChain, ensuring secure and scalable solutions.",
                links: {
                  github: "https://github.com/Doreen-Onyango",
                  linkedin: "https://linkedin.com/Doreen-Atieno",
                  email: "mailto:doreen@elimuchain.com",
                },
              },
            ].map((founder, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-on-scroll"
              >
                <div className="aspect-w-1 aspect-h-1 mb-6">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="rounded-xl object-cover w-full h-64"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{founder.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-4">
                  {founder.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {founder.bio}
                </p>
                <div className="flex space-x-4">
                  <a
                    href={founder.links.github}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={founder.links.linkedin}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={founder.links.email}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold gradient-text mb-6">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide our mission and shape our culture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Trust & Integrity",
                description:
                  "We believe in building trust through transparency and maintaining the highest standards of integrity in all our operations.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description:
                  "We continuously push the boundaries of what's possible, leveraging cutting-edge technology to solve real-world problems.",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "We're committed to fostering a global community of educators, students, and institutions working together for a better future.",
              },
            ].map((value, index) => (
              <div key={index} className="feature-card animate-on-scroll">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg w-fit mb-6">
                  <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 feature-icon" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;
