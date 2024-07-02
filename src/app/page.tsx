'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { readTasks } from '@app/actions/database/task';
import { addDays, isSameDay } from '@app/utils';
import { TableTask } from '@app/components/molecules/TableTask';
import { CollapsibleContent } from '@app/components/organisms/CollapsibleContent';
import { readHouseholds } from '@app/actions/database/household';
import { Household, Task } from '@prisma/client';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';

export const Home = () => {
  const { user, error, isLoading } = useUser();
  const [households, setHouseholds] = useState<Household[]>();
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    async function fetchHouseholds() {
      if (user) {
        const fetchedHouseholds = await readHouseholds();
        setHouseholds(fetchedHouseholds);
      }
    }
    fetchHouseholds();
  }, [user]);

  useEffect(() => {
    async function fetchTasks(households: Household[] | undefined) {
      if (user) {
        const fetchedTasks = await readTasks(households);
        setTasks(fetchedTasks);
      }
    }
    fetchTasks(households);
  }, [user, households]);

  const todaysDate = new Date();

  const filteredTasks = {
    top:
      tasks?.filter(
        (task) =>
          task.dueDate !== null &&
          !isSameDay(task.dueDate, todaysDate) &&
          task.dueDate < todaysDate
      ) ?? [],
    high:
      tasks?.filter(
        (task) => task.dueDate !== null && isSameDay(task.dueDate, todaysDate)
      ) ?? [],
    low:
      tasks?.filter(
        (task) =>
          task.dueDate !== null &&
          !isSameDay(task.dueDate, todaysDate) &&
          task.dueDate > todaysDate &&
          task.dueDate < addDays(todaysDate, 3)
      ) ?? [],
    coming_up:
      tasks?.filter(
        (task) =>
          task.dueDate !== null &&
          !isSameDay(task.dueDate, todaysDate) &&
          task.dueDate > addDays(todaysDate, 3) &&
          task.dueDate < addDays(todaysDate, 6)
      ) ?? [],
  };

  const noTasks =
    filteredTasks.top.length === 0 &&
    filteredTasks.high.length === 0 &&
    filteredTasks.low.length === 0 &&
    filteredTasks.coming_up.length === 0;

  if (error) {
    return <h1>SOMETHING WENT WRONG!!</h1>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <h1>Login to sort your life out</h1>;
  }

  return (
    <>
      <PageHeading>{'Home'}</PageHeading>
      <PageContent>
        <>
          {noTasks ? <p>No tasks this week!</p> : null}
          {filteredTasks.top.length > 0 ? (
            <CollapsibleContent
              variant="red"
              isShowing
              title={`Top Priority: ${filteredTasks.top.length}`}
            >
              <table>
                <tbody>
                  {filteredTasks.top.map((task) => {
                    return <TableTask key={task.id} task={task} noDate />;
                  })}
                </tbody>
              </table>
            </CollapsibleContent>
          ) : null}
          {filteredTasks.high.length > 0 ? (
            <CollapsibleContent
              variant="yellow"
              title={`High Priority: ${filteredTasks.high.length}`}
            >
              <table>
                <tbody>
                  {filteredTasks.high.map((task) => {
                    return <TableTask key={task.id} task={task} noDate />;
                  })}
                </tbody>
              </table>
            </CollapsibleContent>
          ) : null}
          {filteredTasks.low.length > 0 ? (
            <CollapsibleContent
              variant="green"
              title={`Low Priority: ${filteredTasks.low.length}`}
            >
              <table>
                <tbody>
                  {filteredTasks.low.map((task) => {
                    return <TableTask key={task.id} task={task} noDate />;
                  })}
                </tbody>
              </table>
            </CollapsibleContent>
          ) : null}
          {filteredTasks.coming_up.length > 0 ? (
            <CollapsibleContent
              title={`Coming Up: ${filteredTasks.coming_up.length}`}
            >
              <table>
                <tbody>
                  {filteredTasks.coming_up.map((task) => {
                    return <TableTask key={task.id} task={task} />;
                  })}
                </tbody>
              </table>
            </CollapsibleContent>
          ) : null}
        </>
      </PageContent>
    </>
  );
};

export default Home;
