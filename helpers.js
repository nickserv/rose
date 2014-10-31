exports.highlightQuery = function (string, query) {
  if (query) {
    return string.replace(new RegExp(query, 'gi'), function (match) {
      return '<span class="text-primary">' + match + '</span>';
    });
  } else {
    return string;
  }
};
