# 🎮 HƯỚNG DẪN SỬ DỤNG HỆ THỐNG AGENT SKILLS (`.agents/skills/`)

Dự án đã được tích hợp sẵn **21 Agent Skills tinh gọn** trích xuất từ `awesome-gamedev-agent-skills`, tối ưu riêng cho **Web Three.js + Game Jam 150 phút** (đã loại bỏ hoàn toàn các engine nặng như Godot, Unity, Unreal để không làm loãng ngữ cảnh AI).

Vì tất cả các file skill nằm trực tiếp trong thư mục `.agents/skills/`, khi bạn đẩy lên Git và kéo về máy thi đấu, **AI có thể dùng ngay lập tức kể cả khi mất mạng**.

---

## 1. DANH SÁCH 21 SKILLS ĐÃ CÀI ĐẶT

### 🧠 Bộ điều phối (1 skill)
* `router` — Tự động nhận diện bạn đang dùng Three.js và chọn đúng 2–3 skills phù hợp nhất cho yêu cầu hiện tại.

### 🌐 Three.js Engine (3 skills)
* `threejs-scene-setup` — Cấu trúc Scene, Camera, Renderer, Resize chuẩn r187, `setAnimationLoop`, không bị lỗi màn hình đen.
* `threejs-materials-lighting` — Ánh sáng 3 điểm, bóng đổ mềm (`PCFSoftShadowMap`), vật liệu PBR, Tone Mapping (`ACESFilmic`).
* `threejs-gltf-loading` — Nạp model 3D (nếu có dùng), animation mixer và clone nhân vật.

### 🛠️ Kỹ thuật cốt lõi / Disciplines (10 skills)
* `game-feel` ⭐ — Công thức toán học cho **Screen Shake (Trauma²)**, **Hit-stop** (đóng băng khung hình khi đánh trúng), **Squash & Stretch**, **Knockback**.
* `camera-systems` — Camera theo dõi mượt mà (Lerp/Damping), Look-ahead, Orbit/Top-down/FPS camera.
* `game-ui-ux` — Quy tắc thiết kế HUD, thanh máu, menu, phím tắt, safe-area và khả năng đọc nhanh.
* `procedural-gen` — Seeded RNG, sinh bản đồ/chướng ngại vật/wave quái ngẫu nhiên có kiểm soát.
* `audio-design` — Cân bằng âm lượng, biến thiên cao độ (pitch variation) để âm thanh bắn/va chạm không bị chói tai.
* `performance-optimization` — Bắt bệnh tụt FPS, tối ưu Draw Calls, Object Pooling (tái sử dụng đạn/hạt thay vì tạo mới liên tục), chống rò rỉ VRAM.
* `shader-programming` — Viết hiệu ứng GLSL (viền sáng Fresnel, dissolve tan biến, hiệu ứng phát sáng).
* `input-systems` — Xử lý bàn phím/chuột mượt mà, Input Buffering (nhấn phím trước vài mili-giây vẫn nhận).
* `game-ai` — AI cho kẻ địch (FSM, truy đuổi, né tránh, giữ khoảng cách).
* `level-design` — Nhịp độ màn chơi (Pacing), bố trí vật cản, chống kẹt (soft-lock).

### 🕹️ Thể loại Game Jam phổ biến / Genres (5 skills)
* `roguelike` — Vòng lặp chạy màn, nâng cấp ngẫu nhiên, độ khó tăng tiến.
* `fps-shooter` — Bắn súng (Hitscan/Projectile), độ giật, phản hồi trúng đạn.
* `tower-defense` — Đường đi của quái, hệ thống wave, nhắm mục tiêu, kinh tế vàng.
* `platformer` — Cảm giác nhảy mượt (Coyote time, Jump buffer, trọng lực rơi nhanh).
* `puzzle` — Cơ chế giải đố, hoàn tác (Undo), kiểm tra điều kiện thắng.

### ⏱️ Quy trình thi đấu / Workflows (2 skills)
* `game-jam` ⭐ — Tư duy quản lý đồng hồ, chia mốc thời gian, duy trì danh sách cắt bỏ tính năng (Cut list).
* `prototype-fast` — Tạo bản chơi thử (greybox) chạy được trong 10 phút đầu tiên trước khi làm đẹp.

---

## 2. CÁCH KÍCH HOẠT TRÊN TỪNG CÔNG CỤ AI

Thư mục `.agents/skills/` là chuẩn mở **Agent Skills**, được các công cụ tự động đọc:

