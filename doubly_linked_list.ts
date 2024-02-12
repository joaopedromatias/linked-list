class Node {
  data: number | string
  next: Node | null
  prev: Node | null

  constructor(data: number | string) {
    this.data = data
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  private head: Node | null

  constructor(node: Node) {
    this.head = node
  }

  traverse() {
    let nodeToShow: Node | null = this.head
    while (nodeToShow) {
      console.log(nodeToShow.data)
      nodeToShow = nodeToShow.next
    }
  }

  insertAtBeginning(node: Node) {
    const formerHead = this.head
    this.head = node
    node.next = formerHead
    if (formerHead) formerHead.prev = node
  }

  insertAtEnd(node: Node) {
    if (!this.head) return this.insertAtBeginning(node)
    let lastNode = this.head

    while (lastNode.next) {
      lastNode = lastNode.next
    }
    lastNode.next = node
    node.prev = lastNode
  }

  insertAtMiddle(node: Node, position: number) {
    if (position <= 0 || !this.head) return this.insertAtBeginning(node)

    let nodeBeforeNewNode = this.head

    for (let i = 1; i < position; i++) {
      const nextNode: Node | null = nodeBeforeNewNode.next
      if (nextNode) {
        nodeBeforeNewNode = nextNode
      } else {
        break
      }
    }

    let nodeAfterNewNode: Node | null
    nodeAfterNewNode = nodeBeforeNewNode.next

    nodeBeforeNewNode.next = node
    node.prev = nodeBeforeNewNode

    node.next = nodeAfterNewNode
    if (nodeAfterNewNode) nodeAfterNewNode.prev = node
  }

  deleteFromBeginning() {
    if (this.head) {
      this.head = this.head.next
      if (this.head) this.head.prev = null
    }
  }

  deleteFromEnd() {
    if (this.head && !this.head.next) return (this.head = null)
    let nodeBeforeLastNode = this.head

    if (nodeBeforeLastNode) {
      while (nodeBeforeLastNode.next && nodeBeforeLastNode.next.next) {
        nodeBeforeLastNode = nodeBeforeLastNode.next
      }

      nodeBeforeLastNode.next = null
    }
  }

  deleteFromMiddle(position: number) {
    if (position <= 0) return this.deleteFromBeginning()
    let nodeToRemoveNext = this.head

    if (nodeToRemoveNext) {
      for (let i = 1; i < position; i++) {
        const nextNode: Node | null = nodeToRemoveNext.next
        if (nextNode && nextNode.next) {
          nodeToRemoveNext = nextNode
        } else {
          break
        }
      }
      nodeToRemoveNext.next = nodeToRemoveNext.next ? nodeToRemoveNext.next.next : null
      if (nodeToRemoveNext.next) {
        nodeToRemoveNext.next.prev = nodeToRemoveNext
      }
    }
  }

  search(data: number | string) {
    let currentNode = this.head
    let currentIndex = 0

    while (currentNode) {
      if (currentNode.data === data) return currentIndex
      currentNode = currentNode.next
      currentIndex++
    }
    return -1
  }

  sort() {
    let currentNode = this.head
    let lastNodeIndex = 0
    while (currentNode && currentNode.next) {
      currentNode = currentNode.next
      lastNodeIndex++
    }
    for (let i = 0; i < lastNodeIndex; i++) {
      for (let j = 0; j < lastNodeIndex - i; j++) {
        const leftNode = this.getNodeByIndex(j)!
        const rightNode = this.getNodeByIndex(j + 1)!

        if (leftNode.data > rightNode.data) {
          if (j === 0) {
            const rightNodeNext = rightNode.next!
            leftNode.next = rightNodeNext
            leftNode.prev = rightNode
            rightNodeNext.prev = leftNode

            this.head = rightNode
            rightNode.next = leftNode
            rightNode.prev = null
          } else {
            const nodeBeforeLeftNode = leftNode.prev!
            nodeBeforeLeftNode.next = rightNode
            rightNode.prev = nodeBeforeLeftNode

            const nodeAfterRightNode = rightNode.next

            rightNode.next = leftNode
            leftNode.prev = rightNode
            leftNode.next = nodeAfterRightNode
            if (nodeAfterRightNode) nodeAfterRightNode.prev = leftNode
          }
        }
      }
    }
  }

  private getNodeByIndex(index: number) {
    let currentNode: Node | null = this.head
    let i = 0
    while (i < index) {
      if (currentNode && currentNode.next) {
        currentNode = currentNode.next
        i++
      } else {
        return null
      }
    }
    return currentNode
  }
}

export {}
