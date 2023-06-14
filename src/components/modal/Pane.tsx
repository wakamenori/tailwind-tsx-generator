import { TextArea } from './TextArea'
import { IconType } from 'react-icons'
import { Button } from '../button/Button'

type Props = {
  title: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  icon: IconType
  label: string
  onClick: () => void
}

export const Pane: React.FC<Props> = props => {
  return (
    <div className="flex flex-col w-full h-full p-2 flex-glow">
      <div className="flex items-center justify-between mb-1">
        <p className="text-lg font-bold">{props.title}</p>
        <Button label={props.label} onClick={props.onClick} icon={props.icon} />
      </div>
      <TextArea value={props.value} onChange={props.onChange} />
    </div>
  )
}
