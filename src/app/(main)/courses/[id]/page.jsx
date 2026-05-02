"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const CourseDetailsPage = () => {
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

  if (!session?.user) {
    return null;
  }

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
        <Image
          src={course.image}
          alt={course.title}
          width={700}
          height={450}
          className="rounded-2xl w-full h-[420px] object-cover"
        />

        <div>
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

          <button className="btn bg-purple-600 text-white mt-8">
            Enroll Now
          </button>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-5">Course Curriculum</h2>

        <ul className="steps steps-vertical lg:steps-horizontal w-full">
          {course.curriculum.map((item) => (
            <li key={item} className="step step-primary">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
