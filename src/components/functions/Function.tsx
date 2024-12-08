import React, { useState } from 'react';
import Constants from '../../constants';
import Utils from '../../common/Utils';


interface FunctionProps {
  id: number;
  label: string;
  nextFunction: string;
  equation: string;
  onEquationChange: (id: number, equation: string) => void;
  inputValue: number;
}

const FunctionComponent: React.FC<FunctionProps> = ({
  id,
  label,
  nextFunction,
  equation,
  onEquationChange,
  inputValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEquationChange(id, event.target.value);
  };

  return (
    <div className="function-card">
      <h3>{label}</h3>
      <div>
        <label>Equation:</label>
        <input
          type="text"
          value={equation}
          onChange={handleChange}
          placeholder="e.g. => x*2"
        />
      </div>
      <div>
        <label>Next Function:</label>
        <select disabled>
          <option>{nextFunction}</option>
        </select>
      </div>
      <div className='row'>
        <div>
          <label>Input: </label>
          <span>{inputValue}</span>
        </div>
        <div>
          <label>Output:</label>
          <span>{Utils.calculateOutput(equation, inputValue)}</span>
        </div>
      </div>
    </div>
  );
};

export default FunctionComponent;
