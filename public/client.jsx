class Snippet extends React.Component {
  componentDidMount () {
    hljs.highlightBlock(ReactDOM.findDOMNode(this.refs.code))
  }

  render () {
    return <pre><code ref="code">{this.props.snippet}</code></pre>
  }
}

function Example (props) {
  return <tr>
    <td>{props.technology}</td>
    <td>
      {props.snippets.map(snippet =>
        <Snippet key={snippet} snippet={snippet}/>
      )}
    </td>
  </tr>
}

function Feature (props) {
  return <li className="card">
    <h2 className="panel-title">{props.name}</h2>

    <div className="table-responsive">
      <table>
        <tbody>
          {props.examples.map(example =>
            <Example key={example.technology} technology={example.technology} snippets={example.snippets}/>
          )}
        </tbody>
      </table>
    </div>
  </li>
}

function SearchResults(props) {
  if (props.results.length > 0) {
    return <ol className="search-results">
      {props.results.map(result =>
        <Feature key={JSON.stringify(result)} name={result.name} examples={result.examples}/>
      )}
    </ol>;
  } else {
    return <h2>No results</h2>;
  }
}

class SearchBar extends React.Component {
  search(event) {
    this.props.search(event.target.value);
  }

  render() {
    return <input id="query" type="search" className="search-input" value={this.props.query} placeholder="Search for features, technologies, or code snippets" autofocus onChange={this.search.bind(this)}/>
  }
}

class Searchable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  componentDidMount() {
    this.search(this.props.query);
  }

  search(query) {
    if (query === undefined) query = ''
    fetch('/index.json?query=' + query + '&index=0&count=10')
      .then(response => response.json())
      .then(results => this.setState({ results }))
  }

  render() {
    return <div>
      <SearchBar search={this.search.bind(this)}/>
      <SearchResults results={this.state.results}/>
    </div>
  }
}

ReactDOM.render(<Searchable/>, searchable);
