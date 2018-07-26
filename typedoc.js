module.exports = {
  out               : 'docs',
  readme            : 'none',
  exclude           : [
    'lib/src/ext/**/*.ts',
  ],
  mode              : 'file',
  excludeExternals  : true,
  excludeNotExported: true,
  excludePrivate    : true,
}
