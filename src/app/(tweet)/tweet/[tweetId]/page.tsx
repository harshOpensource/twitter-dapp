"use client";

import Feed from "@/components/Feed";
import { Post } from "@/components/post";
import { contract_address } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Twitter from "@/lib/twitter-contract.json";
import { ethers } from "ethers";
import Comment from "@/components/comment";
import { v4 as uuidv4 } from "uuid";
import { Comment as ComentType, Tweet } from "@/lib/types";

interface TweetIdProps {
  params: {
    tweetId: string;
  };
}
const TweetIdPage = ({ params }: TweetIdProps) => {
  const router = useRouter();
  const [post, setPost] = useState<Tweet>({
    id: "",
    tweetText: "",
    username: "",
    isDeleted: false,
    isLiked: false,
    likeCount: 0,
    timestamp: 0,
  });
  const [comments, setComments] = useState<ComentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const deleteTweet = () => {};
  const likeTweet = () => {};

  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          return;
        }
        let chainId = await ethereum.request({ method: "eth_chainId" });

        const SepoliabyChainId = "0xaa36a7";

        if (chainId !== SepoliabyChainId) {
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[0]);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.log("Error connecting to metamask", error);
      }
    } else {
      console.log("window is undefined");
    }
  };
  const getTweetWithCommentsByTweetId = async () => {
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

        let tweet = await TwitterContract.getTweet(params.tweetId);
        let commentss = await TwitterContract.getCommentsByTweetId(
          params.tweetId
        );
        setPost(tweet[0]);
        setComments(commentss);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
    getTweetWithCommentsByTweetId();
  }, []);

  const sendComment = async () => {
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

        let twitterTx = await TwitterContract.addComment(
          params.tweetId,
          uuidv4(),
          input
        );

        console.log(twitterTx);
        getTweetWithCommentsByTweetId();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error submitting new Tweet", error);
    }
  };

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
        <Post
          key={post.id}
          id={post.id}
          post={post}
          deleteTweet={deleteTweet}
          likeTweet={likeTweet}
          account={currentAccount}
        />
        <div>
          <div className="flex items-center bg-[#202327] p-3 m-2 rounded-2xl relative">
            <textarea
              placeholder="Tweet your reply!"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent scrollbar-hide outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            />
          </div>
          <div className="flex mb-2 px-4 py-1 w-full items-end justify-end">
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input}
              onClick={sendComment}
            >
              Tweet
            </button>
          </div>
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment: ComentType) => (
                <Comment key={comment.id} id={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TweetIdPage;
