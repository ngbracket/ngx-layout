import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'ngx-layout',
  tagline: 'Responsive layout engine for Angular',
  favicon: 'img/favicon.ico',

  url: 'https://docs.ngx-layout.ngbracket.com',
  baseUrl: '/',

  organizationName: 'ngbracket',
  projectName: 'ngx-layout',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ngbracket/ngx-layout/edit/main/projects/apps/docs/documentation/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/ngx-layout-icon.svg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ngx-layout',
      logo: {
        alt: 'ngx-layout logo',
        src: 'img/ngx-layout-icon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ngxlayoutSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/api-documentation',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://github.com/ngbracket/ngx-layout/',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Getting Started',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Installation', to: '/docs/install-ngx-layout' },
            { label: 'Configuration', to: '/docs/configuration' },
            { label: 'Developer Setup', to: '/docs/developer-setup' },
          ],
        },
        {
          title: 'API Reference',
          items: [
            { label: 'fxLayout', to: '/docs/fx-flex/fxLayout-API' },
            { label: 'fxFlex', to: '/docs/fx-flex-api/fxflex-api' },
            { label: 'Breakpoints', to: '/docs/breakpoints' },
            { label: 'MediaObserver', to: '/docs/media-observable/media-observer' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ngbracket/ngx-layout',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/angular-flex-layout',
            },
            {
              label: 'Issues',
              href: 'https://github.com/ngbracket/ngx-layout/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ngbracket. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
