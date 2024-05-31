import { Task } from '@prisma/client';
import { Button } from '@app/components/atoms/Button';
import Link from 'next/link';
import { useState } from 'react';
import { completeTask } from '@app/actions/database/task';

export const TableTask = ({ task }: { task: Task }) => {
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
          />
        </form>
      </td>
      <td className="border">
        <Link href={`/tasks/${task.id}`}>{task.name}</Link>
      </td>
      <td className="border">
        {task.dueDate ? task.dueDate.toDateString() : ''}
      </td>
    </tr>
  );
};
