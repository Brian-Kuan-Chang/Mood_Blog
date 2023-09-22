import {
  StructuredOutputParser,
  OutputFixingParser,
} from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { z } from 'zod'
import { OpenAI } from 'langchain/llms/openai'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Document } from 'langchain/document'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe('The mood of the person who wrote this article'),
    subject: z.string().describe('the subject to the journal'),
    color: z
      .string()
      .describe(
        'a hexdicimal color code that represents the mood of the entry, hexdicimal format as #0101FE '
      ),
    summary: z.string().describe('quick summary about the journal'),
    negative: z
      .string()
      .describe(
        'is the mood of the person who wrote the journal in negative emotions, answer true or false'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the journal rated on a scale of 0 to 10, 0 is negative, 10 is positive, 5 is neutral'
      ),
  })
)
const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'analyze the follwing journal. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions: format_instructions },
  })
  const input = await prompt.format({
    entry: content,
  })
  return input
}

export const analyzeEntry = async (entry) => {
  const input = await getPrompt(entry.content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const output = await model.call(input)

  try {
    return parser.parse(output)
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
      parser
    )
    const fix = await fixParser.parse(output)
    return fix
  }
}
export const qa = async (question, entries) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  )
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })
  console.log('res:', res)
  return res.output_text
}
