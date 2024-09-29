import { Button } from '@app/components/atoms/Button';
import { ImageAndText } from '../../molecules/ImageAndText';

export const Login = () => {
  return (
    <div className="flex flex-col h-full p-7 py-12 relative justify-between">
      <ImageAndText imgSrc="/checklist.jpg" imgAltText="A checklist">
        <>
          <span className="block w-100 text-justify">
            {
              'Are you losing control of your life? Has the monotonous mundanity of modern day living got you down?'
            }
          </span>
          <span className="block w-100 text-justify mt-4">
            {
              'Say no more to "When did I last clean the toilet?", or "Was I supposed to be doing something this weekend?". Sign up to leave your worries behind.'
            }
          </span>
        </>
      </ImageAndText>
      <Button href="/api/auth/login">{'GET STARTED'}</Button>
    </div>
  );
};
