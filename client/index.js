import './index.less'
import hljs from 'highlight.js'
import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

class Snippet extends React.Component {
  constructor (props) {
    super(props)

    this.highlight = (element) => { if (element) hljs.highlightBlock(element) }
  }

  render () {
    return <pre><code ref={this.highlight}>{this.props.snippet}</code></pre>
  }
}

Snippet.propTypes = {
  snippet: PropTypes.string.isRequired
}

function Example (props) {
  return <tr>
    <td>{props.technology}</td>
    <td><Snippet snippet={props.snippet}/></td>
  </tr>
}

Example.propTypes = Object.assign({
  technology: PropTypes.string.isRequired
}, Snippet.propTypes)

function Feature (props) {
  return <li className="card">
    <h2 className="panel-title">{props.name}</h2>

    <div className="table-responsive">
      <table>
        <tbody>
          {props.examples.map(example =>
            <Example key={example.technology} technology={example.technology} snippet={example.snippet}/>
          )}
        </tbody>
      </table>
    </div>
  </li>
}

Feature.propTypes = {
  name: PropTypes.string.isRequired,
  examples: PropTypes.arrayOf(
    PropTypes.shape(Example.propTypes).isRequired
  ).isRequired
}

class SearchResults extends React.Component {
  constructor (props) {
    super(props)

    this.state = { results: [] }

    this.search = query => {
      if (query === undefined) query = ''
      fetch('/index.json?query=' + query + '&index=0&count=10')
        .then(response => response.json())
        .then(results => this.setState({ results }))
    }
  }

  componentDidMount () {
    this.search()
  }

  componentDidUpdate (props) {
    if (props.query !== this.props.query) this.search(this.props.query)
  }

  render () {
    if (this.state.results.length) {
      return <ol className="search-results">
        {this.state.results.map(result =>
          <Feature key={JSON.stringify(result)} name={result.name} examples={result.examples}/>
        )}
      </ol>
    } else {
      return <h2>No results</h2>
    }
  }
}

SearchResults.propTypes = {
  query: PropTypes.string.isRequired
}

class SearchBar extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = event => this.props.onChange(event.target.value)
  }

  render () {
    return <input type="search" className="search-input" value={this.props.query} placeholder="Search for features, technologies, or code snippets" autoFocus onChange={this.handleChange}/>
  }
}

SearchBar.propTypes = Object.assign({
  onChange: PropTypes.func.isRequired
}, SearchResults.propTypes)

class Searchable extends React.Component {
  constructor (props) {
    super(props)

    this.state = { query: '' }

    this.onChange = query => this.setState({ query })
  }

  render () {
    return <div>
      <SearchBar query={this.state.query} onChange={this.onChange}/>
      <SearchResults query={this.state.query}/>
    </div>
  }
}

ReactDOM.render(<Searchable/>, document.querySelector('main'))
