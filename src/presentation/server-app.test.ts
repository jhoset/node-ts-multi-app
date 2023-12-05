import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('Server App', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: true,
        name: 'test-filename',
        destination: 'test-destination',
    }

    test('Should create ServerApp instance', () => {
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run).toBe('function');

    })

    test('Should run ServerApp with default Options', () => {

        // const logSpy = jest.spyOn(console, 'log');
        // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');



        // ServerApp.run(options);


        // expect(logSpy).toHaveBeenCalledTimes(3);
        // expect(logSpy).toHaveBeenCalledWith('Server running...')
        // expect(logSpy).toHaveBeenCalledWith('File Created successfully')


        // expect( createTableSpy ).toHaveBeenCalledTimes(1);
        // expect (createTableSpy).toHaveBeenCalledWith({
        //     base: options.base,
        //     limit: options.limit
        // })

        // expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        // expect (saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String ),
        //     fileDestination: options.destination,
        //     fileName: options.name
        // })

    })

    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('TEST 0 x 0 = 0');
        const saveFileMock = jest.fn().mockReturnValue(true);


        console.log = logMock;
        console.error = logErrorMock
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;


        ServerApp.run(options)

        expect ( logMock ).toHaveBeenCalledWith('Server running...');
        expect ( createMock ).toHaveBeenCalledWith({"base": options.base, "limit": options.limit})
        expect ( saveFileMock ).toHaveBeenLastCalledWith({
            fileContent: 'TEST 0 x 0 = 0', 
            fileDestination: "test-destination", 
            fileName: "test-filename"
        });
        expect (logMock).toHaveBeenLastCalledWith('File Created successfully');
        expect ( logErrorMock ).not.toHaveBeenCalled();
    })
})