import { Task } from '@prisma/client';
import { Button } from '@app/components/atoms/Button';
import { useState } from 'react';
import { completeTask } from '@app/actions/database/task';

export const TableTask = ({
  task,
  handleClick,
  noDate,
}: {
  task: Task & { parentTask?: Task; subtasks?: Task[] };
  handleClick?: (taskId: number) => void;
  noDate?: boolean;
}) => {
  const [completed, setCompleted] = useState<{
    mainTask: boolean;
    [key: number]: boolean;
  }>({ mainTask: false });
  const completeTaskWithId = completeTask.bind(null, task.id);
  return (
    <>
      <tr>
        <td className="p-1 pb-2">
          <form action={completeTaskWithId}>
            <Button
              icon="faCircleCheck"
              selected={completed.mainTask}
              onClick={() =>
                setCompleted((current) => {
                  return { ...current, mainTask: !current.mainTask };
                })
              }
              type="submit"
              title="submit"
            />
          </form>
        </td>
        <td
          className="px-4 pb-2"
          onClick={() => (handleClick ? handleClick(task.id) : null)}
        >
          {task.name} {task.parentTask ? `(${task.parentTask.name})` : ''}
        </td>
        {noDate ? null : (
          <td className="px-4 pb-2">
            {task.dueDate ? task.dueDate.toLocaleDateString() : ''}
          </td>
        )}
      </tr>
      {task.subtasks?.map((subtask) => {
        const completeSubtaskWithId = completeTask.bind(null, subtask.id);
        return (
          <tr
            key={`task-${task.id}-subtask-${subtask.id}`}
            className="bg-gray-100"
          >
            <td className="p-1 pb-2">
              <form action={completeSubtaskWithId}>
                <Button
                  className="pl-4"
                  icon="faCircleCheck"
                  selected={completed[subtask.id]}
                  onClick={() =>
                    setCompleted((current) => {
                      return { ...current, [subtask.id]: !current[subtask.id] };
                    })
                  }
                  type="submit"
                  title="submit"
                />
              </form>
            </td>
            <td
              className="px-8 pb-2"
              onClick={() => (handleClick ? handleClick(subtask.id) : null)}
            >
              {subtask.name}
            </td>
            {!subtask.dueDate ? null : (
              <td className="px-4 pb-2">
                {subtask.dueDate ? subtask.dueDate.toLocaleDateString() : ''}
              </td>
            )}
          </tr>
        );
      })}
    </>
  );
};
