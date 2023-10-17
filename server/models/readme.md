All file that does'nt contain 'Model.' will be ignored.  
For consistency, all file's name must follow the following structure => collectionName + 'Model.js'  
All file must export the following object:
```
module.export = {
  [capitalizedCollectionName + 'Model']: modelObject
  [capitalizedCollectionName]: mongoose model returned function
}
```

All file following these instruction will be automatically added to the main export (index.js)