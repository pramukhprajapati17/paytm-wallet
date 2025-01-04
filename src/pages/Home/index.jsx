import React from 'react';
import Lottie from 'lottie-react';
import LottieAnimation from '../../../public/lwallet.json';
import Nav from '../../components/Nav';

const Home = () => {
    return (
      <div><Nav />
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
            <a href="/login"><button className="bg-primary text-white p-1 rounded bg-third">
              Get Started
            </button></a>
          </div>
        </div>
        <div className="w-50 flex justify-center items-center">
            <Lottie animationData={LottieAnimation} className='w-50'/>
        </div>
      </main>
      </div>
    );
};

export default Home;