| Công cụ AI | Trạng thái nhận diện | Cách dùng |
| :--- | :--- | :--- |
| **Antigravity / Codex / Gemini CLI / Copilot** | ✅ **Tự động nhận 100%** | Mở thư mục dự án là AI tự thấy `.agents/skills/`. |
| **Cursor** | ✅ **Tự động nhận 100%** | Cursor đọc trực tiếp `.agents/skills/` và `.cursorrules`. |
| **Claude Code** | ⚠️ Cần đồng bộ thư mục | Nếu dùng Claude Code, chạy lệnh sau trong PowerShell để copy sang `.claude/skills/`:<br>`Copy-Item -Path ".agents\skills" -Destination ".claude\skills" -Recurse -Force` |

---

## 3. CÁCH RA LỆNH THỰC CHIẾN TRONG 150 PHÚT

Không cần nhớ tên tất cả skills. Bạn chỉ cần **ra lệnh tự nhiên + gắn tag tên skill hoặc yêu cầu dùng `router`**, đồng thời luôn giữ ràng buộc `index.html`.

### Giai đoạn 1: Phút 0 – 15 (Chốt Scope & Prototype)
1. Chạy `prompt/01_subject_prompt.md` và `prompt/02_gameplay_prompt.md` để chốt ý tưởng và cơ chế Twist.
2. Khi bắt đầu code, copy câu lệnh này cho AI:
> **"Dùng skill `game-jam` và `prototype-fast` kết hợp `threejs-scene-setup`. Hãy giữ nguyên cấu trúc single-file `index.html` (vanilla Three.js + Web Audio), dựng ngay 1 bản chơi thử greybox chạy được vòng lặp chính trong 10 phút đầu, không cài Vite hay TypeScript."**

### Giai đoạn 2: Phút 15 – 60 (Xây Gameplay & AI Quái)
Tùy thể loại game vừa chốt, gọi đúng skill thể loại + kỹ thuật:
> **"Dùng skill `[roguelike / fps-shooter / tower-defense / platformer / puzzle]` kết hợp `game-ai` và `input-systems` để code hoàn chỉnh hệ thống di chuyển, sinh quái theo wave và điều kiện thắng/thua vào `index.html`."**

### Giai đoạn 3: Phút 60 – 110 (Bơm "Juice" & Đồ họa lấy 40 điểm Sáng tạo + Trải nghiệm)
Đây là bước biến game sinh viên thành game ăn giải:
> **"Dùng skill `game-feel`, `threejs-materials-lighting` và `camera-systems`. Hãy thêm:
> 1. Rung camera theo công thức Trauma² khi bắn/va chạm.
> 2. Hit-stop 0.04s và nháy sáng emissive khi tiêu diệt mục tiêu.
> 3. Ánh sáng 3 điểm + ACESFilmicToneMapping + bóng đổ mềm.
> 4. Particle nổ 3D và âm thanh Web Audio có biến thiên pitch (`audio-design`)."**

### Giai đoạn 4: Phút 110 – 135 (Tối ưu UI & FPS)
> **"Dùng skill `game-ui-ux` và `performance-optimization`. Kiểm tra toàn bộ `index.html` để đảm bảo không rò rỉ VRAM (dispose geometry/material), dùng object pooling cho đạn/hạt, HUD sắc nét dễ đọc và phím `[R]` chơi lại ngay lập tức."**

### Giai đoạn 5: Phút 135 – 150 (Đóng gói thi đấu)
* Chạy `prompt/03_presentation_prompt.md` để lấy bài Pitch 90 giây & mẫu bảng bình chọn Sticker.
* Cập nhật `AI_SHOWCASE/AI_REPORT.md` để lấy trọn 10 điểm AI.

---

## 4. LƯU Ý SỐNG CÒN KHI DÙNG SKILLS

1. **Luôn nhắc từ khóa `"Single-file index.html, no Vite, no npm"`**: Nếu quên nhắc, một số AI có thể tự ý tạo thêm file `package.json` hoặc đòi cài `npm`.
2. **Kết hợp với thư mục `prompt/`**:
   * Thư mục `prompt/` (`00` $\rightarrow$ `11`) lo phần **Chiến lược, Ý tưởng, Luật thi, Bảng điểm, Thuyết trình**.
   * Thư mục `.agents/skills/` lo phần **Kỹ thuật lập trình Three.js, Toán học Game Feel, Camera, Tối ưu FPS**.
3. **Kiểm tra nhanh trước giờ G**: Mở Antigravity/Codex tại thư mục `D:\Project\game` và hỏi thử: *"Bạn thấy những skills nào trong `.agents/skills`?"* để xác nhận AI đã nhận diện đầy đủ.
