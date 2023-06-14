import { TextArea } from '@/components/modal/TextArea'

import { Button } from '../button/Button'

type Props = {
  designDetailValue: string
  designDetailOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleCloseModal: () => void
  handleGenerateCode: () => void
  onGenerateCodeClick: () => void
}

export const RightPane: React.FC<Props> = props => {
  return (
    <div className={'w-1/2 h-full p-2 flex flex-col'}>
      <TextArea
        value={props.designDetailValue}
        onChange={props.designDetailOnChange}
      />
      <div className="flex justify-around pt-2">
        <Button
          label={'Close'}
          onClick={props.handleCloseModal}
          variant="outlined"
        />
        <Button
          primary
          label={'Generate Code'}
          onClick={props.handleGenerateCode}
        />
      </div>
    </div>
  )
}
