import { Task } from '@prisma/client';
import { Button } from '@app/components/atoms/Button';
import Link from 'next/link';
import { useState } from 'react';
import { completeTask } from '@app/actions/database/task';

export const TableTask = ({
  task,
  noDate,
}: {
  task: Task;
  noDate?: boolean;
}) => {
  const [completed, setCompleted] = useState(false);
  const completeTaskWithId = completeTask.bind(null, task.id);
  return (
    <tr>
      <td className="border">
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
      <td className="border">
        <Link href={`/tasks/${task.id}`}>{task.name}</Link>
      </td>
      {noDate ? null : (
        <td className="border">
          {task.dueDate ? task.dueDate.toDateString() : ''}
        </td>
      )}
    </tr>
  );
};
