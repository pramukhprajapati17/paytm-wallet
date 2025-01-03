import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  return(
    <div className="bg h-screen flex flex-col items-center p-3">
      {/* User Details */}
      <div className="w-400 bg-white rounded p-3 shadow">
        <h2 className="text-third f-20">User Details</h2>
        <p><b>Name:</b> John Doe</p>
        <p><b>Address:</b> 123 Main Street, City, Country</p>
        <p><b>ID:</b> WLT123456</p>
      </div>

      {/* Make a Transaction */}
      <div className="w-400 bg-white rounded p-3 shadow mt-2">
        <h2 className="text-third f-20">Make a Transaction</h2>
        <form className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Recipient Name"
            className="p-1 rounded border border-gray"
          />
          <input
            type="number"
            placeholder="Amount"
            className="p-1 rounded border border-gray"
          />
          <select className="p-1 rounded border border-gray">
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
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
                <th>Recipient</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-12-01</td>
                <td>Jane Smith</td>
                <td>$500</td>
                <td>Credit</td>
              </tr>
              <tr>
                <td>2024-12-15</td>
                <td>Mike Johnson</td>
                <td>$300</td>
                <td>Debit</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Transaction Overview */}
        <div className="w-50 bg-white rounded p-3 shadow flex flex-col items-center justify-center">
          <h2 className="text-third f-20">Transaction Overview</h2>
          <div className="w-100 h-90 bg-gray flex items-center justify-center">
            <p className="text-gray">Transaction Graph Placeholder</p>
          </div>
        </div>
      </div>
    </div>
    
  );
}
export default Dashboard;