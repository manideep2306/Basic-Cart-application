import logo from './logo.svg';
import './App.css';
import {useState}   from 'react'
function Product(props)
{
  return (<>
    <div>Name :<b>{props.title}</b> Price:<b>{props.price}</b><button onClick={function(){props.stc(props.id);}}>addtocart</button></div>
  </>);//calling innerfunction
}
function Store(props){
  return (<>{props.db.map(function(prd){
    return <Product id={prd.id} title={prd.title} price={prd.price} stc={props.stc}/> //passing props and innerfunction
  })}</>);
}
function CartItem(props){
  const {id,title,price}=props;
  return (<div style={{backgroundColor:"lightgreen",margin:"2px",display:"flex",justifyContent:"space-around"}}>
    <img src="https://via.placeholder.com/50" alt="placeholder"/>
    <p>{title}</p>
    <p>Total price:{price}</p>
    <button onClick={function(){props.cts(id);}}>Remove</button>//calling innerfunction

    </div>);
}
function Cart(props)
{
  return (<div>{props.db.map(function(el){
    return <CartItem id={el.id} title={el.title} price={el.price} cts={props.cts}/> //passing props and innerfunction
  })}
  </div>);
}
function App() {
  const db=[{id:1,title:"shoe",price:833},{id:2,title:"pant",price:2333},{id:3,title:"shirt",price:3673}];
  const [sdb,fnpdb]=useState(db);
  const [cdb,fncdb]=useState([]);
  function moveStoretoCart(id) //innerfunction which should be available for product
  {
    const product=sdb.find((pd)=> pd.id === id);
    fnpdb(sdb.filter((e)=>{return e.id!=id;}));//removing from store
    fncdb([...cdb,product]);//adding to cart
  }
  function moveCarttoStore(id)//innerfunction which should be available for CartItem
  {
    const item=cdb.find((pd)=>pd.id===id);
    fncdb(cdb.filter((e)=>{return e.id!=id;})); //reverse of store to cart
    fnpdb([...sdb,item]);
  }
  return (<>
    Store
    <Store db={sdb} stc={moveStoretoCart}/> //passing both db & innerfunction which can moveStoretoCart
    Cart
    <Cart db={cdb} cts={moveCarttoStore}/>//passing both db & innerfunction which can moveCarttoStore
    </>
  );
}

export default App;
