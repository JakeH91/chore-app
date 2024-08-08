'use client';
import { readProjects } from '@app/actions/database/task';
import { useEffect, useState } from 'react';
import { TableTask } from '@app/components/molecules/TableTask';
import { Table } from '@app/components/molecules/Table';
import { Household, Task } from '@prisma/client';
import { readHouseholds } from '@app/actions/database/household';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';

export const Projects = () => {
  const [showAddNewSidebar, setShowAddNewSidebar] = useState(false);
  const [creatingTask, setCreatingTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | undefined>(0);
  const [households, setHouseholds] = useState<Household[]>();
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    async function fetchHouseholds() {
      const fetchedHouseholds = await readHouseholds();
      setHouseholds(fetchedHouseholds);
    }
    fetchHouseholds();
  }, []);

  useEffect(() => {
    async function fetchTasks(households?: Household[]) {
      const fetchedTasks = await readProjects(households);
      setTasks(fetchedTasks);
      setCreatingTask(false);
    }
    fetchTasks(households);
  }, [creatingTask, households]);

  const handleTaskClick = (taskId: number) => {
    setEditTaskId(taskId);
  };

  const handleCloseSidebarClick = () => {
    setEditTaskId(undefined);
  };

  return (
    <>
      <PageHeading>{'Projects'}</PageHeading>
      <PageContent>
        <>
          <div className="w-full">
            {tasks && tasks.length === 0 ? (
              <>
                <span className="block w-100 text-justify">
                  {
                    "Sometimes, when you finish a task, it's done forever. Good job, we can all go home. Sometimes, though, it comes back. Again, and again, and again."
                  }
                </span>
                <span className="block w-100 text-justify mt-4">
                  {
                    'These sisyphean tasks we shall call "Chores". Awful though they might be, this app aims to remove the mental capacity needed to keep on top of it all.'
                  }
                </span>
                <span className="block w-100 text-justify mt-4">
                  {'Click the + below to add a new chore.'}
                </span>
              </>
            ) : (
              <Table title="tasks" headings={['', 'Project', '']}>
                {tasks?.map((task) => {
                  return (
                    <TableTask
                      key={task.id}
                      handleClick={handleTaskClick}
                      task={task}
                      noDate
                      moreInfo
                    />
                  );
                })}
              </Table>
            )}
          </div>
        </>
      </PageContent>
    </>
  );
};

export default Projects;
