# 07. FUNCTION PROMPT (ĐẶC TẢ KỸ THUẬT THREE.JS TUYỆT ĐỐI - ZERO AMBIGUITY SPEC)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Mục đích**: Biến `Gameplay Prompt` thành một **Tài Liệu Đặc Tả Kỹ Thuật Three.js (`FUNCTION_SPEC.md`)** với mức độ chi tiết cao đến mức **bất kỳ AI nào (Antigravity, Claude, Codex, GPT-4o) đọc vào cũng chỉ có thể hiểu và code theo đúng 1 hướng duy nhất (Zero Ambiguity)**.
* **Kỹ thuật Prompt Engineering**:
  - **Contrastive Few-Shot Calibration**: Dạy AI sự khác biệt giữa câu văn "mơ hồ" (bị cấm) và "công thức kỹ thuật Three.js tường minh" (bắt buộc).
  - **Deterministic Mathematical Modeling**: Ép mọi cơ chế phải viết dưới dạng phương trình toán học theo `dt` (Delta-Time), tọa độ không gian 3D `(X, Y, Z)` trên mặt phẳng `XZ` (`Y = 0` là mặt sàn), và trạng thái hữu hạn (FSM).
* **Khuyến nghị tham số**: `Temperature = 0.2` (Tối đa hóa tính chính xác, logic và nhất quán kỹ thuật).

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: `GAMEPLAY PROMPT CHÍNH THỨC` (từ file `01` hoặc `02`) + (Tùy chọn) `[LOCKED STYLE CONTEXT]` từ file `04`.
* **Output**: File Markdown đặc tả kỹ thuật **`FUNCTION_SPEC.md`**.
* **Truyền sang**: Đưa thẳng cho **Antigravity / Claude** để code toàn bộ game vào `index.html`, và đưa sang **`10_analyze_prompt.md`** để kiểm định điểm số.

---

## 📋 3. NỘI DUNG PROMPT TỐI ƯU HÓA (COPY TOÀN BỘ KHỐI DƯỚI ĐÂY)

```xml
<system_role>
Bạn là Principal Three.js Systems Architect & Deterministic Game Specification Compiler.
</system_role>

<constitutional_guardrails>
1. QUY TẮC ZERO-AMBIGUITY (KHÔNG MƠ HỒ): Tuyệt đối CẤM dùng các tính từ định tính như "bay nhanh", "khá rộng", "thỉnh thoảng spawn", "mạnh hơn". BẮT BUỘC phải lượng hóa 100% thành hằng số cụ thể (`units`, `units/s`, `giây`, `radian`, `%`) và công thức toán học theo `dt` (Delta Time tính bằng giây).
2. HỆ TỌA ĐỘ THREE.JS CHUẨN:
   - Mặt phẳng di chuyển chính là mặt sàn **`XZ` (`Y = 0`)** (hoặc mặt phẳng `XY` nếu là game Side-View 2.5D).
   - Mọi phép đo khoảng cách va chạm trên mặt phẳng `XZ` phải dùng công thức chuẩn: `dist = Math.hypot(a.position.x - b.position.x, a.position.z - b.position.z)`.
3. ĐỘC LẬP TẦN SỐ QUÉT: Mọi cập nhật vị trí/biến số mỗi frame phải nhân với `dt = Math.min(clock.getDelta(), 0.05)`.
</constitutional_guardrails>

<few_shot_calibration>
- [SAI - MƠ HỒ (AI sẽ hiểu lệch nhau)]: "Khi người chơi dùng kỹ năng Twist thì bắn mạnh hơn nhưng dễ chết hơn."
- [ĐÚNG - ĐẶC TẢ TUYỆT ĐỐI CHUẨN THREE.JS]: "Biến `twistCharge` thuộc miền `[0.0, 100.0]`. Khi giữ phím `[SPACE]`, `twistCharge = Math.min(100, twistCharge + 40 * dt)`. Hệ số sát thương đạn: `damage = baseDamage * (1 + (twistCharge / 100) * 2.0)`. Hệ số bán kính nhận sát thương của Player: `hitboxRadius = 0.8 * (1 + (twistCharge / 100) * 0.75)`. Khi thả `[SPACE]`, `twistCharge = Math.max(0, twistCharge - 25 * dt)`."
</few_shot_calibration>

<input_variables>
- Bản Gameplay Prompt cần chuyển thành Đặc tả Kỹ thuật:
"""
{{DÁN_TOÀN_BỘ_GAMEPLAY_PROMPT_TỪ_FILE_01_HOẶC_02_VÀO_ĐÂY}}
"""
- Bản Style Prompt (Nếu đã có để đồng bộ màu sắc/ánh sáng, hoặc bỏ trống):
"""
{{DÁN_STYLE_PROMPT_TỪ_FILE_04_HOẶC_ĐỂ_TRỐNG}}
"""
</input_variables>

<output_contract>
Hãy xuất ra toàn bộ tài liệu đặc tả kỹ thuật trong một khối code Markdown duy nhất (`FUNCTION_SPEC.md`) với đầy đủ 9 chương chi tiết dưới đây:

```markdown
# TECHNICAL FUNCTION SPECIFICATION (THREE.JS WEBGL ENGINE)

