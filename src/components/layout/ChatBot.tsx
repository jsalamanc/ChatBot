import React, { useState, useEffect } from "react";
import { handleFetch } from "@/hooks/useFetch";
import { ChatAssistantProps } from "@/components/layout/ChatBot.types";
import { X, Dash } from "react-bootstrap-icons";
import { InputText } from "./InputText";
import { Messages } from "./Messages";

export const ChatBot = () => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<ChatAssistantProps>([
    {
      role: "assistant",
      content: "¡Hola! ¿En qué puedo ayudarte hoy?",
      status: 200,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  // funcion para actualizar la lista de chats
  const handleInputSubmit = async () => {
    setLoading(true);
    setResponse((prevIndicators) => [
      ...prevIndicators,
      { role: "user", content: input, status: 200 },
    ]);
    setInput("");
  };
  // useEffect encargado de enviar la petición del usuario
  useEffect(() => {
    const fetchAPI = async () => {
      const chatResponse = await handleFetch(response);
      const data = await chatResponse?.json();
      console.log(data);
      setLoading(false);
      if (data !== "Error: Unable to generate response.") {
        setResponse((prevIndicators) => [
          ...prevIndicators,
          {
            id: data?.message?.id,
            role: data?.message?.message?.role,
            content: data?.message?.message?.content,
            status: chatResponse?.status,
            statusText: chatResponse?.statusText,
          },
        ]);
      } else {
        setResponse([
          ...response,
          {
            status: 500,
            statusText: data,
          },
        ]);
      }
    };
    if (response.length >= 0 && loading) {
      fetchAPI();
    }
  }, [loading]);

  return (
    <div
      className="absolute bottom-4 right-4 rounded-lg w-[25rem]"
      style={{
        contain: "paint",
      }}
    >
      <div className="select-none p-3 bg-gray-600 flex items-center justify-between">
        Chat
        <div className="flex gap-2">
          <button className="p-1 transition rounded-full bg-gray-700 active:bg-gray-800">
            <Dash />
          </button>
          <button className="p-1 transition rounded-full bg-gray-700 active:bg-gray-800">
            <X />
          </button>
        </div>
      </div>
      <Messages loading={loading} response={response} />
      <InputText input={input} setInput={setInput} submit={handleInputSubmit} />
    </div>
  );
};
