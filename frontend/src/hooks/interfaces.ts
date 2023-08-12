export interface FetchResponse<T> {
    data: T | null
    isLoading: boolean
    error: string
    status: number | null
}