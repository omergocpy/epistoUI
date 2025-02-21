// src/pages/auth/Login.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">{t('login.title')}</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              {t('login.email')}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('login.emailPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              {t('login.password')}
            </label>
            <input
              id="password"
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring"
          >
            {t('login.submit')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
