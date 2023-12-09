import React, { useState, useEffect } from 'react';
import './App.css';

// Componente reutilizável para campos de formulário
const FormField = ({ label, type, value, onChange, required }) => (
  <div>
    <label>
      {label}:
      <input type={type} value={value} onChange={onChange} required={required} />
    </label>
  </div>
);

// Componente principal para o formulário de cadastro
const CadastroForm = ({ onCadastro }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se os campos obrigatórios estão preenchidos
    if (nome.trim() === '' || descricao.trim() === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Adiciona o item à lista no localStorage
    const novoItem = { nome, descricao };
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    itens.push(novoItem);
    localStorage.setItem('itens', JSON.stringify(itens));

    // Limpa os campos do formulário
    setNome('');
    setDescricao('');

    // Executa a função de cadastro passada como prop
    onCadastro();
  };

  return (
    
    <form onSubmit={handleSubmit}> 
    <div className='fundocadastro'>
      <div className='vazio'></div>
      
     <div className='titulo1'> 
      <h2  >Formulário de Cadastro</h2>
      </div>
      <div className='formulario'>
      <FormField label="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <FormField label="senha" type="password" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      </div>
      <div className='botao'>
      <button type="submit">Cadastrar</button>
      </div>
      </div>
    </form>
   
  );
};

// Componente para exibir a lista de itens cadastrados
const ListaItens = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    // Atualiza a lista de itens quando o componente é montado
    const itensSalvos = JSON.parse(localStorage.getItem('itens')) || [];
    setItens(itensSalvos);
  }, []);

  return (
    <div className='lista'>
      <h2 className='titulo2'>Lista de Itens</h2>
      <ul>
        {itens.map((item, index) => (
          <li key={index}>
            <strong>{item.nome}</strong>: {item.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Componente principal
const App = () => {
  const handleCadastro = () => {
    // Atualiza o estado para forçar a atualização da ListaItens
    // e exibir o item recém-cadastrado
    setAtualizarLista((prevState) => !prevState);
  };

  const [atualizarLista, setAtualizarLista] = useState(false);

  return (
    <div className="App">
      <CadastroForm onCadastro={handleCadastro} />
      <ListaItens key={atualizarLista} />
    </div>
  );
};

export default App;
