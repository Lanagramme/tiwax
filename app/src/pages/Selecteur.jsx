import Page from '../components/Page.jsx'
import Header from "../components/Header.jsx"
import Footer from '../components/Footer.jsx'
import { useState } from 'react'
import { json, useLocation } from 'react-router-dom'
import Store from '../store/calls.js'
import '../styles/Button.scss'
import '../styles/Selecteur.scss'
import '../styles/Loader.scss'


if (localStorage.getItem('panier') == null) localStorage.setItem('panier', JSON.stringify([]))

// components
const Check =({title, qcm, sub = false, max})=> {
  let i = 1
  let incr =()=>{i+=1; return i}

  const handleMax=(max, e)=>{
    let bb = document.querySelectorAll(`input[name="${e.target.name}"]:checked`).length
    if (bb > max) {
      e.target.checked = false
      alert('Seulement ' + max +' autorisés')
    }
  }

  return <section key={qcm.choix+incr}>
    <p className="bold">{title}</p>
    {sub ? <p className='mini'>{sub}</p> : null}
    {
      qcm.options.map(item => {
        return <div key={qcm.choix+incr+1} className='option'>        
          <span>{item.name}</span>
          {
            item.stock
            ? <input type="checkbox" value={item.name} name={qcm.choix} onClick={(e)=>handleMax(max, e)} />
            : <p>Épuisé</p>
          }
       </div>
      })
    } 
    </section>
}
const Radio =({title, qcm, sub = false})=> {
  let i = 1
  let incr =()=>{i+=1; return i}
  return <section key={title+incr}>
    <p className="bold">{title}</p>
    {sub ? <p className='mini'>{sub}</p> : null}
    {
      qcm.options.map(item => {
        return <div className='option' key={incr()}>        
          <span>{item.name}</span>
          {
            item.stock 
            ? <input type="radio" value={item.name} name={qcm.choix} />
            : <p>Épuisé</p>
          }
       </div>
      })
    } 
    </section>
}
const Input =()=> {
  return <section>
    <div className='commentaires'>
      <p className="bold">Instructions spécifiques</p>
      <textarea placeholder="Ajouter un commentaire..."/>
    </div>
  </section>
} 
const Graduate =({max, name, item})=> {
  const key = Date.now()
  const [val, updateval] = useState(0)
  const handleMax =(dir)=>{
    if (dir){
      let all = document.querySelectorAll(`input[name="${name}"]`)
      let somm = 0
      all.forEach(x => { somm += Number(x.value) });
      if (somm > Number(max)-1) alert(`Seulement ${max} autorisé`)
      else updateval(val +1)
    }
    else if (val) updateval(val - 1)
  }

  return <div className="input-group input-number-group">
    <div className="input-group-button only-positif">
      <span onClick={e=>handleMax(false)} className="input-number-decrement">-</span>
    </div>
    <input name={name} className="input-number only-positif" id={item} type="number" value={val} min="0" max={max} disabled />
    <div className="input-group-button">
      <span onClick={e=>handleMax(true)} className="input-number-increment">+</span>
    </div>
  </div>
}
const Optionnal =({title, qcm, sub=false, max})=> {
  let i = 1
  let incr =()=>{i+=1; return i}
  return <section key={title+i}>
    <p className="bold">{title}</p>
    {sub ? <p key={Date.now()} className='mini'>{sub}</p> : null}
    {
      qcm.options.map(item => {
        return <div key={Date.now()+incr()} className='option'>        
          <span>{item.name}</span>
          {
            item.stock
            ?<Graduate name={qcm.choix} max={max} item={item.name}/>
            :<p>Épuisé</p>
          }
       </div>
      })
    } 
    </section>
}

// data
const sauces2 = {
  choix: "sauces",
  options: [
    {name:'Créole', stock: false}, 
    {name:'Mayonnaise', stock: true}, 
    {name:'Piment', stock: true}, 
  ]
}
const pain2 = {
  choix: "pain",
  options: [
    {name:'Panini', stock: true}, 
    {name:'Bokit', stock: true}, 
    {name:'Agoulou', stock: true}, 
  ]
}
const garniture2 = {
  choix: "garniture",
  options: [
    {name:'Steak', stock: true}, 
    {name:'Poulet', stock: true}, 
    {name:'Saucisse', stock: true}, 
    {name:'Morue', stock: true}, 
    {name:'Jambon Fromage', stock: true}, 
  ]
}
const repas_data = {
  options: [
    {
      type: "radio",
      title: "1 viande au choix",
      qcm: {
        choix: 'viande',
        options: [
          {name:'Poulet', stock: false}, 
          {name:'Boeuf', stock: true}, 
          {name:'Poisson', stock: true}, 
        ]
      },
      sub: false
    },
    {
      type: "check",
      title: "2 accompagnements au choix",
      qcm: {
        choix: "accompagnements",
        options: [
          {name:'Riz', stock: false}, 
          {name:'Pâtes', stock: true}, 
          {name:'Lentilles consommés', stock: true}, 
          {name:"Gratin de pomme de terre", stock: true}, 
          {name:"Haricots rouge", stock: true}, 
        ]
      },
      sub: "2max",
      max: 2
    },
    {
      type: "grad",
      title: "Sauces",
      qcm: {
        choix: "sauces",
        options: [
          {name:'Créole', stock: false}, 
          {name:'Mayonnaise', stock: true}, 
          {name:'Piment', stock: true}, 
        ]
      },
      sub: "2 max.",
      max: 2
    },
    {type: "input"}
  ]
}
const pain_data = {
  options: [
    {
      type: "radio",
      title: "1 pain au choix",
      qcm: pain2,
      sub: false
    },
    {
      type: "grad",
      title: "garniture au choix",
      qcm: garniture2,
      sub: "2 max.",
      max: 2
    },
    {
      type: "grad",
      title: "Sauces",
      qcm: sauces2,
      sub: "2 max.",
      max: 2
    },
    {type: "input"}
  ]
}
const boisson_data={
  options: [
    {
      type: "radio",
      title: "1 boisson au choix",
      qcm: {
        choix: "boisson",
        options: [
          {name:"Coca" , stock: true},
          {name:"Sprite", stock: true},
          {name:"Vaval exotic", stock: true},
          {name:"7up", stock: true},
          {name:"Ice tea", stock: true},
          {name:"Sunkist", stock: true},
          {name:"Fanta exotic", stock: true},
          {name:"Fuze tea", stock: true},
        ]
      }
    },
    {type: "input"}
  ]
}

