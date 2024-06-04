'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { readTasks } from '@app/actions/database/task';
import { addDays, isSameDay } from './utils';
import { TableTask } from './components/organisms/TableTask';

export default function Home() {
  const { user, error, isLoading } = useUser();
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

  const todaysDate = new Date();

  const filteredTasks = {
    overdue:
      tasks?.filter(
        (task) =>
          task.dueDate !== null &&
          !isSameDay(task.dueDate, todaysDate) &&
          task.dueDate < todaysDate
      ) ?? [],
    dueToday:
      tasks?.filter(
        (task) => task.dueDate !== null && isSameDay(task.dueDate, todaysDate)
      ) ?? [],
    dueThreeDays:
      tasks?.filter(
        (task) =>
          task.dueDate !== null &&
          !isSameDay(task.dueDate, todaysDate) &&
          task.dueDate > todaysDate &&
          task.dueDate < addDays(todaysDate, 3)
      ) ?? [],
    dueThisWeek:
      tasks?.filter(
        (task) =>
          task.dueDate !== null &&
          !isSameDay(task.dueDate, todaysDate) &&
          task.dueDate > addDays(todaysDate, 3) &&
          task.dueDate < addDays(todaysDate, 7)
      ) ?? [],
  };

  const noTasks =
    filteredTasks.overdue.length === 0 &&
    filteredTasks.dueToday.length === 0 &&
    filteredTasks.dueThreeDays.length === 0 &&
    filteredTasks.dueThisWeek.length === 0;

  if (error) {
    return <h1>SOMETHING WENT WRONG!!</h1>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <h1>Hello World!</h1>;
  }

  return (
    <>
      <h1>Hello {user?.name}</h1>
      {noTasks ? <p>No tasks this week!</p> : null}
      {filteredTasks.overdue.length > 0 ? (
        <>
          <h2 className="pt-8">Overdue</h2>
          <table>
            <tbody>
              {filteredTasks.overdue.map((task) => {
                return <TableTask key={task.id} task={task} noDate />;
              })}
            </tbody>
          </table>
        </>
      ) : null}
      {filteredTasks.dueToday.length > 0 ? (
        <>
          <h2 className="pt-8">Due Today</h2>
          <table>
            <tbody>
              {filteredTasks.dueToday.map((task) => {
                return <TableTask key={task.id} task={task} noDate />;
              })}
            </tbody>
          </table>
        </>
      ) : null}
      {filteredTasks.dueThreeDays.length > 0 ? (
        <>
          <h2 className="pt-8">Due In Next Three Days</h2>
          <table>
            <tbody>
              {filteredTasks.dueThreeDays.map((task) => {
                return <TableTask key={task.id} task={task} noDate />;
              })}
            </tbody>
          </table>
        </>
      ) : null}
      {filteredTasks.dueThisWeek.length > 0 ? (
        <>
          <h2 className="pt-8">Due Later This Week</h2>
          <table>
            <tbody>
              {filteredTasks.dueThisWeek.map((task) => {
                return <TableTask key={task.id} task={task} noDate />;
              })}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
}
