import { render, screen } from '@testing-library/react'
import App from './App'
// import { ERROR_MESSAGE } from './components/ErrorAlert'

describe('지갑 연동 테스트', () => {
    /**
     * 메타마스크가 설치가 안된 경우
     */
    test('시작 - 지갑 유무 확인 - 지갑이 없는 경우', async () => {
        window.ethereum = undefined
        render(<App />)
        expect(await screen.findByText(/NEED METAMASK:/)).toBeInTheDocument()
    })
    /**
     * 메타마스크가 설치가 된 경우  - 아직 로그인이 안된 경우
     */
    test('시작 - 지갑 유무 확인 - 지갑이 있는 경우 - 메타 마스크 연결을 안한 경우', async () => {
        window.ethereum = {}
        render(<App />)
        expect(
            await screen.findByText(
                /Check if there is a Metamask connection request/
            )
        ).toBeInTheDocument()
    })
})
