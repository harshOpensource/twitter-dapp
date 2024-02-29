import { TrendingResult } from "@/lib/types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

type Props = {
  result: TrendingResult;
};

function Trending({ result }: Props) {
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-[#6e767d] text-xs font-medium">{result.heading}</p>
        <h6 className="font-bold max-w-[250px] text-sm">
          {result.description}
        </h6>
        <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
          Trending with
          {result.tags.map((tag: any, index: any) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </p>
      </div>

      {result.img ? (
        <>
          {result.description === "SpaceX's Starship SN10 launch" ? (
            <div className="-mr-3">
              <Image
                src={result.img}
                width={70}
                alt="trending-img"
                height={100}
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          ) : (
            <>
              <Image
                src={result.img}
                width={70}
                alt="trending-img"
                height={70}
                objectFit="cover"
                className="rounded-2xl "
              />
            </>
          )}
        </>
      ) : (
        <div className="icon group">
          <EllipsisVerticalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  );
}

export default Trending;
