import { Task } from '@prisma/client';
import { Button } from '@app/components/atoms/Button';
import { InputChangeDelay } from '@app/components/molecules/InputChangeDelay';
import { useEffect, useRef, useState } from 'react';
import { updateTask } from '@src/app/actions/database/task';

export const SubtaskBasicForm = ({ task }: { task: Task }) => {
  const [updatedTask, setUpdatedTask] = useState<Partial<Task> | null>({
    id: task.id,
    name: task.name,
    parentId: task.parentId,
  });
  const [shouldWriteToDb, setShouldWriteToDb] = useState(false);

  useEffect(() => {
    async function updateTaskFunc(
      task: (Partial<Task> & { access?: string | number | null }) | null
    ) {
      if (task) {
        console.log('updating task...');
        await updateTask(task);
      }
      setShouldWriteToDb(false);
    }

    if (shouldWriteToDb) {
      updateTaskFunc(updatedTask);
    }
  }, [shouldWriteToDb, updatedTask]);
  const timeoutTracker = useRef<NodeJS.Timeout | null>(null);

  const callback = (key: string, value: any) => {
    setUpdatedTask((current) => ({ ...current, [key]: value }));

    timeoutTracker.current = setTimeout(() => {
      setShouldWriteToDb(true);
    }, 1000);
  };
  return (
    <>
      <tr>
        <td className="px-4 pb-2 w-full">
          <form>
            <fieldset className="flex flex-col">
              <label hidden htmlFor="name">
                Task Name:
              </label>
              <InputChangeDelay
                id="name"
                name="name"
                timeoutTracker={timeoutTracker.current}
                callback={callback}
                defaultValue={
                  updatedTask?.name ? String(updatedTask?.name) : undefined
                }
              />
            </fieldset>
          </form>
        </td>
        <td className="p-1 pb-2">
          <Button
            icon="faEllipsis"
            iconVariant="solid"
            size="small"
            variant="secondary"
            href={`/projects/${task.id}`}
          />
        </td>
      </tr>
    </>
  );
};
