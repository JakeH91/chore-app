'use client';
import { readProjects } from '@app/actions/database/task';
import { useEffect, useState } from 'react';
import { TableTask } from '@app/components/molecules/TableTask';
import { Table } from '@app/components/molecules/Table';
import { Household, Task } from '@prisma/client';
import { readHouseholds } from '@app/actions/database/household';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';

const Projects = () => {
  const [creatingTask, setCreatingTask] = useState(false);
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
                    "Sometimes, a task just needs to get done, and then it's done. No repeating, no fussing about."
                  }
                </span>
                <span className="block w-100 text-justify mt-4">
                  {
                    'These tasks we shall call "Projects". They may have subtasks, or not. But once they are done, you can forget about them forever'
                  }
                </span>
                <span className="block w-100 text-justify mt-4">
                  {'Click the + below to add a new project.'}
                </span>
              </>
            ) : (
              <Table title="tasks" headings={['', 'Project', '']}>
                {tasks?.map((task) => {
                  return (
                    <TableTask key={task.id} task={task} noDate moreInfo />
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
