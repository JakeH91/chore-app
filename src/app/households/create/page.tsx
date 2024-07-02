'use client';
import { createHousehold } from '@app/actions/database/household';
import React from 'react';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';

export const CreateHousehold = () => {
  return (
    <>
      <PageHeading>{'Households'}</PageHeading>
      <PageContent>
        <div className="mb-8">
          <h2>Create New Household?</h2>
          <form
            className="flex flex-row items-center gap-4"
            action={createHousehold}
          >
            <label htmlFor="name">Name:</label>
            <input
              className="border"
              type="text"
              id="name"
              name="name"
              required
            />
            <label htmlFor="address">Address:</label>
            <input
              className="border"
              type="text"
              id="address"
              name="address"
              required
            />
            <button
              className="w-max self-end py-2 px-4 border rounded text-sm text-white bg-green-600"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </PageContent>
    </>
  );
};

export default CreateHousehold;
