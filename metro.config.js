const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    blockList: [
      new RegExp(`${path.join(__dirname, '.local').replace(/\\/g, '\\\\')}.*`),
    ],
  },
  transformer: {
    babelTransformerPath:
      require.resolve('react-native-svg-transformer/react-native'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    enableBabelRuntime: true,
  },
  server: {
    enhanceMiddleware: middleware => middleware,
  },
};

module.exports = mergeConfig(defaultConfig, config);
