// process.argv = ['node', 'app.ts', '-b', '10']
// import './app'
import { ServerApp } from './presentation/server-app';

describe('App', () => {
    test('Should call server.run with values', async() => {

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-n', 'test',  '-d', 'test-destination', '-s']

        await import('./app')

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            name: 'test',
            destination: 'test-destination'
        })

    })
})