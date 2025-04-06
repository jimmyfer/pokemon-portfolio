const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sprites/[name][ext]'
        }
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/maps/[name][ext]'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@sprites': path.resolve(__dirname, 'src/assets/sprites'),
      '@maps': path.resolve(__dirname, 'src/assets/maps'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/sprites',
          to: 'assets/sprites',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/*.json']
          }
        },
        {
          from: 'src/assets/maps',
          to: 'assets/maps',
          noErrorOnMissing: true,
        }
      ]
    })
  ]
};