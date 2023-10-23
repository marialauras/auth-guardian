export interface HttpResponse<T> {
    statusCode: number
    body: T | string
}

export interface HttpRequest<B> {
    params?: string
    body?: B
    headers?: string
}
