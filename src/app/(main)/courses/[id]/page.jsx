import CourseDetailsClient from "./CourseDetails";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/data/courses.json`,
  );
  const courses = await res.json();

  const course = courses.find((item) => item.id === Number(params.id));

  return {
    title: course
      ? `${course.title} | SkillSphere`
      : "Course Details | SkillSphere",
  };
}

export default function Page({ params }) {
  return <CourseDetailsClient id={params.id} />;
}
