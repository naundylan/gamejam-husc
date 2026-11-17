using UnityEngine;
using Game.Core;

namespace Game.Gameplay
{
    /// <summary>
    /// Attach to Bullets, Hazards, or Enemies.
    /// Deals damage to any object with a Health component that matches targetTag.
    /// </summary>
    public class DamageOnTrigger : MonoBehaviour
    {
        [Header("Damage")]
        [SerializeField] private int damageAmount = 1;
        [SerializeField] private string targetTag = "Enemy";
        [SerializeField] private bool destroySelfOnHit = true;

        [Header("Juice & Effects")]
        [SerializeField] private bool triggerHitStop = false;
        [SerializeField] private GameObject hitEffectPrefab;
        [SerializeField] private AudioClip hitSound;

        private void OnTriggerEnter2D(Collider2D collision)
        {
            if (!string.IsNullOrEmpty(targetTag) && !collision.CompareTag(targetTag))
            {
                return;
            }

            Health health = collision.GetComponent<Health>();
            if (health != null && !health.IsDead)
            {
                health.TakeDamage(damageAmount);

                if (triggerHitStop)
                {
                    Juice.HitStop(0.04f);
                }

                if (hitSound != null && SoundManager.Instance != null)
                {
                    SoundManager.Instance.PlaySFX(hitSound);
                }

                if (hitEffectPrefab != null)
                {
                    Instantiate(hitEffectPrefab, transform.position, Quaternion.identity);
                }

                if (destroySelfOnHit)
                {
                    Destroy(gameObject);
                }
            }
        }
    }
}
