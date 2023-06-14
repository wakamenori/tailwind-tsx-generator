type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export const TextArea: React.FC<Props> = props => {
  return (
    <textarea
      aria-label="input"
      value={props.value}
      onChange={props.onChange}
      className={
        'w-full h-full flex-glow ull border border-gray-300 p-2 rounded-md'
      }
    />
  )
}
