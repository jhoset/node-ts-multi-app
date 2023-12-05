import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}
export interface Options {
    fileContent: string,
    fileDestination?: string,
    fileName?: string
}


export class SaveFile implements SaveFileUseCase {
    constructor(
        // DI: Example -> repository: Storage Repository

    ) {

    }

    execute({ fileContent, fileDestination = 'outputs', fileName = 'table' }: Options) {
        try {
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent, 'utf8')

            return true;
        } catch (e) {
            // console.error('Error, something went wrong Mkdir or WriteFile')
            return false;
        }


    }


}