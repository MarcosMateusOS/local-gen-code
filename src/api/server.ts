import express from "express";
import { codeGenerate } from "../code-gen/ai";

const app = express()
const PORT = process.env.API_PORT ?? 8080

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/generate", async (req, res) => {
    //const result = new Response({ codeGenerate("Generate a simple smaple of html page") })

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });


    await codeGenerate("Generate a simple example of html page", "API", res)
    console.log("RETURN")

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})