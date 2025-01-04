import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      // Fetch transaction history from local storage
      const transactionData = JSON.parse(localStorage.getItem('transactions')) || [];
      setTransactions(transactionData);
    } else {
      // Redirect to login if no user data is found
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      date: new Date().toISOString().split('T')[0],
      sender: `${user.f_name} ${user.l_name}`,
      recipient,
      amount: parseFloat(amount),
      type: 'Debit'
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    setRecipient('');
    setAmount('');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="bg-primary text-white flex justify-between items-center p-2">
        <a href="/" className="text-none">
          <strong className="text-white font-bold f-30">
            Wallet<span className="text-secondary">App</span>
          </strong>
        </a>
        <div className="flex gap-2">
          <button onClick={handleLogout} className="bg-secondary text-white p-1 rounded hover:bg-third">
            Log Out
          </button>
        </div>
      </header>
      <div className="bg h-screen flex flex-col items-center p-3">
        {/* User Details */}
        <div className="bg-white rounded p-3 shadow">
          <h2 className="text-third f-20">User Details</h2>
          <table className="w-100">
            <tbody>
              <tr>
                <td style={{ width: '150px' }}><b>Name:</b></td>
                <td>{user.f_name} {user.l_name}</td>
              </tr>
              <tr>
                <td style={{ width: '150px' }}><b>ID:</b></td>
                <td>{user.unique_id}</td>
              </tr>
              <tr>
                <td style={{ width: '150px' }}><b>Email:</b></td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td style={{ width: '150px' }}><b>Address:</b></td>
                <td>{user.address}</td>
              </tr>
              <tr>
                <td style={{ width: '150px' }}><b>Mobile:</b></td>
                <td>{user.mobile}</td>
              </tr>
              <tr>
                <td style={{ width: '150px' }}><b>Balance:</b></td>
                <td>${user.balance}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Make a Transaction */}
        <div className="w-400 bg-white rounded p-3 shadow mt-2">
          <h2 className="text-third f-20">Make a Transaction</h2>
          <form className="flex flex-col gap-2" onSubmit={handleTransactionSubmit}>
            <input
              type="text"
              value={`${user.unique_id}`}
              className="p-1 rounded border border-gray"
              readOnly
            />
            <input
              type="text"
              placeholder="Recipient Name"
              className="p-1 rounded border border-gray"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              className="p-1 rounded border border-gray"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="bg-primary text-white p-1 rounded">Submit</button>
          </form>
        </div>

        {/* Transaction History and Overview */}
        <div className="flex gap-2 w-400 mt-3">
          {/* Transaction History */}
          <div className="w-50 bg-white rounded p-3 shadow">
            <h2 className="text-third f-20">Transaction History</h2>
            <table className="w-100">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Sender</th>
                  <th>Recipient</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.date}</td>
                    <td>{transaction.sender}</td>
                    <td>{transaction.recipient}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;