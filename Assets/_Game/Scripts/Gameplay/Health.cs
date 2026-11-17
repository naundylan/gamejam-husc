using System;
using UnityEngine;
using Game.Core;

namespace Game.Gameplay
{
    /// <summary>
    /// Attach to Player or Enemy GameObjects.
    /// Manages health, damage, healing, invulnerability frames, and death events.
    /// </summary>
    public class Health : MonoBehaviour
    {
        [Header("Health Settings")]
        [SerializeField] private int maxHealth = 3;
        [SerializeField] private float invulnerabilityDuration = 0.2f;

        [Header("Juice on Hit")]
        [SerializeField] private bool screenShakeOnDamage = false;
        [SerializeField] private AudioClip hitSound;
        [SerializeField] private AudioClip deathSound;
        [SerializeField] private GameObject deathEffectPrefab;

        public int CurrentHealth { get; private set; }
        public int MaxHealth => maxHealth;
        public bool IsDead => CurrentHealth <= 0;

        public event Action<int, int> OnHealthChanged; // (current, max)
        public event Action OnDamaged;
        public event Action OnDeath;

        private float lastDamageTime = -999f;
        private DamageFlash damageFlash;

        private void Awake()
        {
            CurrentHealth = maxHealth;
            damageFlash = GetComponent<DamageFlash>();
        }

        private void Start()
        {
            OnHealthChanged?.Invoke(CurrentHealth, maxHealth);
        }

        public void TakeDamage(int amount)
        {
            if (IsDead) return;
            if (Time.time < lastDamageTime + invulnerabilityDuration) return;

            lastDamageTime = Time.time;
            CurrentHealth = Mathf.Max(0, CurrentHealth - amount);

            OnHealthChanged?.Invoke(CurrentHealth, maxHealth);
            OnDamaged?.Invoke();

            // Juice
            if (damageFlash != null) damageFlash.Flash();
            if (hitSound != null && SoundManager.Instance != null)
            {
                SoundManager.Instance.PlaySFX(hitSound);
            }
            if (screenShakeOnDamage)
            {
                Juice.Shake(0.12f, 0.15f);
            }

            if (CurrentHealth <= 0)
            {
                Die();
            }
        }

        public void Heal(int amount)
        {
            if (IsDead) return;
            CurrentHealth = Mathf.Min(maxHealth, CurrentHealth + amount);
            OnHealthChanged?.Invoke(CurrentHealth, maxHealth);
        }

        private void Die()
        {
            OnDeath?.Invoke();

            if (deathSound != null && SoundManager.Instance != null)
            {
                SoundManager.Instance.PlaySFX(deathSound);
            }

            if (deathEffectPrefab != null)
            {
                Instantiate(deathEffectPrefab, transform.position, Quaternion.identity);
            }

            // If this is the player, trigger GameOver in GameManager
            if (CompareTag("Player"))
            {
                Juice.HitStop(0.15f);
                Juice.Shake(0.3f, 0.35f);
                GameManager.Instance?.TriggerGameOver();
            }

            Destroy(gameObject);
        }
    }
}
