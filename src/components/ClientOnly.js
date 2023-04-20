import React from 'react';
import styles from './ClientOnly.module.css';

const ClientOnly = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className={styles.wrapper} {...delegated}>
      {children}
    </div>
  );
};

export default ClientOnly;
