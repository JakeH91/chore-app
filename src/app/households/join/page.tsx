'use client';
import { joinHousehold } from '@app/actions/database/household';
import React from 'react';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';

export const JoinHousehold = () => {
  return (
    <>
      <PageHeading>{'Households'}</PageHeading>
      <PageContent>
        <div className="mb-8">
          <h2>Join Existing Household?</h2>
          <form
            className="flex flex-row items-center gap-4"
            action={async (formData) => {
              await joinHousehold(formData);
            }}
          >
            <label htmlFor="joiningCode">Code:</label>
            <input
              className="border"
              type="text"
              id="joiningCode"
              name="joiningCode"
              required
            />
            <button
              className="w-max self-end py-2 px-4 border rounded text-sm text-white bg-green-600"
              type="submit"
            >
              Join
            </button>
          </form>
        </div>
      </PageContent>
    </>
  );
};

export default JoinHousehold;
