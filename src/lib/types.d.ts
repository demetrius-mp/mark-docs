export type AsyncReturnType<T> = ReturnType<T> extends Promise<infer U> ? U : T;
