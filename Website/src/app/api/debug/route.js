import { NextRequest, NextResponse } from "next/server"
import { openai } from "../constant.js";
 

export async function POST (req = NextRequest, res = NextResponse)
{
    try
    {
        const { value,inputError,codeLang } = await req.json();
     
        console.log(value,codeLang);

        if (!value) return NextResponse.json({ error: "No code provided" });
         
        try
        {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a highly skilled code debugging assistant. Your task is to analyze the given code , identify any errors, and provide a corrected version. Return only the fixed code with little informative comments explaining the changes where necessary. Ensure that the logic and structure of the original code are preserved. Do not include any explanations, markdown syntax, or extra formatting—just the corrected code with brief inline comments where needed."
                    },
                    {
                        role: "user",
                        content: `The following code has encountered an error: ${inputError}. Your task is to analyze the provided error details, identify the necessary corrections, and fix the code while preserving its original logic. Return only the corrected code with minor, informative comments explaining the changes. Do not include any explanations or formatting—just the corrected code.\n\nCode:\n\n${value} and code language is ${codeLang}`
                    }
                ],
            });
    
            let debugged = completion.choices[0].message.content;
            debugged = debugged.replace(/^```[\w]*\n?/, '');
            debugged = debugged.replace(/```$/, '');
            debugged = debugged.trim();
    
           
            return NextResponse.json({ debugged });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "An error occurred during debugging" });
        }
    } catch (error)
    {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while processing the request" });
    }
}