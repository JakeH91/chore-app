'use client';
import React from 'react';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';

export const Chore = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <PageHeading>{'Chores'}</PageHeading>
      <PageContent>
        <span>Chore Id: {params.id}</span>
      </PageContent>
    </>
  );
};

export default Chore;
