import { Prompt } from '@/lib/prompt'
import { InputMode } from '@/types/input'
import { ChatCompletionRequestMessage } from 'openai'

import { NextApiResponse } from 'next'
import type { NextRequest } from 'next/server'
export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  const { variables, inputMode } = (await req.json()) as {
    inputMode: InputMode
    variables: { from: string; to: string }[]
  }

  const messages: ChatCompletionRequestMessage[] = new Prompt(
    inputMode,
    variables,
  ).prompt
  console.log(messages)
  const payload = {
    model: 'gpt-3.5-turbo-0613',
    messages,
    temperature: 0,
    stream: true,
  }
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return new Response(response.body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
