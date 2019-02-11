import React from "react"

function createStyleObject(classNames, elementStyle = {}, stylesheet) {
  return classNames.reduce((styleObject, className) => {
    return { ...styleObject, ...stylesheet[className] }
  }, elementStyle)
}

function createClassNameString(classNames) {
  return classNames.join(" ")
}

function createChildren(stylesheet, useInlineStyles, renderText) {
  let childrenCount = 0
  return children => {
    childrenCount += 1
    return children.map((child, i) =>
      createElement({
        node: child,
        stylesheet,
        useInlineStyles,
        key: `code-segment-${childrenCount}-${i}`,
        renderText,
      })
    )
  }
}

function createElement({
  node,
  stylesheet,
  style = {},
  useInlineStyles,
  key,
  renderText,
}) {
  debugger
  const { properties, type, tagName: TagName, value } = node
  if (type === "text") {
    return renderText({ key, value })
  } else if (TagName) {
    const childrenCreator = createChildren(
      stylesheet,
      useInlineStyles,
      renderText
    )
    const nonStylesheetClassNames =
      useInlineStyles &&
      properties.className &&
      properties.className.filter(className => !stylesheet[className])
    const className =
      nonStylesheetClassNames && nonStylesheetClassNames.length
        ? nonStylesheetClassNames
        : undefined
    const props = useInlineStyles
      ? {
          ...properties,
          ...{ className },
          style: createStyleObject(
            properties.className,
            Object.assign({}, properties.style, style),
            stylesheet
          ),
        }
      : {
          ...properties,
          className: createClassNameString(properties.className),
        }
    const children = childrenCreator(node.children)
    return (
      <TagName key={key} {...props}>
        {children}
      </TagName>
    )
  }
}

export default renderText => ({ rows, stylesheet, useInlineStyles }) => {
  return rows.map((node, i) =>
    createElement({
      node,
      stylesheet,
      useInlineStyles,
      key: `code-segment${i}`,
      renderText,
    })
  )
}
