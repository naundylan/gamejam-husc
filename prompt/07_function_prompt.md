# 07. FUNCTION PROMPT (ĐẶC TẢ KỸ THUẬT CHỨC NĂNG TUYỆT ĐỐI - ZERO AMBIGUITY)

## 📌 1. Mục Đích Sử Dụng
* `Gameplay Prompt` (ở bước 01-02) thiên về ý tưởng, cốt truyện và cảm xúc nên thường ngắn gọn; nếu đưa thẳng cho AI viết code, mỗi con AI sẽ tự suy diễn thông số một kiểu (con thì làm đạn bay quá chậm, con thì quên làm thời gian bất tử i-frames, con thì hiểu sai quy luật của Cú Twist).
* **`07_function_prompt.md`** đóng vai trò là **"Bộ Biên Dịch Đặc Tả Kỹ Thuật (Deterministic Technical Spec Compiler)"**: Nó nhận `Gameplay Prompt` và xuất ra một file Markdown đặc tả toàn bộ tính năng với **thuật ngữ chuyên môn chuẩn xác, công thức toán học tường minh và máy trạng thái (State Machine) chặt chẽ**.
* Mức độ chi tiết của Output cao đến mức **loại bỏ 100% sự mơ hồ (Zero Ambiguity)**: Bất kỳ AI lập trình nào (Antigravity, Codex, Claude, GPT-4o) khi đọc bản đặc tả này đều **chỉ có thể hiểu và code theo đúng 1 hướng duy nhất**.

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Nhận Input từ**: `02_gameplay_prompt.md` (Bắt buộc) + `04_style_prompt.md` (Tùy chọn để lấy mã màu HEX).
* **Đầu ra (Output)**: Một tài liệu Markdown **`FUNCTION_SPEC.md`** hoàn chỉnh.
* **Truyền Output sang**:
  - Đưa trực tiếp cho **Antigravity / Claude / Codex** để sinh ra toàn bộ Source Code hoàn chỉnh của game.
  - Đưa sang **`10_analyze_prompt.md`** để đối chiếu xem các chức năng đã khớp 100% với tiêu chí chấm điểm của BTC chưa.

---

## 📋 3. NỘI DUNG PROMPT (COPY TỪ ĐÂY ĐỂ SỬ DỤNG)

```text
=== [CONTEXT CƠ SỞ: ZERO-AMBIGUITY GAME SYSTEMS ARCHITECT] ===
Bạn là Principal Game Systems Engineer & Technical Specification Architect.
Nhiệm vụ của bạn là chuyển hóa bản "Gameplay Prompt" bên dưới thành một TÀI LIỆU ĐẶC TẢ KỸ THUẬT CHỨC NĂNG (FUNCTIONAL SPECIFICATION DOCUMENT - Markdown) với độ chính xác tuyệt đối (Zero-Ambiguity).

QUY TẮC ĐẶC TẢ BẮT BUỘC:
1. Cấm dùng từ ngữ cảm tính, mơ hồ (như "bay nhanh", "khá mạnh", "thỉnh thoảng xuất hiện"). BẮT BUỘC phải lượng hóa thành con số cụ thể, đơn vị chuẩn (px, px/s, giây, độ/radian, %) và công thức toán học tường minh theo `dt` (Delta Time tính bằng giây).
2. Mọi cơ chế, đặc biệt là CÚ TWIST của game, phải được mô tả bằng chuỗi điều kiện Logic `IF -> THEN -> ELSE`, công thức cập nhật biến và giới hạn biên (`Math.clamp(val, min, max)`), sao cho bất kỳ AI Coder nào đọc vào cũng CHỈ HIỂU THEO ĐÚNG 1 CÁCH DUY NHẤT.
3. Nền tảng mục tiêu: [CHỌN 1: Web Game HTML5 Canvas 2D + Vanilla JS + Web Audio API (Khung tọa độ ảo chuẩn 1280x720) / HOẶC Unity 6 2D C# (Đơn vị Unity Units, Ortho Size = 5)].

=== [INPUT: GAMEPLAY PROMPT CẦN ĐẶC TẢ] ===
"""
[DÁN TOÀN BỘ GAMEPLAY PROMPT TỪ FILE 01 HOẶC 02 VÀO ĐÂY]
"""

=== [NHIỆM VỤ CỦA BẠN] ===
Hãy xuất ra toàn bộ nội dung file đặc tả kỹ thuật trong một khối code Markdown (`FUNCTION_SPEC.md`) bao gồm đầy đủ 9 mục chuẩn công nghiệp sau:

```markdown
# TECHNICAL FUNCTION SPECIFICATION (ĐẶC TẢ CHỨC NĂNG TUYỆT ĐỐI)

