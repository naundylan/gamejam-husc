using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Game.Core;

namespace Game.Gameplay
{
    /// <summary>
    /// Attach to an empty GameObject named "_Spawner".
    /// Spawns enemy prefabs around the player at intervals, scaling difficulty over time.
    /// </summary>
    public class SimpleSpawner : MonoBehaviour
    {
        [Header("Prefabs & Target")]
        [SerializeField] private GameObject[] enemyPrefabs;
        [SerializeField] private Transform targetPlayer;

        [Header("Spawn Rate")]
        [SerializeField] private float initialSpawnInterval = 2.5f;
        [SerializeField] private float minimumSpawnInterval = 0.6f;
        [SerializeField] private float difficultyScaleRate = 0.05f; // Decreases interval per 10s

        [Header("Spawn Position")]
        [SerializeField] private float spawnRadiusMin = 8f;
        [SerializeField] private float spawnRadiusMax = 12f;
        [SerializeField] private int maxActiveEnemies = 50;

        private float currentSpawnInterval;
        private List<GameObject> activeEnemies = new List<GameObject>();

        private void Start()
        {
            currentSpawnInterval = initialSpawnInterval;

            if (targetPlayer == null)
            {
                GameObject playerObj = GameObject.FindGameObjectWithTag("Player");
                if (playerObj != null) targetPlayer = playerObj.transform;
            }

            StartCoroutine(SpawnLoop());
        }

        private IEnumerator SpawnLoop()
        {
            while (true)
            {
                yield return new WaitForSeconds(currentSpawnInterval);

                if (GameManager.Instance != null && GameManager.Instance.CurrentState != GameManager.GameState.Playing)
                {
                    continue;
                }

                // Clean dead enemies from list
                activeEnemies.RemoveAll(item => item == null);

                if (activeEnemies.Count < maxActiveEnemies && enemyPrefabs != null && enemyPrefabs.Length > 0)
                {
                    SpawnOneEnemy();
                }

                // Increase difficulty gradually
                currentSpawnInterval = Mathf.Max(minimumSpawnInterval, currentSpawnInterval - (difficultyScaleRate * Time.deltaTime));
            }
        }

        private void SpawnOneEnemy()
        {
            Vector3 center = targetPlayer != null ? targetPlayer.position : transform.position;

            float angle = Random.Range(0f, Mathf.PI * 2f);
            float dist = Random.Range(spawnRadiusMin, spawnRadiusMax);
            Vector3 spawnPos = center + new Vector3(Mathf.Cos(angle) * dist, Mathf.Sin(angle) * dist, 0f);

            GameObject prefab = enemyPrefabs[Random.Range(0, enemyPrefabs.Length)];
            if (prefab != null)
            {
                GameObject spawned = Instantiate(prefab, spawnPos, Quaternion.identity);
                activeEnemies.Add(spawned);
            }
        }
    }
}
