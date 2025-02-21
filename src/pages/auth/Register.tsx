// src/pages/auth/Register.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section style={{ padding: '20px', textAlign: 'center' }}>
      <h2>{t('register.title')}</h2>
      {/* Kayıt formu buraya eklenir */}
      <form>
        <div>
          <label htmlFor="username">{t('register.username')}</label>
          <input id="username" type="text" placeholder={t('register.usernamePlaceholder')} />
        </div>
        <div>
          <label htmlFor="email">{t('register.email')}</label>
          <input id="email" type="email" placeholder={t('register.emailPlaceholder')} />
        </div>
        <div>
          <label htmlFor="password">{t('register.password')}</label>
          <input id="password" type="password" placeholder={t('register.passwordPlaceholder')} />
        </div>
        <button type="submit">{t('register.submit')}</button>
      </form>
    </section>
  );
};

export default Register;
