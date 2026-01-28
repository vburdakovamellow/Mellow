import styles from "./DevButtons.module.css";

export function DevButtons() {
  const path = window.location.pathname;
  const base = import.meta.env.BASE_URL;
  
  // Normalize paths
  const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  
  // Check if path ends with /edit or /request-v2
  const isEditPage = normalizedPath.endsWith('/edit') || normalizedPath === '/edit';
  const isRequestV2Page = normalizedPath.endsWith('/request-v2') || normalizedPath === '/request-v2';

  // Build paths with base path
  const homePath = normalizedBase || '/';
  const requestV2Path = normalizedBase ? `${normalizedBase}/request-v2` : '/request-v2';

  return (
    <div className={styles.devButtonsContainer}>
      {(isEditPage || isRequestV2Page) && (
        <button 
          className={styles.devButton}
          onClick={() => {
            window.location.href = homePath;
          }}
        >
          [Dev] V1
        </button>
      )}
      {!isEditPage && !isRequestV2Page && (
        <button 
          className={styles.devButton}
          onClick={() => {
            window.location.href = requestV2Path;
          }}
        >
          [Dev] V2
        </button>
      )}
    </div>
  );
}
