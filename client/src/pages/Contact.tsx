import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
        Contact Me
      </h1>

      <p className="text-gray-300 text-lg md:text-xl mb-12 text-center max-w-2xl">
        Have a project idea or just want to connect? I’d love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">

        {/* Social Profiles */}
        <div className="bg-white/5 backdrop-blur-md border border-cyan-500/20 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition-all">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Social Profiles</h2>

          <div className="space-y-4">

            <a
              href="https://www.linkedin.com/in/krish-kumar70/"
              target="_blank"
              className="flex items-center gap-3 text-gray-200 hover:text-cyan-400 transition"
            >
              <Linkedin className="w-6 h-6 text-cyan-300" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/krish7789"
              target="_blank"
              className="flex items-center gap-3 text-gray-200 hover:text-blue-400 transition"
            >
              <Github className="w-6 h-6 text-blue-300" />
              <span>GitHub</span>
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&to=krishkumar7727@gmail.com"
              className="flex items-center gap-3 text-gray-200 hover:text-pink-400 transition"
            >
              <Mail className="w-6 h-6 text-pink-300" />
              <span>Email</span>
            </a>

          </div>
        </div>

        {/* Email Section */}
        <div className="bg-white/5 backdrop-blur-md border border-cyan-500/20 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Email Me:  krishkumar7727@gmail.com</h2>

          <p className="text-gray-300 mb-6">
            Want to contact me directly? Click below.
          </p>

          <a
            href="https://mail.google.com/mail/?view=cm&to=krishkumar7727@gmail.com"
            target="_blank"

            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg block w-full text-center text-white font-semibold"
          >
            Click Here
          </a>
        </div>

        {/* Google Form */}
        <div className="bg-white/5 backdrop-blur-md border border-cyan-500/20 p-6 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Contact Form</h2>

          <p className="text-gray-300 mb-6">
            Prefer filling a form? Click below and I’ll respond shortly.
          </p>

          <a
            href="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"
            target="_blank"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg block w-full text-center"
          >
            Open Google Form
          </a>
        </div>

      </div>
    </div>
  );
}
