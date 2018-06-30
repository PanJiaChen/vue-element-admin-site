module.exports = {
  title: "vue-element-admin",
  description: "A magical vue admin",
  base: "/vue-element-admin-site/",
  shouldPrefetch: () => false,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ]
  ],
  themeConfig: {
    repo: "PanJiaChen/vue-element-admin",
    docsRepo: "PanJiaChen/vue-element-admin-site",
    docsDir: "docs",
    editLinks: true,
    sidebarDepth: 3,
    algolia: {
      apiKey: "ffce0083d0830de5f562c045a481410b",
      indexName: "vue_element_admin"
    },
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        editLinkText: "Edit this page on GitHub",
        nav: [
          {
            text: "Guide",
            link: "/guide/"
          },
          {
            text: "Component",
            items: [
              {
                text: "Rich Text Editor",
                link: "/component/rich-editor.md"
              },
              {
                text: "Clipboard",
                link: "/component/clipboard.md"
              }
            ]
          },
          {
            text: "Donate",
            link: "/donate/"
          }
        ],
        sidebar: {
          "/guide/": [
            {
              title: "Essentials",
              collapsable: false,
              children: genEssentialsSidebar()
            },
            {
              title: "Advanced",
              collapsable: false,
              children: genAdvancedSidebar()
            },
            {
              title: "Other",
              collapsable: false,
              children: [
                "/guide/other/gitter.md",
                "/guide/other/release-notes.md"
              ]
            }
          ],
          "/component/": [
            "/component/rich-editor.md",
            "/component/clipboard.md"
          ]
        }
      },
      "/zh/": {
        label: "简体中文",
        selectText: "选择语言",
        editLinkText: "在 GitHub 上编辑此页",
        nav: [
          {
            text: "指南",
            link: "/zh/guide/"
          },
          {
            text: "组件",
            items: [
              {
                text: "富文本",
                link: "/zh/component/rich-editor.md"
              },
              {
                text: "Svg Icon 图标",
                link: "/zh/component/svg-icon.md"
              },
              {
                text: "复制粘贴",
                link: "/zh/component/clipboard.md"
              }
            ]
          },
          {
            text: "其它",
            items: [
              {
                text: "Gitter讨论组",
                link: "https://gitter.im/vue-element-admin/discuss"
              },
              {
                text: "作者Blog",
                link: "https://jianshiapp.com/circles/1209"
              },
              {
                text: "更新记录",
                link: "https://github.com/PanJiaChen/vue-element-admin/releases"
              },
              {
                text: "常见问题",
                link: "/zh/guide/other/faq.md"
              },
              {
                text: "QQ群",
                link:
                  "https://github.com/PanJiaChen/vue-element-admin/issues/602"
              }
            ]
          },
          {
            text: "捐赠",
            link: "/zh/donate/"
          }
        ],
        sidebar: {
          "/zh/guide/": [
            {
              title: "基础",
              collapsable: false,
              children: genEssentialsSidebar("/zh")
            },
            {
              title: "进阶",
              collapsable: false,
              children: genAdvancedSidebar("/zh")
            },
            {
              title: "其它",
              collapsable: false,
              children: [
                "/zh/guide/other/gitter.md",
                "/zh/guide/other/release-notes.md",
                "/zh/guide/other/blog.md",
                "/zh/guide/other/faq.md"
              ]
            }
          ],
          "/zh/component/": [
            "/zh/component/rich-editor.md",
            "/zh/component/svg-icon.md",
            "/zh/component/clipboard.md"
          ]
        }
      }
    }
  },
  locales: {
    "/": {
      lang: "en-US",
      description: "A magical vue admin"
    },
    "/zh/": {
      lang: "zh-CN",
      description: "A magical vue admin"
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@public": "./public"
      }
    }
  },
  ga: "UA-109340118-1"
};

function genEssentialsSidebar(type = "") {
  const mapArr = [
    "/guide/",
    "/guide/essentials/layout.md",
    "/guide/essentials/router-and-nav.md",
    "/guide/essentials/permission.md",
    "/guide/essentials/tags-view.md",
    "/guide/essentials/new-page.md",
    "/guide/essentials/style.md",
    "/guide/essentials/server.md",
    "/guide/essentials/mock-api.md",
    "/guide/essentials/import.md",
    "/guide/essentials/deploy.md"
  ];
  return mapArr.map(i => {
    return type + i;
  });
}

function genAdvancedSidebar(type = "") {
  const mapArr = [
    "/guide/advanced/cors.md",
    "/guide/advanced/eslint.md",
    "/guide/advanced/lazy-loading.md",
    "/guide/advanced/chart.md",
    "/guide/advanced/icon.md",
    "/guide/advanced/theme.md",
    "/guide/advanced/i18n.md",
    "/guide/advanced/error.md"
  ];
  return mapArr.map(i => {
    return type + i;
  });
}
