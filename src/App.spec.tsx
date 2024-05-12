import { render, screen } from '@testing-library/react'
import App from './App'
// import { ERROR_MESSAGE } from './components/ErrorAlert'

describe('지갑 연동 테스트', () => {
    test('시작 - 지갑 유무 확인 - 지갑이 없는 경우', async () => {
        window.ethereum = undefined
        render(<App />)
        expect(await screen.findByText(/NEED METAMASK:/)).toBeInTheDocument()
    })
})
