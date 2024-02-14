import React, { useContext, useState } from "react"
import axios from 'axios'
const BASE_URL = "https://moneyminder2.onrender.com/routes/";
const GlobalContext = React.createContext()
export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [splite, setSplit] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }
   


    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }


    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }



    //calculate expense
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }
    
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }
    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }


    //calculate splite
    const addSplite = async (splite) => {
        const response = await axios.post(`${BASE_URL}add-splite`, splite)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getSplite()
    }
    const getSplite = async () => {
        const response = await axios.get(`${BASE_URL}get-splite`)
        setSplit(response.data)
        console.log(response.data)
    }
    const deleteSplite = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-splite/${id}`)
        getSplite()
    }
  
    const totalSplite = () => {
        let totalIncome = 0;
        splite.forEach((splite) =>{
            totalIncome = totalIncome + splite.amount
        })
        return totalIncome;
    }
    
     // total
    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            splite,
            addSplite,
            getSplite,
            deleteSplite,
            totalSplite,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}