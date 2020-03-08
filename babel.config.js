// // 配置vant组件库
// const plugins = []

// plugins.push(['import', {
//   libraryName: 'vant',
//   libraryDirectory: 'es',
//   style: name => `${name}/style/less`
//   // style: true
// }, 'vant'])

// if (process.env.NODE_ENV === 'production') {
//   plugins.push('transform-remove-console')
// }
// // 暴露
// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ],
//   plugins
// }

// 暴露
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 配置vant组件库
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]

}
