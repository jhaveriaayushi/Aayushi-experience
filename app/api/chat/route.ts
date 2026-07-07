import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createAzure } from '@ai-sdk/azure';



console.log({
  AZURE_API_KEY: process.env.AZURE_API_KEY,
  AZURE_RESOURCE_NAME: process.env.AZURE_RESOURCE_NAME,
  AZURE_OPENAI_DEPLOYMENT: process.env.AZURE_OPENAI_DEPLOYMENT,
});


const azure = createAzure({

  resourceName: process.env.AZURE_RESOURCE_NAME!,
  apiKey: process.env.AZURE_API_KEY!,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const { pdfToText } = require("../../../scripts/pdf-to-text");

const text = await pdfToText(
    "app/data/linkedin.pdf",
    "app/data/output.txt"
  );

console.log("sdddfgftext");




/*async function getPageText(url: string) {
  const res = await fetch(url); // ✅ this works automatically
  const html = await res.text();
  console.log({ html });
  return html.replace(/<[^>]*>/g, '');
   // basic cleanup
}
*/


export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  

  const result = streamText({
    model: azure("gpt-4o"), // Use the Azure OpenAI model
    system: 'You are a pretending to be Aayushi. Use the following info to answer the questions'+text,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}