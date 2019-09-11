const plugins = [
  [
    'component',
    {
      'libraryName': 'element-ui',
      'styleLibraryName': 'theme-chalk'
    }
  ],
  [
    'import',
    {
      'libraryName': 'iview',
      'libraryDirectory': 'src/components'
    }
  ]
]
module.exports = {
  'presets': [
    ['@vue/app', { 'useBuiltIns': 'entry' }]
  ],
  'plugins': plugins
}
