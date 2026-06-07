# Didact — Construindo seu próprio React

Implementação da biblioteca **Didact**, uma versão simplificada do React construída do zero, baseada no trabalho original de [Rodrigo Pombo](https://pomb.us/build-your-own-react/).

---

## Como executar

> O projeto usa Babel Standalone para transpilar JSX, por isso precisa ser servido via HTTP.

**Opção 1 — Live Server (VS Code):**
Clique em "Go Live" no canto inferior direito do VS Code.

**Opção 2 — Terminal:**
```bash
npx serve .
```

Acesse `http://localhost:3000` (ou a porta indicada) no navegador.

---

## Missões

O projeto foi desenvolvido de forma incremental, cada missão em sua própria branch.

### Missão 1 — `createElement` e `render`
Implementação do `render` síncrono e recursivo: cria nós DOM, atribui props e renderiza filhos.

### Missão 2 — Concurrent Mode e Fiber Tree
Substituição do render síncrono por renderização não-bloqueante via `requestIdleCallback`. Implementação da travessia **left-child right-sibling** da árvore de fibers com `performUnitOfWork`.

### Missão 3 — Fases Render/Commit e Reconciliação
Separação entre fase de cálculo (render) e fase de mutação do DOM (commit), evitando UIs parcialmente renderizadas. Implementação do algoritmo de diffing (`reconcileChildren`) com três casos: `UPDATE`, `PLACEMENT` e `DELETION`.

### Missão 4 — Function Components e `useState`
Suporte a componentes de função e implementação do hook `useState` com persistência de estado via ponteiro `alternate` entre a árvore atual e a árvore em construção.

### Missão 5 — Montagem Final com JSX
Configuração do Babel Standalone para transpilar JSX usando o pragma `/** @jsx Didact.createElement */`. Implementação do componente `Counter` com sintaxe JSX.

---

## Estrutura

```
├── index.html   # Entry point com Babel e estilos
├── didact.js    # Biblioteca Didact completa
└── app.js       # Componente Counter em JSX
```

---

## Tecnologias

- JavaScript vanilla
- Babel Standalone (transpilação JSX via CDN)
- `requestIdleCallback` (agendamento não-bloqueante)
