var reducer = require('../../src/reducers/filterTable');

describe('filterTable', () => {

	const state = '';
	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('SET_FILTER', () => {
		it('should set the filterTerm to state', () => {
				const newState = reducer(state, {type: 'SET_FILTER', parameter: {filterTerm: 'testing'}});

				expect(newState).to.equal('testing');
		});
	});
});
