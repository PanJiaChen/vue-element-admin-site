const sidebarMap = {
  article: {
    title: "文章",
    children: ["", "coding"]
  },
  interview: {
    title: "面试",
    children: ["", "vue", "algorithms"]
  }
};

module.exports = {
  title: "vue-element-admin",
  description: "A magical vue admin",
  base: "/vue-element-admin-site/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "库", link: "/repository/" },
      { text: "文章", link: "/article/" },
      // { text: '工具', link: 'https://google.com' },
      { text: "网站", link: "/website/" },
      { text: "面试", link: "/interview/" }
    ],
    sidebar: {
      "/article/": genSidebarConfig("article"),
      "/interview/": genSidebarConfig("interview")
    },
    lastUpdated: "上次更新",
    repo: "PanJiaChen/awesome-bookmarks",
    editLinks: true,
    docsDir: "docs",
    editLinkText: "在 GitHub 上编辑此页",
    sidebarDepth: 3,
    algolia: {
      apiKey: 'ffce0083d0830de5f562c045a481410b',
      indexName: 'vue_element_admin'
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

function genSidebarConfig(type) {
  const sidebar = sidebarMap[type];
  return [
    {
      title: sidebar.title,
      collapsable: false,
      children: sidebar.children
    }
  ];
}
