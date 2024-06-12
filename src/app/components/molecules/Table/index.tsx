export const Table = ({
  title,
  headings,
  children,
}: {
  title: string;
  headings: string[];
  children: React.JSX.Element[] | undefined;
}) => {
  return (
    <table>
      <thead>
        <tr>
          {headings.map((heading) => {
            return <th key={`${title}-heading-${heading}`}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
