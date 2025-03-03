import { useReducer } from 'react';
import {
	actionAddStep,
	actionDecrement,
	actionIncrement,
	actionNewValue,
	actionReset
} from '../../lib/actions/counter-actions';
import {
	counterReducer,
	initialState
} from '../../lib/reducers/counter-reducer';

const Counter = () => {
	const [counterState, dispatch] = useReducer(counterReducer, initialState);

	return (
		<div>
			<h1>Counter: {counterState.counter}</h1>
			<p>Changes: {counterState.changes}</p>
			<p>Step: {counterState.step}</p>
			<button onClick={() => dispatch(actionIncrement())}>+</button>
			<button onClick={() => dispatch(actionDecrement())}>-</button>
			<button onClick={() => dispatch(actionAddStep())}>Step + 1</button>
			<button onClick={() => dispatch(actionReset())}>RESET</button>
			<input
				type='number'
				onChange={event => dispatch(actionNewValue(Number(event.target.value)))}
			/>
		</div>
	);
};

export default Counter;
