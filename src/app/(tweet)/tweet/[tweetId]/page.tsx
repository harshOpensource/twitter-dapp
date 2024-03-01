"use client";

import Feed from "@/components/Feed";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface TweetIdProps {
  params: {
    tweetId: string;
  };
}
const TweetIdPage = ({ params }: TweetIdProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
          <div
            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
            onClick={() => router.push("/")}
          >
            <ArrowLeftIcon className="h-5 text-white" />
          </div>
          Tweet
        </div>
      </div>
    </>
  );
};

export default TweetIdPage;
