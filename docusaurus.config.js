// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import rehypeBudoux from './src/plugins/rehype-budoux.js';

// 公開先の組織（GitHub の画面で作る説明書専用の組織）。決まったらここだけ変える
const organization = 'tocolo-docs';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tocolo 説明書',
  tagline: 'Sceneでクリックした場所の色を、陰影を保ったまま変えるツール',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: `https://${organization}.github.io`,
  baseUrl: '/',
  organizationName: organization,
  projectName: `${organization}.github.io`,
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // .md は MDX ではなく普通の Markdown として読む（更新履歴などの < や { で組み立てが止まらないように）
  markdown: {
    format: 'detect',
  },

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // 説明書だけのサイトなので、開いた最初のページから左の目次が出るよう docs をサイトの一番上に置く
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // 日本語を文節の区切りでだけ改行する（src/plugins/rehype-budoux.js と custom.css の .markdown）
          rehypePlugins: [rehypeBudoux],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // 0.8.0 のツールが開く「トップ#通信の詳しい内容」を、その節があるページへ送る（src/client/legacy-anchor.js）
  clientModules: ['./src/client/legacy-anchor.js'],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['ja', 'en'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'Tocolo',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'manual',
            position: 'left',
            label: '説明書',
          },
          // 困っている人が、どのページからでも1回で行けるようにする
          {
            to: '/troubleshooting',
            label: '困ったとき',
            position: 'left',
          },
          {
            to: '/changelog',
            label: '更新履歴',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: 'Tocolo 説明書',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
