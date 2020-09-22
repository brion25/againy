const path = require('path');

module.exports = {
    steps: [
        {
            type: 'CREATE',
            file: {
                name: 'featureA.js',
                path: path.resolve(__dirname, '../src/features'),
                template: path.resolve(__dirname, './templates/feature.txt'),
                entries: [
                    'name'
                ]
            }
        },
        {
            type: 'CREATE',
            file: {
                name: 'featureB.js',
                path: path.resolve(__dirname, '../src/features'),
                template: path.resolve(__dirname, './templates/another.txt'),
                entries: [
                    'lastName',
                    'another'
                ]
            }
        }
    ]
}