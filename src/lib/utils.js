/** Unescape ascii codes in "My\032Name" */
function deEscapify(str) {
  return str.replace(/\\(\d+)/g, function(match, grp) {
    return String.fromCharCode(parseInt(grp, 10));
  });
}

exports['deEscapify'] = deEscapify;
