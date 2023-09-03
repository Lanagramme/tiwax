import Page from '../components/Page.jsx'
import Header from "../components/Header.jsx"
import Footer from '../components/Footer.jsx'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import '../styles/Button.scss'
import '../styles/Selecteur.scss'

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
  console.log(qcm)
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
const test = {
  choix: 'viande',
  options: [
    'Poulet', 
    'Boeuf', 
    'Poisson'
  ]
}
const test3 = {
  choix: 'viande',
  options: [
    {name:'Poulet', stock: false}, 
    {name:'Boeuf', stock: true}, 
    {name:'Poisson', stock: true}, 
  ]
}
const test4 = {
  choix: "accompagnements",
  options: [
    {name:'Riz', stock: false}, 
    {name:'Pâtes', stock: true}, 
    {name:'Lentilles consommés', stock: true}, 
    {name:"Gratin de pomme de terre", stock: true}, 
    {name:"Haricots rouge", stock: true}, 
  ]
}
const test2 = {
  choix: "accompagnements",
  options: [
    'Riz', 
    'Pâtes', 
    'Lentilles consommés',
    'Haricots rouge',
    "gratin de pomme de terre"
  ]
}
const sauces = {
  choix: "sauces",
  options: [
    'Créole', 
    'Mayonnaise', 
    'Piment'
  ]
}
const sauces2 = {
  choix: "sauces",
  options: [
    {name:'Créole', stock: false}, 
    {name:'Mayonnaise', stock: true}, 
    {name:'Piment', stock: true}, 
  ]
}
const pain = {
  choix: "pain",
  options: [
    'Panini', 
    'Bokit', 
    'Agoulou'
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
const garniture = {
  choix: "garniture",
  options: [
    'Steak', 
    'Poulet', 
    'Saucisse',
    'Morue',
    'Jambon Fromage'
  ]
}
const repas_data = {
  options: [
    {
      type: "radio",
      title: "1 viande au choix",
      qcm: test3,
      sub: false
    },
    {
      type: "check",
      title: "2 accompagnements au choix",
      qcm: test4,
      sub: "2max",
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
  console.log(data)
  for(let i of data.options) {
    if (!i.hasOwnProperty('qcm')) continue
    console.log(i.qcm)
    console.log('data', i.qcm.choix)
  }
  let i = 0
  return <>
    {
      data.options.map(x=>{
        console.log(x)
        let comp 
        x.type == "radio" ? comp = <Radio key={Date.now()+i} title={x.title}     qcm={x.qcm} max={x.max} />:null
        x.type == "check" ? comp = <Check key={Date.now()+i} title={x.title}     qcm={x.qcm} max={x.max} sub={x.sub} />:null
        x.type == "grad"  ? comp = <Optionnal key={Date.now()+i} title={x.title} qcm={x.qcm} max={x.max} sub={x.sub} />:null
        x.type == "input" ? comp = <Input key={Date.now()+i} />:null
        i+=1
        return comp
      })
    }
  </>
}
        // <Radio title='1 viande au choix' qcm={test} />
        // <Check title="2 accompagnements au choix" qcm={test2} sub={"2 max"}/>
        // <Optionnal title="2 accompagnements au choix" qcm={test2} sub={"2 max"}/>
const Selecteur =()=> {
  let location = useLocation() 
  let item = location.state.from
  let data = ''
  switch(item.titre){
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
  console.log(data)

  function panier() {
    console.log('panier')
    const pan = {}
    for (let ii in data.options){
      let i = data.options[ii]
      let choix = null
      let len   = null
      // console.log(i.type)
      switch(i.type){
        case 'radio':
          choix = document.querySelectorAll(`input[name="${i.qcm.choix}"]`)
          len   =  Array.from(choix).some(x=>x.checked)
          if (!len) alert(`Vous devez sélectionner un(e) ${i.qcm.choix}`)
          else {
            let choix = document.querySelector(`input[name="${i.qcm.choix}"]:checked`)
            pan[i.qcm.choix] = choix.value
          }
          break 
        case 'check':
          choix = document.querySelectorAll(`input[name="${i.qcm.choix}"]`)
          len   =  Array.from(choix).some(x=>x.checked)
          if (!len) alert(`Vous devez sélectionner un(e) ${i.qcm.choix}`)
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
  localStorage.setItem('panier', pan);
  }

      // <NavLink to='/' className='btn m-auto'>Ajouter au panier</NavLink>
  return <>
    <Page>
      <Header title={item.titre} title2={item.detail} price={item.prix+"€"}/>
      <div className="scroll">
        <Urender content={item.titre} />
      </div>
    </Page>
    <Footer>
      <div className='btn m-auto' onClick={()=>panier()}>Ajouter au panier</div>
    </Footer>
  </>
}
export default Selecteur 
