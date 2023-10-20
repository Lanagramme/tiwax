import fsHelper from './fsHelper.mjs'
const cl = (x)=>(console.log(x),x)
cl('tools imported')
const assign = Object.assign
const isObject = (o) => typeof o === 'object' && !Array.isArray(o)
const addMod = (acc, mod, name) => mod && assign(acc,formatter(mod, name))
const formatter = (o, name) => isObject(o) ? o : {[name]:o}
const importMod = (path,name) => name !== 'index.mjs' && import(path+name)
const getMod = async ({path, name}) => [(await importMod(path,name)).default, name.split('.')[0]]
const reducer = async(acc, dirent) => (addMod(await acc, ...await getMod(dirent)), acc)
const mods = await fsHelper.reduceDir('../tools/', reducer, {})

export default mods