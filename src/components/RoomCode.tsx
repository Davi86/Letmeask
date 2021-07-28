import copyImg from '../assets/images/copy.svg';
import '../styles/roomCode.scss';

//Tipifica o que será necessário no prop code, na qual deverá ser string
type RoomCodeProps = {
  code: string;
}

//Estrura HTML que irá mostrar o codigo na sala
export function RoomCode(props: RoomCodeProps) {
  //Copia o código da sala quando clicar no button
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code"/>
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}