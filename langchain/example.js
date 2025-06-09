const dotEnv = require("dotenv");
dotEnv.config();

const { ChatOpenAI } = require("@langchain/openai");
const model = new ChatOpenAI({ model: "gpt-4.1"});

const { HumanMessage, SystemMessage } = require("@langchain/core/messages")

const messages = [
    new SystemMessage("Translate the following from English to Italian"),
    new HumanMessage("I love programming")
]

async function main() {
    // Text
    // const response = await model.invoke(messages);
    // console.log(response);

    // Stream
    // const stream = await model.stream(messages);
    // const chunks = [];
    // for await(const chunk of stream) {
    //     chunks.push(chunk);
    //     console.log(`${chunk.content}|`);
    // }

    const { ChatPromptTemplate } = require("@langchain/core/prompts")
    const systemTemplate = "Translate the following from English into {language}"
    const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", systemTemplate],
        ["user", "{text}"]
    ])
    const promptValue = await promptTemplate.invoke({
        language: "Chinese",
        text: "I love programming"
    })
    console.log(promptValue.toChatMessages());
    const response = await model.invoke(promptValue);
    console.log(response.content);
}

main()