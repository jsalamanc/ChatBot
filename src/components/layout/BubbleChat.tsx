import React from "react";
import { ChatLeftDots, Person } from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";

type ChatAssistantProps = {
  message: {
    id?: string;
    role?: string;
    content?: string;
  };
};
export const BubbleChat = ({ message }: ChatAssistantProps) => {
  return (
    <div id={message?.id} className="py-2">
      <div className="mb-2 flex items-center">
        <div className="rounded-full bg-red-500 w-[2rem] h-[2rem] flex justify-center items-center">
          {message?.role === "assistant" ? (
            <ChatLeftDots className="text-white text-sm" />
          ) : (
            <Person className="text-white text-md" />
          )}
        </div>
        <h1 className="ml-3 text-[11px]">
          {message?.role === "assistant" ? "Bot" : "usuario"}
        </h1>
      </div>
      <div className="mt-[-0.5rem] ml-10 text-sm font-light tracking-wide">
        <ReactMarkdown>{`${message?.content}`}</ReactMarkdown>
      </div>
    </div>
  );
};
