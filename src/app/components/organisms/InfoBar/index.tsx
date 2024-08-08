import { Button } from '@app/components/atoms/Button';

export const InfoBar = ({
  handleCloseClick,
  children,
}: {
  handleCloseClick: () => void;
  children: React.ReactElement;
}) => {
  return (
    <div className="w-1/3 border p-8 -m-8 h-screen min-w-80 flex flex-col">
      <Button
        className="self-end"
        icon="faXmark"
        onClick={() => handleCloseClick()}
        title="close"
      />
      {children}
    </div>
  );
};
