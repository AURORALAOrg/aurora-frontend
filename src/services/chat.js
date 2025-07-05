import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    // Call Deepseek API
    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY ?? ""}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content:
                "You are AURORA, a helpful AI language learning assistant. Provide clear, encouraging responses to help users learn languages. Keep responses concise and educational.",
            },
            // Include conversation history for context
            ...history.slice(-5).map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Deepseek API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse =
      data.choices[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
