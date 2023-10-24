import { useState, useEffect } from 'react';
import Store from "../store/Store";
import TopBar from "../components/TopBar";
import Modals from "../components/Modals";
import Tableau from "../components/Table";
import Container from 'react-bootstrap/Container';
import Formulaire from "../components/formulaire";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const tabsBank = {
  Ingredients: {
    label: "Ingrédient",
    names: ["nom"],
    properties: ["name"],
  },
  Produits: {
    label: "Produit",
    names: ["nom", "Détail", "Prix", 'Catégorie'],
    properties: ["titre", "detail", "prix", 'type'],
  },
  Categories: {
    label: "Catégorie",
    names: ["nom"],
    properties: ["name"],
  },
}

function formatKey(key, [data]){ return typeof data === 'string' ? key.slice(0, -1) : key }
function storeAction(action, key, data) { return Store[action + formatKey(key, data)](...data) }
function request(action, key, ...data){ return key && storeAction(action, key, data) }
function checkRes({success, message}) { if(!success) throw message; else return true }
function updateEntry(arr,o) { return (x=> x && Object.assign(x,o))(arr.find(x => x._id != o._id)) }
function addEntry(arr,o) { return arr.push(o) }
function updateData(arr,o) { return (updateEntry(arr,o)||addEntry(arr,o)) }
function extractEntry(arr, fn) { arr.splice(arr.findIndex(fn),1) }
function parseForm(acc, {name, value, type, checked}) {
  return name && (acc[name] = type==='checkbox' ? checked : value), acc;
}
function Produits () {
  console.log('render => Produits')
  function updateTable(promise) { return promise.then(x => (checkRes(x), update(key, x.message))) }

  function update(key, data){
    const tab = tabs[key]
    const val = tab.data || (tab.data=[])
    switch (true) {
      case Array.isArray(data): val.length = 0; val.push(...data); break
      case typeof data === 'string': extractEntry(val,x => x._id != data); break
      case typeof data === 'object': updateData(val,data); break
      default: return;
    }

    tabsData.key = key
    return updateTabs({key, tabs})
  }

  function getModel(key) {
    const data2 = tabs[key].model = []
    console.log(key)
    return request('Get','Models',key.toLowerCase()).then(res => {
      Object.entries(res.message).forEach(([key,val]) => {
        const {fieldDescription} = val
        const getType=(val)=> {
          let type = ''
          if (typeof(val)== "string") type = types[val]
          else {
            if (Array.isArray(val)) type = 'Select'
            else type = types[val.type]
          }
          console.log(type)
          return type
        }
        
        fieldDescription && data2.push(
          {
            name: key,
            disabled: false,
            ... fieldDescription,
            required: !!fieldDescription.required
          } || {
          type: getType(val),
          detail: {
            name: key,
            label: val.label || key,  
            placeholder:"",
            required: !!val.required,
            disabled: false
          }
        })
      })
      console.log(data2)
    })
  }
  
  function TabControl(key) {
    
    Promise.all([
      request('Get',key)?.then(x => {
        const data = x.message
        console.log(key,' => ', data)
        return data
      }),
      ...tabs[key].model ? [] : [getModel(key)]
    ]).then(([data])=> update(key, data) )

  }

  function createOne() {
    const fields = [...document.querySelector('form')]
    const json = JSON.stringify(fields.reduce(parseForm,{}))
    updateTable(request("Send", key,json))
  }

  function updateOne(id) {
    let unfilterdForm = document.querySelector('form input').value
    const object = {name: unfilterdForm};
    const json = JSON.stringify(object);
    const Key = key.slice(0, -1);
    console.log("send"+Key)
    updateTable(request("Send", key, id, json))
  }

  function deleteOne(id) {
    updateTable(request("Delete", key, id)).catch(err => {
      console.log(err)
      alert("Erreur, le contenu n'a pas été supprimé")
    })
  }

  const [tabsData, updateTabs] = useState({
    key: Object.keys(tabsBank)[0],
    tabs: tabsBank
  })

  const {key, tabs} = tabsData
  
  useEffect(() => {!tabs[key].data && TabControl(key),[]})

  return <>
    <TopBar/>
    <Container>
      <h1>Gestion des stocks</h1>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={TabControl}
        className="mb-3 mt-3"
      >
        {
          Object.entries(tabs).map(([key, {label, names,properties, data, model}]) => {
            const name = label.toLowerCase()
            return <Tab key={key} eventKey={key} title={label}>
              <>
                <h2>{label}</h2>
                <div className="mt-4 mb-2">
                  <Modals
                    call={`Ajouter un ${name}`}
                    title={`Ajouter un ${name}`}
                    action="Ajouter"
                    callback={createOne}
                  >
                    <Formulaire data={model} />
                  </Modals>
                </div>
                {
                  !data
                  ? <p>LOADING ...</p>
                  : <Tableau 
                    names={names}
                    data={data}
                    properties={properties}
                    remove={deleteOne}
                    tab = {name}
                    collection = {model}
                    update={updateOne}
                  />
                }
              </>
            </Tab>

          })
        }
      </Tabs>
      
    </Container>
  </>
}

export default Produits