// const readdirSync = import.meta.glob || (await import('fs')).readdirSync
import {globSync} from "glob";

function browseDir(path, fn){ return readDir(path).forEach(fn) }
function reduceDir(path, fn, acc){ return readDir(path).reduce(fn,acc) }
// function readDir(path){ return readdirSync(path,{ withFileTypes: true }) }
function readDir(path){ return globSync(path,{ withFileTypes: true }) }
export default { browseDir, reduceDir }