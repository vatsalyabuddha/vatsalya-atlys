import React, { useState, useEffect, useRef } from 'react';
import FunctionComponent from './Function';
import Utils from '../../common/Utils';
import '../../css/Function.css';

const FunctionIndex: React.FC = () => {
    const [initialValue, setInitialValue] = useState(0);
    const chainRef = useRef<HTMLDivElement | null>(null);
    const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
    const [functions, setFunctions] = useState([
      { id: 1, label: 'Function 1', equation: 'x*10', inputValue: 0, nextFunctionId: 2, nextFunction: 'Function 2' },
      { id: 2, label: 'Function 2', equation: 'x-10', inputValue: 0, nextFunctionId: 4, nextFunction: 'Function 4' },
      { id: 3, label: 'Function 3', equation: 'x*3', inputValue: 0, nextFunctionId: 0, nextFunction: '' },
      { id: 4, label: 'Function 4', equation: 'x+5', inputValue: 0, nextFunctionId: 5, nextFunction: 'Function 5' },
      { id: 5, label: 'Function 5', equation: 'x/2', inputValue: 0, nextFunctionId: 3, nextFunction: 'Function 3' },
    ])
  
    const handleEquationChange = (id: number, equation: string) => {
      setFunctions((prev) =>
        prev.map((func) => (func.id === id ? { ...func, equation } : func))
      );
    };
    useEffect(() => {
        const updateLines = () => {
          if (!chainRef.current) return;
          const cardElements = chainRef.current.querySelectorAll('.function-card');
          const newLines : any = [];
    
          functions.forEach((func, index) => {
            if (index === functions.length - 1) return; // Skip last function
    
            const currentCard = cardElements[index];
            const nextCard = Array.from(cardElements).find(
              (el) => el.getAttribute('data-id') === String(func.nextFunction)
            );
    
            if (currentCard && nextCard) {
              const currentOutput = currentCard.querySelector('.output span')?.getBoundingClientRect();
              const nextInput = nextCard.querySelector('.input span')?.getBoundingClientRect();
    
              if (currentOutput && nextInput) {
                newLines.push({
                  x1: currentOutput.x + currentOutput.width / 2,
                  y1: currentOutput.y + currentOutput.height / 2,
                  x2: nextInput.x + nextInput.width / 2,
                  y2: nextInput.y + nextInput.height / 2,
                });
              }
            }
          });
    
          setLines(newLines);
        };
    
        updateLines();
        window.addEventListener('resize', updateLines);
    
        return () => {
          window.removeEventListener('resize', updateLines);
        };
      }, [functions]);
  
    useEffect(() => {
        let previousOutput = initialValue;
        const updatedFunctions = functions.map((func, index) => {
            const outputValue = Utils.calculateOutput(func.equation, previousOutput);
            previousOutput = (index === 0) ? initialValue : outputValue;
            return { ...func, inputValue : previousOutput };
        });
      
        setFunctions(updatedFunctions);
      }, [initialValue, functions.map((func) => func.equation).join(",")]);
      
      
      
  
    return (
      <div className="function-container">
        <div className="initial-input">
          <label className="initial-input-label">Initial Value of x : </label>
          <input
            className="initial-input-input"
            type="text"
            value={initialValue}
            onChange={(e) => setInitialValue(Number(e.target.value))}
          />
        </div>
        <div className="functions-chain">
          {functions.map((func) => (
            <FunctionComponent
              key={func.id}
              {...func}
              onEquationChange={handleEquationChange}
              inputValue={func.inputValue}
            />
          ))}
        </div>
        <div className="output">
          <h2 className="output-label">Final Output (y):</h2>
          <p className="output-value">
            {functions.find((f) => f.id === 3)?.inputValue || 0}
          </p>
        </div>
      </div>
    );
  };
  
  export default FunctionIndex;