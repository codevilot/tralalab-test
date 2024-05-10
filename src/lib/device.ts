class Device {
    get isMobile() {
        const userAgent = navigator.userAgent.toLowerCase()
        const mobileKeywords = [
            'mobile',
            'android',
            'iphone',
            'ipad',
            'ipod',
            'blackberry',
            'windows phone',
        ]
        return mobileKeywords.some((keyword) => userAgent.includes(keyword))
    }
}

export const device = new Device()
