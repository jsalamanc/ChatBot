import OpenAI from 'openai';

const openai = new OpenAI({
  //   apiKey: "sk-proj-X4Dc7VeIS69n6QsWthmVT3BlbkFJJkETZkG3SLI4NO70Vi75",
  apiKey: process.env.OPENAI_KEY
});

export const getOpenAiResponse = async (
  userInput: { role: string; content: string }[]
) => {
  console.log('userinputs', userInput);
  const openAIResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // Puedes cambiar el modelo si es necesario
    messages: userInput,
    max_tokens: 2000,
    temperature: 0.7
  });
  return openAIResponse.choices[0].message;
};
