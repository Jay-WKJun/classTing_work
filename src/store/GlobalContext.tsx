import { createContext, useContext } from 'react';

class GlobalState {
  startTime = 0;

  setStartTime = () => {
    this.startTime = new Date().getTime();
  };

  initStartTime = () => {
    this.startTime = 0;
  };

  getSpentTime = () => new Date().getTime() - this.startTime;
}

const globalState = new GlobalState();

const GlobalContext = createContext<GlobalState>(globalState);

export function GlobalStateProvider({ children }: { children: React.ReactElement }) {
  return (
    <GlobalContext.Provider
      value={globalState}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext) as GlobalState;
