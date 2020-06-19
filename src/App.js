import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories(){
     await api.get('repositories').then(response => {
        setRepositories(response.data);
      })
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: Date.now(),
      title: 'Teste asdasdasd',
      url: 'https://github.com/bruno2099/desafio-conceitos-reactjs',
      techs: ['ReactJS', 'NodeJS']
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            Titulo: <span>{repository.title}</span> - Url: {repository.url} - Técnologias: {repository.techs} - Likes: {repository.likes}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
