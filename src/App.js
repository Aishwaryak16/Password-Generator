import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
const [length, setLength] = useState(6);
const [numberAllowed, setNumberAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState('');

//useRef hook

const passwordRef = useRef(null);

const passwordGenerator = useCallback(()=>{
  let pass = '';
  let str = 'ABCDEFJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  if(numberAllowed) str += '0123456789'
  if(charAllowed) str += '!@#$%^&*-_+=[]{}~`'


  for(let i=1; i<= length ;i++) {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }

  setPassword(pass);

}, [length, numberAllowed, charAllowed, setPassword])


const copyPasswordClipboard = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
}, [password])


useEffect(()=>{
  passwordGenerator();
}, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className="App">
      <h1>Password Generator!!</h1>
      <input type='text' value={password} className='input' placeholder='password...' ref={passwordRef} readOnly />
      <button type='submit' onClick={copyPasswordClipboard} className='btn'>Copy</button>


      <div className='input-wp'>
        <div className='range-wp'> 
        <input type='range' className='range' min={6} max={25} value={length} onChange={(e)=> setLength(e.target.value)} />
        <label>Length: {length}</label>
        </div>

        <div className='range-wp'>
          <input type='checkbox' defaultChecked = {numberAllowed} id='numberInput' className='checkbox' onChange={() => setNumberAllowed((prev) => !prev)} />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='range-wp '>
          <input type='checkbox' className='checkbox' id='charAllowed' defaultChecked = {charAllowed} onChange={()=>setCharAllowed((prev)=>!prev)} />
          <label htmlFor='charAllowed'>Characters</label>
        </div>

      </div>
    </div>
  );
}

export default App;
