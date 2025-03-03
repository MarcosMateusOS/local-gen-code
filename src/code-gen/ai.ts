import { Ollama } from "ollama";
import type { Response } from "express";
const ollama = new Ollama({ host: 'http://127.0.0.1:11434' })

const fileContext = Bun.file("./prompts/context.md")


export async function codeGenerate(prompt: string, type: string, res?: Response) {
    console.log("Generating code...")
    console.log("[DEBUG] => ", prompt)

    console.log(await fileContext.text())

    try {
        const response = await ollama.chat({
            model: 'codellama',
            messages: [{ role: 'user', content: prompt }],
            stream: true
        })


        if (type === 'CLI') {
            for await (const part of response) {
                process.stdout.write(part.message.content)
            }
        }


        if (type === 'API' && res) {
            for await (const part of response) {
                const chunk = part.message.content
                console.log("[DEBUG] => ", chunk)
                res.write(chunk)
            }

            res.end()
        }
    } catch (error) {
        console.error("[codeGenerate ERROR] ", error)
    }


}

await codeGenerate("Generate a hello world in typescript", 'CLI')


