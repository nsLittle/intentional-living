function outer() {
  const message = "Hello from outer function!";
  function inner() {
    console.log(message);
  }
  return inner;
}

console.log(outer);
