import { useContext, useEffect, useState } from 'react'
import { EthProviderContext } from '../store/globalState'

export function Assets() {
    const { wallet, ethProvider } = useContext(EthProviderContext)
    const [balance, setBalance] = useState(0)
    const updateBalance = async () => {
        if (!wallet) return
        const balance = await ethProvider?.getBalance(wallet)
        setBalance(Number(balance))
    }
    useEffect(() => {
        updateBalance()
    }, [])
    return (
        <>
            {balance}
            <div>Send</div>
        </>
    )
}
