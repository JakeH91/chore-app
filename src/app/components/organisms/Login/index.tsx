import { Button } from '@app/components/atoms/Button';
import Image from 'next/image';

export const Login = () => {
  return (
    <div className="flex flex-col h-full p-7 py-12 relative justify-between">
      <div className="relative h-full">
        <div className="w-full relative h-1/2 rounded-md overflow-hidden">
          <Image
            className="pb-8"
            src="/checklist.jpg"
            alt={'A checklist'}
            fill
          />
        </div>
        <span className="block w-100 text-justify">
          {
            'Are you losing control of your life? Has the monotonous mundanity of modern day living got you down?'
          }
        </span>
        <span className="block w-100 text-justify mt-4">
          {
            'Say no more "When did I last clean the toilet?", or "Was I supposed to be doing something this weekend?" Sign up to leave your worries behind.'
          }
        </span>
      </div>

      <Button href="/api/auth/login">{'GET STARTED'}</Button>
    </div>
  );
};
