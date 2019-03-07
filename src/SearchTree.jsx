import React from "react"

function splitMatch(string, query) {
  const index = string.toLowerCase().indexOf(query.toLowerCase())

  if (index === -1) {
    return {
      before: "",
      match: "",
      after: string,
    }
  }

  return {
    before: string.substring(0, index),
    match: string.substring(index, index + query.length),
    after: string.substring(index + query.length, string.length),
  }
}

const TreeNodes = ({ nodes, expanded, selected, handleNodeClick, query }) => (
  <ul>
    {nodes.map(node => (
      <TreeNode
        node={node}
        key={node.id}
        expanded={expanded}
        selected={selected}
        handleClick={handleNodeClick}
        query={query}
      />
    ))}
  </ul>
)

const TreeNode = ({ node, expanded, selected, handleClick, query }) => {
  const split = splitMatch(node.id + " - " + node.description, query)

  let classes = "search-tree-node"
  if (expanded[node.id] || split.match) {
    classes = classes + " expanded"
  }

  if (selected[node.id]) {
    classes = classes + " selected"
  }

  return (
    <>
      <li className={classes}>
        <div onClick={() => handleClick(node)}>
          {split.before && <span>{split.before}</span>}
          {split.match && <strong>{split.match}</strong>}
          {split.after && <span>{split.after}</span>}
        </div>
        {node.children && (
          <TreeNodes
            nodes={node.children.filter(filterNode(query))}
            expanded={expanded}
            selected={selected}
            handleNodeClick={handleClick}
            query={query}
          />
        )}
      </li>
    </>
  )
}

const mapNode = node => ({
  id: node.Value,
  description: node.Description,
  children: node.Children.map(mapNode),
  expanded: false,
  query: "",
})

const filterNode = query => node => {
  const isMatch =
    node.id.toLowerCase().includes(query.toLowerCase()) ||
    node.description.toLowerCase().includes(query.toLowerCase()) ||
    node.children.filter(filterNode(query)).length

  return isMatch
}

const TagList = ({ values, onRemove }) => {
  return (
    <div className="tag-list">
      {values.map(value => (
        <span className="tag" key={value}>
          {value}
          <i className="fa fa-times on-right" onClick={() => onRemove()} />
        </span>
      ))}
    </div>
  )
}

const SearchTree = ({ source, values }) => {
  const [nodes, setNodes] = React.useState([])
  const [showTree, setShowTree] = React.useState(false)
  const [selected, setSelected] = React.useState({})
  const [expanded, setExpanded] = React.useState({})
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    fetch(source)
      .then(response => response.json())
      .then(response => response.map(mapNode))
      .then(setNodes)
  }, [])

  const filtered = nodes.filter(filterNode(query))

  const handleNodeClick = node => {
    if (node.children.length === 0) {
      if (selected[node.id]) {
        delete selected[node.id]
      } else {
        selected[node.id] = true
      }
      setSelected({ ...selected })
    } else {
      if (expanded[node.id]) {
        delete expanded[node.id]
      } else {
        expanded[node.id] = true
      }
      setExpanded({ ...expanded })
    }
  }

  const handleQueryChange = e => {
    setQuery(e.target.value)
  }

  return (
    <div className="search-tree">
      <TagList values={Object.keys(selected)} />
      <input value={query} onChange={handleQueryChange} />
      <button
        onClick={() => setShowTree(!showTree)}
        type="button"
        className="btn btn-link"
      >
        <i className="fa fa-search on-left" />
        Don't know what code to enter? Browse our list!
      </button>
      {showTree && (
        <div className="search-tree-container">
          <TreeNodes
            nodes={filtered}
            expanded={expanded}
            selected={selected}
            handleNodeClick={handleNodeClick}
            query={query}
          />
        </div>
      )}
    </div>
  )
}

export default SearchTree
