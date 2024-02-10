class Node {
  public data: number | string
  public next: Node | null

  constructor(data: number | string) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  private head: Node

  constructor(head: Node) {
    this.head = head
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
  }

  insertAtEnd(node: Node) {
    const { lastNode } = this.getLastNode()
    lastNode.next = node
  }

  insertAtMiddle(node: Node, position: number) {
    if (position === 0) return this.insertAtBeginning(node)
    let nodeBeforeNewNode = this.head
    let nodeAfterNewNode: Node | null

    for (let i = 1; i < position; i++) {
      const nextNode = nodeBeforeNewNode.next
      if (nextNode) {
        nodeBeforeNewNode = nextNode
      } else {
        break
      }
    }

    nodeAfterNewNode = nodeBeforeNewNode.next
    nodeBeforeNewNode.next = node
    node.next = nodeAfterNewNode
  }

  deleteFromBeginning() {
    this.head = this.head.next!
  }

  deleteFromEnd() {
    let { lastNodeIndex } = this.getLastNode()
    let nodeToRemoveNext = this.head
    for (let i = 1; i < lastNodeIndex; i++) {
      nodeToRemoveNext = nodeToRemoveNext.next!
    }
    nodeToRemoveNext.next = null
  }

  deleteFromMiddle(position: number) {
    if (position === 0) return this.deleteFromBeginning()

    let nodeToRemoveNext = this.head
    for (let i = 1; i < position; i++) {
      const nextNode = nodeToRemoveNext.next
      const nextTwoNodes = nodeToRemoveNext.next ? nodeToRemoveNext.next.next : null
      if (nextNode && nextTwoNodes) {
        nodeToRemoveNext = nextNode
      } else {
        break
      }
    }
    nodeToRemoveNext.next = nodeToRemoveNext.next!.next
  }

  search(data: number | string) {
    const { lastNodeIndex } = this.getLastNode()
    let currentNode = this.head
    let currentIndex = 0

    for (let i = 0; i < lastNodeIndex; i++) {
      if (currentNode.data === data) return currentIndex
      currentNode = currentNode.next!
      currentIndex++
    }
    return -1
  }

  sort() {
    const { lastNodeIndex } = this.getLastNode()
    let i = 0
    for (let i = 0; i < lastNodeIndex; i++) {
      for (let j = 0; j < lastNodeIndex - i; j++) {
        const leftNode = this.getNodeByIndex(j)!
        const rightNode = this.getNodeByIndex(j + 1)!

        if (leftNode.data > rightNode.data) {
          if (j === 0) {
            leftNode.next = rightNode.next
            this.head = rightNode
            rightNode.next = leftNode
          } else {
            const nodeBeforeLeftNode = this.getNodeByIndex(j - 1)
            nodeBeforeLeftNode!.next = rightNode
            const nodeAfterRightNode = rightNode.next

            rightNode.next = leftNode
            leftNode.next = nodeAfterRightNode
          }
        }
      }
    }
  }

  private getNodeByIndex(index: number) {
    let currentNode: Node | null = this.head
    let i = 0
    while (i < index) {
      if (currentNode.next) {
        currentNode = currentNode.next
        i++
      } else {
        return null
      }
    }
    return currentNode
  }

  private getLastNode() {
    let currentNode = this.head
    let lastNodeIndex = 0
    while (currentNode.next) {
      currentNode = currentNode.next
      lastNodeIndex++
    }
    return { lastNode: currentNode, lastNodeIndex }
  }
}

export {}
