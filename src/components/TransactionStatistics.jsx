import React, { useEffect, useState } from 'react';
import './TransactionStatistics.css';

const TransactionStatistics = ({ month, transactions }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        soldItems: 0,
        notSoldItems: 0,
    });

    useEffect(() => {
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.dateOfSale);
            return transactionDate.toLocaleString('default', { month: 'long' }) === month;
        });

        const totalSaleAmount = filteredTransactions.reduce((total, transaction) => total + (transaction.sold ? transaction.price : 0), 0);
        const soldItems = filteredTransactions.reduce((total, transaction) => total + (transaction.sold ? transaction.sold : 0), 0);
        const notSoldItems = filteredTransactions.length - soldItems;

        setStatistics({
            totalSaleAmount,
            soldItems,
            notSoldItems,
        });
    }, [month, transactions]);

    return (
        <div className="statistics-box">
            <h2>Statistics - {month}</h2>
            <div>Total Sale: ${statistics.totalSaleAmount.toFixed(2)}</div>
            <div>Total Sold Items: {statistics.soldItems}</div>
            <div>Total Not Sold Items: {statistics.notSoldItems}</div>
        </div>
    );
};

export default TransactionStatistics;
