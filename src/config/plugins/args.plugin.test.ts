import { yarg } from './args.plugin'


const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./args.plugin')
    return yarg;
}

describe('Test args.plugin.ts', () => {


    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })


    test('Should return default values', async () => {
        // console.log(yarg)
        const argv = await runCommand(['-b', '5'])


        expect(argv).toEqual(expect.objectContaining(
            {
                b: 5,
                l: 10,
                s: false,
                n: 'multiplication-table',
                d: 'outputs/table',
            }
        ))
    })

    test('Should return configuration with custom values', async () => {
        const customOptions = {
            b: 8,
            l: 20,
            s: true,
            n: 'table-8',
            d: 'custom-outputs/folder-destination'
        }
        const argv = await runCommand([
            '-b', `${customOptions.b}`,
            '-l', `${customOptions.l}`,
            '-s', `${customOptions.s}`,
            '-n', `${customOptions.n}`,
            '-d', `${customOptions.d}`,
        ])

        expect(argv).toEqual(expect.objectContaining(customOptions))
    })
})