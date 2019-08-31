module.exports = {
  themeConfig: {
    // logoのイメージファイルを参照させます。
    logo: 'icon.png',

    // ナビゲーションにコンテンツに加える内容を追加させます。
    nav: [
      { text: 'Home', link: '/' },
      { text: '概要', link: '/contents/' }
    ],

    // サイドバーを追加します。
    sidebar: [
      '/',
      '/contents/'
    ],
    // ヘディングタイトルを自動でサイドメニューに表示させます。
    displayAllHeaders: true,

    // h2までをサイドメニューに表示させます。
    sidebarDepth: 2
  }
}