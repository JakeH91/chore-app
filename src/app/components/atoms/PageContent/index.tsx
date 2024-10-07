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
      } pb-6 pt-[64px] px-4 md:p-0`}
    >
      {children}
    </div>
  );
};
