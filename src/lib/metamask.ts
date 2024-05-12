import { ethers } from 'ethers'
import { network } from './network'

type metamaskError = {
    code: number
    message: string
    stack: string
}

const DEFAULT_CHAIN_ID = '0x12c'

class Metamask {
    public get isMetamaskInstalled() {
        return window.ethereum
    }

    public async connect() {
        try {
            const [wallet] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider?.getSigner()
            return { wallet, provider, signer }
        } catch (err) {
            throw Error('metamask connect is failed')
        }
    }
    public isAddress(address: string) {
        return ethers.isAddress(address)
    }
    public async addNetwork(chainId?: string) {
        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [network.get(chainId || DEFAULT_CHAIN_ID)],
            })
        } catch (err) {
            console.error(err)
        }
    }

    public async switch(chainId?: string) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId || DEFAULT_CHAIN_ID }],
            })
        } catch (e) {
            const err = e as metamaskError
            if (err.code === 4902) {
                await this.addNetwork(chainId || DEFAULT_CHAIN_ID)
                throw Error('This network is not found in your network!')
            } else {
                throw Error('Failed to switch this network')
            }
        }
    }
    public async send() {}
}

export const metamask = new Metamask()
