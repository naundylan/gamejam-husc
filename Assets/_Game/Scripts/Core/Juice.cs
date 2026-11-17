using System.Collections;
using UnityEngine;

namespace Game.Core
{
    /// <summary>
    /// Static helper and components for Game Feel / Juice:
    /// - Juice.Shake(duration, magnitude)
    /// - Juice.HitStop(duration)
    /// Also contains DamageFlash and AutoDestroy components.
    /// </summary>
    public class Juice : MonoBehaviour
    {
        public static Juice Instance { get; private set; }

        private Vector3 originalCameraPos;
        private Camera targetCamera;
        private Coroutine shakeCoroutine;
        private Coroutine hitStopCoroutine;

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

            targetCamera = Camera.main;
            if (targetCamera != null)
            {
                originalCameraPos = targetCamera.transform.localPosition;
            }
        }

        public static void Shake(float duration = 0.15f, float magnitude = 0.2f)
        {
            if (Instance != null)
            {
                Instance.StartShake(duration, magnitude);
            }
        }

        public static void HitStop(float duration = 0.05f)
        {
            if (Instance != null)
            {
                Instance.StartHitStop(duration);
            }
        }

        public void StartShake(float duration, float magnitude)
        {
            if (targetCamera == null) targetCamera = Camera.main;
            if (targetCamera == null) return;

            if (shakeCoroutine != null) StopCoroutine(shakeCoroutine);
            shakeCoroutine = StartCoroutine(ShakeRoutine(duration, magnitude));
        }

        private IEnumerator ShakeRoutine(float duration, float magnitude)
        {
            Transform camTransform = targetCamera.transform;
            Vector3 basePos = camTransform.localPosition;
            float elapsed = 0f;

            while (elapsed < duration)
            {
                float x = Random.Range(-1f, 1f) * magnitude;
                float y = Random.Range(-1f, 1f) * magnitude;

                camTransform.localPosition = new Vector3(basePos.x + x, basePos.y + y, basePos.z);
                elapsed += Time.unscaledDeltaTime;
                yield return null;
            }

            camTransform.localPosition = basePos;
        }

        public void StartHitStop(float duration)
        {
            if (hitStopCoroutine != null) StopCoroutine(hitStopCoroutine);
            hitStopCoroutine = StartCoroutine(HitStopRoutine(duration));
        }

        private IEnumerator HitStopRoutine(float duration)
        {
            Time.timeScale = 0f;
            yield return new WaitForSecondsRealtime(duration);
            Time.timeScale = 1f;
        }
    }

    /// <summary>
    /// Attach to any GameObject with a SpriteRenderer to flash white/red when taking damage.
    /// </summary>
    public class DamageFlash : MonoBehaviour
    {
        [SerializeField] private SpriteRenderer spriteRenderer;
        [SerializeField] private Color flashColor = Color.white;
        [SerializeField] private float flashDuration = 0.08f;

        private Color originalColor;
        private Coroutine flashCoroutine;

        private void Awake()
        {
            if (spriteRenderer == null) spriteRenderer = GetComponent<SpriteRenderer>();
            if (spriteRenderer != null) originalColor = spriteRenderer.color;
        }

        public void Flash()
        {
            if (spriteRenderer == null) return;
            if (flashCoroutine != null) StopCoroutine(flashCoroutine);
            flashCoroutine = StartCoroutine(FlashRoutine());
        }

        private IEnumerator FlashRoutine()
        {
            spriteRenderer.color = flashColor;
            yield return new WaitForSeconds(flashDuration);
            spriteRenderer.color = originalColor;
        }
    }

    /// <summary>
    /// Attach to temporary GameObjects (bullets, particles, effects) to automatically destroy them.
    /// </summary>
    public class AutoDestroy : MonoBehaviour
    {
        [SerializeField] private float lifetime = 2f;

        private void Start()
        {
            Destroy(gameObject, lifetime);
        }
    }
}
