using UnityEngine;

namespace Game.Core
{
    /// <summary>
    /// Attach this script to an empty GameObject named "_SoundManager".
    /// Provides simple, clean SFX and BGM playback with pitch variation for game feel.
    /// </summary>
    public class SoundManager : MonoBehaviour
    {
        public static SoundManager Instance { get; private set; }

        [Header("Audio Sources")]
        [SerializeField] private AudioSource sfxSource;
        [SerializeField] private AudioSource bgmSource;

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

            if (sfxSource == null)
            {
                sfxSource = gameObject.AddComponent<AudioSource>();
                sfxSource.playOnAwake = false;
            }

            if (bgmSource == null)
            {
                bgmSource = gameObject.AddComponent<AudioSource>();
                bgmSource.loop = true;
                bgmSource.playOnAwake = false;
            }
        }

        public void PlaySFX(AudioClip clip, float volume = 1f, float pitchVariance = 0.1f)
        {
            if (clip == null) return;

            // Pitch variance prevents repetitive sound fatigue
            sfxSource.pitch = 1f + Random.Range(-pitchVariance, pitchVariance);
            sfxSource.PlayOneShot(clip, volume);
        }

        public void PlayRandomSFX(AudioClip[] clips, float volume = 1f)
        {
            if (clips == null || clips.Length == 0) return;
            AudioClip clip = clips[Random.Range(0, clips.Length)];
            PlaySFX(clip, volume);
        }

        public void PlayBGM(AudioClip clip, float volume = 0.5f, bool loop = true)
        {
            if (clip == null) return;
            bgmSource.clip = clip;
            bgmSource.volume = volume;
            bgmSource.loop = loop;
            bgmSource.Play();
        }

        public void StopBGM()
        {
            bgmSource.Stop();
        }
    }
}
