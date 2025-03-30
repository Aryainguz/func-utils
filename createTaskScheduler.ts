type Task = () => Promise<void>;

interface ScheduledTask {
  task: Task;
  nextRun: number;
  interval: number;
  id: string;
}

export function createTaskScheduler() {
  const tasks: ScheduledTask[] = [];

  function addTask(task: Task, interval: number, id: string, firstRunAt: number = Date.now()) {
    const nextRun = firstRunAt + interval;
    tasks.push({
      task,
      nextRun,
      interval,
      id,
    });
  }

  function removeTask(id: string) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index >= 0) {
      tasks.splice(index, 1);
    }
  }

  async function processTasks() {
    const now = Date.now();
    for (const task of tasks) {
      if (task.nextRun <= now) {
        try {
          await task.task();
          task.nextRun = now + task.interval; // Reschedule
        } catch (err) {
          console.error(`Failed to run task ${task.id}`, err);
        }
      }
    }
  }

  setInterval(processTasks, 1000); // Check every second for pending tasks

  return {
    addTask,
    removeTask,
    getAllTasks: () => tasks,
  };
}


// Example usage

const scheduler = createTaskScheduler();

// Task 1: Runs every 5 seconds
scheduler.addTask(async () => {
  console.log("Running task every 5 seconds");
}, 5000, "task-1");

// Task 2: Runs every 1 minute
scheduler.addTask(async () => {
  console.log("Running task every 1 minute");
}, 60000, "task-2");

// Task 3: Runs once, in 30 seconds
scheduler.addTask(async () => {
  console.log("Running one-off task after 30 seconds");
}, 30000, "task-3", Date.now() + 30000);



// this is useful for scheduling tasks in a server environment like email sending, sms sending, etc.
// it can be used to schedule tasks in a web application, such as sending notifications, updating data, etc.
// it can be used to schedule tasks in a CLI application, such as running background jobs, etc.