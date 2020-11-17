import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from "react-router-dom";

const useScript = (
  url: string,
  id: string,
  node: React.RefObject<HTMLDivElement>
) => {
  const [formRendered, setFormRendered] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('FormstackForm_Rendered', () =>
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
      const spurNode = document.getElementById('FF_JSAPI')?.remove()
      const spurNode2 = document.getElementById('ff-ui-datepicker-div')?.remove()

      window.removeEventListener('FormstackForm_Rendered', () =>
        setFormRendered(false)
      )
    }
  }, [url, id, node])

  return formRendered
}

const FormstackForm: React.FunctionComponent<{ scriptURL: string }> = ({
  scriptURL,
}) => {
  const history = useHistory()
  console.log(history)
  const node = useRef<HTMLDivElement>(null)
  const formRendered = useScript(
    `https://formstack-mycredimi.cs109.force.com/services/apexrest/VisualAntidote/FFNEngine/v1/?d=${scriptURL}`,
    'jsFastForms',
    node
  )

  // useEffect(() => {
  //   window.addEventListener('popstate', () => {
  //     history.go(1)
  //     window.location.reload()
  //   })
  // })


  return (
    <div>
      <div>{formRendered ? 'Form Rendered!' : 'Loading...'}</div>
      <Link to='/'>Return to homepage</Link>
      <div ref={node} />
    </div>
  )
}

export { FormstackForm }
