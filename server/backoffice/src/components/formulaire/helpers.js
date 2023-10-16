import Store from '../../store/Store';

export function getOptions(collection, setOptions) {
  (Store[`Get${collection}`] || (() => Promise.reject(`Unknown store method: ${collection}`)))()
  .then(x => {
    if (x.success) return setOptions(x.message)
    else {
      console.log(x.message)
      setOptions(['erreur base de donnée'])
    }
  })
}