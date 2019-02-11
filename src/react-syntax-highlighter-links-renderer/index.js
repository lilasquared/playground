import React from "react"
import { Link } from "react-router-dom"

function createStyleObject(classNames, elementStyle = {}, stylesheet) {
  return classNames.reduce((styleObject, className) => {
    return { ...styleObject, ...stylesheet[className] }
  }, elementStyle)
}

function createClassNameString(classNames) {
  return classNames.join(" ")
}

function createChildren(stylesheet, useInlineStyles) {
  let childrenCount = 0
  return children => {
    childrenCount += 1
    return children.map((child, i) =>
      createElement({
        node: child,
        stylesheet,
        useInlineStyles,
        key: `code-segment-${childrenCount}-${i}`,
      })
    )
  }
}

function createElement({ node, stylesheet, style = {}, useInlineStyles, key }) {
  const { properties, type, tagName: TagName, value } = node
  if (type === "text") {
    const match = value.match('"(http.*/api.*)"')
    if (match) {
      return (
        <Link key={key} to={`/${match[1]}`}>
          {value}
        </Link>
      )
    }
    return value
  } else if (TagName) {
    const childrenCreator = createChildren(stylesheet, useInlineStyles)
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

export default function renderer({ rows, stylesheet, useInlineStyles }) {
  return rows.map((node, i) =>
    createElement({
      node,
      stylesheet,
      useInlineStyles,
      key: `code-segment${i}`,
    })
  )
}
