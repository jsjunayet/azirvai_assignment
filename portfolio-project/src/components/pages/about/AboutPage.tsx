"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="min-h-screen py-16 px-6 md:px-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          About <span className="text-primary">Me</span>
        </motion.h1>
        <p className="max-w-2xl mx-auto">
          Passionate{" "}
          <span className="text-primary font-medium">Full-Stack Developer</span>{" "}
          focused on crafting clean, scalable, and user-friendly web
          applications using modern technologies.
        </p>
      </div>

      {/* Bio + Image */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-3">Who I Am</h2>
          <p className=" leading-relaxed">
            I’m a dedicated developer with a passion for creating dynamic
            digital experiences. I specialize in <strong>Next.js</strong>,{" "}
            <strong>TypeScript</strong>, and <strong>Node.js</strong>, with a
            strong understanding of backend systems using{" "}
            <strong>Express</strong> and <strong>Prisma</strong>.
          </p>
          <p className="mt-4 leading-relaxed">
            Over time, I’ve worked on various projects — from interactive
            dashboards to dynamic portfolio sites. My focus is on writing clean,
            maintainable code and delivering delightful user experiences.
          </p>
          <div className="mt-6 flex gap-4 flex-wrap">
            <Link
              href="/resume.pdf"
              target="_blank"
              className="bg-primary hover:bg-primary/80 transition  px-5 py-2 rounded-lg font-medium"
            >
              Download Resume
            </Link>
            <Link
              href="/projects"
              className="border border-primary text-primary hover:bg-primary  transition px-5 py-2 rounded-lg font-medium"
            >
              View Projects
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Image
            src="/profile.jpg"
            alt="Profile photo"
            width={300}
            height={300}
            className="rounded-2xl shadow-lg object-cover border border-gray-800"
          />
        </motion.div>
      </div>

      {/* Skills */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Skills & Technologies
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Next.js",
            "TypeScript",
            "React",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "Prisma",
            "MongoDB",
            "PostgreSQL",
            "JWT",
            "Redux Toolkit",
            "Framer Motion",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 text-sm rounded-full border border-gray-700 hover:bg-primary hover:border-primary hover:text-white transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Work Experience
        </h2>
        <div className="space-y-8">
          {[
            {
              title: "Frontend Developer – Freelance",
              period: "2024 – Present",
              description:
                "Developing modern responsive interfaces using Next.js, React, and Tailwind. Collaborating with clients to create visually stunning and functional web apps.",
            },
            {
              title: "Full-Stack Developer – Personal Projects",
              period: "2023 – 2024",
              description:
                "Built full-stack applications with Node.js, Express, Prisma, and PostgreSQL, including admin dashboards, blog management systems, and portfolio platforms.",
            },
          ].map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">
                  {job.title}
                </h3>
                <p className="text-gray-400 text-sm">{job.period}</p>
              </div>
              <p className="text-gray-400">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-3">Let’s Connect</h2>
        <p className=" mb-6">
          Feel free to reach out for collaborations or just a friendly chat.
        </p>
        <Link
          href="/contact"
          className="bg-primary text-white hover:bg-primary/80 px-6 py-2 rounded-lg transition font-medium"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
};

export default AboutPage;
