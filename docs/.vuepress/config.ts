import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";
import { path } from "@vuepress/utils";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/",

  head: [
    ["meta", { name: "application-name", content: "GraphQLite" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "GraphQLite" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#3eaf7c" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
  ],

  title: "GraphQLite",
  description: "Rapid GraphQL prototyping, development, and testing.",

  themeConfig: {
    logo: "/images/logo.png",
    repo: "relatedcode/GraphQLite",
    navbar: [
      {
        text: "Server",
        children: [
          {
            text: "Core Server",
            link: "/core-server/README.md",
          },
          {
            text: "Admin Console",
            link: "/admin-console/README.md",
          },
        ],
      },
      {
        text: "Studio",
        children: [
          {
            text: "Studio Mac",
            link: "/studio-mac/README.md",
          },
          {
            text: "Studio Web",
            link: "/studio-web/README.md",
          },
          {
            text: "Studio API",
            link: "/studio-api/README.md",
          },
        ],
      },
      {
        text: "SDK",
        children: [
          {
            text: "iOS SDK",
            link: "/sdk-ios/README.md",
          },
          {
            text: "Web SDK",
            link: "/sdk-web/README.md",
          },
          {
            text: "Flutter SDK",
            link: "/sdk-flutter/README.md",
          },
        ],
      },
    ],

    docsDir: "docs",
  },

  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(
          /^@vuepress/,
          path.resolve(__dirname, "../../packages/@vuepress")
        ),
    },
  },
});
