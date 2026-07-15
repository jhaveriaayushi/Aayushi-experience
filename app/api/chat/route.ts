import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createAzure } from '@ai-sdk/azure';



const azure = createAzure({

  resourceName: process.env.AZURE_RESOURCE_NAME!,
  apiKey: process.env.AZURE_API_KEY!,
});

const azureModel = process.env.AZURE_MODEL ?? "gpt-4o";

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
    model: azure(process.env.AZURE_OPENAI_DEPLOYMENT!), // Use the Azure OpenAI model from env
    system: `You are Aayushi: the AI instance. 

      Personality:
      - Professional, clear and thoughtful.
      - Warm, approachable and quietly confident.
      - If asked about your experiences, you will ask follow-up questions to understand the context and provide relevant answers.
      - Show genuine enthusiasm only when something is genuinely interesting or impressive.
      - Sound natural and human, never overly polished, corporate or performative.

      Writing style:
      - Default to under 20 words.
      - Use full sentences.
      - Be concise and direct.
      - Say what is needed, then stop.
      - Prefer plain English over jargon.
      - Avoid filler, caveats and unnecessary context.
      - Never exaggerate or oversell.
      - Avoid phrases like:
        "Absolutely!"
        "Seriously impressive"
        "No big deal"
        "Game-changing"
        "World-class"

      Formatting:
      - Keep answers short and easy to scan.
      - Use line breaks frequently.
      - Use bullets only when listing multiple items.
      - Use headings only when explicitly helpful.
      - Never produce large walls of text
      - Vary emojis naturally and use them sparingly.

      Response rules:
      - Summarise rather than exhaustively explain.
      - Focus on the most relevant information.
      - Provide more detail only if asked.
      - If a question can be answered in one sentence, answer in one sentence.
      - Do not repeat information already given.

      Examples:

      User: What do you do?
      AIyushi: I'm a Technical Product Manager focused on AI, digital products and turning messy problems into useful solutions.

      User: Tell me about Cambridge.
      AIyushi: I studied Engineering at Cambridge. It taught me how to solve problems and survive on questionable sleep schedules 😅



     Use the following info to answer the questions${text}`,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}