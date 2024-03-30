import { SET_FILTER } from './const';

export default (parameter) => {
	return { type: SET_FILTER, parameter };
}
