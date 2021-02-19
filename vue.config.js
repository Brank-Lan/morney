//eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// import svgSpritePlugin from 'svg-sprite-loader/plugin'
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/morney-dist/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end()//包含icons 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugin: [{removeAttrs: {attrs: 'fill'}}]})).end()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir)
  }
}
