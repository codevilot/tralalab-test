import {
    ChangeEvent,
    KeyboardEvent,
    useContext,
    useEffect,
    useState,
} from 'react'
import { EthProviderContext } from '../store/globalState'
import { Button, Chip, Input } from '@mui/material'
import './Assets.css'
import { ethers } from 'ethers'
import { Wrapper } from '../components/Wrapper'
import { errorUtil } from '../lib/errorUtil'
import { metamask } from '../lib/metamask'
const INSUFFICIENT_BALANCE = 'insufficient balance for transfer'
const FAUCET_LINK = 'https://learnweb3.io/faucets/zksync_sepolia/'
export function Assets() {
    const { wallet, ethProvider, signer } = useContext(EthProviderContext)
    const [balance, setBalance] = useState(0)
    const [sendBalnce, setSendBalnce] = useState('')
    const [address, setAddress] = useState('')
    const [insufficient, setInsufficient] = useState(false)
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
        else setInsufficient(false)
    }
    const handleClick = () => window.open(FAUCET_LINK, '_blank')
    const sendDisabled =
        Number(sendBalnce) === 0 || !metamask.isAddress(address)
    const handleSend = async () => {
        if (sendDisabled) return
        try {
            const value = ethers.parseEther(sendBalnce)
            const estimatedGas = await signer?.estimateGas({
                to: address,
                value: ethers.parseEther(sendBalnce),
            })
            if (!estimatedGas) return
            return await signer?.sendTransaction({
                to: address,
                value: value,
                gasLimit: estimatedGas,
            })
        } catch (err) {
            const { error } = errorUtil.get(err)
            if (error.data.message === INSUFFICIENT_BALANCE) {
                setInsufficient(true)
                console.log('haha')
            }
        }
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
                    {insufficient && (
                        <Button onClick={handleClick}>
                            Insufficient balance. Please refill at the faucet.
                        </Button>
                    )}
                </div>
                <Chip
                    disabled={sendDisabled}
                    label="Send"
                    color="primary"
                    onClick={handleSend}
                    style={{ width: 100 }}
                />
            </div>
        </Wrapper>
    )
}
