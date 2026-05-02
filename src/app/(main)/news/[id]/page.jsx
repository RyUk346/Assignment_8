import { getNewsByCategoryId, getNewsDetailsById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiBookmark, CiShare2 } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

const NewsDetailsPage = async ({ params }) => {
  const { id } = await params;
  const news = await getNewsDetailsById(id);
  console.log(news);

  return (
    <div className="max-w-4xl mx-auto my-8 card">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          {/* author info */}
          <div className="flex justify-between items-center bg-slate-200">
            <div className="flex gap-1 items-center">
              <div>
                <Image
                  src={news.author?.img}
                  alt={news.author?.title}
                  width={40}
                  height={40}
                  className="rounded-full"
                ></Image>
              </div>
              <div>
                <h2 className="font-semibold">{news.author?.name}</h2>
                <h2 className="text-sm">{news.author?.published_date}</h2>
              </div>
            </div>
            <div className="flex gap-1 text-xl">
              <CiShare2 />
              <CiBookmark />
            </div>
          </div>
          <h2 className="card-title">{news.title}</h2>
          <figure>
            <Image
              src={news.image_url}
              alt={news.title}
              width={300}
              height={300}
              className="w-full"
            ></Image>
          </figure>
          <div>
            <p className="text-md">{news.details}</p>
          </div>
          <div className="flex justify-between">
            <Link href={`/category/${news.category_id}`}>
              <button className="btn bg-purple-700 text-white">
                See other news for this category
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
