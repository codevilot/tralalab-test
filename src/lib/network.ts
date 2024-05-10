class Network {
    public get(chainId: string) {
        let chainInfo = {}
        switch (chainId) {
            case '0x12c':
                chainInfo = {
                    chainId: '0x12c',
                    chainName: 'zkSync Sepolia Testnet',
                    rpcUrls: ['https://sepolia.era.zksync.dev'],
                }
                break
            default:
                break
        }
        return chainInfo
    }
}

export const network = new Network()
