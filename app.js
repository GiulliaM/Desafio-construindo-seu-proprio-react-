/** @jsx Didact.createElement */

function Counter() {
  const [count, setCount] = Didact.useState(0)

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  )
}

Didact.render(<Counter />, document.getElementById("root"))
