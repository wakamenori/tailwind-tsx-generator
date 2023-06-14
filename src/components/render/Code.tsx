import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

type Props = {
  code: string
}

export const Code: React.FC<Props> = props => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={docco}
      showLineNumbers={true}
    >
      {props.code}
    </SyntaxHighlighter>
  )
}
