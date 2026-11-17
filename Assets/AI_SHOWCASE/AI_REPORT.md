# BÁO CÁO MINH CHỨNG SỬ DỤNG AI - IT GAME JAM 2026
**Tên Đội Thi**: [ĐIỀN TÊN ĐỘI TẠI ĐÂY]  
**Tên Trò Chơi**: [ĐIỀN TÊN GAME TẠI ĐÂY]  
**Chủ Đề (Theme)**: [ĐIỀN CHỦ ĐỀ BTC CÔNG BỐ]

---

## 1. Danh Mục Các Công Cụ AI Đã Ứng Dụng
Trong suốt 150 phút phát triển, đội đã kết hợp các công cụ AI vào từng giai đoạn chuyên biệt:

| Công cụ | Phiên bản / Nền tảng | Công đoạn áp dụng |
| :--- | :--- | :--- |
| **Antigravity** | Agentic IDE Coding System | Lập trình kiến trúc C#, Game Loop, tối ưu hoá mã nguồn |
| **Codex / Copilot** | GitHub Copilot / OpenAI Codex | Inline auto-completion, sinh hàm tính toán toán học |
| **Claude 3.5 / Gemini** | Web Free Tier | Brainstorming ý tưởng Twist cơ chế, cân bằng chỉ số game |
| **Recraft.ai** | AI Vector / Pixel Generator | Tạo Hero Sprite nhân vật chính, kẻ địch theo chủ đề (PNG trong suốt) |
| **Suno.ai** | Generative Music AI | Tạo bản nhạc nền BGM 8-bit Chiptune Arcade loop |
| **Jfxr / SFX AI** | Web Procedural Audio | Tạo âm thanh hiệu ứng tương tác cơ chế |

---

## 2. Minh Chứng Quá Trình Prompt & Đầu Ra AI

### A. Ý Tưởng & Cơ Chế Cốt Lõi (Brainstorming)
* **Prompt gửi cho AI**:
  > *"Chủ đề là [THEME]. Hãy đề xuất cho tôi 3 cơ chế game 2D Top-down arcade với 1 cú Twist độc đáo, khác biệt hoàn toàn với game thông thường, luật chơi dễ hiểu trong 5 giây..."*
* **Kết quả từ AI & Lựa chọn của đội**:
  > [Mô tả ngắn gọn ý tưởng được chọn]

---

### B. Lập Trình & Tinh Chỉnh Mã Nguồn (Coding & Refactoring)
* **Prompt gửi cho Antigravity**:
  > *"Viết script C# TopDownPlayerController cho phép nhân vật di chuyển 8 hướng, xoay theo chuột, có cơ chế Dash và bắn đạn..."*
* **Minh chứng kiểm tra & chỉnh sửa thủ công của con người**:
  * AI ban đầu sinh ra dùng `Rigidbody2D.velocity`, đội đã chủ động nâng cấp lên `Rigidbody2D.linearVelocity` tương thích chuẩn với Unity 6.
  * Tinh chỉnh lại `dashCooldown` và `fireRate` để game cân bằng, không bị quá dễ.
  * Bổ sung cơ chế `DamageFlash` và `Juice.Shake` để gia tăng "Game Feel".

---

### C. Đồ Hoạ & Âm Thanh (Assets Generation)
* **Prompt vẽ Sprite trên Recraft.ai**:
  > *"isolated on clean white background, 2D game sprite, top-down view, stylized pixel art, [TÊN NHÂN VẬT], clean outlines, transparent background"*
  * *Ảnh minh chứng*: `Screenshots/hero_sprite_prompt.png`
* **Prompt tạo BGM trên Suno**:
  > *"8-bit chiptune arcade retro game soundtrack, fast tempo 125bpm, energetic action, looping background music, no vocals, instrumental"*
  * *File kết quả*: `Assets/_Game/Audio/BGM/arcade_theme.wav`

---

## 3. Kết Luận
AI đã giúp đội rút ngắn 70% thời gian tạo mẫu ban đầu, giúp cả đội tập trung tối đa vào **Ý tưởng sáng tạo (Twist)** và **Trải nghiệm chơi (Game Feel)** trong giới hạn 150 phút.
