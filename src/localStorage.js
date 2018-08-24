const LOCAL_STORAGE_KEY = 'local-library';

export const saveState = state => {
  if (state !== undefined) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    return true;
  } else {
    return false;
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);

  } catch(err) {
    return undefined;
  }
};

export const removeState = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return true;

  } catch(err) {
    return undefined;
  }
};