# BÁO CÁO MINH CHỨNG SỬ DỤNG AI - IT GAME JAM 2026 (THREE.JS WEBGL EDITION)
**Tên Đội Thi**: [ĐIỀN TÊN ĐỘI TẠI ĐÂY]  
**Tên Trò Chơi**: [ĐIỀN TÊN GAME TẠI ĐÂY]  
**Chủ Đề (Theme)**: [ĐIỀN CHỦ ĐỀ BTC CÔNG BỐ]  
**Nền Tảng**: Web Three.js (WebGL 3D/2.5D) + HTML5/CSS3 Overlay + Web Audio API

---

## 1. Danh Mục Các Công Cụ AI & Dây Chuyền 11 Prompt Đã Ứng Dụng
Đội đã xây dựng một quy trình **11-Stage Prompt Engineering Pipeline** (`prompt/01` ➡️ `prompt/11`) kết hợp các công cụ AI vào từng công đoạn chuyên biệt:

| Công cụ | Vai trò | Công đoạn áp dụng |
| :--- | :--- | :--- |
| **Claude 3.5 / ChatGPT** | Game Designer & Judge | Chạy `01_subject_prompt` (Tree-of-Thoughts tìm Twist 40đ), `07_function_prompt` (Zero-Ambiguity Spec) & `10_analyze_prompt` (Chấm thử Rubric 100đ) |
| **Antigravity + Codex** | Lead Three.js Architect | Trực tiếp lập trình Three.js WebGL (`index.html`), tối ưu VRAM, Raycasting 3D và hiệu ứng Juice |
| **Grok** | Creative & Viral Marketer | Chạy `03_presentation_prompt` đặt tên game meme, slogan hút sticker Bảng Bình Chọn & kịch bản Pitch 90s |
| **Web Audio Synth + Kenney CC0** | Audio Engine | Tổng hợp âm thanh retro theo thời gian thực không độ trễ kết hợp kho 300+ SFX CC0 trong `Assets/audio/sfx/` |
| **Suno.com (Free)** | BGM Generator | Tạo nhạc nền loop theo chủ đề |

---

## 2. Minh Chứng Quá Trình Prompt & Đầu Ra AI

### A. Ý Tưởng & Cơ Chế Cốt Lõi (`01_subject_prompt` -> `02_gameplay_prompt`)
* **Prompt gửi cho AI**:
  > *"Áp dụng Tree-of-Thoughts với Chủ đề [THEME]. Xuất 3 phương án có Cú Twist đánh đổi Risk vs Reward trên không gian 3D Three.js..."*
* **Kết quả & Lựa chọn của đội**:
  > [Mô tả ngắn gọn Cú Twist đã chọn]

---

### B. Lập Trình Three.js & Tinh Chỉnh Thủ Công Của Con Người (`07_function_prompt` -> `09_performance_prompt`)
* **Minh chứng kiểm tra, phát hiện lỗi và sửa đổi từ đầu ra AI**:
  1. **Tối ưu bộ nhớ VRAM WebGL**: Phát hiện AI ban đầu tạo `new THREE.BoxGeometry()` mỗi lần bắn đạn; đội đã chuyển sang dùng **Shared Geometry/Material Pool** và gọi `scene.remove(mesh)` sạch sẽ khi bấm `[R]` Restart.
  2. **Chống lỗi dịch chuyển khi Alt+Tab**: Bổ sung kẹp trần `dt = Math.min(clock.getDelta(), 0.05)` trong vòng lặp `requestAnimationFrame`.
  3. **Cân bằng độ khó & Game Feel**: Tinh chỉnh cường độ `CameraShake`, `HitStop (0.04s)` và công thức tăng độ khó Spawner để đạt 60 FPS ổn định.

---

### C. Kiểm Định Điểm Số & Thẩm Mỹ (`10_analyze_prompt` & `11_detail_prompt`)
* Dùng `10_analyze_prompt.md` đóng vai Ban Giám Khảo chấm thử theo đúng thang điểm 100 của BTC, sau đó dùng `11_detail_prompt.md` khoanh vùng cô lập để nâng cấp HUD CSS3 và độ rõ nét của hướng dẫn phím bấm.
* *Ảnh minh chứng*: Lưu trong thư mục `AI_SHOWCASE/Screenshots/`.
