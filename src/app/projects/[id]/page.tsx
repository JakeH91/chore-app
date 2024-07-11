'use client';
import React from 'react';
import { PageHeading } from '@app/components/atoms/PageHeading';
import { PageContent } from '@app/components/atoms/PageContent';

export const Project = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <PageHeading>{'Projects'}</PageHeading>
      <PageContent>
        <span>Project Id: {params.id}</span>
      </PageContent>
    </>
  );
};

export default Project;
