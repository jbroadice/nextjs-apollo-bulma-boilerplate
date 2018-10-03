# nextjs-apollo-bulma-boilerplate
### A [Next.js](https://github.com/zeit/next.js/) / [Apollo GraphQL](https://github.com/apollographql) / [Bulma](https://github.com/jgthms/bulma) boilerplate, with SASS, and tree-shaking in mind.

### Notes:
- Uses [react-bulma-components](https://github.com/couds/react-bulma-components)
- [SASS](https://github.com/zeit/next-plugins/tree/master/packages/next-sass) out-of-the-box
- Optimised for tree-shaking (*note `import` usage within `/pages` directory*)
  - Uses [next-plugin-transpile-modules](https://github.com/wellcometrust/next-plugin-transpile-modules):
    - Includes aliased [lodash-es](https://github.com/lodash/lodash/tree/es) (as `lodash`)
    - *Note `react-bulma-components` import from `src` directory* 
- Includes [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- Uses [service workers](https://github.com/goldhand/sw-precache-webpack-plugin) to cache external project dependencies
