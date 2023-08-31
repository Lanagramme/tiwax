import Page from '../components/Page.jsx'
import Header from "../components/Header.jsx"
import Footer from '../components/Footer.jsx'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import '../styles/Button.scss'
import '../styles/Selecteur.scss'

// components
const Check =({title, qcm, sub = false})=> {
  let i = 1
  let incr =()=>{i+=1; return i}
  return <section key={qcm.choix+incr}>
    <p className="bold">{title}</p>
    {sub ? <p className='mini'>{sub}</p> : null}
    {
      qcm.options.map(item => {
        return <div className='option'>        
          <span>{item}</span>
          <input type="checkbox" value={item} name={qcm.choix} />
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
          <span>{item}</span>
          <input type="radio" value={item} name={qcm.choix} />
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
const Graduate =()=> {
  return <div className="input-group input-number-group">
    <div className="input-group-button only-positif">
      <span className="input-number-decrement">-</span>
    </div>
    <input className="input-number only-positif" type="number" value="0" min="0" max="1000" disabled />
    <div className="input-group-button">
      <span className="input-number-increment">+</span>
    </div>
  </div>
}
const Optionnal =({title, qcm, sub=false})=> {
  let i = 1
  let incr =()=>{i+=1; return i}
  return <section key={title+i}>
    <p className="bold">{title}</p>
    {sub ? <p className='mini'>{sub}</p> : null}
    {
      qcm.options.map(item => {
        return <div className='option'>        
          <span>{item}</span>
          <Graduate />
       </div>
      })
    } 
    </section>
}

// data
const test = {
  choix: 'viande',
  options: ['Poulet', 'Boeuf', 'Poisson']
}
const test2 = {
  choix: "accompagnements",
  options: ['Riz', 'Pâtes', 'Lentilles consommés','Haricots rouge',"gratin de pomme de terre"]
}
const sauces = {
  choix: "sauces",
  options: ['Créole', 'Mayonnaise', 'Piment']
}
const pain = {
  choix: "pain",
  options: ['Panini', 'Bokit', 'Agoulou']
}
const garniture = {
  choix: "garniture",
  options: ['Steak', 'Poulet', 'Saucisse','Morue','Jambon Fromage']
}
const repas_data = {
  options: [
    {
      type: "radio",
      title: "1 viande au choix",
      qcm: test,
      sub: false
    },
    {
      type: "check",
      title: "2 accompagnements au choix",
      qcm: test2,
      sub: "2max"
    },
    {
      type: "grad",
      title: "Sauces",
      qcm: sauces,
      sub: "2 max."
    },
    {type: "input"}
  ]
}
const pain_data = {
  options: [
    {
      type: "radio",
      title: "1 pain au choix",
      qcm: pain,
      sub: false
    },
    {
      type: "grad",
      title: "garniture au choix",
      qcm: garniture,
      sub: "2 max."
    },
    {
      type: "grad",
      title: "Sauces",
      qcm: sauces,
      sub: "2 max."
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
        options: ["Coca", "Sprite", "Vaval exotic", "7up","Ice tea", "Sunkist", "Fanta exotic", "Fuze tea"]
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
  return <>
    {
      data.options.map(x=>{
        console.log(x)
        let comp 
        x.type == "radio" ? comp = <Radio title={x.title} qcm={x.qcm} />:null
        x.type == "check" ? comp = <Check title={x.title} qcm={x.qcm} sub={x.sub}/>:null
        x.type == "grad"  ? comp = <Optionnal title={x.title} qcm={x.qcm} sub={x.sub}/>:null
        x.type == "input" ? comp = <Input />:null
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
  return <>
    <Page>
      <Header title={item.titre} title2={item.detail} price={item.prix+"€"}/>
      <div className="scroll">
        <Urender content={item.titre} />
      </div>
    </Page>
    <Footer>
      <NavLink to='/' className='btn m-auto'>Ajouter au panier</NavLink>
    </Footer>
  </>
}
export default Selecteur 
