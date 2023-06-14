import { Modal } from '@/components/modal/Modal'
import {  Result } from '@/components/render/Result'
import { useChatGpt } from '@/hooks/useChatGPT'
import { ChatGPTRequest } from '@/types/api'
import { useEffect, useState } from 'react'

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState(`import React from 'react';

const HelloWorld: React.FC = () => {
  return <div>Hello, World!</div>;
};

export default HelloWorld;`)
  const { fetchDataStream, status } = useChatGpt()

  const generateCode = (input: string) => {
    const data: ChatGPTRequest = {
      inputMode: 'Generate code',
      variables: [{ from: '{prompt}', to: input }],
    }
    fetchDataStream({
      url: '/api/chatgpt',
      messageUpdateCallback: (chunk: string) => {
        setGeneratedCode(chunk)
      },
      data,
    })
  }

  useEffect(() => {
    if (generatedCode !== '' && status === 'done') {
      fetch('/api/render', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tsxCode: generatedCode }),
      }).catch(err => {
        console.error(err)
      })
    }
  }, [generatedCode, status])

  return (
    <main>
      <Result generatedCode={generatedCode} isLoading={status === 'loading'} />
      <Modal generateCode={generateCode} />
    </main>
  )
}
