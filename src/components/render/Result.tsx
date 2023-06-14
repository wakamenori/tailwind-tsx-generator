import { Code } from '@/components/render/Code'
import { Preview } from '@/components/render/Preview'
import { RenderOption } from '@/types/display'
import { useState } from 'react'
import { PaneWrapper } from './PaneWrapper'
import { SwitchRenderMode } from './SwitchRenderMode'

type Props = {
  generatedCode: string
  isLoading: boolean
}

export const Result: React.FC<Props> = props => {
  const [renderOption, setRenderOption] =
    useState<RenderOption>('Code and Preview')

  return (
    <>
      <SwitchRenderMode option={renderOption} setOption={setRenderOption} />
      <div className="mt-8">
        {renderOption === 'Code Only' && (
          <PaneWrapper mode="full">
            <Code code={props.generatedCode} />
          </PaneWrapper>
        )}
        {renderOption === 'Preview Only' && (
          <PaneWrapper mode="full">
            <Preview />
          </PaneWrapper>
        )}
        {renderOption === 'Code and Preview' && (
          <div className="flex">
            <PaneWrapper mode={'split'}>
              <Code code={props.generatedCode} />
            </PaneWrapper>
            <PaneWrapper mode={'split'}>
              <Preview />
            </PaneWrapper>
          </div>
        )}
      </div>
    </>
  )
}
