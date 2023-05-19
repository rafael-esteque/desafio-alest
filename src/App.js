import { initializeApp } from 'firebase/app'
import { collection, getFirestore, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';

import logo from './master.jpg';
import './App.css';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBjJmdW-uF-xaOIcLOvfZOzvkeiNYWFdjo",
  authDomain: "teste-alest-1f3f8.firebaseapp.com",
  projectId: "teste-alest-1f3f8",
});

export const App = () => {
  
  const [nome, setNome] = useState("")
  const [midia, setMidia] = useState("")
  const [valor, setValor] = useState("")
  const [inventario, setInventario] = useState([])

  const db = getFirestore(firebaseApp);
  const laminaCollectionRef = collection(db, "Inventario");

  async function criarLamina() {
    const lamina = await addDoc(laminaCollectionRef, {
      nome, midia, valor
    });
    console.log(lamina);
    window.location.reload();
  }

  useEffect(() => {
    const getInventario = async () => {
      const data = await getDocs(laminaCollectionRef);
      setInventario(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInventario();
  },[]);

  async function deletarLamina(id) {
    const laminaDoc = doc(db, "Inventario", id);
    await deleteDoc(laminaDoc);
    window.location.reload();
  }

  return (
    <div className="App">
      <head>
        <title>O Mestre Ferreiro</title>
      </head>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='letreiro'>
          Loja do Mestre Ferreiro
        </p>
        <a className='letreiro'>
          Que lâmina você deseja adicionar ao inventário?
        </a><br></br>
        <input type="text" id="nomelamina" name="nomelamina" placeholder="Insira o nome da lâmina" value={nome} onChange={(e) => setNome(e.target.value)}></input>
        <input type="text" id="midia" name="midia" placeholder="Insira a mídia de origem" value={midia} onChange={(e) => setMidia(e.target.value)}></input>
        <input type="text" id="valor" name="valor" placeholder="Insira o valor" value={valor} onChange={(e) => setValor(e.target.value)}></input>
        <input type="text" id="imagemlamina" name="imagemlamina" placeholder="Insira endereço de imagem"></input>
        <button onClick={criarLamina}>Adicionar Lâmina</button>
      </header>

      <footer>
        <p>Inventário</p>
        <ul className="inventario">
          {inventario.map((lamina) => {
            return (
              <div className="itemInventario" key={lamina.id}>
                <li>{lamina.nome}</li>
                <li>{lamina.midia}</li>
                <li>{lamina.valor}</li>
                <button onClick={() => deletarLamina(lamina.id)}>Retirar Lamina</button>
                <br></br><br></br>
              </div>
            )
          })}
        </ul>
      </footer>

    </div>
  );
}

export default App;
