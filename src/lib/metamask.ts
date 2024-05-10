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
            await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
        } catch (err) {
            console.log(err)
        }
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
                console.log('This network is not found in your network!')
            } else {
                console.error('Failed to switch this network')
            }
        }
    }
}

export const metamask = new Metamask()
