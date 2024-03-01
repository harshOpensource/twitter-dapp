"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Input from "./input";
import { Post } from "./post";
import { ethers } from "ethers";
import { contract_address } from "@/lib/utils";
import Twitter from "@/lib/twitter-contract.json";
import { Loader2 } from "lucide-react";
import { Tweet } from "@/lib/types";

type Props = {};

function Feed({}: Props) {
  const [posts, setPosts] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUpdatedTweets: any = (allTweets: any, address: any) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for (let i = 0; i < allTweets.length; i++) {
      if (allTweets[i].username.toLowerCase() == address.toLowerCase()) {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: true,
          isLiked: allTweets[i].isLiked,
          likeCount: allTweets[i].likeCount,
          timestamp: allTweets[i].timestamp,
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: false,
          isLiked: allTweets[i].isLiked,
          likeCount: allTweets[i].likeCount,
          timestamp: allTweets[i].timestamp,
        };
        updatedTweets.push(tweet);
      }
    }

    return updatedTweets;
  };

  const getAllTweets = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          contract_address,
          Twitter.abi,
          signer
        );

        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteTweet = async (id: string) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          contract_address,
          Twitter.abi,
          signer
        );

        let deleteTweetTx = await TwitterContract.deleteTweet(id, true);
        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const likeTweet = async (id: string) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          contract_address,
          Twitter.abi,
          signer
        );

        await TwitterContract.toggleLike(id);
        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTweets();
    setIsLoading(false);
  }, []);
  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />
      <div className="pb-72">
        {isLoading ? (
          <div className="h-full w-full justify-center flex mt-14">
            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
          </div>
        ) : (
          <>
            {posts.map((post: Tweet) => (
              <Post
                key={post.id}
                id={post.id}
                post={post}
                deleteTweet={deleteTweet}
                likeTweet={likeTweet}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;
