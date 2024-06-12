import { Task } from '@prisma/client';
import { createTask, updateTask } from '@app/actions/database/task';
import { useRef } from 'react';

// TODO: Refactor to be more logic independant
export const TaskForm = ({
  handleButtonClick,
  isRepeatingTask = false,
  task,
}: {
  handleButtonClick: (arg: boolean) => void;
  isRepeatingTask?: boolean;
  task?: Task;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (task) {
    const updateTaskWithId = updateTask.bind(null, task.id);
    return (
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          await updateTaskWithId(formData);
          inputRef.current?.focus();
        }}
      >
        {task.repeating ? (
          <input
            id="true"
            type="hidden"
            name="repeating"
            value="true"
            defaultChecked
          />
        ) : null}
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
        {task.repeating ? (
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
        ) : (
          <fieldset className="flex flex-col">
            <label htmlFor="dueDate">When should this task be completed?</label>
            <input
              className="border"
              type="date"
              name="dueDate"
              defaultValue={new Date(task?.dueDate ?? new Date())
                .toISOString()
                .slice(0, 10)}
            />
          </fieldset>
        )}
        <button
          className="w-max self-end py-2 px-4 border rounded text-sm text-white bg-green-600"
          onClick={() => handleButtonClick(true)}
          type="submit"
        >
          Update Task
        </button>
      </form>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      ref={formRef}
      action={async (formData) => {
        await createTask(formData);
        formRef.current?.reset();
        inputRef.current?.focus();
      }}
    >
      {isRepeatingTask ? (
        <input
          id="true"
          type="hidden"
          name="repeating"
          value="true"
          defaultChecked
        />
      ) : null}
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
          <label htmlFor="dueDate">When should this task be completed?</label>
          <input className="border" type="date" name="dueDate" />
        </fieldset>
      )}
      <button
        className="w-max self-end py-2 px-4 border rounded text-sm text-white bg-green-600"
        onClick={() => handleButtonClick(true)}
        type="submit"
      >
        Create Task
      </button>
    </form>
  );
};
