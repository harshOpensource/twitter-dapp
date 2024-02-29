"use client";

import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Picker } from "emoji-mart";
import data from "@emoji-mart/data";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import EmojiPicker from "@emoji-mart/react";
type Props = {};

function Input({}: Props) {
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  const addImageToPost = () => {};

  const addEmoji = () => {};

  const sendPost = () => {};

  return (
    <div className="border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide">
      <Avatar>
        <AvatarImage src={""} alt="img-url" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <div className="divide-y divide-gray-700 w-full">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's happening?"
          rows={4}
          className="bg-transparent scrollbar-hide outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
        />
        <div className="relative">
          <div
            className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
            onClick={() => {}}
          >
            <XMarkIcon className="text-white h-5" />
          </div>
          {/* Selected Image */}
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon" onClick={() => {}}>
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

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <FaceSmileIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
            {showEmojis && (
              <EmojiPicker
                data={data}
                style={{
                  position: "absolute",
                  marginTop: "465px",
                  marginLeft: -40,
                  maxWidth: "320px",
                  borderRadius: "20px",
                }}
                theme="dark"
                onSelect={addEmoji}
              />
            )}
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
