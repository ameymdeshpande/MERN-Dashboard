import React, { useEffect, useState } from 'react';
import TransactionTable from './components/TransactionTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import MonthSelector from './components/MonthSelector';
import TransactionStatistics from './components/TransactionStatistics';
import './App.css';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState('March');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/product_transaction.json'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTransactions(data); 
            } catch (error) {
                console.error('Error fetching transaction data:', error);
                setError('Failed to fetch transaction data.');
            } 
        };

        fetchData();
    }, []);

    // Filter transactions by month and search query
    const filteredTransactions = transactions.filter(transaction => {
        const date = new Date(transaction.dateOfSale);
        const monthName = date.toLocaleString('default', { month: 'long' });

        const matchesMonth = monthName === month;
        const matchesSearch =
            searchQuery === '' || 
            transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.price.toString().includes(searchQuery);

        return matchesMonth && matchesSearch;
    });

    // Calculate pagination details
    const indexOfLastTransaction = currentPage * itemsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    return (
        <div className="app">
            <h1>Transaction Management</h1>
            <MonthSelector month={month} setMonth={setMonth} />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <TransactionStatistics month={month} transactions={filteredTransactions} />

            <TransactionTable transactions={currentTransactions} />

            {/* Pagination */}
            {filteredTransactions.length > itemsPerPage && (
                <Pagination 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    totalPages={totalPages} 
                />
            )}
        </div>
    );
}

export default App;
