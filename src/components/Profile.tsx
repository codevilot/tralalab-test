import { Avatar } from '@mui/material'
import { ChangeEvent, useRef, useState } from 'react'
import { storage } from '../lib/storage'

export function Profile() {
    const selectFile = useRef<HTMLInputElement>(null)
    const [src, setSrc] = useState(storage.getProfile())
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        const file = files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            if (reader.result === null) return
            const base64String = reader.result.toString()
            setSrc(base64String)
            storage.setProfile(base64String)
        }
        reader.readAsDataURL(file)
    }
    const handleClick = () => {
        if (selectFile.current === null) return
        selectFile.current.click()
    }
    return (
        <div>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={selectFile}
                onChange={handleOnChange}
            />
            <Avatar src={src} onClick={handleClick} />
        </div>
    )
}
