import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();
// import axios from "axios";

export async function POST(request: Request) {
  switch (request.method) {
    case "POST":
      if (
        request.headers.get("access-control-allow-credentials") ===
        process.env.API_KEY
      ) {
        // try {
        //   await pinecone.init({
        //     environment: "gcp-starter",
        //     apiKey: "237fb3a0-f3b1-45c9-b8fa-45885c2209a9",
        //   });
        //   const index = pinecone.Index("chatbot");
        // } catch (error) {}

        try {
          const body = await request.json();
          const data = {
            model: "gpt-3.5-turbo",
            messages: body.messages,
          };
          let message;
          if (body?.messages.length > 1) {
            message = body.messages[body?.messages?.length - 1];
          } else if (body?.messages.length < 2) {
            message = body.messages[0];
          }
          console.log(message);
          /**
           * envio la pregunta a pinecode para recibir ua respuesta
           */
          const response = await fetch(
            "https://bipw4npvt8.execute-api.us-east-2.amazonaws.com/prod/embedding-gpt",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type_service: "Query",
                content: "cual es el estado de las especies silvestres?",
              }),
            }
          );
          const dataRes = await response.json();
          console.log(dataRes);
          return NextResponse.json({
            message: dataRes,
          });
        } catch (error) {
          console.error("Error making API request:", error);
          return NextResponse.json("Error: Unable to generate response.");
        }
      } else {
        return NextResponse.json({
          error: "Unauthorized",
        });
      }
      break;

    default:
      break;
  }
}
