import { useEffect, useState, createContext, ReactNode } from "react";
import { auth, firebase } from "../services/firebase";

//Função typescript que descreve como funcionará o user.
type User = {
  id: string;
  name: string;
  avatar: string;
}
type authContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}
type AuthContextProviderProps = {
  children: ReactNode;
}

export const authContext = createContext({} as authContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  //Salvando as informações do usuário na váriavel com o parâmetro descrito pelo typeScript
  const [user, setUser] = useState<User>();

  /*Essa função só será disparada quando a função AuthContextProvider for exibida em tela, 
  ela serve para manter o usuário sempre logado, mesmo que recarregue a página ou saia do app. */
  useEffect(() => {
    //Está função vai no firebase e procura se já existe um login como esse cadastrado.
    //onAuthStateChanged é um eventListener, ele fica escutando a váriavel user
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user
        
        //Irá verificar se o displayName ou o photoURL está vazio
        if(!displayName || !photoURL ){
          throw new Error('Missing information from Google Account.');
        }
        setUser ({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    /*Irá desligar o eventListener, é uma boa prática para melhorar 
    o desempenho do código toda vez que é declarado um eventListener é importante desligá-lo*/
    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle() {
    const  provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);
  }
  return (
    <authContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </authContext.Provider>
  );
}