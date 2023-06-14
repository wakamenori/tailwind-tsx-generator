import GeneratedCode from './GeneratedCode'
type Props = {}

export const Preview = (props: Props) => {
  try {
    return (
      <div className={'border border-gray-300 rounded-md'}>
        <GeneratedCode />
      </div>
    )
  } catch (e) {
    return <div>error</div>
  }
}
