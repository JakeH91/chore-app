'use client';
import { createTask, updateTask, readTasks } from '@app/actions/database/task';
import { useEffect, useRef, useState } from 'react';
import { TableTask } from '../components/molecules/TableTask';
import { Button } from '../components/atoms/Button';
import { Task } from '@prisma/client';

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
  const [showAddNewSidebar, setShowAddNewSidebar] = useState(false);
  const [creatingTask, setCreatingTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | undefined>(0);

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await readTasks();
      setTasks(fetchedTasks);
      setCreatingTask(false);
    }
    fetchTasks();
  }, [creatingTask]);

  const handleTaskClick = (taskId: number) => {
    setEditTaskId(taskId);
  };

  const handleCloseSidebarClick = () => {
    setEditTaskId(undefined);
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="w-fit">
        <div className="flex flex-row items-center justify-between mb-10">
          <h1 className="pr-8">All tasks</h1>
          <button
            onClick={() => setShowAddNewSidebar(true)}
            className="py-2 px-4 border rounded text-sm text-white bg-green-600"
          >
            Add New
          </button>
        </div>
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
              return (
                <TableTask
                  key={task.id}
                  handleClick={handleTaskClick}
                  task={task}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {showAddNewSidebar ? (
        <Sidebar
          handleButtonClick={setCreatingTask}
          handleCloseClick={() => setShowAddNewSidebar(false)}
        />
      ) : null}
      {editTaskId ? (
        <Sidebar
          handleButtonClick={setCreatingTask}
          handleCloseClick={handleCloseSidebarClick}
          task={tasks?.find((task) => task.id === editTaskId)}
        />
      ) : null}
    </div>
  );
}

function Sidebar({
  handleButtonClick,
  handleCloseClick,
  task,
}: {
  handleButtonClick: (arg: boolean) => void;
  handleCloseClick: () => void;
  task?: Task;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (task) {
    const updateTaskWithId = updateTask.bind(null, task.id);
    return (
      <div className="w-1/3 border p-8 -m-8 h-screen min-w-80 flex flex-col">
        <Button
          className="self-end"
          selected
          icon="faXmark"
          onClick={() => handleCloseClick()}
          title="close"
        />
        <form
          className="flex flex-col gap-4"
          action={async (formData) => {
            await updateTaskWithId(formData);
            inputRef.current?.focus();
          }}
        >
          <input
            id="true"
            type="hidden"
            name="repeating"
            value="true"
            defaultChecked
          />
          <fieldset className="flex flex-col">
            <label htmlFor="name">Task Name:</label>
            <input
              ref={inputRef}
              className="border"
              type="text"
              id="name"
              name="name"
              required
              defaultValue={task.name}
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label htmlFor="frequency">
              How often should this task be completed?
            </label>
            <input
              className="border"
              type="number"
              id="frequency"
              name="frequency"
              defaultValue={String(task.frequency)}
            />
          </fieldset>
          <button
            className="w-max self-end py-2 px-4 border rounded text-sm text-white bg-green-600"
            onClick={() => handleButtonClick(true)}
            type="submit"
          >
            Update Task
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-1/3 border p-8 -m-8 h-screen min-w-80 flex flex-col">
      <Button
        className="self-end"
        selected
        icon="faXmark"
        onClick={() => handleCloseClick()}
        title="close"
      />
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        action={async (formData) => {
          await createTask(formData);
          formRef.current?.reset();
          inputRef.current?.focus();
        }}
      >
        <input
          id="true"
          type="hidden"
          name="repeating"
          value="true"
          defaultChecked
        />
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
        {/* {isRepeatingTask ? ( */}
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
        {/*  ) : (
      <fieldset className="flex flex-col">
        <label htmlFor="dueDate">
          When should this task be completed?
        </label>
        <input className="border" type="date" name="dueDate" />
      </fieldset>
    )}  */}
        <button
          className="w-max self-end py-2 px-4 border rounded text-sm text-white bg-green-600"
          onClick={() => handleButtonClick(true)}
          type="submit"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