## 1. KIẾN TRÚC KHÔNG GIAN 3D, CAMERA & MÁY TRẠNG THÁI (FSM)
- Cấu hình `THREE.WebGLRenderer`: `antialias: true`, `powerPreference: "high-performance"`, `shadowMap.enabled: true`.
- Cấu hình Camera (`THREE.PerspectiveCamera`): `FOV`, vị trí `camera.position.set(x, y, z)`, điểm nhìn `camera.lookAt(x, 0, z)` và công thức Camera Smooth Follow theo Player: `camPos.lerp(targetPos, 1 - Math.exp(-8 * dt))`.
- Kích thước Sàn đấu (`ARENA_BOUNDS`): `minX, maxX, minZ, maxZ` (đơn vị Three.js units).
- Máy trạng thái hữu hạn (`GameState` Enum):
  + `MENU`: Render cảnh 3D quay chậm phía sau + Lớp phủ HTML `#menuOverlay` (Title, Hướng dẫn phím bấm, Kỷ lục `highScore`). Nhấn `[SPACE / CLICK]` -> Gọi `startGame()` sang `PLAYING`.
  + `PLAYING`: Chạy vòng lặp `update(dt)`: `Input -> TwistEngine -> Player -> Spawner -> Enemies -> Projectiles -> Collisions -> Particles -> CameraJuice -> HUD`.
  + `GAMEOVER` / `VICTORY`: Lưu `highScore` vào `localStorage`, hiện `#gameOverOverlay`, lắng nghe phím `[R]` gọi `resetGame()` khởi tạo lại trạng thái về `PLAYING` trong **0.01 giây** (không reload trang web).

## 2. ĐẶC TẢ THỰC THỂ NGƯỜI CHƠI (PLAYER ENTITY & RAYCASTING)
- Cấu trúc dữ liệu (`Player State Object`): `mesh (THREE.Group), pos (Vector3), vel (Vector3), radius (units), speed (units/s), hp, maxHp, iFrameTimer (s), dashTimer (s), dashCooldown (s), aimAngle (rad)`.
- Thuật toán Di chuyển & Ngắm bắn 3D (`THREE.Raycaster`):
  + Di chuyển WASD trên mặt phẳng `XZ` (Chuẩn hóa vector chéo `length = 1`).
  + Dùng `THREE.Raycaster` chiếu từ chuột xuống mặt phẳng ngang `new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)` để lấy tọa độ điểm ngắm 3D `aimPoint`, tính góc xoay `aimAngle = Math.atan2(aimPoint.x - player.pos.x, aimPoint.z - player.pos.z)`.
  + Công thức Kỹ năng Lướt / Phụ (`Dash / Secondary`): Tốc độ, thời gian hiệu lực, thời gian hồi chiêu.

## 3. ĐẶC TẢ THUẬT TOÁN "CÚ TWIST 40 ĐIỂM" (DETERMINISTIC TWIST ENGINE)
- Bảng biến số của Cú Twist: Tên biến, kiểu dữ liệu, giá trị khởi tạo, miền giới hạn `[min, max]`.
- Phương trình Toán học cập nhật mỗi Frame (`updateTwist(dt)`):
  + Điều kiện kích hoạt & Tốc độ biến thiên.
  + Công thức tác động trực tiếp lên Gameplay (Sát thương, Tốc độ, Ánh sáng `PointLight.distance`, Kích thước, Điểm số).
  + Công thức Đánh đổi (Risk vs Reward Equation) và Điều kiện phạt nếu vượt ngưỡng.

