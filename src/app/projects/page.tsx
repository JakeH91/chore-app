'use client';
import { readProjects } from '@app/actions/database/task';
import { useEffect, useState } from 'react';
import { TableTask } from '@app/components/molecules/TableTask';
import { TitleWithButton } from '@app/components/molecules/TitleWithButton';
import { Table } from '@app/components/molecules/Table';
import { InfoBar } from '@app/components/organisms/InfoBar';
import { TaskForm } from '@app/components/molecules/TaskForm';
import { Household, Task } from '@prisma/client';
import { readHouseholds } from '@app/actions/database/household';

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
    <div className="flex flex-row justify-between">
      <div className="w-fit">
        <TitleWithButton
          title="All Projects"
          buttonClick={setShowAddNewSidebar}
          buttonText="Add New"
        />
        <Table title="tasks" headings={['', 'Project', 'Due Date']}>
          {tasks?.map((task) => {
            return (
              <TableTask
                key={task.id}
                handleClick={handleTaskClick}
                task={task}
                noDate={!task.dueDate}
              />
            );
          })}
        </Table>
      </div>
      {/* TODO: Refactor to handle all this with one InfoBar & TaskForm */}
      {showAddNewSidebar ? (
        <InfoBar handleCloseClick={() => setShowAddNewSidebar(false)}>
          <TaskForm handleButtonClick={setCreatingTask} />
        </InfoBar>
      ) : null}
      {editTaskId ? (
        <InfoBar handleCloseClick={handleCloseSidebarClick}>
          <TaskForm
            handleButtonClick={setCreatingTask}
            task={tasks?.find((task) => task.id === editTaskId)}
          />
        </InfoBar>
      ) : null}
    </div>
  );
};

export default Projects;
