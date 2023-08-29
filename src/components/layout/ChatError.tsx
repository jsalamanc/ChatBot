import React from "react";
import { ChatLeftDots, ExclamationCircle } from "react-bootstrap-icons";
type ChatAssistantProps = {
  message?: string;
};
export const ChatError = ({ message }: ChatAssistantProps) => {
  return (
    <div>
      <div className="mb-2 flex items-center">
        <div className="rounded-full bg-red-500 w-[2rem] h-[2rem] flex justify-center items-center">
          <ChatLeftDots className="text-white text-sm" />
        </div>
        <h1 className="ml-3 text-[11px]">Explora Bot</h1>
      </div>
      <div className="rounded-md p-2 border-2 border-red-500 bg-red-400/50 mt-[-0.5rem] ml-10 text-sm font-light tracking-wide">
        <p className="flex items-center gap-2 text-white">
          <ExclamationCircle />
          {message}
        </p>
      </div>
    </div>
  );
};
