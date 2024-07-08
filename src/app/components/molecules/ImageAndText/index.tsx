import Image from 'next/image';

export const ImageAndText = ({
  imgSrc,
  imgAltText,
  children,
}: {
  imgSrc: string;
  imgAltText: string;
  children: React.ReactElement;
}) => {
  return (
    <div className="relative">
      <div className="w-full relative h-[35vh] overflow-hidden">
        <Image className="pb-8" src={imgSrc} alt={imgAltText} fill />
      </div>
      {children}
    </div>
  );
};
