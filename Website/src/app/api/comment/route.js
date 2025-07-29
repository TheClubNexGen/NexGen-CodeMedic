import { NextRequest, NextResponse } from "next/server";
import { openai } from "../constant";

export async function POST (req = NextRequest, res = NextResponse)
{
    const { value, codeLang } = await req.json()
    console.log(value);
    if (!value) return NextResponse.json({ error: "No code provided" });

    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a code commenting assistant. Your task is to analyze the given code and insert meaningful comments before key logic sections, functions, and important steps. Ensure that the comments explain the purpose of each section, making the code easier to understand. Use clear and concise language for the comments. Maintain the original structure of the code while adding explanations. Do not alter the logic of the code. Return the commented code as output"
                },
                {
                    role: "user",
                    content: `this code:\n\n${value} and code language is ${codeLang}`
                }
            ],
        });

        let commented = completion.choices[0].message.content;
        commented = commented.replace(/^```[\w]*\n?/, '');
        commented = commented.replace(/```$/, '');
        commented = commented.trim();
        console.log(commented);
        return NextResponse.json({ commented });
    } catch (error)
    {
        console.error('Error:', error);
        return NextResponse.json({ error: "OpenAI debugging failed: " + error.message });
    }
}