import FocusLock from 'react-focus-lock';
import Image from 'next/image';
import React from 'react';
import closeIcon from '../assets/x.svg';
import styles from './Modal.module.css';

const Modal = ({ children, label, onClose }) => {
  return (
    <FocusLock className={styles.modalWrapper} returnFocus>
      <div aria-label={label} aria-modal className={styles.modal} role='dialog'>
        {children}
        <button className={styles.closeBtn} onClick={onClose}>
          <Image alt='Close icon' src={closeIcon} />
        </button>
      </div>
    </FocusLock>
  );
};

export default Modal;
