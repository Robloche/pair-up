import React from 'react';
import { Sound } from '@/helpers/types';
import useSound from '@/hooks/use-sound';

const Button = ({ children, onClick, ...rest }) => {
  const { play } = useSound();

  const handleOnClick = React.useCallback(() => {
    play(Sound.Click);
    onClick();
  }, [onClick, play]);

  return (
    <button onClick={handleOnClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
