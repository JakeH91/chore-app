'use client';
import { createTask, readTasks } from '@app/actions/database/task';
import { useEffect, useRef, useState } from 'react';
import { TableTask } from '../components/molecules/TableTask';

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
  const [isRepeatingTask, setIsRepeatingTask] = useState(true);
  const [creatingTask, setCreatingTask] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await readTasks();
      setTasks(fetchedTasks);
      setCreatingTask(false);
    }
    fetchTasks();
  }, [creatingTask]);

  const loadContent = () => {
    return (
      <div>
        <h1>All tasks</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Chore</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => {
              return <TableTask key={task.id} task={task} />;
            })}
          </tbody>
        </table>
        <div className="mt-20">
          <h2>Add New Task?</h2>
          <form
            className="flex flex-col w-1/3 gap-4"
            ref={formRef}
            action={async (formData) => {
              await createTask(formData);
              formRef.current?.reset();
              inputRef.current?.focus();
            }}
          >
            <fieldset>
              <legend>Does this task repeat?</legend>
              <input
                type="radio"
                id="true"
                name="repeating"
                value="true"
                defaultChecked
                onChange={() => setIsRepeatingTask(true)}
              />
              <label htmlFor="true">Yes</label>
              <input
                type="radio"
                id="false"
                name="repeating"
                value="false"
                onChange={() => setIsRepeatingTask(false)}
              />
              <label htmlFor="false">No</label>
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="name">Task Name:</label>
              <input
                ref={inputRef}
                className="border"
                type="text"
                id="name"
                name="name"
                required
              />
            </fieldset>
            {isRepeatingTask ? (
              <fieldset className="flex flex-col">
                <label htmlFor="frequency">
                  How often should this task be completed?
                </label>
                <input
                  className="border"
                  type="number"
                  id="frequency"
                  name="frequency"
                />
              </fieldset>
            ) : (
              <fieldset className="flex flex-col">
                <label htmlFor="dueDate">
                  When should this task be completed?
                </label>
                <input className="border" type="date" name="dueDate" />
              </fieldset>
            )}
            <button onClick={() => setCreatingTask(true)} type="submit">
              Create Task
            </button>
          </form>
        </div>
      </div>
    );
  };

  return <main>{loadContent()}</main>;
}
