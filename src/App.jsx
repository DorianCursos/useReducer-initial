import Counter from './components/counter/Counter';
// import QuestionGame from './components/question-game/QuestionGame';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<div>
			<GlobalStyles />
			<Counter />
			{/* <QuestionGame /> */}
		</div>
	);
};

export default App;
