import LeftSideBar from "@/components/homepage/news/LeftSideBar";
import NewsCard from "@/components/homepage/news/NewsCard";
import RightSideBar from "@/components/homepage/news/RightSideBar";
import { getCategories, getNewsByCategoryId } from "@/lib/data";
import React from "react";

const NewsCategoryPage = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  const categories = await getCategories();

  const news = await getNewsByCategoryId(id);

  return (
    <div className="grid grid-cols-12 container mx-auto gap-8 mt-8">
      <div className=" col-span-3">
        <LeftSideBar categories={categories} activeId={id} />
      </div>
      <div className=" text-lg col-span-6">
        <h2 className="font-bold">News by Category</h2>
        <div className="space-y-4">
          {news.length > 0 ? (
            news.map((n) => {
              return <NewsCard key={n._id} news={n} />;
            })
          ) : (
            <h2 className="font-bold text-center">No News Found</h2>
          )}
        </div>
      </div>
      <div className="font-bold col-span-3">
        <RightSideBar />
      </div>
    </div>
  );
};

export default NewsCategoryPage;
