import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  switch (request.method) {
    case "POST":
      if (
        request.headers.get("access-control-allow-credentials") ===
        process.env.API_KEY
      ) {
        try {
          const body = await request.json();
          const url = "https://api.openai.com/v1/chat/completions";
          const data = {
            model: "gpt-3.5-turbo",
            messages: body.messages,
          };
          const response = await axios.post(url, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.API_KEY}`,
            },
          });
          console.log(response.data.choices[0].message);
          return NextResponse.json({
            message: response.data,
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
