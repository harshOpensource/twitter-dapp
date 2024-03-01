import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Trash } from "lucide-react";
import { Comment } from "@/lib/types";

interface Props {
  comment: Comment;
  id: string;
}

function Comment({ comment, id }: Props) {
  return (
    <div className="p-3 flex cursor-pointer border-b border-t border-gray-700">
      <Avatar className="mr-4">
        <AvatarImage src={""} alt="img-url" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                @ {comment?.commenter.slice(0, 7)}...
                {comment?.commenter.slice(-7, -1)}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]"></span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>
                {new Date(comment?.timestamp?.toNumber() * 1000)}
              </Moment>
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll scrollbar-hide text-[15px] sm:text-base">
              {comment?.commentText}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <HeartIcon className="h-5 group-hover:text-pink-600 text-emerald-500" />
            </div>
            <span className="group-hover:text-pink-600 text-sm">
              {comment?.likesCount?.toNumber() || 0}
            </span>
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <Trash className="h-5 group-hover:text-pink-600 text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
