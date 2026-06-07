// Componente de função com estado — testa useState
function Counter() {
  const [count, setCount] = Didact.useState(0)

  return Didact.createElement(
    "div",
    null,
    Didact.createElement("h1", null, `Missão 4 — Valor: ${count}`),
    Didact.createElement(
      "button",
      { onClick: () => setCount(c => c + 1) },
      "+"
    ),
    Didact.createElement(
      "button",
      { onClick: () => setCount(c => c - 1) },
      "-"
    )
  )
}

Didact.render(
  Didact.createElement(Counter, null),
  document.getElementById("root")
)
