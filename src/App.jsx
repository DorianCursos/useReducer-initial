import Button from './components/button/Button';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<div>
			<GlobalStyles />
			<h1>Curso de React</h1>
			<Button color='steelblue'>Click Me!</Button>
			<Button color='#f0f'>Click Me!</Button>
		</div>
	);
};

export default App;
