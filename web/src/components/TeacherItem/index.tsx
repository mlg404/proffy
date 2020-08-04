import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/5060732?s=460&u=7098d9562d767199391ea5834e0623f958025712&v=4" alt="Victor Eyer"/>
        <div>
          <strong>Victor Eyer</strong>
          <span>Química</span>
          </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de quimica avançada.
        <br /><br />
        Apaixonado por explodir coisas em laboratórios e por mudar a vida das pessoas através de experiências.
        Mais de 200.000 já foram treinadas com explosões minhas.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button>
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
    );
}

export default TeacherItem;