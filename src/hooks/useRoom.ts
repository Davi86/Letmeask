import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type QuestionType = {
  id: string;
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
  likeCount: number,
  likeId: string | undefined
}

//Record serve para declarar a tipagem de um objeto
type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean,
  //Para objetos é necessário usar o Record
  likes: Record<string, {
    authorId: string;
  }>
}>

export function useRoom(roomId: string) {
    //Busca a váriavel user dentro de auth
    const { user } = useAuth();
    //Passa o tipo do vetor que será <QuestionType[]>
    const [ questions, setQuestions ] = useState<QuestionType[]>([]);
    const [ title, setTitle ] = useState('');

    /*Insere as perguntas vindas do firebase assim que a página é carregada
  O useEffect é uma função(hook) que ele dispara um evento sempre que uma informação mudar, 
  se passar o array de depedência o [] como vazio ele será exibido somente uma vez  */
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    /*No javascript quando é necessário ouvir o evento mais de uma vez coloca a função como on,
    se quiser ouvir somente uma vez coloca once */
      roomRef.on('value', room => {
      const databaseRoom = room.val();
      /*Pode se usar o código abaixo de outra forma: 
      const firebaseQuestions = databaseRoom.questions as FirebaseQuestions;                                     */
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      //O evento 'value' traz todas as referências do `rooms/${roomId}`
      //.val é um API do firebase para buscar o valor que contem dentro da room
      //console.log(room.val());

      /*Criação de uma váriavel que irá mudar a maneira que os questions são retornado
       será passado de object para vetor, que será feito pelo Object.entries() que separa por meio de arrays
       que ficará como uma matriz */
       /*Pode se usar o código abaixo de outra forma: 
      const parsedQuestions = Object.entries(room.questions ?? {}) */
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          /*A expressão (values.like ?? {}) busca o objeto likes ou um objeto vazio
            A função some() retorna true ou false dependendo se ele encontrar a informação,
            enquanto a função find() retorna a informação encontrada
            O ?. serve para caso o if dê falso, ele retorne ao menos a informação na posição 0 
            que nesse caso seria o id do like*/
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      })
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    //"Desliga" todos os eventListener 
    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return {questions, title}
}