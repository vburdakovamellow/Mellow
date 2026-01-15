import styles from "./DevButtons.module.css";

export function DevButtons() {
  const path = window.location.pathname;
  const base = import.meta.env.BASE_URL;
  
  // Normalize paths
  const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  
  // Check if path ends with /edit
  const isEditPage = normalizedPath.endsWith('/edit') || normalizedPath === '/edit';
  
  // Build paths with base path
  const homePath = normalizedBase || '/';
  const editPath = normalizedBase ? `${normalizedBase}/edit` : '/edit';

  return (
    <div className={styles.devButtonsContainer}>
      {isEditPage && (
        <button 
          className={styles.devButton}
          onClick={() => {
            window.location.href = homePath;
          }}
        >
          Start over
        </button>
      )}
      {!isEditPage && (
        <button 
          className={styles.devButton}
          onClick={() => {
            window.location.href = editPath;
          }}
        >
          [Dev] Edit
        </button>
      )}
    </div>
  );
}
