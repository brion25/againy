# Againy

As a software developer I found situations where you need to do a repetitive tasks over and over again:

- Creating files/folders
- Updating entry points
- Basic scaffolding for features
- etc, etc, etc.

This is why `againy` is here, it's a simple CLI tool that is going to help you with this.

## How to use?

You just need to create your steps in a folder called `.again` (or in any place, take a look at the complete params.) and then run the command:

```
againy TASK
```

### Steps?

Your steps could be regular JSON or JS files, just be sure the name of your files matches with the `TASK` name, ie:

**`.againy/basicScaffolding.js`**
```javascript
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
        }
    ]
}
```

**Note:** Values in `entries` are going to be asked using the package `prompts`, if you pass just an string like in the example, it is going to ask for an string, but you can pass the same config option like the [docs](https://www.npmjs.com/package/prompts#%E2%9D%AF-api) say

**`.againy/templates/feature.txt`**
```
Hello {{name}}! I'm a template 
```
**Command:**

### Update example

**`.againy/variant.js`**
```javascript
const path = require('path');

module.exports = {
    steps: [
        {
            type: 'UPDATE',
            file: {
                path: path.resolve(__dirname, '../src/features/file.js'),
                template: path.resolve(__dirname, './templates/feature.txt'),
                entries: [
                    'name'
                ]
            }
        }
    ]
}
```
**`src/features/file.js`**
```javascript
// againy --> 

console.log(x)
```
**`.againy/templates/feature.txt`**
```
const x = '{{name}}' 
```
**Command:**

### Delete example

**`.againy/variant.js`**
```javascript
const path = require('path');

module.exports = {
    steps: [
        {
            type: 'DELETE',
            file: {
                path: path.resolve(__dirname, '../src/features/file.js'),
            }
        }
    ]
}
```
**`src/features/file.js`**
```javascript
console.log('Hello')
```
**Command:**

### Copy example

**`.againy/variant.js`**
```javascript
const path = require('path');

module.exports = {
    steps: [
        {
            type: 'COPY',
            file: {
                from: path.resolve(__dirname, '../src/features/file.js'),
                to: path.resolve(__dirname, '../src/features/anotherPlace/'),
            }
        }
    ]
}
```
**`src/features/file.js`**
```javascript
console.log('Hello')
```
**Command:**

### Move example

**`.againy/variant.js`**
```javascript
const path = require('path');

module.exports = {
    steps: [
        {
            type: 'MOVE',
            file: {
                from: path.resolve(__dirname, '../src/features/file.js'),
                to: path.resolve(__dirname, '../src/features/anotherPlace/'),
            }
        }
    ]
}
```
**`src/features/file.js`**
```javascript
console.log('Hello')
```
**Command:**

### Variant example

**`.againy/variant.js`**
```javascript
const path = require('path');

module.exports = {
    variants: {
        variantA: [
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
                      }
                  ]
    }
}
```
**`.againy/templates/feature.txt`**
```
Hello {{name}}! I'm a template 
```
**Command:**

## API

```
againy [task_name] [options]
```

### `task_name`

Name of the task to be run

### `options`

| `option` | description | default value |
|---|---|---|
| `--variant` | Used when you want to run an specific variant of the steps |   |
| `--conf` | Path of the folder steps to look for | `.againy/` |
| `--matcher` | Comment used to place the new code on existing files | `// againy --> ` |
