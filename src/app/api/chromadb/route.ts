import { NextResponse } from "next/server";
const { ChromaClient, OpenAIEmbeddingFunction } = require("chromadb");
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.API_KEY,
});
const client = new ChromaClient();
import axios from "axios";

export async function POST(request: Request) {
  switch (request.method) {
    case "POST":
      if (
        request.headers.get("access-control-allow-credentials") ===
        process.env.API_KEY
      ) {
        const body = await request.json();
        if (body?.type === "create") {
          try {
            await client.createCollection({
              name: body?.nameCollection,
              embeddingFunction: embedder,
            });
            return NextResponse.json({
              status: 200,
              error: "Collection created successfully",
            });
          } catch (error) {
            console.error(error);
          }
        }
        if (body?.type === "delete") {
          try {
            await client.deleteCollection({ name: body?.nameCollection });
            return NextResponse.json({
              status: 200,
              error: "Collection deleted successfully",
            });
          } catch (error) {
            console.error(error);
          }
        }
        if (body?.type === "add") {
          try {
            const collection = await client.getCollection({
              name: body?.nameCollection,
              embeddingFunction: embedder,
            });
            await collection.add({
              ids: ["id1", "id2", "id3"],
              metadatas: [
                { chapter: "3", verse: "16" },
                { chapter: "3", verse: "5" },
                { chapter: "29", verse: "11" },
              ],
              documents: ["lorem ipsum...", "doc2", "doc3"],
            });
          } catch (error) {
            console.error(error);
          }
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
