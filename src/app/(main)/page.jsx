"use client";

import CourseCard from "@/components/courses/CourseCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white min-h-[85vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Upgrade Your Skills Today 🚀
          </h1>

          <p className="mt-5 text-lg md:text-xl max-w-2xl mx-auto">
            Learn from industry experts and build career-ready skills in
            development, design, marketing and data.
          </p>

          <Link href="/courses">
            <button className="btn btn-warning mt-8">Explore Courses</button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-8">Popular Courses</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="bg-purple-50 py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">📌 Learning Tips</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl">Plan Your Study</h3>
              <p className="mt-2 text-gray-600">
                Set weekly goals and follow a fixed learning routine.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl">Practice Daily</h3>
              <p className="mt-2 text-gray-600">
                Build small projects to understand lessons better.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl">Track Progress</h3>
              <p className="mt-2 text-gray-600">
                Review your progress and improve weak areas regularly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-8">🏆 Top Instructors</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="card bg-base-100 shadow-lg p-6 text-center"
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
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Courses</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {trendingCourses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
