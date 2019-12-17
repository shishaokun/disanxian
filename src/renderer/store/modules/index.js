// /**
//  * The file enables `@/store/index.js` to import all vuex modules
//  * in a one-shot manner. There should not be any reason to edit this file.
//  */
/* eslint-disable */

// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// find all files in /store
const files = require.context('@/store', true, /^\.\/.*\.js$/);
const filenames = files.keys();

//store data
let storeData = {};

// find index file
for (let filename of filenames) {
    if (filename === './index.js') {
        // get index file
        storeData = getModule(filename);
        break;
    }
}
// console.log(typeof storeData);

// if storeData is not a function, then require all other files, and add then to storeData
if (typeof storeData !== 'function') {
    storeData.modules = storeData.modules || {};

    for (let filename of filenames) {
        if (filename === './index.js') {
            continue;
        }
        // console.log(name)
        let name = filename.replace(/^\.\//, '').replace(/\.js$/, '').replace(/modules\//, '');
        // console.log(name)
        let paths = name.split('/');
        // console.log(paths)
        let module = getModuleNamespace(storeData, paths);
        // console.log(module)

        name = paths.pop().replace(/\-(.{1})/, function($1){
            return $1.slice(1).toLocaleUpperCase()
        });
        // console.log(name)
        // console.log('--------------------------')
        module[name] = getModule(filename);
        module[name].namespaced = true;
    }
}

// // export createStore
// export const createStore = storeData instanceof Function
//     ? storeData
//     : () => new Vuex.Store(Object.assign({}, storeData, {
//         state: storeData.state instanceof Function ? storeData.state() : {}
//     }));

/**
 * get module by file name
 * this module or state must be a function which returns a Vuex instance of fresh state instance
 *
 * @param {string} filename filename
 * @return {*}
 */
function getModule(filename) {
    const file = files(filename);
    const module = file.default || file;
    // console.log(module)

    if (module.commit) {
        throw new Error(
            '[lavas] store/' + filename.replace('./', '') + ' should export a method which returns a Vuex instance.'
        );
    }

    if (module.state && typeof module.state !== 'function') {
        throw new Error(
            '[lavas] state should be a function in store/' + filename.replace('./', '')
        );
    }

    return module;
}

/**
 * get module namespace
 *
 * @param {Object} storeData store
 * @param {Array.<string>} paths path
 * @return {Object}
 */
function getModuleNamespace(storeData, paths) {
    if (paths.length === 1) {
        return storeData.modules;
    }

    let namespace = paths.shift();

    let nsModule = storeData.modules[namespace] = storeData.modules[namespace] || {};
    nsModule.namespaced = true;
    nsModule.modules = nsModule.modules || {};

    return getModuleNamespace(nsModule, paths);
}

export default storeData.modules






// const files = require.context('.', true, /\.js$/);
// // console.log(files.keys());

// const modules = {};

// files.keys().forEach((key) => {
//   if (key === './index.js') return;
// //   console.log(files(key).default);
// //   console.log(key.replace(/(\.\/|\.js)/g, ''));
//   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
// });

// export default modules;
