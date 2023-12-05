import { SaveFile } from './save-file.use-case'
import fs from 'fs'

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: '2 x 1 = 2 and more (test content)',
        fileDestination: 'custom-outputs/folder-destination',
        fileName: 'custom-table-name'
    }
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;


    afterEach(() => {
        if (fs.existsSync('outputs')) {
            fs.rmSync('outputs', { recursive: true })
        }
        if (fs.existsSync(customOptions.fileDestination)) {
            fs.rmSync(customOptions.fileDestination.split('/')[0], { recursive: true })
        }
    })

    test('should save file with default optional values ', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: '2 x 1 = 2 and more (test content)'
        }

        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf8');



        expect(result).toBe(true);
        expect(checkFile).toBe(true); // OJO
        expect(fileContent).toBe(options.fileContent);

    })

    test('should save file with custom values', () => {

        const saveFileInstance = new SaveFile();

        const result = saveFileInstance.execute(customOptions);
        const checkFile = fs.existsSync(customOptions.fileDestination)
        const fileContent = fs.readFileSync(customFilePath, 'utf8');

        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent)
    })

    test('Should return false if Directory could not have been created', () => {
        const saveFileInstance = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {
                throw new Error('This is a custom error message from test') 
            }
        )
        const result = saveFileInstance.execute(customOptions);

        expect(result).toBe(false)

        mkdirSpy.mockRestore();
    })

    
    test('Should return false if File could not have been created', () => {
        const saveFileInstance = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {
                throw new Error('This is a custom error message from test')
            }
        )
        const result = saveFileInstance.execute({fileContent: 'Hola'});

        expect(result).toBe(false)
        writeFileSpy.mockRestore();
    })
})