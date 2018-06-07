// `const server = require('./server');
// const hbs = require('hbs');
const expect = require('expect');
const utils = require('./../utils/utils')

it('should add two numbers', () => {
    const res = utils.add(2, 5);
    const exp = 7
    expect(res).toBeA('number').toBe(exp, `Expected ${exp}, but got ${res}`);
});

it('should expect non-null values', () => {
    const res = 7;
    expect(res).toExist();
});

it('should verify first and last names are set', () => {
    const user = {
        age: 25,
        firstName: 'steven',
    };
    utils.setName(user, 'scuba steve');

    expect(user).toInclude({
        firstName: 'scuba',
        lastName: 'steve',
    }).toExclude({firstName: 'steven'});
});

it('should async add two numbers', (done) => {
    const expected = 5;
    utils.asyncAdd(2, 3, (sum) => {
        expect(sum).toBe(expected).toBeA('number');
        done();
    });
});

it('should async square a number', (done) => {
    utils.asyncSquare(5, (prod) => {
        expect(prod).toBeA('number').toBe(25);
        done();
    });
});