import admin from './vi-admin.json';
import brand from './vi-brand.json';
import contentManager from './vi-content-manager.json';
import i18n from './vi-i18n.json';
import upload from './vi-upload.json';

// Strapi 5.55.1 ships partial Vietnamese translations: the admin core is
// missing 171 keys, content-manager 254, and upload / i18n have no `vi` file
// at all. Custom translations are merged last, so these fill the gaps while
// keeping the "Serene" branding. Brand overrides come last on purpose.
const vi = {
  ...admin,
  ...i18n,
  ...contentManager,
  ...upload,
  ...brand,
};

export default vi;
