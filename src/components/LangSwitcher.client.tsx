import {useCallback, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';

export function LangSwitcher() {
  const {t, i18n, ready} = useTranslation('translation');
  const [lang, setLang] = useState(i18n.language);
  const supportedLangs = useRef([
    {value: 'en', name: 'English', flag: '🇺🇸'},
    {value: 'es', name: 'Español', flag: '🇪🇸'},
    {value: 'de', name: 'Deutsch', flag: '🇩🇪'},
  ]);

  const handleChange = useCallback(
    (value:string) => {
      const selectedLang = value;
      setLang(selectedLang);
      i18n.changeLanguage(selectedLang);
    },
    [i18n]
  );

  return (
    <div className="langSwitcher">
      <p className="langSwitcher__text" suppressHydrationWarning>
        {t('common.switcher')}
      </p>
      <select
        className="langSwitcher__select bg-black"
        name="lang"
        onChange={(e) => handleChange(e.target.value)}
        value={lang}
        color="#4b5563"
      >
        {supportedLangs.current.map((lang) => (
          <option
            className="langSwitcher__option"
            key={lang.value}
            value={lang.value}
          >
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
