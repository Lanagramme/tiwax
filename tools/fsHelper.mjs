import { readdirSync } from 'fs'

function browseDir(path, fn){ return readDir(path).forEach(fn) }
function reduceDir(path, fn, acc){ return readDir(path).reduce(fn,acc) }
function readDir(path){ return readdirSync(path,{ withFileTypes: true }) }

export default { browseDir, reduceDir }