export const PageContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactElement;
}) => {
  return (
    <div
      className={`${
        className ? className + ' ' : ''
      }h-screen pb-6 pt-6 px-4 md:p-0`}
    >
      {children}
    </div>
  );
};
