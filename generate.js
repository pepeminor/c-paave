/* eslint-disable no-console */
const { generateTemplateFiles, CaseConverterEnum } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'Create New Redux',
    entry: {
      folderPath: './src/templates/redux',
    },
    defaultCase: CaseConverterEnum.CamelCase,
    stringReplacers: [{ question: 'Redux Name', slot: '__ReduxName__' }],
    output: {
      path: './src/reduxs/__ReduxName__' + CaseConverterEnum.PascalCase,
      pathAndFileNameDefaultCase: CaseConverterEnum.PascalCase,
      overwrite: true,
    },
    onComplete: results => {
      console.log(`results`, results);
    },
  },
]);
