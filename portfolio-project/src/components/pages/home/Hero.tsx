"use client";

import { Button } from "@/components/ui/button";
import { Eye, FileDown, Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

import Image from "next/image";
import HeroImg from "@/assets/images/azir.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-6 pt-20">
        <div className="flex justify-between items-center md:flex-row flex-col-reverse">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="md:space-y-4 space-y-2">
              <h1 className="text-xl lg:text-4xl font-bold text-gray-900 leading-tight">
                <span className="text-gray-800">Hi, I&apos;m </span>

                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AZIR UDDIN
                </span>
              </h1>

              <h2 className="text-xl lg:text-3xl font-light">
                <span className="text-[#149ECA] font-bold">
                  <Typewriter
                    words={[
                      "Full-Stack MERN Developer.",
                      "Specializing in Clean, Scalable Web Apps & API Integration.",
                    ]}
                    loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={100}
                    deleteSpeed={100}
                    delaySpeed={2000}
                  />
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                I’m a MERN stack developer with experience building full-stack
                web applications using React, TypeScript, Next.js, Redux, RTK
                Query, and Node.js (Express + MongoDB). I help businesses bring
                their ideas to life by creating clean, scalable, and responsive
                web solutions.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://drive.google.com/file/d/1L5VhaDjPLdwGi_K3mB3tqUDanHITF1Nu/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-900 hover:to-purple-900 text-white px-4"
                >
                  <Eye className="w-4 h-5 mr-2" />
                  View Resume
                </Button>
              </a>

              <a href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6"
                >
                  Contact Me
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/azirzaif/about"
                target="_blank"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/azir9200"
                target="_blank"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/azir9200"
                target="_blank"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/00351920319177"
                target="_blank"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end my-8 md:my-0">
            <div className="relative">
              <div className="md:w-[400px] md:h-[400px] w-[320px] h-[320px] rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-white p-4">
                  <Image
                    src={HeroImg}
                    alt="Portrait of MD Azir Uddin"
                    width={400}
                    height={400}
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-300 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white font-bold text-lg">AZIR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
