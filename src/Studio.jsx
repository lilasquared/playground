import React, { useState, useEffect } from "react"
import * as components from "reactstrap"

const CanvasItem = ({
  component: Component,
  main = false,
  outline = false,
  setAddChild,
  ...rest
}) => {
  const style = outline ? { outline: "1px solid red" } : {}
  const [children, setChildren] = useState(rest.children || [])

  const addChild = child => setChildren([...children, child])

  useEffect(() => {
    if (main) {
      setAddChild({
        add: addChild,
      })
    }
  }, [])

  return (
    <Component
      {...rest}
      style={style}
      children={children}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        console.log(Component)
        setAddChild({
          add: addChild,
        })
      }}
    />
  )
}

const div = props => <div {...props} />

export default function Studio() {
  const [activeElement, setActiveElement] = useState("Button")
  const [addChild, setAddChild] = useState({
    add: () => {},
  })

  const propKeys = Object.keys(components[activeElement].propTypes || {})

  return (
    <components.Container fluid>
      <components.Row>
        <components.Col md="2">
          <form
            onSubmit={e => {
              e.preventDefault()
              const props = {}
              console.log(propKeys)
              propKeys.forEach(key => {
                if (e.target[key].value) {
                  props[key] = e.target[key].value
                }
              })
              console.log(props)
              addChild.add(
                <CanvasItem
                  component={components[activeElement]}
                  outline
                  setAddChild={setAddChild}
                  {...props}
                />
              )
            }}
          >
            <button type="submit">Add Component</button>
            <select
              name="component"
              value={activeElement}
              onChange={e => setActiveElement(e.target.value)}
            >
              {Object.keys(components).map(x => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <ul>
              {propKeys.map(x => (
                <li>
                  {x} <input name={x} />
                </li>
              ))}
            </ul>
          </form>
        </components.Col>
        <components.Col md="10">
          <CanvasItem component={div} setAddChild={setAddChild} outline main />
        </components.Col>
      </components.Row>
    </components.Container>
  )
}
