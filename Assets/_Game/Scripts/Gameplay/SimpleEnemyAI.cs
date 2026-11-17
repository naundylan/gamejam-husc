using UnityEngine;
using Game.Core;

namespace Game.Gameplay
{
    /// <summary>
    /// Attach to Enemy prefabs.
    /// Requires Rigidbody2D and Collider2D.
    /// Simple chase behavior towards Player, rewards points to GameManager on death.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    public class SimpleEnemyAI : MonoBehaviour
    {
        [Header("Movement")]
        [SerializeField] private float moveSpeed = 2.5f;

        [Header("Score Reward")]
        [SerializeField] private int scoreReward = 10;

        private Transform playerTransform;
        private Rigidbody2D rb;
        private Health health;

        private void Awake()
        {
            rb = GetComponent<Rigidbody2D>();
            rb.gravityScale = 0f;
            rb.freezeRotation = true;
            health = GetComponent<Health>();
        }

        private void Start()
        {
            GameObject player = GameObject.FindGameObjectWithTag("Player");
            if (player != null)
            {
                playerTransform = player.transform;
            }

            if (health != null)
            {
                health.OnDeath += HandleDeath;
            }
        }

        private void FixedUpdate()
        {
            if (GameManager.Instance != null && GameManager.Instance.CurrentState != GameManager.GameState.Playing)
            {
                rb.linearVelocity = Vector2.zero;
                return;
            }

            if (playerTransform != null)
            {
                Vector2 dir = (playerTransform.position - transform.position).normalized;
                rb.linearVelocity = dir * moveSpeed;

                // Flip sprite horizontally
                if (dir.x != 0)
                {
                    transform.localScale = new Vector3(Mathf.Sign(dir.x), 1f, 1f);
                }
            }
        }

        private void HandleDeath()
        {
            GameManager.Instance?.AddScore(scoreReward);
        }

        private void OnDestroy()
        {
            if (health != null)
            {
                health.OnDeath -= HandleDeath;
            }
        }
    }
}
