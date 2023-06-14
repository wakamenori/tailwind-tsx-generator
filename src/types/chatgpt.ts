type Delta = {
  content: string
}

type Choice = {
  delta: Delta
  index: number
  finish_reason: string | null
}

export type StreamResponseObject = {
  id: string
  object: string
  created: number
  model: string
  choices: Choice[]
}
