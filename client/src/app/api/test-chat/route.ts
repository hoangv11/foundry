import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-2.5-flash'),
      messages: messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Test chat error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
