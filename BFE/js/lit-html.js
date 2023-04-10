function html(strings, ...values) {
  // your code here
  return strings
    .map((string, index) => {
      return string + (values[index] || "");
    })
    .join("");
}

// render the result from html() into the container
function render(result, container) {
  // your code here
  container.innerHTML = result;
}
