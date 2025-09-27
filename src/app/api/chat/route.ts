import {
    Message as VercelChatMessage,
    StreamingTextResponse,
    createStreamDataTransformer
} from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables'
import fs from 'fs/promises';
import path from 'path';


export const dynamic = 'force-dynamic'

const token = process.env.GITHUB_KEY;
const endpoint = "https://models.github.ai/inference";

const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const ASSISTANT_TEMPLATE = `
# HEALTH ASSISTANT PROFILE
**Role:** AI Predictive Health Advisor for MetLife ProHealth AI
**Expertise:** Preventive medicine, lifestyle interventions, health risk assessment, platform guidance

# RESPONSE FRAMEWORK
1. **Acknowledge** - Briefly recognize the user's question
2. **Contextualize** - Relate to platform features if relevant
3. **Inform** - Provide evidence-based information
4. **Suggest** - Offer specific, actionable recommendations
5. **Next Steps** - Suggest follow-up actions or platform features to explore

# KNOWLEDGE BASE
- Platform Features: {context}
- Medical Knowledge: Current guidelines & best practices
- Conversation History: {chat_history}

# CURRENT QUERY
User: {question}

# RESPONSE GUIDELINES
- Be supportive and non-judgmental
- Focus on prevention and positive changes
- Suggest measurable, achievable goals
- Always encourage professional consultation for medical diagnoses
- Highlight relevant platform features that can help

HEALTH ASSISTANT:`;

export async function POST(req: Request) {
    try {

        const { messages } = await req.json();

        const formattedMessagesList = messages.slice(0, -1).map(formatMessage);
        const currentMessageContent = messages[messages.length - 1].content;

        const filePath = path.join(process.cwd(), 'src/app/api/context.txt');
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const prompt = PromptTemplate.fromTemplate(ASSISTANT_TEMPLATE);

        const model = new ChatOpenAI({
            apiKey: token,
            model: 'openai/gpt-4.1',
            configuration: {
                baseURL: endpoint,
            },
            temperature: 0.7,
            streaming: true,
        });

        const parser = new HttpResponseOutputParser();

        const chain = RunnableSequence.from([
            {
                question: (input) => input.question,
                chat_history: (input) => input.chat_history,
                context: () => fileContent,
            },
            prompt,
            model,
            parser,
        ]);

        const stream = await chain.stream({
            chat_history: formattedMessagesList.join('\n'),
            question: currentMessageContent,
        });

        return new StreamingTextResponse(
            stream.pipeThrough(createStreamDataTransformer()),
        );
    } catch (error: unknown) {
        return Response.json({ error });
    }
}