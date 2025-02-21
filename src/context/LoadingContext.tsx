// src/context/LoadingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Context oluşturuluyor
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook: Her yerde loading durumuna erişmek için
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Dışarıdan da setLoading fonksiyonu çağırılabilsin diye
export const setLoading = (loading: boolean): void => {
  // Bu örnekte global loading state yönetimini merkezi bir yerden yönetmek için 
  // ek bir düzenleme yapılması gerekir. Gerçek projede, 
  // bu fonksiyonu context içinde expose edip, axios interceptor'da kullanabilirsiniz.
  // Şimdilik demo amaçlı burası basit bırakıldı.
  console.log('Loading state changed:', loading);
};
