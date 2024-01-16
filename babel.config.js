module.exports = api => {
  const babelEnv = api.env();
  const plugins = [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-shorthand-properties',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-transform-template-literals',
  ];
  if (babelEnv !== 'development') {
    plugins.push('transform-remove-console');
  }
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};