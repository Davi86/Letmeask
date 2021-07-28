import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/question.scss';

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string
  };
  //ReacNode é basicamente qualquer coisa em jsx 
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLihted?: boolean;
}

export function Question({
  author,
  content,
  isAnswered = false,
  isHighLihted = false,

  children
}: QuestionProps) {
  return (
    <div 
      //Sem o classnames
      /*className={`question ${isAnswered ? 'answered': ''} 
                  ${isHighLihted ? 'highlighted' : ''}`}*/
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighLihted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name}/>
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}