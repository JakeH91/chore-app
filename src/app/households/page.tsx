'use client';
import { readHouseholds } from '@app/actions/database/household';
import React, { useEffect, useState } from 'react';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';
import { ImageAndText } from '@app/components/molecules/ImageAndText';
import { Button } from '@app/components/atoms/Button';
import { useUser } from '@auth0/nextjs-auth0/client';

export const Households = () => {
  const { user, isLoading } = useUser();
  const [households, setHouseholds] = useState<
    | {
        id: number;
        joiningCode: string;
        name: string;
        address: string;
        userId: string;
      }[]
    | undefined
  >(undefined);

  useEffect(() => {
    async function fetchHouseholds() {
      if (user) {
        const fetchedHouseholds = await readHouseholds();
        setHouseholds(fetchedHouseholds);
      }
    }

    fetchHouseholds();
  }, [user]);

  if (isLoading || !user || !households) return <p>Loading...</p>;

  if (households && households.length === 0) {
    return (
      <PageContent>
        <div className="flex flex-col h-full relative justify-between">
          <ImageAndText imgSrc="/household.jpg" imgAltText="A tidy living room">
            <>
              <span className="block w-100 text-justify">
                {
                  'This app is all about better managing your household, whether you live alone, or squat with a horde of angry meth addicts.'
                }
              </span>
              <span className="block w-100 text-justify mt-4">
                {
                  "Whatever your living condition - hey, I'm not judging - you may as well start with setting up your household (or joining one if it's already been added)."
                }
              </span>
            </>
          </ImageAndText>
          <div className="flex flex-col gap-2">
            <Button href="/households/join">{'JOIN HOUSEHOLD'}</Button>
            <Button variant="secondary" href="/households/create">
              {'CREATE HOUSEHOLD'}
            </Button>
          </div>
        </div>
      </PageContent>
    );
  }

  return (
    <>
      <PageHeading>{'Households'}</PageHeading>
      <PageContent>
        <>
          {households && households.length > 0 ? (
            <div className="mb-8">
              {households.map((household, index) => {
                return (
                  <div
                    className="flex flex-row"
                    key={`household-${household.id}`}
                  >
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
        </>
      </PageContent>
    </>
  );
};

export default Households;
