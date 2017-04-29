class Snippet extends React.Component {
  constructor(props) {
    super(props)

    this.highlight = (element) => { if (element) hljs.highlightBlock(element) }
  }

  render() {
    return <pre><code ref={this.highlight}>{this.props.snippet}</code></pre>
  }
}

function Example(props) {
  return <tr>
    <td>{props.technology}</td>
    <td>
    {props.snippets.map(snippet =>
                        <Snippet key={snippet} snippet={snippet}/>
                       )}
  </td>
    </tr>
}

function Feature(props) {
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

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };

    this.search = query => {
      if (query === undefined) query = ''
      fetch('/index.json?query=' + query + '&index=0&count=10')
        .then(response => response.json())
        .then(results => this.setState({ results }))
    }
  }

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(props) {
    if (props.query !== this.props.query) this.search(this.props.query);
  }

  render() {
    if (this.state.results.length) {
      return <ol className="search-results">
        {this.state.results.map(result =>
                                <Feature key={JSON.stringify(result)} name={result.name} examples={result.examples}/>
                               )}
      </ol>;
    } else {
      return <h2>No results</h2>;
    }
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = event => this.props.onChange(event.target.value)
  }

  render() {
    return <input id="query" type="search" className="search-input" value={this.props.query} placeholder="Search for features, technologies, or code snippets" autoFocus onChange={this.handleChange}/>
  }
}

class Searchable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { query: '' };

    this.onChange = query => this.setState({ query });
  }

  render() {
    return <div>
      <SearchBar onChange={this.onChange}/>
      <SearchResults query={this.state.query}/>
      </div>
  }
}

ReactDOM.render(<Searchable/>, document.querySelector('main'));
