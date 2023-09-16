import React, { useEffect, useState } from "react";
import {
  ConnectWallet,
  useContract,
  useContractRead
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import axios from "axios";

import metamaskLogo from "../assets/metamask.png";
import thirdwebLogo from "../assets/thirdweb.png";
import PayAtEntry from "./PayAtEntry";
import PayAtExit from "./PayAtExit";

const Home = () => {

  const { contract } = useContract(
    "0x797B56F1DB289DEf54b16f9A5A7a6E8bEF80b700"
  );

  const [balance, setBalance] = useState(0);

  const { data } = useContractRead(contract, "getBalanceOfSmartContract");

  const [slotValue, setSlotValue] = useState("");
  const [parkings, setParkings] = useState([]);

  const getParkings = () => {
    axios.get("http://localhost:5000/getParkingDetails")
    .then((res) => {
      console.log(res.data);
      setParkings(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getParkings();
  },[])

  const getContractBalance = () => {
    const hexBalance = data._hex;
    const balanceInWei = parseInt(hexBalance, 16);
    setBalance(balanceInWei);
  }

  return (
    <>
      <div>
        <div className="flex justify-between bg-black bg-opacity-75 backdrop-blur-sm shadow-2xl p-3">
          <div>
            <img
              className="w-16 rounded-md"
              src={metamaskLogo}
              alt="metamaskLogo"
            />
          </div>
          <div>
            <h2 className="text-white font-semibold mt-4 text-center text-2xl">
              Secure Park
            </h2>
          </div>
          <div>
            <p className="text-white font-semibold mt-4 text-2xl hover:cursor-pointer hover:scale-110 transition duration-500" onClick={getContractBalance}>Contract Balance: {balance.toString()[0]}.{balance.toString()[1]|| 0} ETH</p>
          </div>
          <div>
            <ConnectWallet className="max-w-md mt-3 shadow-2xl" />
          </div>
          <div>
            <img
              className="w-20 rounded-md"
              src={thirdwebLogo}
              alt="thirdwebLogo"
            />
          </div>
        </div>
          <div className="flex justify-between p-5">
            <div className="backdrop-blur-sm">
            <PayAtEntry slot={slotValue} />
            </div>
            <div className="backdrop-blur-sm">
            <PayAtExit slot={slotValue} />
            </div>
          </div>
          <div className="flex flex-col space-y-20">
            <form className="w-96 m-auto">
              <input className="w-96 border border-gray-400 p-3 mt-10 font-semibold" type="text" placeholder="Enter a slot to book/unlock your parking" value={slotValue} onChange={(e) => setSlotValue(e.target.value)} />
            </form>
            <div>
              <h5 className="mt-10 mb-10 text-3xl text-white text-center font-semibold">Parkings</h5>
              {
                parkings?.map((parking) => {
                  return (
                    <div className="mt-5 mb-3 flex bg-white justify-center items-center max-w-xl m-auto font-semibold text-gray-700 rounded-md border border-gray-400 p-10">
                      <p className="mr-10">{parking.slot}</p>
                      <p className="mr-10"> | </p>
                      <p className="mr-10">{parking.amount}</p>
                      <p className="mr-10"> | </p>
                      <p className="mr-10">{parking.parkingStatus}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
    </>
  );
};

export default Home;
