'use client';
import {
  createHousehold,
  joinHousehold,
  readHouseholds,
} from '@app/actions/database/household';
import React, { useEffect, useState } from 'react';

export const Households = () => {
  const [households, setHouseholds] = useState<
    {
      id: number;
      joiningCode: string;
      name: string;
      address: string;
      userId: string;
    }[]
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitting(true);
  };

  useEffect(() => {
    async function fetchHouseholds() {
      const fetchedHouseholds = await readHouseholds();
      setHouseholds(fetchedHouseholds);
      setIsSubmitting(false);
    }

    fetchHouseholds();
  }, [isSubmitting]);

  return (
    <>
      <h1 className="mb-4">Households</h1>
      {households && households.length > 0 ? (
        <div className="mb-8">
          {households.map((household, index) => {
            return (
              <div className="flex flex-row" key={`household-${household.id}`}>
                <span className="mx-2">{index + 1}.</span>
                <div>
                  <span className="block">{household.name}</span>
                  <span className="block">{household.address}</span>
                  <span className="block">
                    Joining Code: {household.joiningCode}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
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
            onClick={handleFormSubmit}
          >
            Join
          </button>
        </form>
      </div>
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
            onClick={handleFormSubmit}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default Households;
