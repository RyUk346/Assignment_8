"use client";

import CourseCard from "@/components/courses/CourseCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  FaBullseye,
  FaClock,
  FaTools,
  FaChartLine,
  FaSyncAlt,
  FaComments,
  FaPenFancy,
  FaRocket,
} from "react-icons/fa";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const anim = (delay) => ({
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.2, delay },
    whileHover: { y: -2, scale: 1.03 },
  });

  useEffect(() => {
    Promise.all([
      fetch("/data/courses.json").then((res) => res.json()),
      fetch("/data/instructors.json").then((res) => res.json()),
    ])
      .then(([coursesData, instructorsData]) => {
        setCourses(coursesData);
        setInstructors(instructorsData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const popularCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const trendingCourses = courses.filter((course) => course.rating >= 4.6);

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-linear-to-r from-purple-700 to-indigo-700 text-white min-h-[85vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Upgrade Your Skills Today 🚀
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Learn from industry experts and build career-ready skills in
            development, design, marketing and data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/courses">
              <button className="btn btn-warning mt-8">Explore Courses</button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-8">Popular Courses</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {popularCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <p className="text-purple-600 font-semibold">Smarter Learning</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Learning Tips for Better Progress
            </h2>
            <p className="text-gray-600 mt-4">
              Build strong habits, stay consistent, and turn learning into
              real-world skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              {...anim(0.1)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <FaBullseye className="text-3xl text-purple-600 mb-4" />
              <h3 className="font-bold text-xl">Set Clear Goals</h3>
              <p className="mt-3 text-gray-600 text-sm">
                Break large topics into smaller weekly targets to stay focused
                and avoid burnout.
              </p>
            </motion.div>

            <motion.div
              {...anim(0.2)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <FaClock className="text-3xl text-purple-600 mb-4" />
              <h3 className="font-bold text-xl">Follow a Routine</h3>
              <p className="mt-3 text-gray-600 text-sm">
                Study at a fixed time every day to build discipline and
                consistency.
              </p>
            </motion.div>

            <motion.div
              {...anim(0.3)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <FaTools className="text-3xl text-purple-600 mb-4" />
              <h3 className="font-bold text-xl">Practice with Projects</h3>
              <p className="mt-3 text-gray-600 text-sm">
                Apply every concept in small projects instead of only watching
                tutorials.
              </p>
            </motion.div>

            <motion.div
              {...anim(0.4)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <FaChartLine className="text-3xl text-purple-600 mb-4" />
              <h3 className="font-bold text-xl">Track Progress</h3>
              <p className="mt-3 text-gray-600 text-sm">
                Monitor completed lessons and weak areas to stay motivated and
                improve faster.
              </p>
            </motion.div>

            <motion.div
              {...anim(0.5)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <FaSyncAlt className="text-3xl text-purple-600 mb-4" />
              <h3 className="font-bold text-xl">Review Regularly</h3>
              <p className="mt-3 text-gray-600 text-sm">
                Revisit older topics weekly to strengthen long-term
                understanding.
              </p>
            </motion.div>

            <motion.div
              {...anim(0.6)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <FaComments className="text-3xl text-purple-600 mb-4" />
              <h3 className="font-bold text-xl">Ask Questions</h3>
              <p className="mt-3 text-gray-600 text-sm">
                Don’t hesitate to ask when stuck—learning improves through
                discussion.
              </p>
            </motion.div>

            <motion.div
              {...anim(0.7)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <FaPenFancy className="text-3xl text-purple-600 mb-4" />
              <h3 className="font-bold text-xl">Take Smart Notes</h3>
              <p className="mt-3 text-gray-600 text-sm">
                Write summaries, key concepts, and mistakes to improve
                retention.
              </p>
            </motion.div>

            <motion.div
              {...anim(0.8)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all"
            >
              <FaRocket className="text-3xl text-purple-600 mb-4" />
              <h3 className="font-bold text-xl">Build Portfolio Work</h3>
              <p className="mt-3 text-gray-600 text-sm">
                Turn your projects into portfolio pieces to showcase your skills
                professionally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-8">Top Instructors</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card bg-base-100 shadow-lg p-6 text-center transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <Image
                src={instructor.image}
                alt={instructor.name}
                width={100}
                height={100}
                className="rounded-full w-24 h-24 object-cover mx-auto"
              />

              <h3 className="font-bold text-lg mt-4">{instructor.name}</h3>
              <p className="text-gray-500">{instructor.expertise}</p>
              <p className="text-sm mt-2">{instructor.students}+ Students</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Courses</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {trendingCourses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