## 1. HỆ QUY CHIẾU, VÒNG LẶP & MÁY TRẠNG THÁI (FINITE STATE MACHINE - FSM)
- Độ phân giải không gian logic (Virtual Canvas Resolution): `1280 x 720 px` (Tự động scale giữ nguyên tỷ lệ 16:9).
- Chuẩn thời gian (Time Step): Mọi chuyển động phải nhân với `dt = Math.min(rawDeltaTime, 0.05)` (giây) để độc lập với tần số quét màn hình.
- Các trạng thái FSM (`GameState`):
  + `STATE_MENU`: Hiển thị Title, Hướng dẫn thao tác (Controls), Kỷ lục (`highScore`), chờ nhấn `[SPACE / CLICK]` để chuyển sang `STATE_PLAYING`.
  + `STATE_PLAYING`: Cập nhật Input -> Twist Logic -> Physics -> Spawner -> Collision -> Score -> Render -> HUD.
  + `STATE_GAMEOVER` / `STATE_VICTORY`: Đóng băng hoặc làm chậm physics, lưu `highScore` vào `localStorage`, hiển thị điểm số và lắng nghe phím `[R]` để gọi hàm `resetGame()` về `STATE_PLAYING` ngay lập tức trong 0.01s (không reload lại trang).

## 2. ĐẶC TẢ THỰC THỂ NGƯỜI CHƠI (PLAYER ENTITY SPECIFICATION)
- Thuộc tính dữ liệu (Data Schema): `x, y, vx, vy, radius (hoặc width/height), speed, hp, maxHp, iFrameTimer, state, ...` (Ghi rõ giá trị khởi tạo bằng số).
- Thuật toán Di chuyển & Điều khiển (Input Mapping & Kinematics):
  + Công thức tính vector vận tốc chuẩn hóa (Normalized 8-way movement hoặc Mouse tracking).
  + Cơ chế Lướt / Kỹ năng phụ (Dash / Secondary Action): Vận tốc, thời gian hiệu lực (`duration`), thời gian hồi chiêu (`cooldown`), trạng thái miễn nhiễm sát thương khi lướt.
  + Giới hạn biên bản đồ (Boundary Clamping): Không cho phép tọa độ vượt ra ngoài khung Arena.

## 3. ĐẶC TẢ THUẬT TOÁN "CÚ TWIST" CỐT LÕI (THE CORE TWIST DETERMINISTIC LOGIC)
- Định nghĩa các biến trạng thái riêng của Cú Twist (Tên biến, kiểu dữ liệu, miền giá trị `[min, max]`).
- Công thức toán học & Luồng xử lý từng bước ở mỗi Frame (`updateTwist(dt)`):
  + Điều kiện kích hoạt (Trigger Condition).
  + Tác động lên thông số của Player / Quái / Môi trường (Ghi rõ công thức cộng/trừ/nhân hệ số).
  + Cơ chế Đánh đổi (Risk vs Reward Formula): Khi biến Twist tăng cao thì lợi ích tăng bao nhiêu % và rủi ro tăng bao nhiêu %.
  + Cách hiển thị trực quan trạng thái Twist lên nhân vật hoặc thanh đo (Visual Gauge) để người chơi nhìn hiểu ngay.

## 4. ĐẶC TẢ VŨ KHÍ, ĐẠN & CƠ CHẾ TẤN CÔNG (COMBAT & PROJECTILE SYSTEM)
- Phương thức kích hoạt (Auto-fire / Left-Click / Spacebar) và tốc độ bắn (`fireRate` tính bằng giây/viên).
- Cấu trúc dữ liệu của Đạn/Đòn đánh: Vận tốc (`px/s`), Bán kính Hitbox (`px`), Sát thương (`damage`), Thời gian tự hủy (`ttl` giây), Số mục tiêu xuyên qua (`pierceCount`).
- Điều kiện xóa khỏi mảng (Garbage Cleanup): Xóa ngay khi `ttl <= 0`, `pierceCount <= 0` hoặc bay ra ngoài biên màn hình.

