import OpenAI from 'openai';
import pinecone from '@pinecone-database/pinecone';
// import lib from "lib";

const openai = new OpenAI({
  //   apiKey: "sk-proj-X4Dc7VeIS69n6QsWthmVT3BlbkFJJkETZkG3SLI4NO70Vi75",
  apiKey: process.env.OPENAI_KEY
});
// const pineconeClient = new pinecone.PineconeClient();
// pineconeClient.apiKey = "3f68e894-ec9a-4511-9837-2968a9521ad6";

/* CONVIERTE EL TEXTO A VECTOR */
export const toEmbeddings = async (text: string) => {
  return await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: [`${text}`]
  });
};

/* GUARDAR EN BASE DE DATOS VECTORIAL */
// type SaveVectorProps = { id: string; content: string };
// const saveVectorData = async (data: SaveVectorProps) => {
//   const { id, content } = data;
//   console.log("Voy a guardar...");
//   // Convertimos el contenido a vector antes de guardarlo
//   const embeddingResponse = await toEmbeddings(data.content);

//   const objectToSave = {
//     id: id + "",
//     metadata: {
//       content,
//     },
//     values: embeddingResponse.data[0].embedding,
//   };
//   return pineconeClient.createIndex();
// };

// /* BUSCAR CONTENIDO POR SIMILITUD DE COSENO */
// const searchVectorData = async (embedding: number[]) => {
//   return pineconeClient.Index("@0.0.3").query({});
// };
