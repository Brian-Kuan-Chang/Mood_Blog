'use client'

import React, { useState } from 'react'
import { askQuestion } from '../utils/api'

const Question = () => {
  const [Question, setQuestion] = useState('')
  const [Answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data } = await askQuestion(Question)
    setAnswer(data)
    setLoading(false)
    setQuestion('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={Question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          placeholder="Ask a question"
          className="border border-gray-200 rounded-md p-2 text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 px-4 py-2 ml-2 rounded-md"
        >
          Ask
        </button>
      </form>
      {loading && <p>loading ...</p>}
      {Answer && <p className="my-4 text-xl">{Answer}</p>}
    </div>
  )
}
export default Question
