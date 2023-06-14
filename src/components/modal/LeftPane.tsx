import { FaDraftingCompass } from 'react-icons/fa'
import { TiSpannerOutline } from 'react-icons/ti'
import { Pane } from './Pane'

type Props = {
  draftValue: string
  draftOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  implementValue: string
  implementOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onGenerateDesignClick: () => void
  onImplementClick: () => void
}

export const LeftPane: React.FC<Props> = props => {
  return (
    <div className="h-full w-1/2">
      <div className=" h-1/2">
        <Pane
          title="What you want to build"
          value={props.draftValue}
          onChange={props.draftOnChange}
          icon={FaDraftingCompass}
          label={'Generate Design'}
          onClick={props.onGenerateDesignClick}
        />
      </div>
      <div className=" h-1/2">
        <Pane
          title="Implementation"
          value={props.implementValue}
          onChange={props.implementOnChange}
          icon={TiSpannerOutline}
          label={'Implement'}
          onClick={props.onImplementClick}
        />
      </div>
    </div>
  )
}
