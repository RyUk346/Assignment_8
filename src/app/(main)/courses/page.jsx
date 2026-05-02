"use client";

import CourseCard from "@/components/courses/CourseCard";
import { useEffect, useState } from "react";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">All Courses</h1>
          <p className="text-gray-600 mt-2">
            Explore all available SkillSphere courses.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by course title"
          className="input input-bordered w-full md:w-96"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl font-semibold mt-20">
          No course found
        </h2>
      )}
    </div>
  );
};

export default CoursesPage;
