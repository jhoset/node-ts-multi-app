import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {
    test('Should create table with default optional parameters values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2 })
        const rows = table.split('\n').length;

        // console.log(table)

        expect(createTable).toBeInstanceOf(CreateTable)
        expect(table).toContain('2 x 1 = 2')
        expect(table).toContain('2 x 10 = 20')
        expect(rows).toBe(10);
    })

    test('Should create table with custom values', () => {
        const options = {
            base: 3,
            limit: 20
        }
        const createTableInstance = new CreateTable();
        const table = createTableInstance.execute(options);
        const rows = table.split('\n').length;
        // console.log(table)

        expect(createTableInstance).toBeInstanceOf(CreateTable);
        expect(rows).toBe(20);    

    })
})