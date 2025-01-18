import React from 'react';
import { useScroll } from './Navigation/ScrollContext';

interface Props {
  className?: string;
}

export const Questions: React.FC<Props> = ({ className }) => {
  const questions = ['Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'Вопрос 4', 'Вопрос 5', 'Вопрос 6'];
  const answers = ['Ответ 1', 'Ответ 2', 'Ответ 3', 'Ответ 4', 'Ответ 5', 'Ответ 6'];

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { refs } = useScroll();

  return (
    <div className={className}>
      <div ref={refs.questions} className="py-6" id="questions">
        <h2 className="max-w-fit">Частые вопросы</h2>
      </div>
      {questions.map((question, index) => (
        <div key={index}>
          <div className="select-none">
            <summary
              className="py-4 cursor-pointer transition-all flex items-center"
              onClick={() => toggleAnswer(index)}>
              <span
                className={`mr-2 text-yaring-blue transition-transform ${
                  openIndex === index ? 'rotate-90' : ''
                }`}>
                ▷
              </span>
              {question}
            </summary>
            <div
              className={`transition-all overflow-hidden ${
                openIndex === index ? 'max-h-40' : 'max-h-0'
              }`}>
              <p>{answers[index]}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
