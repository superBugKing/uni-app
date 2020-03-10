const path = require('path')

const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const HandlerPlugin = require('@hap-toolkit/packager/lib/plugin/handler-plugin')
const ZipPlugin = require('@hap-toolkit/packager/lib/plugin/zip-plugin')
const NotifyPlugin = require('@hap-toolkit/packager/lib/plugin/notify-plugin')

const Css2jsonPlugin = require('@hap-toolkit/dsl-vue/lib/plugin/css2json-plugin')
const InstVuePlugin = require('@hap-toolkit/dsl-vue/lib/plugin/instvue-plugin')

const parseManifest = require('./manifest/index')

const env = {
  // 平台：native
  NODE_PLATFORM: 'native',
  // 阶段: dev|test|release
  NODE_PHASE: process.env.NODE_PHASE
}

const dslFilename = ('vue.' + (process.env.NODE_ENV === 'production' ? 'prod' : 'dev') + '.js')

parseManifest(process.UNI_PAGES, process.UNI_MANIFEST)

const manifest = global.framework.manifest

if (!manifest.package) {
  console.error(`maniest.json quickapp 节点缺少 package 配置`)
  process.exit(0)
}

function genPriorities(entryPagePath) {
  const o = [/^i18n\/.+\.json$/i, 'manifest.json', 'app.js', /^common\//i];
  if (entryPagePath) {
    o.splice(3, 0, new RegExp(`^${entryPagePath}/$`), new RegExp(`^${entryPagePath}/.+`))
  } else console.error('未配置入口页面');
  return o
}

module.exports = {
  devtool: false,
  entry() {
    return process.UNI_ENTRY
  },
  externals: {
    vue: 'Vue'
  },
  plugins: [
    new webpack.DefinePlugin({
      // 平台：na
      ENV_PLATFORM: JSON.stringify(env.NODE_PLATFORM),
      // 阶段: dev|test|release
      ENV_PHASE: JSON.stringify(env.NODE_PHASE),
      ENV_PHASE_DV: env.NODE_PHASE === 'dev',
      ENV_PHASE_QA: env.NODE_PHASE === 'test',
      ENV_PHASE_OL: env.NODE_PHASE === 'prod'
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, '../dist/' + dslFilename),
      to: 'dsl.js'
    }]),
    new HandlerPlugin({}),
    new Css2jsonPlugin(),
    new InstVuePlugin(),
    new ZipPlugin({
      name: manifest.package,
      icon: manifest.icon,
      versionCode: manifest.versionCode,
      output: path.resolve(process.env.UNI_OUTPUT_DIR, '..'),
      pathBuild: process.env.UNI_OUTPUT_DIR,
      pathSignFolder: './sign',
      sign: process.env.NODE_ENV === 'production' ? 'release' : 'debug',
      priorities: genPriorities(manifest.router.entry),
      subpackages: undefined,
      comment: '',
      cwd: process.env.UNI_INPUT_DIR,
      disableStreamPack: undefined,
      disableSubpackages: undefined
    }),
    new NotifyPlugin()
  ]
}