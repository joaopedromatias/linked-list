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
  private head: Node

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

  insertAtEnd(node: Node) {
    let nodeToConnectToNewNode = this.head
    while (nodeToConnectToNewNode.next) {
      nodeToConnectToNewNode = nodeToConnectToNewNode.next
    }
    nodeToConnectToNewNode.next = node
    node.prev = nodeToConnectToNewNode
  }

  insertAtBeginning(node: Node) {
    const formerHead = this.head
    this.head = node
    node.prev = null
    node.next = formerHead
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
    node.prev = nodeBeforeNewNode

    node.next = nodeAfterNewNode
    if (nodeAfterNewNode) nodeAfterNewNode.prev = node
  }
}

export {}
