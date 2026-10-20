import vi from './translations/vi';

const BRAND_NAME = 'Serene';
const BRAND_LOGO_URL = '/uploads/logo.jpg';

const translations: Record<string, string> = {
  'Auth.form.button.login.strapi': 'Log in via Serene',
  'Auth.form.register.subtitle':
    'Credentials are only used to authenticate in Serene. All saved data will be stored in your database.',
  'Auth.form.welcome.subtitle': 'Log in to your Serene account',
  'Auth.form.welcome.title': 'Welcome to Serene!',
  'Settings.application.strapi-version': 'Serene version',
  'Settings.application.strapiVersion': 'Serene version',
  'Settings.permissions.users.listview.header.subtitle':
    'All the users who have access to the Serene admin panel',
  'app.components.BlockLink.blog.content': 'Read the latest news about Serene and the ecosystem.',
  'app.components.BlockLink.cloud': 'Serene Cloud',
  'app.components.BlockLink.cloud.content':
    'Fully-managed cloud hosting for your Serene project.',
  'app.components.BlockLink.tutorial.content':
    'Follow step-by-step instructions to use and customize Serene.',
  'app.components.FreeTrialWelcomeModal.description1':
    'For the next 30 days, you will have full access to advanced features like Content History, Releases and Single Sign-On (SSO) – everything you need to explore the power of Serene CMS.',
  'app.components.LeftMenu.navbrand.title': 'Serene Dashboard',
  'app.components.NpsSurvey.banner-title':
    'How likely are you to recommend Serene to a friend or colleague?',
  'components.AutoReloadBlocker.description':
    'Run Serene with one of the following commands:',
  'global.plugins.sentry.description': 'Send Serene error events to Sentry.',
  'notification.ee.warning.over-.message':
    'Add seats to {licenseLimitStatus, select, OVER_LIMIT {invite} AT_LIMIT {re-enable}} Users. If you already did it but it\'s not reflected in Serene yet, make sure to restart your app.',
  'notification.version.update.message': 'A new version of Serene is available!',
  'tours.contentTypeBuilder.AIChat.content':
    '<p>If you have any questions about the Content-Type Builder or Serene ask them here.</p><p>Serene AI can generate schemas tailored to your needs. Ask for exactly what you want, for example:<ul><li>Date picker</li><li>Email and password fields</li><li>Media of any type</li><li>UIDs</li></ul></p><p>Don’t be shy, try it out !</p>',
  'tours.overview.subtitle': 'Follow the guided tour to get the most out of Serene.',
  'tours.overview.strapiCloud.label': 'Deploy your application to Serene Cloud',
  'HomePage.widget.deploy-now.description': 'Deploy with Serene Cloud',
  'content-type-builder.notification.info.autoreaload-disable':
    'Serene is in production mode, editing content types is disabled. Please switch to development mode by starting your server with strapi develop.',
  'content-type-builder.chat.input.defaults.strapi': 'Tell me about Serene',
  'content-type-builder.chat.input.thinking': 'Serene AI is thinking...',
  'content-type-builder.chat.input.placeholder': 'Ask Serene AI...',
  'content-type-builder.chat.input.strapi-ai-can-make-errors':
    'Serene AI can make mistakes.',
  'email.Settings.email.plugin.placeholder.defaultFrom':
    'ex: Serene No-Reply <no-reply@strapi.io>',
  'email.Settings.email.plugin.placeholder.defaultReplyTo':
    'ex: Serene <example@strapi.io>',
  'i18n.Settings.list.empty.description':
    'This is not a usual behavior, meaning that you have eventually modified the database manually. Make sure to have at least one locale saved in your database in order to be able to use Serene correctly.',
  'cloud.Homepage.title': 'Deploy with Serene Cloud',
  'cloud.Homepage.subTitle':
    'Host your Serene project on our managed cloud platform with automated deployments and global CDN.',
  'cloud.Homepage.deploy.git.title': 'Deploy to Serene Cloud',
  'cloud.Homepage.deploy.git.subTitle':
    'Deploy a GitHub or GitLab project directly within Serene Cloud',
  'cloud.Homepage.deploy.git.button': 'Deploy to Serene Cloud',
  'cloud.Homepage.deploy.cli.subTitle':
    'Use the command line to link your project to an existing Serene Cloud project, and deploy your changes directly from the CLI.',
};

const replaceTitleBrand = () => {
  const isVietnamese = localStorage.getItem('strapi-admin-language') === 'vi';
  const adminTitle = isVietnamese ? `Quản trị ${BRAND_NAME}` : `${BRAND_NAME} Admin`;
  const isAdminTitle =
    document.title === 'Strapi Admin' ||
    document.title === `${BRAND_NAME} Admin` ||
    document.title === `Quản trị ${BRAND_NAME}`;

  if (isAdminTitle) {
    if (document.title !== adminTitle) {
      document.title = adminTitle;
    }
    return;
  }

  if (document.title.includes('Strapi')) {
    document.title = document.title.replace(/Strapi/g, BRAND_NAME);
  }
};

const replaceFavicon = () => {
  const icons = document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]');

  if (icons.length === 0) {
    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/jpeg';
    icon.href = BRAND_LOGO_URL;
    document.head.appendChild(icon);
    return;
  }

  icons.forEach((icon) => {
    if (icon.getAttribute('href') !== BRAND_LOGO_URL) {
      icon.type = 'image/jpeg';
      icon.href = BRAND_LOGO_URL;
    }
  });
};

export default {
  config: {
    locales: ['en', 'vi'],
    auth: {
      logo: BRAND_LOGO_URL,
    },
    menu: {
      logo: BRAND_LOGO_URL,
    },
    translations: {
      en: translations,
      vi,
    },
  },
  bootstrap() {
    replaceTitleBrand();
    replaceFavicon();

    new MutationObserver(replaceTitleBrand).observe(document.head, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  },
};
