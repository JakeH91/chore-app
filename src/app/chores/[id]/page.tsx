'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';
import { Household, Task } from '@prisma/client';
import { readTask, updateTask } from '@app/actions/database/task';
import { readHouseholds } from '@app/actions/database/household';
import { Button } from '@src/app/components/atoms/Button';
import { useRouter } from 'next/navigation';

const Chore = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [updatedTask, setUpdatedTask] = useState<
    (Partial<Task> & { access?: string | number | null }) | null
  >({
    id: +params.id,
    name: null,
    dueDate: null,
    repeating: true,
    parentId: null,
    frequency: null,
    householdId: null,
    access: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [shouldWriteToDb, setShouldWriteToDb] = useState(false);
  const [households, setHouseholds] = useState<Household[]>();

  useEffect(() => {
    async function fetchHouseholds() {
      const fetchedHouseholds = await readHouseholds();
      setHouseholds(fetchedHouseholds);
    }
    fetchHouseholds();
  }, []);

  useEffect(() => {
    async function fetchTask(id: number) {
      const fetchedTask = await readTask(id);
      setUpdatedTask({
        ...fetchedTask,
        access:
          fetchedTask?.householdId === null ? 'self' : fetchedTask?.householdId,
      });
      setIsLoading(false);
    }

    fetchTask(+params.id);
  }, [params.id]);

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (timeoutTracker.current) {
      clearTimeout(timeoutTracker.current);
    }
    const key = event.target.name;
    const value = event.target.value;
    setUpdatedTask((current) => ({ ...current, [key]: value }));

    timeoutTracker.current = setTimeout(() => {
      setShouldWriteToDb(true);
    }, 1000);
  };

  if (isLoading) return <span>Loading...</span>;
  return (
    <>
      <PageHeading>{'Chores'}</PageHeading>
      <PageContent>
        <div className="flex flex-col">
          <Button
            className="w-fit mb-6"
            size="small"
            variant="secondary"
            icon={'faChevronLeft'}
            iconVariant="solid"
            onClick={() => router.back()}
          >
            {' Back'}
          </Button>
          <form>
            <fieldset className="flex flex-col">
              <label htmlFor="name">Task Name:</label>
              <input
                className="border mb-4"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                required
                defaultValue={
                  updatedTask?.name ? String(updatedTask?.name) : undefined
                }
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="frequency">
                How often should this task be completed (in days)?
              </label>
              <input
                className="border mb-4"
                type="number"
                id="frequency"
                name="frequency"
                onChange={handleChange}
                defaultValue={
                  updatedTask?.frequency
                    ? String(updatedTask.frequency)
                    : undefined
                }
              />
            </fieldset>
            {households ? (
              <fieldset className="flex flex-col">
                <label htmlFor="access">Who is this task for?</label>
                <select
                  className="border"
                  id="access"
                  name="access"
                  onChange={handleChange}
                  required
                  defaultValue={
                    updatedTask?.householdId
                      ? String(updatedTask.householdId)
                      : 'self'
                  }
                >
                  {households.map((household) => {
                    return (
                      <option key="household" value={household.id}>
                        {household.name}
                      </option>
                    );
                  })}
                  <option value="self">{'Just Me'}</option>
                </select>
              </fieldset>
            ) : null}
          </form>
        </div>
      </PageContent>
    </>
  );
};

export default Chore;
