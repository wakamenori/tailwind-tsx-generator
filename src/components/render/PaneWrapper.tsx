type Props = {
  mode: 'split' | 'full'
  children: React.ReactNode
}

export const PaneWrapper: React.FC<Props> = props => {
  return (
    <div
      className={`${
        props.mode === 'split' ? 'w-1/2' : 'w-full'
      } h-full overflow-scroll sticky top-8 p-3 m-3`}
    >
      {props.children}
    </div>
  )
}
