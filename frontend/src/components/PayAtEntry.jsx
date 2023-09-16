import React, { useState, useEffect } from 'react'
import { Web3Button, useContract ,useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import axios from "axios";

const PayAtEntry = ({ slot }) => {
    const { contract } = useContract(
        "0x797B56F1DB289DEf54b16f9A5A7a6E8bEF80b700"
      );

    const { mutateAsync } = useContractWrite(
        contract,
        "payAtEntrance"
      );

    useEffect(() => {
      console.log(slot);
    }, [slot]);

    const [fromAddress, setFromAddress] = useState("");
    const [toAddress, setToAddress] = useState("");

  return (
    <>
        <div>
        <Web3Button
              className="transition delay-150 bg-gray-700 text-white font-semibold rounded-md shadow-2xl hover:bg-gray-600 duration-500 hover:scale-110"
              contractAddress="0x797B56F1DB289DEf54b16f9A5A7a6E8bEF80b700"
              action={async () => {
                const data = await mutateAsync([
                  {
                    value: ethers.utils.parseEther("0.005"),
                  },
                ]);

                console.log(data);
                setFromAddress(data.receipt.from);
                setToAddress(data.receipt.to);

                axios.post("http://localhost:5000/bookParkingSlot", {
                  slot: slot,
                  parkingStatus: "booked"
                });
              }}
        >
            Pay At Entrance
        </Web3Button>
        </div>
    </>
  )
}

export default PayAtEntry
