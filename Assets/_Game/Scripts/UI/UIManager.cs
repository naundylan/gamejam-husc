using UnityEngine;
using UnityEngine.UI;
using Game.Core;

namespace Game.UI
{
    /// <summary>
    /// Attach to Canvas GameObject.
    /// Updates HUD score, health, and displays the Game Over screen.
    /// Supports standard Unity UI Text and Sliders.
    /// </summary>
    public class UIManager : MonoBehaviour
    {
        public static UIManager Instance { get; private set; }

        [Header("HUD")]
        [SerializeField] private Text scoreText;
        [SerializeField] private Text healthText;
        [SerializeField] private Slider healthSlider;

        [Header("Game Over Screen")]
        [SerializeField] private GameObject gameOverPanel;
        [SerializeField] private Text finalScoreText;
        [SerializeField] private Text highScoreText;
        [SerializeField] private Button restartButton;

        private void Awake()
        {
            if (Instance == null) Instance = this;
            else Destroy(gameObject);

            if (restartButton != null)
            {
                restartButton.onClick.AddListener(() => GameManager.Instance?.RestartGame());
            }

            if (gameOverPanel != null)
            {
                gameOverPanel.SetActive(false);
            }
        }

        private void Start()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.OnScoreChanged += UpdateScoreDisplay;
                GameManager.Instance.OnStateChanged += HandleStateChanged;
                UpdateScoreDisplay(GameManager.Instance.CurrentScore);
            }

            // Find player health
            GameObject player = GameObject.FindGameObjectWithTag("Player");
            if (player != null)
            {
                var health = player.GetComponent<Game.Gameplay.Health>();
                if (health != null)
                {
                    health.OnHealthChanged += UpdateHealthDisplay;
                    UpdateHealthDisplay(health.CurrentHealth, health.MaxHealth);
                }
            }
        }

        private void UpdateScoreDisplay(int newScore)
        {
            if (scoreText != null)
            {
                scoreText.text = $"SCORE: {newScore}";
            }
        }

        private void UpdateHealthDisplay(int current, int max)
        {
            if (healthText != null)
            {
                healthText.text = $"HP: {current} / {max}";
            }

            if (healthSlider != null)
            {
                healthSlider.maxValue = max;
                healthSlider.value = current;
            }
        }

        private void HandleStateChanged(GameManager.GameState state)
        {
            if (state == GameManager.GameState.GameOver)
            {
                ShowGameOver();
            }
        }

        public void ShowGameOver()
        {
            if (gameOverPanel != null)
            {
                gameOverPanel.SetActive(true);
            }

            if (finalScoreText != null && GameManager.Instance != null)
            {
                finalScoreText.text = $"FINAL SCORE: {GameManager.Instance.CurrentScore}";
            }

            if (highScoreText != null && GameManager.Instance != null)
            {
                highScoreText.text = $"HIGH SCORE: {GameManager.Instance.HighScore}";
            }
        }

        private void OnDestroy()
        {
            if (GameManager.Instance != null)
            {
                GameManager.Instance.OnScoreChanged -= UpdateScoreDisplay;
                GameManager.Instance.OnStateChanged -= HandleStateChanged;
            }
        }
    }
}
