import { createContext, ReactNode, useState } from "react";

export const ModalContext = createContext({
  newUserOpen: false,
  setNewUserOpen: null as any,
  newBucketOpen: false,
  setNewBucketOpen: null as any,
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [newBucketOpen, setNewBucketOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        newUserOpen,
        setNewUserOpen,
        newBucketOpen,
        setNewBucketOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
