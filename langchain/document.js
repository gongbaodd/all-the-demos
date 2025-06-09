const dotEnv = require("dotenv");
dotEnv.config();

const { Document } = require("@langchain/core/documents")

const documents = [
    new Document({
        pageContent: "Dogs are great companions, known for their loyalty and friendliness",
        metadata: {
            source: "mammal-pets-doc"
        }
    }),
    new Document({
        pageContent: "Cats are independent pets that often enjoy their own space.",
        metadata: { source: "mammal-pets-doc" },
    }),
]

const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf")

async function main() {
    // PDF
    const loader = new PDFLoader("./nke-10k-2023.pdf");
    const docs = await loader.load();
    console.log(docs.length);
    console.log(docs[0].pageContent.slice(0, 200));
    console.log(docs[0].metadata);
    // Splitter
    const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters")
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    })
    const allSplits = await textSplitter.splitDocuments(docs)
    console.log(allSplits.length)
    // Embeddings
    const { OpenAIEmbeddings } = require("@langchain/openai")
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-ada-002"
    })
    const vector1 = await embeddings.embedQuery(allSplits[0].pageContent);
    const vector2 = await embeddings.embedQuery(allSplits[1].pageContent);
    console.assert(vector1.length === vector2.length);
    console.log(`Generated vectors of length ${vector1.length}`); // 1536
    console.log(vector1.slice(0, 10));
    // memory
    const { MemoryVectorStore } = require("langchain/vectorstores/memory")
    const vectorStore = new MemoryVectorStore(embeddings)
    for (const doc of allSplits) {
        await vectorStore.addDocuments([doc]);
    }
    console.log("addDocuments")
    const results1 = await vectorStore.similaritySearchWithScore("When was Nike incorporated?");
    console.log(results1);
}

main()