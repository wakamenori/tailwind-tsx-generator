import { RenderOption } from '@/types/display'
import { RadioButton } from '../button/RadioButton'

type Props = {
  option: RenderOption
  setOption: (option: RenderOption) => void
}

export const SwitchRenderMode: React.FC<Props> = props => {
  return (
    <div className="flex justify-center fixed top-0 z-50 bg-white w-full">
      <div className="flex items-center space-x-4">
        <RadioButton
          onClick={() => props.setOption('Code Only')}
          checked={props.option === 'Code Only'}
          label="Code Only"
        />
        <RadioButton
          onClick={() => props.setOption('Preview Only')}
          checked={props.option === 'Preview Only'}
          label="Preview Only"
        />
        <RadioButton
          onClick={() => props.setOption('Code and Preview')}
          checked={props.option === 'Code and Preview'}
          label="Code and Preview"
        />
      </div>
    </div>
  )
}
