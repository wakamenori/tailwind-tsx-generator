import { IconType } from 'react-icons'

type Props = {
  label: string
  onClick: () => void
  icon?: IconType
  primary?: boolean
  variant?: 'outlined' | 'contained'
}

export const Button: React.FC<Props> = props => {
  const buttonClass = props.primary
    ? 'bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded'
    : props.variant === 'outlined'
    ? 'bg-transparent hover:bg-gray-700 hover:text-white text-gray-700 py-1 px-2 rounded border border-gray-500'
    : 'bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded'

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      aria-label={props.label}
    >
      {props.label}
      {props.icon && <props.icon className="inline-block ml-2" />}
    </button>
  )
}
