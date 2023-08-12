import { useEffect, useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [value, setValue] = useState<T>(() => {
       const jsonVal = localStorage.getItem(key)
       if (jsonVal !== null) return JSON.parse(jsonVal)

       return initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])


    return [value, setValue] as const
}