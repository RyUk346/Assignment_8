"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "motion/react";

const CourseDetailsClient = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [course, setCourse] = useState(null);
  const [courseLoading, setCourseLoading] = useState(true);

  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => {
        const foundCourse = data.find((item) => item.id === Number(id));
        setCourse(foundCourse);
        setCourseLoading(false);
      })
      .catch(() => {
        setCourseLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push(`/login?redirect=/courses/${id}`);
    }
  }, [isPending, session, router, id]);

  if (isPending || courseLoading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (!session?.user) return null;

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Image Animation */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={course.image}
            alt={course.title}
            width={700}
            height={450}
            className="rounded-2xl w-full h-[420px] object-cover"
          />
        </motion.div>

        {/* Content Animation */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="badge badge-primary">{course.category}</div>

          <h1 className="text-4xl font-bold mt-4">{course.title}</h1>

          <p className="mt-4 text-gray-600">{course.description}</p>

          <div className="mt-6 space-y-2">
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            <p>
              <strong>Level:</strong> {course.level}
            </p>

            <p className="flex items-center gap-2">
              <strong>Rating:</strong>
              <FaStar className="text-yellow-500" />
              {course.rating}
            </p>
          </div>

          {/* Button animation */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn bg-purple-600 text-white mt-8"
          >
            Enroll Now
          </motion.button>
        </motion.div>
      </div>

      {/* Curriculum Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-14"
      >
        <h2 className="text-3xl font-bold mb-5">Course Curriculum</h2>

        <ul className="steps steps-vertical lg:steps-horizontal w-full">
          {course.curriculum.map((item, index) => (
            <motion.li
              key={item}
              className="step step-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default CourseDetailsClient;
