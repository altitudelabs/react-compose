# react-compose
functional HOC's that can be composed to achieve complicated business goals

## Goal
This library aims to provide various functional high order components that can be used in both react web and react-native.

### Build
```
npm install
npm run build
```

### Development
```
npm install
npm run build:watch
```
this should run babel on src to lib directory on change

### Example
```
cd example
npm install
npm run build:watch
```
*should have webpack dev server running on 8080*

### Folder structure
```
project
└───example // example react web project to try & test & demo the module
│   │   ...
│   
└───src // source directory for the module. you will edit this folder to add/update features
│   |   ...
│
└───lib // main package.json directory. 
    │   // This is where babelified js files end up in, to be bundled by tools like webpack by the library users.
    │   ...
 ```
