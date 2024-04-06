import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useGetTransactions = () =>{
    const [transactions, setTransactions] = useState([])
    const [transactionTotal,setTransactionTotal] = useState({balance:0.0,income:0.0,expenses:0.0})
    const transactionCollectionRef = collection(db,'transactions')
    const {userID} = useGetUserInfo()
    const getTransactions = async () =>{
        let unsubscribe;
        try {
            const queryTransactions = query(transactionCollectionRef,
                where("userID","==", userID),
                orderBy('createdAt'));
            unsubscribe = onSnapshot(queryTransactions, (snapshot)=>{
                let docs = []
                let income = 0;
                let expenses = 0;
                snapshot.forEach((doc)=>{
                    const data = doc.data()
                    const id = doc.id
                    // console.log(data)
                    docs.push({...data,id})

                    if(data.transactionType === 'expense'){
                        expenses += Number(data.transactionAmount)
                    }else{
                        income += Number(data.transactionAmount)
                    }
                })
                setTransactions(docs)
                let balance = income - expenses
                setTransactionTotal({
                    balance,
                    expenses,
                    income
                })
            })
            console.log(transactions)
        } catch (error) {
            console.log(error)
        }
        return () => unsubscribe();
    }

    useEffect(()=>{
        getTransactions()
    },[])

    return {transactions,transactionTotal}
}