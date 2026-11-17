#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using Game.Core;
using Game.UI;

namespace Game.EditorTools
{
    public static class SceneSetupTool
    {
        [MenuItem("GameJam/Setup Default Scene")]
        public static void SetupScene()
        {
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            // 1. Camera
            var camObj = new GameObject("Main Camera");
            camObj.tag = "MainCamera";
            var cam = camObj.AddComponent<Camera>();
            cam.orthographic = true;
            cam.orthographicSize = 5f;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.12f, 0.12f, 0.15f);
            camObj.AddComponent<AudioListener>();
            camObj.transform.position = new Vector3(0, 0, -10);

            // 2. Managers
            var mgrObj = new GameObject("_GameManager");
            mgrObj.AddComponent<GameManager>();
            mgrObj.AddComponent<SoundManager>();
            mgrObj.AddComponent<Juice>();

            // 3. EventSystem
            var eventObj = new GameObject("EventSystem");
            eventObj.AddComponent<EventSystem>();
            eventObj.AddComponent<StandaloneInputModule>();

            // 4. Canvas & UI
            var canvasObj = new GameObject("Canvas");
            var canvas = canvasObj.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasObj.AddComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1920, 1080);
            canvasObj.AddComponent<GraphicRaycaster>();
            var uiMgr = canvasObj.AddComponent<UIManager>();

            // 5. Save Scene
            string scenePath = "Assets/_Game/Scenes/MainGame.unity";
            EditorSceneManager.SaveScene(scene, scenePath);
            AssetDatabase.Refresh();

            // 6. Set in Build Settings
            var buildScenes = new EditorBuildSettingsScene[]
            {
                new EditorBuildSettingsScene(scenePath, true)
            };
            EditorBuildSettings.scenes = buildScenes;

            Debug.Log("[SceneSetupTool] MainGame scene created and registered in Build Settings!");
        }
    }
}
#endif
