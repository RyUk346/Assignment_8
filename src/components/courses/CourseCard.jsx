import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const CourseCard = ({ course }) => {
  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden">
      <figure>
        <Image
          src={course.image}
          alt={course.title}
          width={500}
          height={300}
          className="h-56 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <div className="badge badge-secondary">{course.category}</div>

        <h2 className="card-title">{course.title}</h2>

        <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>

        <div className="flex justify-between text-sm text-gray-600">
          <span>{course.duration}</span>
          <span>{course.level}</span>
        </div>

        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span>{course.rating}</span>
        </div>

        <div className="card-actions justify-end">
          <Link href={`/courses/${course.id}`}>
            <button className="btn bg-purple-600 text-white">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
