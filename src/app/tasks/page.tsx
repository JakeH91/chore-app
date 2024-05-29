'use client';
import { createTask, readTasks } from '@app/actions/database/task';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Dropdown } from '../components/molecules/Dropdown';

export default function Tasks() {
  const [tasks, setTasks] = useState<
    {
      id: number;
      name: string;
      dueDate: Date | null;
      repeating: boolean;
      frequency: number | null;
      userId: string;
    }[]
  >();

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await readTasks();
      setTasks(fetchedTasks);
    }
    fetchTasks();
  }, []);

  const loadContent = () => {
    return (
      <div>
        <h1>All tasks</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="border">Chore</th>
              <th className="border">Next Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => {
              return (
                <tr key={task.id}>
                  <td className="border">
                    <Dropdown />
                  </td>
                  <td className="border">
                    <Link href={`/tasks/${task.id}`}>{task.name}</Link>
                  </td>
                  <td className="border">
                    {task.dueDate ? task.dueDate.toDateString() : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-20">
          <h2>Add New Task?</h2>
          <form action={createTask}>
            <input type="text" name="name" required />
            <input type="date" name="dueDate" />
            <fieldset>
              <legend>Does this task repeat?</legend>
              <input type="radio" id="true" name="repeating" value="true" />
              <label htmlFor="true">Yes</label>
              <input
                type="radio"
                id="false"
                name="repeating"
                value="false"
                defaultChecked
              />
              <label htmlFor="false">No</label>
            </fieldset>
            <input type="number" name="frequency" />
            <button type="submit">Create Task</button>
          </form>
        </div>
      </div>
    );
  };

  return <main>{loadContent()}</main>;
}
