import { AiOutlineCloseCircle } from 'react-icons/ai'

type Props = {
  onClick: () => void
}

export const CloseModalButton: React.FC<Props> = props => {
  return (
    <button
      aria-label="Close label"
      className="p-2 transition duration-300 ease-in-out transform hover:scale-110"
      onClick={props.onClick}
    >
      <AiOutlineCloseCircle size={24} />
    </button>
  )
}
