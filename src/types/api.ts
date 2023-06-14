import { InputMode } from './input'
export type ApiStatus = 'loading' | 'ready' | 'error'

export type ChatGPTRequest = {
  inputMode: InputMode
  variables: { from: string; to: string }[]
}
