import i18next from 'i18next';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';
import jaZodTranslation from 'zod-i18n-map/locales/ja/zod.json';
import jaZodCustomTranslation from '../locales/ja/custom.json';

i18next.init({
  lng: 'ja',
  resources: {
    ja: {
      zod: jaZodTranslation,
      custom: jaZodCustomTranslation,
    },
  },
});

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'custom'] }));

export { z };
