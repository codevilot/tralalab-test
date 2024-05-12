import { Container } from '@mui/material'
import { ReactNode } from 'react'

export function Wrapper(props: { children: ReactNode }) {
    return (
        <Container maxWidth="xl" style={{ paddingTop: 20 }}>
            {props.children}
        </Container>
    )
}
