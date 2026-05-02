import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiBookmark, CiShare2, CiStar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

const NewsCard = ({ news }) => {
  return (
    <div className="mt-6">
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
            <p className="text-md line-clamp-4">{news.details}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1 items-center ">
                <IoStar className="text-yellow-300" />
                {news.rating.number}
              </div>
              <div className="flex items-center gap-1">
                {" "}
                <FaEye />
                {news.total_view}
              </div>
            </div>
            <Link href={`/news/${news._id}`}>
              {" "}
              <button className="btn">See details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
