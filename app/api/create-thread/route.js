// pages/api/create-thread.js
import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req, res) {

    try {
        const thread = await openai.beta.threads.create();
        const responseData = {
            threadId: thread.id,
        };

        return new Response(JSON.stringify(responseData), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Error occurred.', { status: 500 });
    }

}
