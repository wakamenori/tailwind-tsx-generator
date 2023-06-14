import { InputMode } from '@/types/input'
import { ChatCompletionRequestMessage } from 'openai'

const PROMPT: {
  [key in InputMode]: ChatCompletionRequestMessage[]
} = {
  'Design from scratch': [
    {
      role: 'assistant',
      content: `You are a professional product manager.
# Instruction
1. Generate an idea of the UI design of the component following the best practices.
2. Generate a highly detailed description of a pure well-designed component based on the user input.
3. Generate a list of all required types (only names)
4. Generate a list of all required dummy data

# Detailed UI/UX explanation
## Features
- <feature>
  - <detail>
## Design
- Total layout
  - <explanation of the layout>
- Segment layout
  - <explanation of the layout by segment>

# Component design
## Component name
## Props with types
## States
## Event Handlers
## Hooks
# List of names of required types (without type data)
# List of names of required dummy data (without actual data)`,
    },
    { role: 'user', content: `# Design Request from User
{prompt}` },
  ],
  'Generate code': [
    {
      role: 'assistant',
      content: `You are a professional Next.js developer.

# Instruction
- Define and Generate required types and dummy data.
- Generate all required Next.js components in one file.
  - Generate a main component based on user input
  - Generate an outer component that calls the main component with dummy props data.
  - Export the outer component as default.
- Import only built-in modules or packages.
- Comment out all data-related processing.
- Use typescript and tailwind.
- Starts with the import statement and ends with the export default statement.
- Use react-icons when you need them.
- Output the code only.`
    },
    {
      role: 'user',
      content: `You are a professional Next.js developer.

# Instruction
- Define and Generate required types and dummy data.
- Generate all required Next.js components in one file.
  - Generate a main component based on user input
  - Generate an outer component that calls the main component with dummy props data.
  - Export the outer component as default.
- Import only built-in modules or packages.
- Comment out all data-related processing.
- Use typescript and tailwind.
- Starts with the import statement and ends with the export default statement.
- Use react-icons when you need them.
- Output the code only.

# Request from User
---
{prompt}
---

# Template
// Define all dummy data
const dummyData = {} // rename as you like
// Define all types
// import required hooks, icons
import React from 'react'
type InnerProps = {} // rename as the component name
// rename as the component name
const InnerComponent: React.FC<InnerProps> = (props) => {
  return <div></div>
}

const OuterComponent: React.FC<InnerProps> = (props) => {
  const innerProps = {}. // generate dummy props, and data
  return <InnerComponent {...innerProps}/>
}
export default OuterComponent;`,
    },
  ],
  'Implement design': [
    {
      role: 'system',
      content: `You are a UI designer and software developer.
# Instruction
Modify the design based on user input.
Update only what the user mentioned.
User same format as the current version.

---
{previous}
---
    `,
    },
    {
      role: 'user',
      content: `This is the request by the user. Based on this, update the design and hooks explanation
---
{prompt}
---`,
    },
  ],
}

export class Prompt {
  public prompt: ChatCompletionRequestMessage[]
  constructor(
    public inputMode: InputMode,
    public variables: { from: string; to: string }[],
  ) {
    console.log(Object.keys(PROMPT), inputMode)
    this.prompt = PROMPT[inputMode].map(({ role, content }) => {
      return {
        role,
        content: variables.reduce((str, replacement) => {
          return str.split(replacement.from).join(replacement.to)
        }, content),
      }
    })
    this.inputMode = inputMode
    this.variables = variables
  }
}
