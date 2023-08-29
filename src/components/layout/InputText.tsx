import React from "react";
import { Send } from "react-bootstrap-icons";

type InputText = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
};
export const InputText = ({ input, setInput, submit }: InputText) => {
  return (
    <div className="relative bg-gray-800 p-3 flex items-center">
      <textarea
        className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600 w-full outline-none border-2 border-transparent focus:border-gray-400 p-2 resize-none bg-gray-700 rounded-md"
        value={input}
        autoFocus
        onKeyDown={(event) => {
          if (
            event.key === "Control" ||
            event.key === "Shift" ||
            event.key === "Alt"
          ) {
            console.log(
              "Estás presionando una tecla de modificación:",
              event.key
            );
          } else if (event.ctrlKey || event.shiftKey || event.altKey) {
            console.log("Estás presionando dos teclas a la vez");
          } else {
            if (event.key === "Enter") {
              submit();
            }
          }
        }}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="absolute top-0 bottom-0 right-5 flex items-center">
        <button
          className="rounded-md p-2 transition bg-green-600 active:bg-green-700"
          onClick={submit}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};
