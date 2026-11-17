using System;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Game.Core
{
    /// <summary>
    /// Attach this script to an empty GameObject named "_GameManager" in the scene.
    /// Handles Game State (Start, Playing, GameOver, Victory), Score, and Instant Restart (Key R).
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        public enum GameState
        {
            Menu,
            Playing,
            GameOver,
            Victory
        }

        [Header("State")]
        [SerializeField] private GameState currentState = GameState.Playing;
        public GameState CurrentState => currentState;

        [Header("Score")]
        [SerializeField] private int currentScore = 0;
        public int CurrentScore => currentScore;
        public int HighScore { get; private set; }

        // Events
        public event Action<GameState> OnStateChanged;
        public event Action<int> OnScoreChanged;

        private const string HighScoreKey = "JAM_GAME_HIGH_SCORE";

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
            }
            else
            {
                Destroy(gameObject);
                return;
            }

            HighScore = PlayerPrefs.GetInt(HighScoreKey, 0);
        }

        private void Start()
        {
            ChangeState(GameState.Playing);
        }

        private void Update()
        {
            // Instant restart when GameOver or Victory
            if ((currentState == GameState.GameOver || currentState == GameState.Victory) && Input.GetKeyDown(KeyCode.R))
            {
                RestartGame();
            }
        }

        public void ChangeState(GameState newState)
        {
            currentState = newState;
            OnStateChanged?.Invoke(currentState);

            if (currentState == GameState.GameOver || currentState == GameState.Victory)
            {
                if (currentScore > HighScore)
                {
                    HighScore = currentScore;
                    PlayerPrefs.SetInt(HighScoreKey, HighScore);
                    PlayerPrefs.Save();
                }
            }
        }

        public void AddScore(int points)
        {
            if (currentState != GameState.Playing) return;

            currentScore += points;
            OnScoreChanged?.Invoke(currentScore);
        }

        public void TriggerGameOver()
        {
            ChangeState(GameState.GameOver);
        }

        public void TriggerVictory()
        {
            ChangeState(GameState.Victory);
        }

        public void RestartGame()
        {
            Time.timeScale = 1f;
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
    }
}
