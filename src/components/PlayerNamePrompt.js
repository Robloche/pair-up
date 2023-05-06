import Modal from '@/components/Modal';
import React from 'react';
import styles from './PlayerNamePrompt.module.css';

const PlayerNamePrompt = ({ onClosePlayerNamePrompt }) => {
  const [name, setName] = React.useState('');

  const handleNameOnChange = React.useCallback((event) => {
    setName(event.target.value.trim());
  }, []);

  const handleOnClose = React.useCallback(() => {
    onClosePlayerNamePrompt(null);
  }, [onClosePlayerNamePrompt]);

  const handleOnValidate = React.useCallback(() => {
    onClosePlayerNamePrompt(name);
  }, [name, onClosePlayerNamePrompt]);

  return (
    <Modal label='Player name prompt' onClose={handleOnClose}>
      <input className={styles.name} onChange={handleNameOnChange} placeholder='Enter your name' type='text' value={name} />
      <button className='action dark' onClick={handleOnValidate}>
        Validate
      </button>
    </Modal>
  );
};

export default PlayerNamePrompt;
