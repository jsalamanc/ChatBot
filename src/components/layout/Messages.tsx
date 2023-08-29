import React from "react";
import { ChatError } from "@/components/layout/ChatError";
import { BubbleChat } from "@/components/layout/BubbleChat";
import { ThreeDots, ChatLeftDots } from "react-bootstrap-icons";

type ChatAssistantProps = {
  id?: string;
  role?: string;
  content?: string;
  status?: number;
  statusText?: string;
}[];
type MessagesProps = {
  response: ChatAssistantProps;
  loading: boolean;
};
export const Messages = ({ response, loading }: MessagesProps) => {
  return (
    <div className="overflow-x-auto bg-gray-800 p-3 h-[22rem] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600">
      <div className="flex flex-col items-center mb-4">
        <div className="rounded-full bg-red-500 w-[4rem] h-[4rem] flex justify-center items-center">
          <ChatLeftDots className="text-white text-2xl" />
        </div>
        <h1 className="font-bold">Explora Bot</h1>
        <p className="text-sm">Asistente personal</p>
      </div>
      {response?.map((item, index) => (
        <>
          {item?.status !== 200 ? (
            <ChatError key={index} message={item?.statusText} />
          ) : (
            <BubbleChat
              key={index}
              message={{
                id: item?.id,
                role: item?.role,
                content: item?.content,
              }}
            />
          )}
        </>
      ))}
      {loading && (
        <>
          <div>
            <div className="mb-2 flex items-center">
              <div className="rounded-full bg-red-500 w-[2rem] h-[2rem] flex justify-center items-center">
                <ChatLeftDots className="text-white text-sm" />
              </div>
              <h1 className="ml-3 text-[11px]">Explora Bot</h1>
            </div>
            <div className="mt-[-0.5rem] ml-10 text-sm font-light tracking-wide">
              <div className="flex items-center gap-2">
                escribiendo
                <ThreeDots className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
