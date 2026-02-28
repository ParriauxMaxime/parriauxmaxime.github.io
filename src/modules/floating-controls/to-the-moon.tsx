import useLocalStorage from '@ds/hooks/use-local-storage';
import { createContext, useContext } from 'react';

const MoonContext = createContext<{ enabled: boolean; setEnabled: (v: boolean) => void }>({
  enabled: false,
  setEnabled: () => {},
});

export const useMoon = () => useContext(MoonContext);

export function MoonProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useLocalStorage(false, 'to-the-moon', (v) => v === 'true');
  return <MoonContext.Provider value={{ enabled, setEnabled }}>{children}</MoonContext.Provider>;
}
