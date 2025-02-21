// src/components/common/Loading.tsx
import React from 'react';
import { useLoading } from '../../context/LoadingContext';

const Loading: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div style={overlayStyle}>
      <div style={spinnerStyle}>Loading...</div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const spinnerStyle: React.CSSProperties = {
  padding: '20px',
  background: '#fff',
  borderRadius: '5px',
  fontSize: '1.2rem',
};

export default Loading;
