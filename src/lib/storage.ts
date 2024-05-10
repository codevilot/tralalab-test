export const stroageKey = {
    PROFILE: 'PROFILE',
} as const
class Storage {
    public get(key: string) {
        if (!window) return
        return window.localStorage.getItem(key)
    }

    public set(key: string, data: string) {
        if (!window) return
        return window.localStorage.setItem(key, data)
    }
    public getProfile() {
        return this.get(stroageKey.PROFILE) || ''
    }
    public setProfile(data: string) {
        console.log(data)
        return this.set(stroageKey.PROFILE, data)
    }
}

export const storage = new Storage()
