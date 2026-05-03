import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { motion } from "motion/react";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="card bg-base-100 shadow-xl overflow-hidden transition-shadow hover:shadow-2xl"
    >
      <figure className="overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          width={500}
          height={300}
          className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </figure>

      <div className="card-body">
        <div className="badge badge-secondary">{course.category}</div>

        <h2 className="card-title">{course.title}</h2>

        <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>

        <div className="card-actions justify-between items-center">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span>{course.rating}</span>
          </div>
          <Link href={`/courses/${course.id}`}>
            <button className="btn bg-purple-600 text-white">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
