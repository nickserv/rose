function toArray(item) {
  return (item instanceof Array) ? item : [item];
}

module.exports = { toArray: toArray };
