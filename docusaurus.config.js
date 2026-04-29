const configData = require('./.products-config.json');

const { products, plugins, navbarItems, footerItems } = configData;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'YP 团队',
  tagline: '专业、创新、协作',
  favicon: 'img/favicon.ico',
  url: 'https://HTTryLab.github.io',
  baseUrl: '/YP-Doc/',
  organizationName: 'HTTryLab',
  projectName: 'YP-Doc',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: plugins,

  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    navbar: {
      title: 'YP 团队',
      logo: {
        alt: 'YP Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: '首页',
          to: '/YP-Doc/',
          position: 'left',
        },
        ...navbarItems,
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '产品',
          items: footerItems,
        },
        {
          title: '资源',
          items: [
            {
              label: '文档',
              to: '/YP-Doc/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/HTTryLab/YP-Doc',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} YP 团队, Inc.`,
    },
  },
};

module.exports = config;
