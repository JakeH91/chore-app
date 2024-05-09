'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { createTask } from '../actions/database/task';

export default function Tasks() {
  const { user, error, isLoading } = useUser();

  const loadContent = () => {
    if (error) {
      return <h1>SOMETHING WENT WRONG!!</h1>;
    }

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    if (!user) {
      return (
        <div>
          <h1>Hello World!</h1>
        </div>
      );
    }

    if (user && user.sub) {
      const createTaskWithId = createTask.bind(null, user?.sub);
      return (
        <div>
          <h1>Hello {user?.name}</h1>
          <form action={createTaskWithId}>
            <input type="text" name="name" required />
            <input type="date" name="dueDate" />
            <fieldset>
              <legend>Does this task repeat?</legend>
              <input type="radio" id="true" name="repeating" value="true" />
              <label htmlFor="true">Yes</label>
              <input
                type="radio"
                id="false"
                name="repeating"
                value="false"
                defaultChecked
              />
              <label htmlFor="false">No</label>
            </fieldset>
            <input type="number" name="frequency" />
            <button type="submit">Create Task</button>
          </form>
        </div>
      );
    }
  };

  return <main>{loadContent()}</main>;
}
