// Testa reconciliação: re-renderiza a cada segundo
// No DevTools, o div wrapper não deve piscar — apenas o texto muda
let counter = 0

function tick() {
  counter++
  const element = Didact.createElement(
    "div",
    null,
    Didact.createElement("h1", null, `Missão 3 — Contagem: ${counter}`),
    Didact.createElement("p", null, "O div wrapper é reusado, apenas o texto muda.")
  )
  Didact.render(element, document.getElementById("root"))
}

tick()
setInterval(tick, 1000)
