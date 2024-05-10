import { useEffect } from 'react'

export const useListener = (
    event: string,
    cb: EventListenerOrEventListenerObject
) => {
    useEffect(() => {
        window.addEventListener(event, cb)
        return () => window.removeEventListener(event, cb)
    }, [event, cb])
}
