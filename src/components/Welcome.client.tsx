import {useTranslation} from 'react-i18next';

export function Welcome() {
  const {t} = useTranslation();
  console.log(t)
  return (
      <div>
        <h1 suppressHydrationWarning>{t('welcome.title')}</h1>
        <p suppressHydrationWarning>{t('welcome.description')}</p>
      </div>
  );
}
