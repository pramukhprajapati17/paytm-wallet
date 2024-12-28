import React from 'react';

const Home = () => {
    return (
        <main className="flex justify-between items-center p-3 h-home">
        <div className="w-50">
          <h1 className="text-third f-70">
            Manage Your Wallet 
          </h1>
          <h2 className="text-primary f-70 m-0 p-0">Seamlessly</h2>
          <p className="text-black mt-2">
            Track your expenses, send and receive payments, and achieve financial freedom with WalletApp.
          </p>
          <div className="flex gap-2 mt-2">
            <a href="/login"><button className="bg-primary text-white p-1 rounded hover:bg-third">
              Get Started
            </button></a>
          </div>
        </div>
        <div className="w-50">
            <img src="" alt="" />
        </div>
      </main>
    );
};

export default Home;