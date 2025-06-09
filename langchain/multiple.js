const { ChatOpenAI } = require("@langchain/openai")
const dotEnv = require("dotenv")
dotEnv.config()
const { z } = require("zod")
const person = z.object({
    name: z.string().nullable().optional()
        .describe("The name of the person"),
    hair_color: z.string().nullable().optional()
        .describe("The color of the person's hair if known"),
    height_in_meters: z.number().nullish()
        .describe("Height measured in meters")
})
const dataSchema = z.object({
    people: z.array(person)
        .describe("Extracted data about people")
})
const { ChatPromptTemplate } = require("@langchain/core/prompts")
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", `You are an expert extraction algorithm.
Only extract relevant information from the text.
If you do not know the value of an attribute asked to extract, return null for the attribute's value.
`,],
    ["human", "{text}"]
])
const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
})
async function main() {
    const structured_llm3 = llm.withStructuredOutput(dataSchema)
    const prompt3 = await promptTemplate.invoke({
        text: "My name is Jeff, my hair is black and i am 6 feet tall. Anna has the same color hair as me."
    })
    const res = await structured_llm3.invoke(prompt3)
    console.log(res);
}
main()