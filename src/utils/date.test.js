import { getDateNow } from './date';

const dateNowOriginal = Date.now;
beforeAll(() => {
    Date.now = () => 1625320601995;
})

afterAll(() => {
    Date.now = dateNowOriginal;
})

describe('date', () => {
    it('should return current date in ms', () => {
        expect(getDateNow()).toBe(1625320601995);
    })
});

