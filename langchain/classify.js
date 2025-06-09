const { ChatPromptTemplate } = require("@langchain/core/prompts")
const dotEnv = require("dotenv")
dotEnv.config()

async function main() {
    const { ChatOpenAI } = require("@langchain/openai")
    const llm = new ChatOpenAI({
        model: "gpt-4.1",
        temperature: 0
    })

    const { z } = require("zod")
    const targetPrompt = ChatPromptTemplate.fromTemplate(`Extract the desired information from the following passage.
        Only extract the properties mentioned in the 'Classification' function.
        Passage:
    {input}
    `)
    const classificationSchema = z.object({
        sentiment: z.enum(["happy", "neutral", "sad"]).describe("The sentiment of the text"),
        aggressiveness: z.number().int().describe("How aggressive the text is on a scale from 1 to 10"),
        language: z.string().describe("The langauge the text is written in, like Italian")
    })
    const llmWithStructedOutput = llm.withStructuredOutput(classificationSchema, {
        name: "extractor"
    })
    const prompt1 = await targetPrompt.invoke({
        input: "Estoy increiblemente contento de haberte conocido! Creo que seremos muy buenos amigos!"
    })
    console.log(prompt1)
    const res = await llmWithStructedOutput.invoke(prompt1)
    console.log(res)
}

main()