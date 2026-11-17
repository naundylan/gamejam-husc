using System.Collections;
using UnityEngine;
using Game.Core;

namespace Game.Gameplay
{
    /// <summary>
    /// Attach to the Player GameObject.
    /// Requires Rigidbody2D and Collider2D.
    /// Handles 8-direction WASD movement, mouse aiming, shooting, and dash.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    public class TopDownPlayerController : MonoBehaviour
    {
        [Header("Movement")]
        [SerializeField] private float moveSpeed = 5f;
        [SerializeField] private bool rotateTowardsMouse = true;

        [Header("Dash")]
        [SerializeField] private bool enableDash = true;
        [SerializeField] private float dashSpeed = 14f;
        [SerializeField] private float dashDuration = 0.15f;
        [SerializeField] private float dashCooldown = 0.8f;
        [SerializeField] private AudioClip dashSound;

        [Header("Shooting")]
        [SerializeField] private bool enableShooting = true;
        [SerializeField] private GameObject bulletPrefab;
        [SerializeField] private Transform firePoint;
        [SerializeField] private float bulletSpeed = 12f;
        [SerializeField] private float fireRate = 0.2f;
        [SerializeField] private AudioClip shootSound;

        private Rigidbody2D rb;
        private Camera mainCamera;
        private Vector2 moveInput;
        private Vector2 lookDirection;
        private float nextFireTime;
        private float nextDashTime;
        private bool isDashing;

        private void Awake()
        {
            rb = GetComponent<Rigidbody2D>();
            rb.gravityScale = 0f;
            rb.freezeRotation = true;
            mainCamera = Camera.main;
        }

        private void Update()
        {
            if (GameManager.Instance != null && GameManager.Instance.CurrentState != GameManager.GameState.Playing)
            {
                rb.linearVelocity = Vector2.zero;
                return;
            }

            // Read Input
            float moveX = Input.GetAxisRaw("Horizontal");
            float moveY = Input.GetAxisRaw("Vertical");
            moveInput = new Vector2(moveX, moveY).normalized;

            // Aiming
            if (mainCamera == null) mainCamera = Camera.main;
            if (mainCamera != null && rotateTowardsMouse)
            {
                Vector3 mouseWorldPos = mainCamera.ScreenToWorldPoint(Input.mousePosition);
                lookDirection = (mouseWorldPos - transform.position);
                lookDirection.Normalize();

                float angle = Mathf.Atan2(lookDirection.y, lookDirection.x) * Mathf.Rad2Deg;
                transform.rotation = Quaternion.Euler(0f, 0f, angle);
            }

            // Dash
            if (enableDash && Input.GetKeyDown(KeyCode.Space) && Time.time >= nextDashTime && !isDashing && moveInput != Vector2.zero)
            {
                StartCoroutine(DashRoutine());
            }

            // Shooting
            if (enableShooting && Input.GetMouseButton(0) && Time.time >= nextFireTime)
            {
                Shoot();
            }
        }

        private void FixedUpdate()
        {
            if (isDashing) return;

            rb.linearVelocity = moveInput * moveSpeed;
        }

        private void Shoot()
        {
            nextFireTime = Time.time + fireRate;

            Transform spawnPoint = firePoint != null ? firePoint : transform;
            Vector2 shootDir = lookDirection != Vector2.zero ? lookDirection : (Vector2)transform.right;

            if (bulletPrefab != null)
            {
                GameObject bullet = Instantiate(bulletPrefab, spawnPoint.position, Quaternion.identity);
                Rigidbody2D bulletRb = bullet.GetComponent<Rigidbody2D>();
                if (bulletRb != null)
                {
                    bulletRb.gravityScale = 0f;
                    bulletRb.linearVelocity = shootDir * bulletSpeed;
                }

                float angle = Mathf.Atan2(shootDir.y, shootDir.x) * Mathf.Rad2Deg;
                bullet.transform.rotation = Quaternion.Euler(0f, 0f, angle);
            }

            if (shootSound != null && SoundManager.Instance != null)
            {
                SoundManager.Instance.PlaySFX(shootSound, 0.7f, 0.15f);
            }

            Juice.Shake(0.05f, 0.05f);
        }

        private IEnumerator DashRoutine()
        {
            isDashing = true;
            nextDashTime = Time.time + dashCooldown;

            Vector2 dashDir = moveInput != Vector2.zero ? moveInput : lookDirection;
            rb.linearVelocity = dashDir * dashSpeed;

            if (dashSound != null && SoundManager.Instance != null)
            {
                SoundManager.Instance.PlaySFX(dashSound, 0.8f);
            }

            yield return new WaitForSeconds(dashDuration);
            isDashing = false;
        }
    }
}
