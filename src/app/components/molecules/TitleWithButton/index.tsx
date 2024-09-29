export const TitleWithButton = ({
  title,
  buttonClick,
  buttonText,
}: {
  title: string;
  buttonClick: (arg1?: any) => void;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-row items-center justify-between mb-10">
      <h1 className="pr-8">{title}</h1>
      <button
        onClick={() => buttonClick(true)}
        className="py-2 px-4 border rounded text-sm text-white bg-green-600"
      >
        {buttonText}
      </button>
    </div>
  );
};
