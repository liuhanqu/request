export interface Option extends RequestInit {
    json?: object;
    params?: Record<string, string>;
    timeout?: number;
}
declare class Ajax {
    private response;
    constructor(url: string, option?: Option);
    private request;
    json(): Promise<any>;
    text(): Promise<string>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    arrayBuffer(): Promise<ArrayBuffer>;
}
declare type Func = {
    (url: string, option: Option): Ajax;
};
export interface RF {
    (url: string, option: Option): Ajax;
    get: Func;
    post: Func;
    delete: Func;
    put: Func;
    patch: Func;
}
declare const _default: RF;
export default _default;
