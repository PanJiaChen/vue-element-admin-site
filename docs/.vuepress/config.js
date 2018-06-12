module.exports = {
  title: "vue-element-admin",
  description: "A magical vue admin",
  base: "/vue-element-admin-site/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    repo: "PanJiaChen/awesome-bookmarks",
    editLinks: true,
    docsDir: "docs",
    editLinkText: "在 GitHub 上编辑此页",
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
        lastUpdated: "Last Updated",
        nav: [
          {
            text: "Guide",
            link: "/guide/"
          },
          {
            text: "Config Reference",
            link: "/config/"
          },
          {
            text: "Default Theme Config",
            link: "/default-theme-config/"
          }
        ],
        sidebar: [
          {
            title: "Essentials",
            collapsable: false,
            children: genEssentialsSidebar()
          },
          {
            title: "Advanced",
            collapsable: false,
            children: genAdvancedSidebar()
          }
        ]
      },
      "/zh/": {
        label: "简体中文",
        selectText: "选择语言",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: [
          {
            text: "指南",
            link: "/zh/guide/"
          },
          {
            text: "配置",
            link: "/zh/config/"
          },
          {
            text: "默认主题",
            link: "/zh/default-theme-config/"
          }
        ],
        sidebar: [
          "/zh/",
          {
            title: "基础",
            collapsable: false,
            children: genEssentialsSidebar("/zh")
          },
          {
            title: "进阶",
            collapsable: false,
            children: genAdvancedSidebar("/zh")
          }
        ]
      }
    }
  },
  locales: {
    "/": {
      lang: "English",
      description: "A magical vue admin"
    },
    "/zh/": {
      lang: "简体中文",
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
    "/guide/essentials/mock-api.md",
    "/guide/essentials/server.md",
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
