function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

// Cria o nó DOM a partir de um fiber, sem ainda atribuir event listeners
function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)

  Object.keys(fiber.props)
    .filter(key => key !== "children")
    .forEach(name => {
      dom[name] = fiber.props[name]
    })

  return dom
}

let nextUnitOfWork = null
let wipRoot = null

// render agora apenas agenda o trabalho, sem bloquear a thread principal
function render(element, container) {
  wipRoot = {
    dom: container,
    props: { children: [element] },
  }
  nextUnitOfWork = wipRoot
}

// Loop de trabalho: processa unidades enquanto houver tempo ocioso
function workLoop(deadline) {
  let shouldYield = false

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

// Missão 2: travessia left-child right-sibling da árvore de fibers
function performUnitOfWork(fiber) {
  // 1. Cria o DOM deste fiber
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // 2. Cria um fiber para cada filho, ligando irmãos entre si
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null

  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }

  // 3. Retorna o próximo trabalho: filho → irmão → tio (sobe a árvore)
  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }

  return undefined
}

// Aplica todos os nós ao DOM de uma vez (fase commit atômica)
function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) return
  fiber.parent.dom.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

const Didact = { createElement, render }
