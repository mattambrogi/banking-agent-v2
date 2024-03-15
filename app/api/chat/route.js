
import OpenAI from "openai";
const openai = new OpenAI();


export async function POST(request) {
    try {
        const req = await request.json()
        const userInput = req.userInput;
        let threadId = req.threadId;

        const assistant = await openai.beta.assistants.retrieve(
            process.env.ASSISTANT_ID
        );

        if (!threadId) {
            const thread = await openai.beta.threads.create();
            threadId = thread.id
        }


        const message = await openai.beta.threads.messages.create(
            threadId,
            {
                role: "user",
                content: userInput
            }
        );

        let run = await openai.beta.threads.runs.create(
            threadId,
            {
                assistant_id: assistant.id
            }
        );

        while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            run = await openai.beta.threads.runs.retrieve(
                run.thread_id,
                run.id
            );
        }
        let aiResponse

        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(
                run.thread_id
            );
            aiResponse = messages.data[0].content[0].text.value
        } else {
            console.log(run.status);
        }

        const responseData = {
            message: aiResponse,
        };

        return new Response(JSON.stringify(responseData), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Error occurred.', { status: 500 });
    }
}
