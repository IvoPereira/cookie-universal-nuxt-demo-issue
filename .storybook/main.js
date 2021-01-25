const path = require('path')

module.exports = {
    stories: ['../components/**/*.stories.@(js|mdx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-controls',
        '@storybook/addon-knobs',
    ],
    webpackFinal: async(config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        })

        config.resolve.extensions = ['*', '.js', '.vue', '.json']
        config.resolve.alias['@'] = path.dirname(path.resolve(__dirname))

        return config
    },
}