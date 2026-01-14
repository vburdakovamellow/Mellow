import styles from "./DevButtons.module.css";

export function DevButtons() {
  const path = window.location.pathname;
  const isEditPage = path === '/edit';

  return (
    <div className={styles.devButtonsContainer}>
      {isEditPage && (
        <button 
          className={styles.devButton}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Start over
        </button>
      )}
      {!isEditPage && (
        <button 
          className={styles.devButton}
          onClick={() => {
            window.location.href = '/edit';
          }}
        >
          [Dev] Edit
        </button>
      )}
    </div>
  );
}
