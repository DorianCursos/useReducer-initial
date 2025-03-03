import { useEffect, useState } from 'react';

// Base de preguntas
const questions = [
	{
		question: '¿Cuál es la capital de Francia?',
		options: ['Madrid', 'Londres', 'París', 'Roma'],
		correctAnswer: 2, // París
		hint: 'Es conocida como la Ciudad del Amor'
	},
	{
		question: '¿Cuántos planetas tiene nuestro sistema solar?',
		options: ['7', '8', '9', '10'],
		correctAnswer: 1, // 8
		hint: 'Plutón ya no se considera un planeta'
	},
	{
		question: '¿Cuál es el océano más grande?',
		options: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
		correctAnswer: 3, // Pacífico
		hint: 'Cubre aproximadamente un tercio de la superficie de la Tierra'
	}
];

const QuestionGame = () => {
	// Estados del juego
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [livesRemaining, setLivesRemaining] = useState(3);
	const [timeRemaining, setTimeRemaining] = useState(30);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isTimerRunning, setIsTimerRunning] = useState(true);
	const [streakCount, setStreakCount] = useState(0);
	const [hasHint, setHasHint] = useState(true);
	const [isHintUsed, setIsHintUsed] = useState(false);
	const [gameMessage, setGameMessage] = useState('');

	// Función para manejar cuando se acaba el tiempo
	const handleTimeUp = () => {
		setLivesRemaining(livesRemaining - 1);
		setStreakCount(0);
		setGameMessage('¡Se acabó el tiempo!');

		if (livesRemaining - 1 <= 0) {
			endGame();
		} else {
			moveToNextQuestion();
		}
	};

	// Manejar el temporizador
	useEffect(() => {
		let timer;
		if (isTimerRunning && !isGameOver && timeRemaining > 0) {
			timer = setTimeout(() => {
				setTimeRemaining(timeRemaining - 1);
			}, 1000);
		} else if (timeRemaining === 0 && !isGameOver) {
			handleTimeUp();
		}

		return () => clearTimeout(timer);
	}, [timeRemaining, isTimerRunning, isGameOver, handleTimeUp]);

	// Función para manejar la respuesta del usuario
	const handleAnswer = selectedOption => {
		const currentQuestionData = questions[currentQuestion];

		// Detener el temporizador
		setIsTimerRunning(false);

		if (selectedOption === currentQuestionData.correctAnswer) {
			// Respuesta correcta
			const newStreakCount = streakCount + 1;
			setStreakCount(newStreakCount);

			// Calcular puntos (más puntos para respuestas rápidas y por racha)
			let pointsEarned = 10;

			// Bonus por tiempo restante
			if (timeRemaining > 20) pointsEarned += 5;
			else if (timeRemaining > 10) pointsEarned += 3;

			// Bonus por racha
			if (newStreakCount >= 3) pointsEarned *= 2;

			// Penalización si se usó pista
			if (isHintUsed) pointsEarned = Math.floor(pointsEarned / 2);

			setScore(score + pointsEarned);
			setGameMessage(`¡Correcto! +${pointsEarned} puntos`);
		} else {
			// Respuesta incorrecta
			setLivesRemaining(livesRemaining - 1);
			setStreakCount(0);
			setGameMessage(
				`Incorrecto. La respuesta correcta era: ${currentQuestionData.options[currentQuestionData.correctAnswer]}`
			);

			if (livesRemaining - 1 <= 0) {
				endGame();
				return;
			}
		}

		// Si no se ha terminado el juego, pasar a la siguiente pregunta
		setTimeout(() => {
			moveToNextQuestion();
		}, 2000);
	};

	// Función para pasar a la siguiente pregunta
	const moveToNextQuestion = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setTimeRemaining(30);
			setIsTimerRunning(true);
			setIsHintUsed(false);
			setGameMessage('');
		} else {
			endGame();
		}
	};

	// Función para usar una pista
	const useHint = () => {
		if (hasHint && !isHintUsed) {
			setHasHint(false);
			setIsHintUsed(true);
			setGameMessage(`Pista: ${questions[currentQuestion].hint}`);
		}
	};

	// Función para terminar el juego
	const endGame = () => {
		setIsGameOver(true);
		setIsTimerRunning(false);

		if (livesRemaining <= 0) {
			setGameMessage('¡Juego terminado! Te quedaste sin vidas.');
		} else {
			setGameMessage(`¡Juego completado! Puntuación final: ${score}`);
		}
	};

	// Función para reiniciar el juego
	const restartGame = () => {
		setCurrentQuestion(0);
		setScore(0);
		setLivesRemaining(3);
		setTimeRemaining(30);
		setIsGameOver(false);
		setIsTimerRunning(true);
		setStreakCount(0);
		setHasHint(true);
		setIsHintUsed(false);
		setGameMessage('');
	};

	return (
		<div className='trivia-game'>
			<h1>Juego de Trivia</h1>

			{!isGameOver ? (
				<>
					<div className='game-info'>
						<p>
							Pregunta: {currentQuestion + 1}/{questions.length}
						</p>
						<p>Puntuación: {score}</p>
						<p>Vidas: {'❤️'.repeat(livesRemaining)}</p>
						<p>Tiempo: {timeRemaining} segundos</p>
						<p>Racha: {streakCount}</p>
					</div>

					<div className='question-container'>
						<h2>{questions[currentQuestion].question}</h2>

						<div className='options'>
							{questions[currentQuestion].options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleAnswer(index)}
									disabled={!isTimerRunning}
								>
									{option}
								</button>
							))}
						</div>

						<button onClick={useHint} disabled={!hasHint || isHintUsed}>
							Usar Pista
						</button>
					</div>
				</>
			) : (
				<div className='game-over'>
					<h2>Juego Terminado</h2>
					<p>Puntuación final: {score}</p>
					<button onClick={restartGame}>Jugar de nuevo</button>
				</div>
			)}

			{gameMessage && <div className='game-message'>{gameMessage}</div>}
		</div>
	);
};

export default QuestionGame;
