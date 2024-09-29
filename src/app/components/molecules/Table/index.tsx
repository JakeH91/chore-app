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
            return (
              <th
                className="px-4 pb-2 text-left"
                key={`${title}-heading-${heading}`}
              >
                {heading}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
