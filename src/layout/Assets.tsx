import {
    ChangeEvent,
    KeyboardEvent,
    useContext,
    useEffect,
    useState,
} from 'react'
import { EthProviderContext } from '../store/globalState'
import { Chip, Input } from '@mui/material'
import './Assets.css'
import { ethers } from 'ethers'
import { Wrapper } from '../components/Wrapper'

const DEFAULT_ADD = '0xc7040F5c10823671CF5Aee64C8BBD4eAC6Bc8bA8'
export function Assets() {
    const { wallet, ethProvider, signer } = useContext(EthProviderContext)
    const [balance, setBalance] = useState(0)
    const [sendBalnce, setSendBalnce] = useState('')
    const [address, setAddress] = useState(DEFAULT_ADD)
    const updateBalance = async () => {
        if (!wallet) return
        const balance = await ethProvider?.getBalance(wallet)
        setBalance(Number(balance))
    }
    const handleWallet = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }
    const handleBalance = (e: ChangeEvent<HTMLInputElement>) => {
        setSendBalnce(e.target.value.toString().replace(/[^0-9.]|(\.)\1+/g, ''))
    }
    const handleRegex = (e: KeyboardEvent<HTMLInputElement>) => {
        if (sendBalnce.includes('.') && e.key === '.') e.preventDefault()
    }
    const handleSend = async () => {
        signer?.sendTransaction({
            to: address,
            value: ethers.parseEther(sendBalnce),
            gasLimit: 1,
        })
    }
    useEffect(() => {
        updateBalance()
    }, [])
    return (
        <Wrapper>
            <div className="container">
                <div className="balance_title">Current Balance</div>
                <div className="balance_number">{balance}</div>
                <div className="send_address">
                    <div className="send_address_title">Wallet Address</div>
                    <Input
                        aria-label="wallet address"
                        placeholder="Type wallet address"
                        onChange={handleWallet}
                        value={address}
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="send_address">
                    <div className="send_address_title">Send Balance</div>
                    <Input
                        aria-label="Send balance"
                        placeholder="Type send balance"
                        onKeyDown={handleRegex}
                        onKeyUp={handleRegex}
                        onChange={handleBalance}
                        value={sendBalnce}
                        style={{ width: '100%' }}
                        data-testid="send-balance"
                    />
                </div>
                <Chip
                    label="Send"
                    onClick={handleSend}
                    style={{ width: 100 }}
                />
            </div>
        </Wrapper>
    )
}
