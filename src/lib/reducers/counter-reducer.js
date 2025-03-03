import { COUNTER_ACTIONS } from '../constants/counter-actions';

export const initialState = {
	counter: 0,
	changes: 0,
	step: 1
};

export const counterReducer = (counterState, action) => {
	switch (action.type) {
		case COUNTER_ACTIONS.INCREMENT: {
			return {
				...counterState,
				counter: counterState.counter + counterState.step,
				changes: counterState.changes + 1
			};
		}

		case COUNTER_ACTIONS.DECREMENT: {
			return {
				...counterState,
				counter: counterState.counter - counterState.step,
				changes: counterState.changes + 1
			};
		}

		case COUNTER_ACTIONS.ADD_STEP: {
			return {
				...counterState,
				step: counterState.step + 1
			};
		}

		case COUNTER_ACTIONS.RESET: {
			return initialState;
		}

		case COUNTER_ACTIONS.NEW_VALUE: {
			return {
				...counterState,
				counter: action.payload
			};
		}
	}
};
