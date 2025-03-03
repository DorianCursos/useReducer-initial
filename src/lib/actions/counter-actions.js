import { COUNTER_ACTIONS } from '../constants/counter-actions';

export const actionIncrement = () => {
	return { type: COUNTER_ACTIONS.INCREMENT };
};

export const actionDecrement = () => {
	return { type: COUNTER_ACTIONS.DECREMENT };
};

export const actionAddStep = () => {
	return { type: COUNTER_ACTIONS.ADD_STEP };
};

export const actionReset = () => {
	return { type: COUNTER_ACTIONS.RESET };
};

export const actionNewValue = newValue => {
	return { type: COUNTER_ACTIONS.NEW_VALUE, payload: newValue };
};
