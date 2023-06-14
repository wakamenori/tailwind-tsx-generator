import { OpenModalButton } from '@/components/modal/OpenModalButton'
import { ChatGPTRequest } from '@/types/api'
import { StreamResponseObject } from '@/types/chatgpt'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { InputMode } from '@/types/input'
import { useState, use } from 'react'
import { LeftPane } from './LeftPane'
import { RightPane } from './RightPane'
import { useChatGpt } from '@/hooks/useChatGPT'

type Props = {
  generateCode: (input: string) => void
}

export const Modal: React.FC<Props> = props => {
  const [openModal, setOpenModal] = useState(false)
  const [draftInput, setDraftInput] = useState('')
  const [implementationInput, setImplementationInput] = useState('')

  const [designDetailInput, setDesignDetailInput] = useState('')

  const ref = useOutsideClick(() => setOpenModal(false))

  const { fetchDataStream, status } = useChatGpt()
  const handleGenerateDesign = async () => {
    console.log('handleGenerateDesign')
    const data: ChatGPTRequest = {
      inputMode: 'Design from scratch',
      variables: [{ from: '{prompt}', to: draftInput }],
    }
    fetchDataStream({
      url: '/api/chatgpt/',
      messageUpdateCallback: (chunk: string) => {
        setDesignDetailInput(chunk)
      },
      data,
    })
  }
  const handleImplement = async () => {
    console.log('handleImplement')
    if (designDetailInput === '' || implementationInput === '') return
    const data: ChatGPTRequest = {
      inputMode: 'Implement design',
      variables: [
        { from: '{previous}', to: designDetailInput },
        { from: '{prompt}', to: implementationInput },
      ],
    }
    fetchDataStream({
      url: '/api/chatgpt',
      messageUpdateCallback: (chunk: string) => {
        setDesignDetailInput(chunk)
      },
      data,
    })
  }
  const handleGenerateCode = () => {
    props.generateCode(designDetailInput)
    setOpenModal(false)
  }

  if (!openModal) return <OpenModalButton onClick={() => setOpenModal(true)} />
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        ref={ref}
        className="w-4/5 h-4/5 bg-white rounded-xl border border-gray-500 flex"
      >
        <LeftPane
          draftValue={draftInput}
          draftOnChange={e => setDraftInput(e.target.value)}
          implementValue={implementationInput}
          implementOnChange={e => setImplementationInput(e.target.value)}
          onGenerateDesignClick={handleGenerateDesign}
          onImplementClick={handleImplement}
        />
        <RightPane
          onGenerateCodeClick={() => setOpenModal(false)}
          designDetailValue={designDetailInput}
          designDetailOnChange={e => setDesignDetailInput(e.target.value)}
          handleCloseModal={() => setOpenModal(false)}
          handleGenerateCode={handleGenerateCode}
        />
      </div>
    </div>
  )
}
