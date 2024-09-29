'use client';
import { createHousehold } from '@app/actions/database/household';
import React from 'react';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';
import { ImageAndText } from '@app/components/molecules/ImageAndText';
import Link from 'next/link';
import { Button } from '@app/components/atoms/Button';

const CreateHousehold = () => {
  return (
    <>
      <PageHeading>{'Households'}</PageHeading>
      <PageContent>
        <div className="flex flex-col h-full relative justify-between">
          <ImageAndText imgSrc="/household.jpg" imgAltText="A tidy living room">
            <>
              <span className="block w-100 text-justify">
                {'Get your household up-and-running now. Someone has to do it!'}
              </span>
              <Link
                href="/households/join"
                className="block w-100 text-justify mt-4 text-xs text-blue-500 underline"
              >
                {'Join an existing household instead?'}
              </Link>
            </>
          </ImageAndText>
          <form className="flex flex-col gap-1" action={createHousehold}>
            <label htmlFor="name">{'House Name:'}</label>
            <input
              className="border h-10 px-2"
              type="text"
              id="name"
              name="name"
              required
            />
            <label htmlFor="address">{'Address (first line):'}</label>
            <input
              className="border h-10 px-2"
              type="text"
              id="address"
              name="address"
              required
            />
            <Button className="mt-3" type="submit">
              {'CREATE'}
            </Button>
          </form>
        </div>
      </PageContent>
    </>
  );
};

export default CreateHousehold;
