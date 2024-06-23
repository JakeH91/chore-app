import { Household, Task } from '@prisma/client';
import { createTask, updateTask } from '@app/actions/database/task';
import { RefObject, useEffect, useRef, useState } from 'react';
import { readHouseholds } from '@src/app/actions/database/household';

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
  const [numOfSubtasks, setNumOfSubtasks] = useState(0);
  const [households, setHouseholds] = useState<Household[]>();

  useEffect(() => {
    async function fetchHouseholds() {
      const fetchedHouseholds = await readHouseholds();
      setHouseholds(fetchedHouseholds);
    }
    fetchHouseholds();
  }, []);

  if (task) {
    const updateTaskWithId = updateTask.bind(null, task.id);
    return (
      <>
        <Form
          task={task}
          inputRef={inputRef}
          isRepeatingTask={task.repeating}
          formAction={async (formData) => {
            await updateTaskWithId(formData);
            inputRef.current?.focus();
          }}
          buttonClick={() => handleButtonClick(true)}
          buttonText={'Update Task'}
          households={households}
        />
        {task.repeating ? null : (
          <>
            {[...Array(numOfSubtasks)].map((_, index) => {
              console.log('subtaskNumber:', index);
              return (
                <Form
                  className="pl-4 mb-2"
                  isRepeatingTask={false}
                  key={`subtask-${index}`}
                  parentId={task.id}
                  formAction={async (formData) => {
                    await createTask(formData);
                  }}
                  buttonClick={() => setNumOfSubtasks((current) => current + 1)}
                  buttonText={'Save New Subtask'}
                  households={households}
                />
              );
            })}
            <button
              className="pt-4"
              onClick={() => setNumOfSubtasks((current) => current + 1)}
            >
              Add Subtask?
            </button>
          </>
        )}
      </>
    );
  }

  return (
    <Form
      isRepeatingTask={isRepeatingTask}
      formAction={async (formData) => {
        await createTask(formData);
        formRef.current?.reset();
        inputRef.current?.focus();
      }}
      buttonClick={() => handleButtonClick(true)}
      buttonText={'Create Task'}
      households={households}
    />
  );
};

function Form({
  className,
  task,
  isRepeatingTask,
  parentId,
  inputRef,
  formRef,
  households,
  formAction,
  buttonClick,
  buttonText,
}: {
  className?: string;
  task?: Task;
  isRepeatingTask: boolean;
  parentId?: number;
  inputRef?: RefObject<HTMLInputElement>;
  formRef?: RefObject<HTMLFormElement>;
  households?: any[];
  formAction: (formData: FormData) => Promise<void>;
  buttonClick: () => void;
  buttonText: string;
}) {
  return (
    <div className={className}>
      <form className="flex flex-col gap-4" ref={formRef} action={formAction}>
        {isRepeatingTask ? (
          <input
            id="true"
            type="hidden"
            name="repeating"
            value="true"
            defaultChecked
          />
        ) : null}
        {parentId ? (
          <input type="hidden" name="parentId" value={parentId} />
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
            defaultValue={task?.name}
          />
        </fieldset>
        {isRepeatingTask ? (
          <fieldset className="flex flex-col">
            <label htmlFor="frequency">
              How often should this task be completed (in days)?
            </label>
            <input
              className="border"
              type="number"
              id="frequency"
              name="frequency"
              defaultValue={
                task?.frequency ? String(task.frequency) : undefined
              }
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
        {households ? (
          <fieldset className="flex flex-col">
            <label htmlFor="access">Who is this task for?</label>
            <select
              className="border"
              id="access"
              name="access"
              required
              defaultValue={
                task?.householdId ? String(task.householdId) : 'self'
              }
            >
              {households.map((household) => {
                return (
                  <option key="household" value={household.id}>
                    {household.name}
                  </option>
                );
              })}
              <option value="self">{'Just Me'}</option>
            </select>
          </fieldset>
        ) : null}

        <button
          className="w-max self-end py-2 px-4 border rounded text-sm text-white bg-green-600"
          onClick={buttonClick}
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
