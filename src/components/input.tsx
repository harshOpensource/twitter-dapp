"use client";

import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Twitter from "@/lib/twitter-contract.json";
import { contract_address } from "@/lib/utils";
import { ethers } from "ethers";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {};

function Input({}: Props) {
  const [input, setInput] = useState<string>("");
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef: any = useRef(null);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const reader: any = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
    }
  };

  const sendPost = async () => {
    let tweet = {
      id: uuidv4(),
      tweetText: input.toString(),
      isDeleted: false,
      isLiked: false,
      likeCount: 0,
    };
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

        let twitterTx = await TwitterContract.addTweet(
          tweet.id,
          tweet.tweetText,
          tweet.isDeleted,
          tweet.likeCount,
          tweet.isLiked
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error submitting new Tweet", error);
    }
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${
        loading && "opacity-60"
      }`}
    >
      <Avatar>
        <AvatarImage src={""} alt="img-url" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <div className="divide-y divide-gray-700 w-full">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows={3}
            className="bg-transparent scrollbar-hide outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XMarkIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt="selected Image"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotoIcon className="text-[#1d9bf0] h-[22px]" />
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImageToPost}
              />
            </div>

            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <Popover>
              <PopoverTrigger>
                <div className="icon">
                  <FaceSmileIcon className="text-[#1d9bf0] h-[22px]" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                sideOffset={40}
                className="bg-transparent border-none shadow-none drop-shadow-none mb-16 mt-52"
              >
                <Picker
                  data={data}
                  onEmojiSelect={(emoji: any) => setInput(input + emoji.native)}
                />
              </PopoverContent>
            </Popover>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
          </div>
          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!input && !selectedFile}
            onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
