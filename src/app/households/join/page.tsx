'use client';
import { joinHousehold } from '@app/actions/database/household';
import React from 'react';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';
import { ImageAndText } from '@app/components/molecules/ImageAndText';
import Link from 'next/link';
import { Button } from '@app/components/atoms/Button';

export const JoinHousehold = () => {
  return (
    <>
      <PageHeading>{'Households'}</PageHeading>
      <PageContent>
        <div className="flex flex-col h-full relative justify-between">
          <ImageAndText imgSrc="/household.jpg" imgAltText="A tidy living room">
            <>
              <span className="block w-100 text-justify">
                {
                  'The work has already begun! Just enter the code below to get stuck in.'
                }
              </span>
              <Link
                href="/households/create"
                className="block w-100 text-justify mt-4 text-xs text-blue-500 underline"
              >
                {'Create a new household instead?'}
              </Link>
            </>
          </ImageAndText>
          <form
            className="flex flex-col gap-1"
            action={async (formData) => {
              await joinHousehold(formData);
            }}
          >
            <label htmlFor="joiningCode">{'Enter Code:'}</label>
            <input
              className="border h-10 px-2"
              type="text"
              id="joiningCode"
              name="joiningCode"
              required
            />
            <Button className="mt-3" type="submit">
              {'JOIN'}
            </Button>
          </form>
        </div>
      </PageContent>
    </>
  );
};

export default JoinHousehold;
