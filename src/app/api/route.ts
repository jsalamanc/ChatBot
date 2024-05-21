import { getOpenAiResponse } from '@/lib/openAi';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// import axios from "axios";

export async function POST(request: Request) {
  switch (request.method) {
    case 'POST':
      try {
        const body = await request.json();
        const data = {
          model: 'gpt-3.5-turbo',
          messages: body.messages
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
          'https://bipw4npvt8.execute-api.us-east-2.amazonaws.com/prod/embedding-gpt',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type_service: 'Query',
              content: message.content
            })
          }
        );
        const dataRes = await response.json();
        console.log('dataRes', dataRes.body.response.content);
        const ND = 'Lo siento, pero no lo sé';
        const openAiResponse = await getOpenAiResponse([
          {
            role: `system`,
            content: `
                Eres una IA FAQ, a partir de ahora vas a limitarte a contestar preguntas sobre este contenido: ${dataRes.body.response.content}.
                NO DES MÁS INFORMACIÓN Y NO SUPONAGAS NADA. No contestes con Respuesta: o según el contenido.
                Habla como si tú sugieres.
                Como FAQ debes dar repuestas cortas y precisas y dar la respuesta en en lenguaje sencillo y cercano.
                Cuando no sepas la respuesta o tengas dudas contesta con la siguiente frase "${ND}""
              `
          },
          ...body.messages
        ]);
        console.log('openAiResponse', openAiResponse);
        return NextResponse.json({
          message: openAiResponse.content,
          openAiResponse
        });
      } catch (error) {
        console.error('Error making API request:', error);
        return NextResponse.json('Error: Unable to generate response.');
      }

      break;

    default:
      break;
  }
}
