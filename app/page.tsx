"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("1부터 100 사이의 숫자를 맞춰보세요!");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [shake, setShake] = useState(false);

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setMessage("1부터 100 사이의 유효한 숫자를 입력해주세요!");
      setShake(true);
      return;
    }

    setAttempts((prev) => prev + 1);

    if (guessNum === targetNumber) {
      setMessage(`🎉 축하합니다! ${attempts + 1}번 만에 맞추셨어요!`);
      setGameOver(true);
    } else if (guessNum < targetNumber) {
      setMessage("↗️ 더 큰 숫자입니다!");
    } else {
      setMessage("↙️ 더 작은 숫자입니다!");
    }
    setGuess("");
  };

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  const resetGame = () => {
    window.location.reload();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameOver) {
      handleGuess();
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>숫자 맞추기 게임</h1>
        <div className={`${styles.gameContainer} ${shake ? styles.shake : ""}`}>
          <p className={styles.message}>{message}</p>
          <div className={styles.inputContainer}>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={gameOver}
              placeholder="숫자를 입력하세요"
              className={styles.input}
              min="1"
              max="100"
            />
            {!gameOver ? (
              <button onClick={handleGuess} className={styles.button}>
                확인
              </button>
            ) : (
              <button onClick={resetGame} className={styles.button}>
                다시하기
              </button>
            )}
          </div>
          <p className={styles.attempts}>시도 횟수: {attempts}</p>
        </div>
      </main>
    </div>
  );
}
