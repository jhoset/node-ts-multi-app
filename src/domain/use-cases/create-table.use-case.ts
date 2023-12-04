export interface CreateTableUseCase {
    execute: ( options: CreateTableOptions ) => string,
}

export interface CreateTableOptions {
    base: number,
    limit?: number,
}


export class CreateTable implements CreateTableUseCase {
    constructor(
                /**
         * DI - Dependency Injection
         *  */
    ) {}

    execute( {base, limit = 10}: CreateTableOptions) {
        let tableResultOutput = ''
        for (let i = 1; i <= limit; i++) {
            tableResultOutput += `${base} x ${i} = ${ i * base} \n`
        }
        return tableResultOutput;
    }
}