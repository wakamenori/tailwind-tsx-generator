import { BsChatDots } from 'react-icons/bs'

type Props = {
  onClick: () => void
}

export const OpenModalButton: React.FC<Props> = props => {
  return (
    <button
      aria-label="Open modal"
      onClick={props.onClick}
      className="
        bg-blue-500 
        hover:bg-blue-700 
        active:bg-blue-800 
        text-white 
        font-bold 
        py-2 
        px-4 
        rounded-full 
        fixed 
        bottom-4 
        right-4 
        shadow-lg 
        transition
        transform 
        hover:-translate-y-1 
        hover:scale-110
      "
    >
      <BsChatDots className="text-2xl" />
    </button>
  )
}
