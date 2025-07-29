import { NextRequest, NextResponse } from "next/server";
import { openai } from "../constant";

export async function POST(req=NextRequest,res=NextResponse) {
    const { value,codeLang} = await req.json();
    console.log(value,codeLang);
    if (!value) return  NextResponse.json({ error: "No code provided" });

    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a code debugging and explainer assistant. If the inputted code contains errors, respond  the corrected code and include comments explaining the changes made. If the code is correct, provide an explanation of how it works. Do not include markdown code block syntax or any other formatting."
                },
                {
                    role: "user",
                    content:`fix ${value} and code language is ${codeLang} `
                }
            ],
        });

        let explanation = completion.choices[0].message.content;
        explanation = explanation.replace(/^```[\w]*\n?/, '');
        explanation = explanation.replace(/```$/, '');
        explanation = explanation.trim();
        console.log(explanation);
        return NextResponse.json({ explanation });
    } catch (error)
    {
        console.error('Error:', error);
        return NextResponse.json({ error: "OpenAI explanation failed" });
    }
    
}