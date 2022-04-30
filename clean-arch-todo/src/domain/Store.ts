import type { Task } from './Task';
import type { List } from './List';

export type Store = {
    tasks: Task[];
    lists: List[];
} 