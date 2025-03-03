import { jsx as _jsx } from "react/jsx-runtime";
// src/context/LoadingContext.tsx
import { createContext, useContext, useState } from 'react';
// Context oluşturuluyor
const LoadingContext = createContext(undefined);
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (_jsx(LoadingContext.Provider, { value: { isLoading, setIsLoading }, children: children }));
};
// Custom hook: Her yerde loading durumuna erişmek için
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
// Dışarıdan da setLoading fonksiyonu çağırılabilsin diye
export const setLoading = (loading) => {
    // Bu örnekte global loading state yönetimini merkezi bir yerden yönetmek için 
    // ek bir düzenleme yapılması gerekir. Gerçek projede, 
    // bu fonksiyonu context içinde expose edip, axios interceptor'da kullanabilirsiniz.
    // Şimdilik demo amaçlı burası basit bırakıldı.
    console.log('Loading state changed:', loading);
};
