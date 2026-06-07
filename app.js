// Estrutura: A tem filhos B e C; B tem filho D
// Ordem de travessia esperada: A → B → D → C
const element = Didact.createElement(
  "div",
  { id: "A" },
  Didact.createElement(
    "div",
    { id: "B" },
    Didact.createElement("div", { id: "D" }, "D")
  ),
  Didact.createElement("div", { id: "C" }, "C")
)

Didact.render(element, document.getElementById("root"))
