const dotEnv = require("dotenv")
dotEnv.config()
const { z } = require("zod")
const personSchema = z.object({
    name: z.string().nullable().optional()
        .describe("The name of the person"),
    hair_color: z.string().nullable().optional()
        .describe("The color of the person's hair if known"),
    height_in_meters: z.string().nullable().optional()
        .describe("Height measured in meters"),
})
const { ChatPromptTemplate } = require("@langchain/core/prompts")
const { ChatOpenAI } = require("@langchain/openai")
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", `You are an expert extraction algorithm.
Only extract relevant information from the text.
If you do not know the value of an attribute asked to extract,
return null for the attribute's value.`,],
    ["human", "{text}"]
])
const llm = new ChatOpenAI({
    model: "gpt-4.1",
    temperature: 0,
})
const structured_llm = llm.withStructuredOutput(personSchema);
async function main() {
    const prompt = await promptTemplate.invoke({
        text: "Alan Smith is 6 feet tall and has blond hair."
    })
    const res = await structured_llm.invoke(prompt)
    console.log(res)
    const structured_llm2 = llm.withStructuredOutput(personSchema, {
        name: "person"
    })
    const prompt2 = await promptTemplate.invoke({
        text: "Alan Smith is 6 feet tall"
    })
    const res2 = await structured_llm2.invoke(prompt2)
    console.log(res2)
}
main()