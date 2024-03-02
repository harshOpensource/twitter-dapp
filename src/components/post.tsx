"use client";

import {
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  ArrowsRightLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatBubbleOvalLeftIcon as ChatIconFilled,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Moment from "react-moment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { BigNumber } from "ethers";

type Props = {
  id: string;
  post: any;
  postPage?: any;
  deleteTweet: any;
  likeTweet: any;
  account?: string;
};

export const Post = ({
  id,
  post,
  postPage,
  deleteTweet,
  likeTweet,
  account,
}: Props) => {
  const router = useRouter();

  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(post?.isLiked);
  const likeCountNumber =
    post?.likeCount instanceof BigNumber ? post.likeCount.toNumber() : 0;

  return (
    <div
      key={id}
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/tweet/${id}`)}
    >
      {!postPage && (
        <Avatar className="mr-4">
          <AvatarImage src={""} alt="img-url" />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.username && "@"} {post?.username?.slice(0, 8)}...
                {post?.username?.slice(-8, -1)}
              </h4>
            </div>
            <span className="hover:underline text-sm sm:text-[15px] ml-5">
              <Moment fromNow>
                {post?.timestamp
                  ? new Date(post?.timestamp?.toNumber() * 1000)
                  : new Date()}
              </Moment>
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                {post?.tweetText}
              </p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=""
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        />
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              /* setPostId(id);
              setIsOpen(true); */
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatBubbleOvalLeftIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>
          {post.username === account?.toString() ||
            (post.personal && (
              <div className="flex items-center space-x-1 group">
                <div
                  className="icon group-hover:bg-red-600/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTweet(post.id);
                  }}
                >
                  <TrashIcon className="h-5 group-hover:text-red-600 text-emerald-500" />
                </div>
              </div>
            ))}

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-green-500/10">
              <ArrowsRightLeftIcon className="h-5 group-hover:text-pink-600" />
            </div>
          </div>

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likeTweet(post.id);
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600 text-emerald-500" />
              )}
            </div>
            {likeCountNumber > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likeCountNumber}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
};
