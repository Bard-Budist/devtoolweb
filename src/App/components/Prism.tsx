import * as React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
interface PrismProps {
  code: string
  language: Language
}
const prism = (props: PrismProps) => {
  const theme = require('prism-react-renderer/themes/dracula') // dracula, duotoneDark, duotoneLight, nightOwl, oceanicNext, shadesOfPurple, vsDark, vsDarkPlus
  return (
    <Highlight {...defaultProps} theme={theme} code={props.code} language={props.language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className='m-t-15'>
          <pre className={className} style={style}>
            <code className='language-markup'>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  )
}
export default prism
