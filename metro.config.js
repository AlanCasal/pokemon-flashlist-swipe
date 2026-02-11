const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

module.exports = (() => {
	const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

	const { transformer, resolver } = config;

	config.transformer = {
		...transformer,
		babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
	};
	config.resolver = {
		...resolver,
		assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
		sourceExts: [...resolver.sourceExts, 'svg'],
	};

	return withUniwindConfig(config, {
		cssEntryFile: './global.css',
	});
})();
