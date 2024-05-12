import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import { Assets } from '../layout/Assets'
describe('balance 입력 테스트', () => {
    test('balance 숫자와 .만 입력 테스트', async () => {
        const { getByTestId } = render(<Assets />)
        const inputField = getByTestId('send-balance').querySelector(
            'input'
        ) as HTMLInputElement
        fireEvent.change(inputField, { target: { value: '123a' } })
        expect(inputField.value).toBe('123')
    })

    test('소숫점이 한 개만 입력이 되었는지', async () => {
        const { getByTestId } = render(<Assets />)
        const inputField = getByTestId('send-balance').querySelector(
            'input'
        ) as HTMLInputElement
        fireEvent.change(inputField, { target: { value: '0.123' } })
        fireEvent.keyDown(inputField, { key: '.' })
        expect(inputField.value).toBe('0.123')
    })
})
