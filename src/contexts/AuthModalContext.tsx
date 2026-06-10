import React, { createContext, useContext, useState } from "react";
import AuthModal from "../components/AuthModal";

type AuthModalContextType = {
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export function AuthModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = (): void => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = (): void => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }

  return context;
}
