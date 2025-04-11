import { createClient } from "redis";

// A simple Min-Heap-based Priority Queue implementation
class PriorityQueue<T> {
  private heap: { priority: number; task: T }[];

  constructor() {
    this.heap = [];
  }

  private heapifyUp(index: number) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].priority <= this.heap[index].priority) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  private heapifyDown(index: number) {
    const length = this.heap.length;
    let leftChild = 2 * index + 1;
    let rightChild = 2 * index + 2;
    let smallest = index;

    if (
      leftChild < length &&
      this.heap[leftChild].priority < this.heap[smallest].priority
    ) {
      smallest = leftChild;
    }

    if (
      rightChild < length &&
      this.heap[rightChild].priority < this.heap[smallest].priority
    ) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];
      this.heapifyDown(smallest);
    }
  }

  public insert(task: T, priority: number) {
    this.heap.push({ task, priority });
    this.heapifyUp(this.heap.length - 1);
  }

  public extractMin(): T | null {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return min?.task || null;
  }

  public size() {
    return this.heap.length;
  }
}

class DistributedPriorityQueue {
  private client;
  private queueKey: string;
  private priorityQueue: PriorityQueue<any>;

  constructor(queueKey: string) {
    this.client = createClient();
    this.queueKey = queueKey;
    this.priorityQueue = new PriorityQueue();
  }

  public async enqueue(task: any, priority: number, timeout: number = 60000) {
    // Store the task in Redis with a TTL (time-to-live) to handle expiry
    await this.client.set(
      this.queueKey,
      JSON.stringify(task),
      "EX",
      timeout / 1000
    );
    this.priorityQueue.insert(task, priority);
  }

  public async dequeue(): Promise<any> {
    const task = this.priorityQueue.extractMin();
    if (task) {
      await this.client.del(this.queueKey); // Remove task from Redis after processing
    }
    return task;
  }

  public async getSize(): Promise<number> {
    return this.priorityQueue.size();
  }
}

export default DistributedPriorityQueue;

// Usage example

async function processTasks() {
  const queue = new DistributedPriorityQueue("taskQueue");

  // Enqueue some tasks with different priorities
  await queue.enqueue({ taskId: 1, taskDetails: "Low priority task" }, 5);
  await queue.enqueue({ taskId: 2, taskDetails: "High priority task" }, 1);
  await queue.enqueue({ taskId: 3, taskDetails: "Medium priority task" }, 3);

  // Dequeue and process tasks based on priority
  const task1 = await queue.dequeue();
  console.log("Processing task:", task1);

  const task2 = await queue.dequeue();
  console.log("Processing task:", task2);

  const task3 = await queue.dequeue();
  console.log("Processing task:", task3);
}

processTasks();