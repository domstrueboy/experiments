import type { TaskId } from './Task';

export type ListId = string;

export type List = {
    id: ListId;
    title: string;
    items: TaskId[];
}