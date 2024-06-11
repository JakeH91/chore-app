import { Task } from '@prisma/client';
import { Button } from '@app/components/atoms/Button';
import { useState } from 'react';
import { completeTask } from '@app/actions/database/task';

export const TableTask = ({
  task,
  handleClick,
  noDate,
}: {
  task: Task;
  handleClick?: (taskId: number) => void;
  noDate?: boolean;
}) => {
  const [completed, setCompleted] = useState(false);
  const completeTaskWithId = completeTask.bind(null, task.id);
  return (
    <tr>
      <td className="p-1 pb-2">
        <form action={completeTaskWithId}>
          <Button
            icon="faCircleCheck"
            selected={completed}
            onClick={() => setCompleted((current) => !current)}
            type="submit"
            title="submit"
          />
        </form>
      </td>
      <td
        className="px-4 pb-2"
        onClick={() => (handleClick ? handleClick(task.id) : null)}
      >
        {task.name}
      </td>
      {noDate ? null : (
        <td className="px-4 pb-2">
          {task.dueDate ? task.dueDate.toLocaleDateString() : ''}
        </td>
      )}
    </tr>
  );
};
