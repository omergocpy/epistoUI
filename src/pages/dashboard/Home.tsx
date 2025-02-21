// src/pages/dashboard/Home.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section style={{ padding: '20px', textAlign: 'center' }}>
      <h2>{t('dashboard.welcome')}</h2>
      <p>{t('dashboard.description')}</p>
      {/* Dashboard içerikleri buraya eklenir */}
    </section>
  );
};

export default Home;
