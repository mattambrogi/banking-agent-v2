'use client'
import React, { useState, useEffect } from 'react';
import transactionsData from '@/mock-transactions.json';

// const transactions = [
//     {
//         id: 1, date: "10/30/2023", description: "Dunkin Donuts",
//         category: "Online Shopping", amount: -11.99, balance: 5899.08
//     },
//     // More people...
// ]



const Table = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setTransactions(transactionsData);
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Transactions</h1>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Date
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Description
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Category
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {transaction.date}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.description}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.category}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.amount}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table;