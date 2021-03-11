import request from 'supertest';
import app from '../../app';
import Controllers from '../../controllers';
import { mocked } from 'ts-jest/utils';

jest.mock('../../controllers')
jest.mock('../../utils')

describe('test GET /simList', () => {
    it('should GET /simList successfully', async(done) => {
        const mockGetData = mocked(Controllers.getData)

        const res = await request(app).get('/api/simList')
        
        // The mock function is called once
        expect(mockGetData.mock.calls.length).toBe(1)
        expect(res.status).toBe(200)
        done()
    })
});

// describe('test POST /generateSimulations', () => {
//     it('should POST /generateSimulations successfully', async(done) => {
//         const mockCreateSimulations = mocked(Controllers.createSimulations)
//         const mockedSliceString = mocked(utils.sliceString)

//         const res = await request(app)
//             .post('/api/generateSimulations')
//             .send(postBody)

//         // createSimulations function is called once
//         expect(mockCreateSimulations.mock.calls.length).toBe(1)

//         // sliceString function is called once
//         expect(mockedSliceString.mock.calls.length).toBe(1)
//         console.log(res.body);
//         expect(res.status).toBe(200)
//         done()
//     })
// })
