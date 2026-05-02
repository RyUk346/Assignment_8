import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white mt-16">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-purple-400">SkillSphere</h2>
          <p className="mt-3 text-gray-300">
            A modern online learning platform for students who want to upgrade
            their skills.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Info</h3>
          <p>Email: support@skillsphere.com</p>
          <p>Phone: +880 1700 000000</p>
          <p>Dhaka, Bangladesh</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Social Links</h3>
          <div className="flex gap-4 text-2xl">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Terms & Conditions | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
