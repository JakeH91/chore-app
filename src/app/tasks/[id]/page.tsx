'use client';
import { updateTask, readTask } from '@app/actions/database/task';
import { useEffect, useState } from 'react';

export default function Task({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<{
    id: number;
    name: string;
    dueDate: Date | null;
    repeating: boolean;
    frequency: number | null;
    userId: string;
  } | null>();

  useEffect(() => {
    async function fetchTask() {
      const fetchedTask = await readTask(+params.id);
      setTask(fetchedTask);
    }
    fetchTask();
  }, []);

  const loadContent = () => {
    if (task) {
      const updateTaskWithId = updateTask.bind(null, task.id);
      return (
        <div>
          <form action={updateTaskWithId}>
            <input type="text" name="name" required defaultValue={task.name} />
            <input
              type="date"
              name="dueDate"
              defaultValue={String(task.dueDate)}
            />
            <fieldset>
              <legend>Does this task repeat?</legend>
              <input
                type="radio"
                id="true"
                name="repeating"
                value="true"
                defaultChecked={task.repeating}
              />
              <label htmlFor="true">Yes</label>
              <input
                type="radio"
                id="false"
                name="repeating"
                value="false"
                defaultChecked={!task.repeating}
              />
              <label htmlFor="false">No</label>
            </fieldset>
            <input
              type="number"
              name="frequency"
              defaultValue={String(task.frequency)}
            />
            <button type="submit">Update Task</button>
          </form>
        </div>
      );
    } else {
      return <h2>No Task</h2>;
    }
  };

  return <main>{loadContent()}</main>;
}
