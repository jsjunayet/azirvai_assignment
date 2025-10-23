"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call or connect with your backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className=" bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 py-10 px-6 md:px-12"
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Contact <span className="text-primary">Me</span>
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? Fill out the form
          below, and I’ll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto mt-12 bg-gray-800/40 border border-gray-700 rounded-2xl p-8 shadow-xl backdrop-blur-md"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-primary focus:ring-primary text-gray-100 outline-none transition"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-primary focus:ring-primary text-gray-100 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-primary focus:ring-primary text-gray-100 outline-none transition"
            placeholder="Write your message..."
          />
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/80 disabled:opacity-70 transition text-white px-8 py-3 rounded-lg font-medium"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </motion.form>

      {/* Contact Info */}
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <p className="text-gray-400">
          Or reach me directly via{" "}
          <a href="mailto:youremail@example.com" className=" hover:underline">
            youremail@example.com
          </a>
        </p>
        <p className="text-gray-400 mt-1">Based in Lisbon, Portugal 🇵🇹</p>
      </div>
    </section>
  );
};

export default ContactPage;