function makeid(length) {
  let result = '';
  let counter = 0;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const Urender=({content})=> {
  let data = ''
  switch(content){
    case "Menu":
      data = repas_data
      break;
    case "Sandwich":
      data = pain_data
      break;
    default:
      data = boisson_data
      break;
  }
  for(let i of data.options) {
    if (!i.hasOwnProperty('qcm')) continue
  }
  let i = 0
  return <>
    {
      data.options.map(x=>{
        let comp 
        x.type == "radio" ? comp = <Radio key={makeid()+i} title={x.title}     qcm={x.qcm} max={x.max} />:null
        x.type == "check" ? comp = <Check key={makeid()+i} title={x.title}     qcm={x.qcm} max={x.max} sub={x.sub} />:null
        x.type == "grad"  ? comp = <Optionnal key={makeid()+i} title={x.title} qcm={x.qcm} max={x.max} sub={x.sub} />:null
        x.type == "input" ? comp = <Input key={makeid()+i} />:null
        i+=1
        return comp
      })
    }
  </>
}

const Selecteur =()=> {
  let location = useLocation() 
  let item = location.state.from
  const [data, update] = useState('')

  Store.getMenu(item.id)
    .then(x => {
      update(JSON.parse(x))
      if (data.hasOwnProperty('fail')) {
        alert('Une erreur est survenue')
        window.location = "/"
      }
    })

  function panier() {
    const pan = {}
    for (let ii in data.options){
      let i = data.options[ii]
      let choix = null
      let len   = null
      switch(i.type){
        case 'radio':
          choix = document.querySelectorAll(`input[name="${i.qcm.choix}"]`)
          len   =  Array.from(choix).some(x=>x.checked)
          if (!len) {
            alert(`Vous devez sélectionner un(e) ${i.qcm.choix}`);
            return;
          }
          else {
            let choix = document.querySelector(`input[name="${i.qcm.choix}"]:checked`)
            pan[i.qcm.choix] = choix.value
          }
          break 
        case 'check':
          choix = document.querySelectorAll(`input[name="${i.qcm.choix}"]`)
          len   =  Array.from(choix).some(x=>x.checked)
          if (!len) {
            alert(`Vous devez sélectionner un(e) ${i.qcm.choix}`);
            return;
          }
          else {
            let choix= document.querySelectorAll(`input[name="${i.qcm.choix}"]:checked`)
            pan[i.qcm.choix] = []
            for (let ii = 0; ii < choix.length; ii++) {
              let item = choix[ii]
              pan[i.qcm.choix].push(item.value)
            }
          }
          break 
        case 'grad':
          choix = document.querySelectorAll(`input[name="${i.qcm.choix}"]`)
          pan[i.qcm.choix] = []
          if (choix.length) 
            for (let ii = 0; ii < choix.length; ii++)
              if (choix[ii].value > 0)
                pan[i.qcm.choix].push({name:choix[ii].id, nb:choix[ii].value})
          break 
        case 'input':
          choix = document.querySelector(`textarea`)
          if (choix.value)
            pan["instrustions"] = choix.value
          break 
      }
    }
    let tobuy = {
      id: makeid(10),
      name: item.titre,
      prix: item.prix,
      options: pan
    }
    let liste_courses = ""
    try{
      liste_courses = JSON.parse(localStorage.getItem('panier'));
      liste_courses.push(tobuy)
    }
    catch {
      liste_courses = [tobuy]
    }
    localStorage.setItem('panier', JSON.stringify(liste_courses));
    window.location = "/"
  }

  console.log('data', data)

  return <>
    <Page>
      <Header title={item.titre} title2={item.detail} price={item.prix+"€"}/>
      <div className="scroll">
        {
          data == '' 
          && <div className='loader'></div>
          || <Urender content={item.titre} />
        }
      </div>
    </Page>
    <Footer>
      <div className='btn m-auto' onClick={()=>panier()}>Ajouter au panier</div>
    </Footer>
  </>
}
export default Selecteur 
