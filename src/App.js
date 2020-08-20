import React from "react";
import api from './services/api';

import "./styles.css";
import { useState,useEffect } from "react";

function App() {
  const [ repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories([...response.data]);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {

    api.delete(`repositories/${id}`);

    var repositoryIndex = repositories.findIndex(rep => rep.id === id);
    var rep = [...repositories];
    rep.splice(repositoryIndex,1);
    setRepositories(rep);
    
  }

  return (
    <div>
      {/* <ul data-testid="repository-list"> */}
      <ul data-testid="repository-list">

        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
