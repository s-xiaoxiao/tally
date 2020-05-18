const path = require('path')
// import path from 'path'

module.exports = {
  lintOnSave: false,
  chainWebpack:config=>{
    const dir = path.resolve(__dirname,'src/assets/icons')

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() //包含 icons 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()
      .use('svgo-loader').loader('svgo-loader') //使用svgo 对svg文件进行优化
      .tap(options =>({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()   //删除自带fill属性

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'),[{plainSprite:true}])
    config.module.rule('svg').exclude.add(dir)  //其他 svg loader 排除 icons目录
  }
}
