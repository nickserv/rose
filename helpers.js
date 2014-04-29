// ignoreCase default to true
function contains(string, query, ignoreCase) {
  if (ignoreCase !== false) {
    string = string.toLowerCase();
    query = query.toLowerCase();
  }
  return string.indexOf(query) !== -1;
}

// ignoreCase default to true
function someContain(strings, query, ignoreCase) {
  return strings.some(function (string) {
    return contains(string, query, ignoreCase);
  });
}

function toArray(item) {
  return (item instanceof Array) ? item : [item];
}

module.exports = { contains: contains, someContain: someContain, toArray: toArray };
