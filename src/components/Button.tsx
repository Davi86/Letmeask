import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss';

//Irá descrever todas as propriedades para o elemento
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined ?: boolean
};

/*Repasse de props ou spreadOperator, será repassado todas 
as propriedades que o html e será para todos os outros elementos button */
export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button 
      className={ `button ${isOutlined ? 'outlined' : ''}`} 
      {...props}
    />
  )
}