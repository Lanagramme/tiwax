
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

const Input =()=> {
  return <section>
    <div className='commentaires'>
      <p className="bold">Instructions spécifiques</p>
      <textarea placeholder="Ajouter un commentaire..."/>
    </div>
  </section>
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

const FormModal =(data)=> {
  // let location = useLocation()
  let item = data
  console.log('data', data)

  return <>
    <div>
      <span>X</span>
      <form className="scroll">
        {
          data == '' 
          && <div className='loader'></div>
          || <Urender content={item} />
        }
      </form>
    </div>
  </>
}
export default FormModal