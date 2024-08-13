'use client';

export const InputChangeDelay = ({
  className,
  timeoutTracker,
  type = 'text',
  id,
  name,
  callback,
  defaultValue,
}: {
  className?: string;
  timeoutTracker: NodeJS.Timeout | null;
  type?: string;
  id: string;
  name: string;
  callback: (key: string, value: any) => void;
  defaultValue?: string;
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (timeoutTracker) {
      clearTimeout(timeoutTracker);
    }
    const key = event.target.name;
    const value = event.target.value;
    callback(key, value);
  };

  return (
    <input
      className={`${className ? className + ' ' : ''}border`}
      type={type}
      id={id}
      name={name}
      onChange={handleChange}
      defaultValue={defaultValue}
    />
  );
};
