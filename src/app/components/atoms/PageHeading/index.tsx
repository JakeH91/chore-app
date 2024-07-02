export const PageHeading = ({ children }: { children: string }) => {
  return (
    <div className="px-4 py-2 w-full bg-gray-100 md:bg-transparent md:p-0">
      <h1>{children}</h1>
    </div>
  );
};
