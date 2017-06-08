export function matchSnippet(snippet, query) {
  return snippet.match(query);
}

export function matchExample(example, query) {
  return example.technology.match(query) ||
    this.matchSnippet(example.snippet, query);
}

export function matchFeature(feature, query) {
  return feature.name.match(query) ||
    feature.examples.some(example => this.matchExample(example, query));
}

export function search(features, query) {
  const queryRegExp = new RegExp(query, 'i');
  return features.filter(feature => this.matchFeature(feature, queryRegExp));
}
