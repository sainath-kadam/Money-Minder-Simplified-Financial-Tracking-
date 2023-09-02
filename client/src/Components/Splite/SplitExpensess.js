
import React, { useEffect } from 'react'
import styled from 'styled-components'
import SplitExpensesForm from './SplitExpensesForm'
import { useGlobalContext } from '../../context/globalContext';
import SpliteItem from '../SpliteItem/Spliteitem';
import { InnerLayout } from '../../styles/Layouts';

function SplitExpensess() {
  const {splite,getSplite,deleteSplite,totalSplite} =useGlobalContext()
  useEffect(() =>{
    getSplite()
}, [])
  return (
    <SpliteStyled>
            <InnerLayout>
                <h1>Splite Expense</h1>
                <h2 className="total-splite">Group Expense: <span>Rs.{totalSplite()}</span></h2>
                <div className="splite-content">
                    <div className="form-container">
                    <SplitExpensesForm/>
                    </div>
                    <div className="splites">
                        {splite.map((splite) => {
                            const {_id, title,amount,date,description,persons} = splite;
                            console.log(splite)
                            return <SpliteItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                persons={persons}
                                description={description} 
                                amount={amount} 
                                date={date} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteSplite}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </SpliteStyled>
    )
}
const SpliteStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-splite{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .splite-content{
        display: flex;
        gap: 2rem;
        .splites{
            flex: 1;
        }
    }
`;

export default SplitExpensess