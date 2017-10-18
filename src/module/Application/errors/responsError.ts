export class ResponseError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ResponseError.prototype);
    }

    public getMessage() {
        return this.message;
    }
}