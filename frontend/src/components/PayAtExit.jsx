import React, { useEffect } from 'react'
import { Web3Button, useContract, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import axios from 'axios';

const PayAtExit = ({ slot }) => {
    const { contract } = useContract(
        "0x797B56F1DB289DEf54b16f9A5A7a6E8bEF80b700"
      );

    const { mutateAsync } = useContractWrite(
        contract,
        "payAtExit"
      );

    useEffect(() => {
      console.log(slot)
    },[slot])

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

                axios.post("http://localhost:5000/bookParkingSlot", {
                  slot: slot,
                  parkingStatus: "unlocked"
                });
              }}
        >
            Pay At Exit
        </Web3Button>
        </div>
    </>
  )
}

export default PayAtExit
