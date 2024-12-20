import React from 'react';
import './TransactionTable.css';

const TransactionTable = ({ transactions }) => {
    return (
        <div>
            <h2>Transaction List</h2>
            {transactions.length > 0 ? (
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>${transaction.price}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                                <td><img src={transaction.image} alt={transaction.title} width="50" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No transactions available for the selected month.</p>
            )}
        </div>
    );
};

export default TransactionTable;