## 5. ĐẶC TẢ HỆ THỐNG KẺ ĐỊCH & THUẬT TOÁN SPAWN THEO WAVE (ENEMY & SPAWNER SPEC)
- Bảng thông số chi tiết ít nhất 03 loại Kẻ địch (VD: `Enemy_Chaser`, `Enemy_Shooter/Fast`, `Enemy_Tank/Boss`):
  + Mỗi loại ghi rõ: Kích thước Hitbox (`px`), Máu (`hp`), Tốc độ (`px/s`), Hành vi AI (`AI Behavior Formula`), Điểm thưởng khi diệt (`scoreValue`), Màu sắc/Hình khối nhận diện.
- Công thức Spawner & Độ khó tăng dần (Difficulty Curve):
  + Vị trí spawn: Spawn trên đường tròn bán kính `R` ngoài tầm nhìn hoặc tại các cổng.
  + Công thức giảm thời gian chờ giữa các lần spawn theo thời gian sống sót `elapsedTime`: `spawnInterval = Math.max(minInterval, baseInterval - elapsedTime * decayRate)`.
  + Giới hạn số lượng quái tối đa trên màn hình (`MAX_ACTIVE_ENEMIES = 50`) để bảo đảm 60 FPS.

## 6. MA TRẬN VA CHẠM & XỬ LÝ SÁT THƯƠNG (COLLISION MATRIX & DAMAGE RESOLUTION)
- Công thức kiểm tra va chạm: Hình tròn - Hình tròn (`Math.hypot(a.x - b.x, a.y - b.y) < a.r + b.r`) hoặc Hình chữ nhật AABB.
- Quy trình xử lý khi xảy ra va chạm:
  1. `Bullet vs Enemy`: Trừ máu quái -> Kích hoạt `DamageFlash (0.08s)` -> Đẩy lùi nhẹ (`Knockback`) -> Nếu `enemy.hp <= 0` thì sinh hạt nổ, cộng điểm, rơi vật phẩm, xóa quái.
  2. `Enemy/Hazard vs Player`: Kiểm tra `if (player.iFrameTimer <= 0)` -> Trừ máu Player -> Gán `player.iFrameTimer = 1.0s` (nhấp nháy nhân vật) -> Kích hoạt `HitStop` & `ScreenShake` mạnh -> Nếu `player.hp <= 0` chuyển sang `STATE_GAMEOVER`.
  3. `Player vs Collectible`: Cộng hiệu ứng/điểm -> Phát âm thanh -> Xóa vật phẩm.

## 7. CÔNG THỨC TÍNH ĐIỂM, COMBO & ĐIỀU KIỆN THẮNG/THUA (SCORING & WIN/LOSE RULES)
- Công thức tính điểm: `Score += basePoints * comboMultiplier`.
- Quy tắc tăng và mất `comboMultiplier` (Ví dụ: Tăng khi tiêu diệt liên tiếp trong `3.0s` hoặc duy trì trạng thái Twist; reset về `1x` khi hết giờ hoặc dính sát thương).
- Điều kiện Thắng (Victory - nếu có) và Điều kiện Thua (Game Over).

## 8. BẢNG ĐẶC TẢ HIỆU ỨNG "JUICE" & ÂM THANH SYNTH (GAME FEEL TRIGGER TABLE)
Liệt kê chính xác thông số gọi hàm cho từng sự kiện:
- Khi Bắn / Tấn công: `ScreenShake(intensity, duration)`, `Particle(count, speed, color)`, `WebAudioSynth(freqStart, freqEnd, waveType, duration)`.
- Khi Đánh trúng Quái: `HitStop(0.03s)`, `DamageFlash(white, 0.08s)`, `FloatingText("-DMG")`.
- Khi Quái chết: `ScreenShake`, `ParticleExplosion(15-20 hạt)`, `Sound(explosion)`.
- Khi Player trúng đòn / Chết: `HitStop(0.12s)`, `ScreenShake(mạnh)`, `ScreenFlash(red)`.

## 9. ĐẶC TẢ GIAO DIỆN HUD & THÔNG TIN TRÊN MÀN HÌNH (UI & HUD LAYOUT)
- Góc trên trái: Thanh máu (`HP Bar`) + Trạng thái chỉ số Twist.
- Góc trên giữa / phải: Điểm hiện tại (`SCORE`), Hệ số (`COMBO xN`), Kỷ lục (`BEST`).
- Góc dưới màn hình: Dòng nhắc phím điều khiển luôn hiển thị rõ ràng (`[WASD] Move | [Mouse] Aim/Shoot | [Space] Twist/Dash | [R] Restart`).
```
```
