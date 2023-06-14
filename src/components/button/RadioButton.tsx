type Props = {
  onClick: () => void
  checked: boolean
  label: string
}

export const RadioButton: React.FC<Props> = props => {
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        className="form-radio text-green-700"
        name={props.label}
        value="scratch"
        checked={props.checked}
        onChange={props.onClick}
      />
      <span className="ml-2">{props.label}</span>
    </label>
  )
}
