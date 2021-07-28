import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  //Criando variavel para armazena o código da sala
  const [ roomCode, setRoomCode ] = useState('');

  //
  async function handleCreateRoom() {
    //Verifica se o usuário não existe, se não tiver abre o pop-up para logar com o google
    if (!user) {
      //O await faz com que o restante do código somente excute se o resultado for verdadeiro
      await signInWithGoogle()
    }
      //Vai para a rota newroom
      history.push('/rooms/new');
  }
  /*   */
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    
    //Verificar se o roomCode é vazio
    if (roomCode.trim() === '') {
      return;
    }
    //Verifica se a sala que o usuário está tentando usar
    //.get() busca todos os registros dessa sala
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    //Verifica se a sala existe ou não
    if(!roomRef.exists()) {
      alert('Sala não existe.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Sala já fechada.');
      return;
    }


    //Caso a sala exista
    history.push(`/rooms/${roomCode}`);
  }


  return (
    //Estrutura HTML da página home
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />         
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}