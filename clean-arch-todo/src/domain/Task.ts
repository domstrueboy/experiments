export type TaskId = string;

export type Task = {
    id: TaskId;
    text: string;
    done: boolean;
}

export function finishTask(task: Task): Task {
    return {
        ...task,
        done: true
    };
}
