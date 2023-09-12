import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function SplitSplitesForm() {
  const { addSplite, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    total_no: '',
    description: '',
    result: [],
  });

  const { title, amount, date, total_no, description, result } =
    inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

const [persons, setPersons] = useState([{ name: '', amountPaid: '' }]);

  const handlePersonChange = (index, key, value) => {
    const updatedPersons = [...persons];
    updatedPersons[index][key] = value;
    setPersons(updatedPersons);
  };

  const addPerson = () => {
    setPersons([...persons, { name: '', amountPaid: '' }]);
  };

  const calculateAmounts = () => {
    const totalAmount = parseFloat(amount);
    const totalPeople = parseInt(total_no);

    if (totalAmount && totalPeople) {
      const individualAmount = totalAmount / totalPeople;
      const updatedPersons = persons.map((person) => {
        const amountPaid = parseFloat(person.amountPaid);
        const amountLeft = individualAmount - amountPaid;
        return {
          ...person,
          amountLeft,
        };
      });
      setInputState({
        ...inputState,
        persons: updatedPersons,
        result: updatedPersons,
      });
    } else {
      setError('Please enter valid total amount and number of people.');
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    calculateAmounts();
  };
  const handleSave = async (e) => {
    e.preventDefault();
    addSplite(inputState);
    calculateAmounts();
    setInputState({
      title: '',
      date: '',
      total_no: '',
      amount: '',
      description: '',
      persons: [{ name: '', amountPaid: '' }],
      result: [],
      
    });
  };
  
  return (
    <SplitSplitesStyled onSubmit={handleCalculate}>
      {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input
          type='text'
          value={title}
          name={'title'}
          placeholder='Splite Title'
          onChange={handleInput('title')}
        />
      </div>
      <div className='input-control'>
        <input
          value={amount}
          type='text'
          name={'amount'}
          placeholder={'Split Amount'}
          onChange={handleInput('amount')}
        />
      </div>
      <div className='input-control'>
        <DatePicker
          id='date'
          placeholderText='Enter A Date'
          selected={date}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>

      <div className='input-control'>
        <input
          value={total_no}
          type='text'
          name={'total_no'}
          placeholder={'Total Number'}
          onChange={handleInput('total_no')}
        />
      </div>
      {persons.map((person, index) => (
        <div key={index} className='input-control'>
          <input
            value={person.name}
            type='text'
            name='name'
            placeholder={`Person ${index + 1}'s Name`}
            onChange={(e) => handlePersonChange(index, 'name', e.target.value)}
          />
          <input
            value={person.amountPaid}
            type='text'
            name='amountPaid'
            placeholder={`Amount Paid by Person ${index + 1}`}
            onChange={(e) =>
              handlePersonChange(index, 'amountPaid', e.target.value)
            }
          />
        </div>
      ))}
      <Button   name={'Add Person'}
          icon={plus}
          bPad={'0.5rem 1rem'}
          bRad={'30px'}
          bg={'var(--color-accent'}
          color={'#fff'}
          length={'10%'}
          onClick={addPerson}
          
          
          ></Button>
      <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="60" rows="4" onChange={handleInput('description')}></textarea>
            </div>
      
      <div className='submit-btn'>
        <Button
          name={'Calculate'}
          icon={plus}
          bPad={'.8rem 1.6rem'}
          bRad={'30px'}
          bg={'var(--color-accent'}
          color={'#fff'}
          onClick={calculateAmounts}
        />
      </div>
      <div className='result'>
        {result.map((person, index) => (
          <p key={index}>
            {person.name}: {person.amountLeft.toFixed(2)}
          </p>
        ))}
      </div>
      <div className='save-btn'>
        <Button
          name={'Save'}
          bPad={'.8rem 1.6rem'}
          bRad={'30px'}
          bg={'var(--color-green)'}
          color={'#fff'}
          onClick={handleSave}
        />
      </div>
    </SplitSplitesStyled>
  );
}

const SplitSplitesStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    display: flex;
    gap: 1rem;
    input {
      width: 100%;
    }
  }
  .submit-btn {
    display: flex;
    justify-content: center;
  }
  .result {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  .save-btn {
    display: flex;
    justify-content: center;
  }
`;

export default SplitSplitesForm;
