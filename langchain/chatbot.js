const { MessagesAnnotation, StateGraph, START, END, MemorySaver } = require("@langchain/langgraph")
const { v4: uuidv4 } = require("uuid")
const { ChatOpenAI } = require("@langchain/openai")
const dotEnv = require("dotenv")
dotEnv.config()

const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0
})

/**
 * @param {MessagesAnnotation} state
 */
const callModel = async (state) => {
    const response = await llm.invoke(state.messages)
    return { messages: response }
}

async function main() {
    // const response = await llm.invoke([
    //     {
    //         role: "user",
    //         content: "Hello, I'm Bob"
    //     },
    //     {
    //         role: "assistant",
    //         content: "Hello Bob! How can I assist you today?"
    //     },
    //     {
    //         role: "user",
    //         content: "What is my name?"
    //     }
    // ])
    // console.log(response)

    // Graph
    const workflow = new StateGraph(MessagesAnnotation)
        .addNode("model", callModel)
        .addEdge(START, "model")
        .addEdge("model", END)
    const memory = new MemorySaver()
    const app = workflow.compile({checkpointer: memory})
    const config = {configurable: {thread_id: uuidv4()}}
    const input = [
        {
            role: "user",
            content: "Hi! I'm Bob."
        }
    ]
    const output = await app.invoke({ messages: input }, config)
    console.log(output)
    const input2 = [
        {
            role: "user",
            content: "What's my name?"
        }
    ]
    const output2 = await app.invoke({ messages: input2 }, config)
    console.log(output2)
    const config2 = {configurable: {thread_id: uuidv4()}}
    const input3 = [
        {
            role: "user",
            content: "What is my name?"
        }
    ]
    const output3 = await app.invoke({ messages: input3 }, config2)
    console.log(output3)
}
main();