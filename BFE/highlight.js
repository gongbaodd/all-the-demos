// This is a JavaScript coding question from BFE.dev
/**
 * @param {string} html
 * @param {string[]} keywords
 */
function highlightKeywords(html, keywords) {
  // your code here
  return html
    .split(" ")
    .map((word) => {
      const reg = new RegExp(keywords.join("|"), "gi");

      if (keywords.includes(word)) return "<em>" + word + "</em>";

      return word
        .replace(reg, (w) => "<em>" + w + "</em>")
        .replace(/<\/em><em>/g, "");
    })
    .join(" ");
}
