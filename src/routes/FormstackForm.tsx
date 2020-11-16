import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";

const useScript = (
  url: string,
  id: string,
  node: React.RefObject<HTMLDivElement>
) => {
  const [formRendered, setFormRendered] = useState<boolean>(false)

  useEffect(() => {
    document.addEventListener('FormstackForm_Rendered', () =>
      setFormRendered(true)
    )

    const script = document.createElement('script')
    const renderPoint = node
    script.type="text/javascript"
    script.src = url
    script.id = id
    script.async = true

    if (renderPoint && renderPoint.current)
      renderPoint.current.appendChild(script)

    return () => {
      if (renderPoint && renderPoint.current) {
        renderPoint.current.removeChild(script)
      }

      document.removeEventListener('FormstackForm_Rendered', () =>
        setFormRendered(false)
      )
    }
  }, [url, id, node])

  return formRendered
}

const FormstackForm: React.FunctionComponent<{ scriptURL: string }> = ({
  scriptURL,
}) => {
  const node = useRef<HTMLDivElement>(null)
  const formRendered = useScript(
    `https://formstack-mycredimi.cs109.force.com/services/apexrest/VisualAntidote/FFNEngine/v1/?d=${scriptURL}`,
    'jsFastForms',
    node
  )

  return (
    <div>
      <div>{formRendered ? 'Form Rendered!' : 'Loading...'}</div>
      <Link to='/'>Return to homepage</Link>
      <div ref={node} />
    </div>
  )
}

export { FormstackForm }
