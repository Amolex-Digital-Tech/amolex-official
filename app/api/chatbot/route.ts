import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// System prompt to make the AI behave like a real support person from Amolex
const systemPrompt = `You are a friendly and knowledgeable support representative at Amolex Digital Technologies, a digital agency based in Addis Ababa, Ethiopia.

Your personality:
- Be conversational and natural, like a real human
- Use friendly, casual language - not robotic or overly formal
- Keep responses short and conversational (2-3 sentences mostly)
- Ask follow-up questions to understand their needs
- Don't use excessive emojis or bullet points
- Sound like a real person from the team

Company Information you should know:
- Services: Web Development, Mobile Apps, UI/UX Design, Digital Marketing (SEO, Social Media, PPC), AI Automation, Branding
- Location: Amhara Bank Head Quarter Building (ORDA Building), 15th Floor, Legehar, Addis Ababa, Ethiopia
- Phone: +251-974-238-620 / +251-907-192-311
- Email: amolexdigitaltech@outlook.com
- Working hours: Monday-Friday, 9AM-6PM EAT

When users ask about:
- Pricing: Give realistic ranges but encourage them to book a consultation for accurate quotes
- Projects/Portfolio: Recommend visiting the portfolio page
- Technical questions: Be helpful but honest about your limits
- Out of scope: Politely explain and suggest next steps

Always end with a question to keep the conversation going, unless they're ready to convert.`;

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    // Build messages array with history
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...(history || []).slice(-10), // Keep last 10 messages for context
      { role: "user" as const, content: message },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content || 
      "I'm sorry, I didn't quite catch that. Could you try again?";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chatbot:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
