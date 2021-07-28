import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  /*Criando uma nova váriavel para armazenar o valor do input
    A gente começa o estado com o valor do mesmo tipo que será salvo na váriavel.
    O texto que está dentro de newRoom que será criado para criar a nova sala.
  */
  const [ newRoom, setNewRoom ] = useState('');

  //FormEvent previne com que o comportamento padrão do Form do HTML ocorra.
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    /*Verifica se existe algum texto de newRoom    */
    if (newRoom.trim() === '') {
      return;
    }

    /*Criando uma reference que é um referêcia para um registro de dado dentro do banco de dados,
      como uma linha no banco.
      Dentro do banco vai haver uma separação(categoria) com o nome rooms, dentro de rooms pode incluir 
      dados como o nome da sala ou dados interativos como um array de pergunta
    */
    const roomRef = database.ref('rooms');

    /*Procura dentro do banco uma referência chamadada rooms, e dentro da referência vai ser realizado
      um push.
      .push() é para sempre que for salvar um informação dentro de uma lista dentro do firebase, 
      se for salvar uma informação única o metodo que se utiliza é .set()
    */
    const firebaseRoom = await roomRef.push({
      //Titulo da sala inserido pelo usuário
      title: newRoom,
      //Usuário autenticado que será puxado pelo userAuth
      authorId: user?.id
    }); 

    /*Redireciona o usuário para a nova sala após a criação da mesma, usa o id do banco pelo .key*/
    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              /*Toda vez que um usuário digita algo no input, 
              o event pega os dados e salva no setNewRoom */
              onChange={event => setNewRoom(event.target.value)}
              /*Caso a váriavel altere por qualquer motivo */
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}


