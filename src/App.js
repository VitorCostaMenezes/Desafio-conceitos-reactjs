import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

const [repositories, setRepositories] = useState([]);


  useEffect(() =>{
    api.get('repositories').then(response =>{
        setRepositories(response.data);
    })
  }, []);



  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: `URL_teste:  ${repositories.length}`,
      techs: `Teste: ${repositories.length}`

  });
    const repository = response.data;
    setRepositories([...repositories, repository])

  }


async function handleRemoveRepository(id) {
    
  await  api.delete(`repositories/${id}`);
 
  //realiza um filtro matendo apenas os elementos que possuem id diferente 
  //do id que foi deletado
  setRepositories(repositories.filter(
    repository => repository.id !== id
  ))
 
}



  return (
    <div>

      <ul data-testid="repository-list">

        {repositories.map(respository => {
          return (
            <li key={respository.id} >
              {respository.title}

            <button id={respository.id} onClick={(item) => handleRemoveRepository(item.target.id)}>
            {/* <button  onClick={() => handleRemoveRepository(repository.id)}> */}
              Remover
            </button>
          </li>
          )
        })}
          
    

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
