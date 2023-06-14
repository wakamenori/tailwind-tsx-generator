import { StreamResponseObject } from '@/types/chatgpt'

import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser'
import { useState } from 'react'

export const useChatGpt = () => {
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('done')
  const fetchDataStream = async (opt: {
    url: string
    messageUpdateCallback: (chunk: string) => void
    data: object
  }) => {
    setStatus('loading')
    let responseText = ''
    try {
      const response = await fetch(opt.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(opt.data),
      })

      if (!response.ok) {
        setStatus('error')
        throw new Error(response.statusText)
      }

      const reader = (response.body as ReadableStream).getReader()
      const decoder = new TextDecoder()

      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          try {
            const data = JSON.parse(event.data) as StreamResponseObject
            data.choices
              .filter(({ delta }) => !!delta.content)
              .forEach(({ delta }) => {
                const chunk = delta.content
                responseText = responseText + chunk
                opt.messageUpdateCallback(responseText)
              })
          } catch (error) {
            setStatus('error')
          }
        }
      }

      const parser = createParser(onParse)

      while (true) {
        const { value, done } = await reader?.read()
        const dataString = decoder
          .decode(value, { stream: true })
          .replace('data: [DONE]', '')
        if (done) {
          setStatus('done')
          break
        }
        parser.feed(dataString)
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return { fetchDataStream, status }
}