## 4. ĐẶC TẢ HỆ THỐNG VŨ KHÍ & ĐẠN 3D (COMBAT & PROJECTILE POOL)
- Thông số từng loại đòn đánh: `fireRate (s)`, `bulletSpeed (units/s)`, `bulletRadius (units)`, `damage`, `ttl (s)`, `pierceCount`, `knockbackForce`.
- Quy trình thu hồi bộ nhớ: Khi `ttl <= 0` hoặc va chạm hết `pierceCount` -> Gỡ `mesh` khỏi `scene` (hoặc trả về Object Pool) để tránh rò rỉ VRAM.

## 5. ĐẶC TẢ HỆ THỐNG KẺ ĐỊCH & THUẬT TOÁN SPAWN THEO WAVE (ENEMY AI & SPAWNER)
- Bảng thông số 03 chủng loại Quái (Minion, Elite, Boss/Special):
  + Mỗi loại quy định rõ: `radius`, `hp`, `speed`, `scoreReward`, `colorHex`, và **Phương trình hành vi AI** (Đuổi thẳng / Giữ khoảng cách bắn đạn / Lao nhanh Telegraph Charge).
- Công thức Spawner & Đường cong độ khó (Difficulty Scaling):
  + Công thức khoảng thời gian giữa 2 lần spawn: `spawnInterval = Math.max(MIN_INTERVAL, BASE_INTERVAL - elapsedTime * DECAY_RATE)`.
  + Tỷ lệ xuất hiện các loại quái theo mốc thời gian (`0-30s`, `30-60s`, `60s+`).
  + Trần giới hạn quái trên sân: `MAX_ENEMIES = 45`.

## 6. MA TRẬN VA CHẠM 3D & GIẢI QUYẾT SÁT THƯƠNG (COLLISION & DAMAGE MATRIX)
- Kiểm tra khoảng cách hình cầu/hình trụ trên mặt phẳng `XZ`: `Math.hypot(a.x - b.x, a.z - b.z) < (a.radius + b.radius)`.
- Chuỗi sự kiện chính xác khi va chạm:
  + `Projectile vs Enemy`: Trừ `enemy.hp` -> Đổi `material.emissive.setHex(0xffffff)` trong `0.07s` -> Áp dụng vector đẩy lùi `knockback` -> Nếu `enemy.hp <= 0`: gọi nổ hạt 3D, cộng điểm, xóa quái.
  + `Enemy/EnemyBullet vs Player`: Kiểm tra `player.iFrameTimer <= 0` -> Trừ `player.hp` -> Đặt `iFrameTimer = 1.0s` -> Kích hoạt `HitStop(0.1s)` & `CameraShake(0.4, 0.25s)` -> Nếu `player.hp <= 0` chuyển sang `GAMEOVER`.
  + `Player vs Collectible`: Nhận buff/điểm -> Phát âm thanh -> Thu hồi vật phẩm.

## 7. HỆ THỐNG ĐIỂM SỐ, COMBO & LƯU KỶ LỤC (SCORING & REPLAYABILITY)
- Phương trình tính điểm: `score += Math.round(baseScore * comboMultiplier * twistBonusMultiplier)`.
- Quy tắc tăng `comboMultiplier` và bộ đếm thời gian duy trì Combo (`comboDecayTimer = 3.5s`).

## 8. BẢNG THÔNG SỐ GAME FEEL 3D & WEB AUDIO SYNTH (JUICE SPECIFICATION TABLE)
Bảng ánh xạ từng sự kiện (`OnShoot`, `OnHitEnemy`, `OnKillEnemy`, `OnPlayerDamaged`, `OnTwistActivate`, `OnPickup`, `OnGameOver`) với:
- Thông số `CameraShake(intensity, duration)` & `HitStop(freezeSeconds)`.
- Thông số Hạt nổ 3D `spawnParticles(pos, count, colorHex, speed, size, life)`.
- Thông số bộ tổng hợp âm thanh `WebAudioSynth(type, startFreq, endFreq, duration, volume)` + File âm thanh CC0 tương ứng trong `Assets/audio/sfx/`.

## 9. ĐẶC TẢ LỚP PHỦ GIAO DIỆN HTML5/CSS3 HUD (DOM OVERLAY BINDINGS)
- Danh sách chính xác các phần tử DOM cần có và ID chuẩn: `#hudContainer`, `#hpBarFill`, `#twistBarFill`, `#scoreValue`, `#comboBadge`, `#highScoreValue`, `#controlsHint`, `#menuOverlay`, `#gameOverOverlay`.
```
</output_contract>
```
