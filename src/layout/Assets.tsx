import { useContext, useEffect, useState } from 'react'
import { EthProviderContext } from '../store/globalState'
import { ethers } from 'ethers'

export function Assets() {
    const { wallet, ethProvider, signer } = useContext(EthProviderContext)
    const [balance, setBalance] = useState(0)
    const updateBalance = async () => {
        if (!wallet) return
        const balance = await ethProvider?.getBalance(wallet)
        setBalance(Number(balance))
    }
    const handleSend = async () => {
        signer?.sendTransaction({
            to: '',
            value: ethers.parseEther(''),
        })
    }
    useEffect(() => {
        updateBalance()
    }, [])
    return (
        <>
            {balance}
            <div onClick={handleSend}>Send</div>
        </>
    )
}
