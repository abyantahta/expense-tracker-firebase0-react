import React from 'react'
import { signOut } from 'firebase/auth';
import { useAddTransaction } from '../../hooks/useAddTransaction'
import { useState } from 'react';
import {useGetTransactions} from '../../hooks/useGetTransaction'
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
// import { auth } from 'firebase/auth';
import {auth} from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom';
const ExpenseTracker = () => {
    const {addTransaction} = useAddTransaction();
    const {transactions,transactionTotal} = useGetTransactions();
    const {name,profilePhoto} = useGetUserInfo();
    console.log('coba cek', transactionTotal)
    const [description, setDescription] = useState('')
    const [transactionAmount, setTransactionAmount] = useState(0)
    const [transactionType, setTransactionType] = useState('expense')
    const navigate = useNavigate()
    const signUserOut = async()=>{
        try {
            await signOut(auth)
            localStorage.clear()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = async(e) => {
        try {
            e.preventDefault()
            addTransaction({
                description, 
                transactionAmount,
                transactionType
            }) 
            setDescription('')
            setTransactionAmount(0)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <div className="profile">
        <h2>{name}</h2>
        {profilePhoto && <div className="profile">
            <img src={profilePhoto} className='profile-photo' alt="" />
            </div>}
        <button onClick={signUserOut}>Sign out</button>
    </div>
    <div className='expense-tracker'>
        <div className="container">
            <h1>Expense Tracker</h1>
            <div className="balance">
                <h3>Your Balance</h3>
                <h2>{transactionTotal.balance}</h2>
            </div>
            <div className="summary">
                <div className="income">
                    <h4>Income</h4>
                    <p>{transactionTotal.income}</p>
                </div>
                <div className="expenses">
                    <h4>Expenses</h4>
                    <p>{transactionTotal.expenses}</p>
                </div>
            </div>
            <form onSubmit={onSubmit} className="add-transaction">
                <input 
                    type="text" 
                    placeholder='Description' 
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    required />
                <input 
                    type="text" 
                    placeholder='Amount' 
                    value={transactionAmount}
                    onChange={(e)=> setTransactionAmount(e.target.value)}
                    required />
                <input 
                    type="radio" 
                    id="expense" 
                    onChange={(e)=> setTransactionType(e.target.value)}
                    checked={transactionType==='expense'}
                    value="expense" />
                <label htmlFor="expense">Expense</label>
                <input 
                    type="radio" 
                    id="income" 
                    onChange={(e)=> setTransactionType(e.target.value)}
                    checked={transactionType==='income'}
                    value="income" />
                <label htmlFor="income">Income</label>
                <button 
                    type="submit">Add transaction</button>
            </form>
        </div>
    </div>
    <div className="transactions">
        <h3>Transaction</h3>
        <ul>

        </ul>
        {
            transactions.map((doc)=>{
                const {description, transactionAmount,transactionType} = doc;
                return <li>
                    <h4>{description}</h4>
                    <p>{transactionAmount} ||| <label style={{color: transactionType==='expense'? 'red': 'green'}}>{transactionType}</label></p>
                </li>
            })
        }
    </div>
    </>
  )
}

export default ExpenseTracker