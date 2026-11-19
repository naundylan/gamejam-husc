# 01. SUBJECT PROMPT (TREE-OF-THOUGHTS: BIẾN CHỦ ĐỀ BTC THÀNH THREE.JS GAMEPLAY PROMPT)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Mục đích**: Dùng ở **Phút 00:00** ngay khi BTC công bố chủ đề. Biến 1 từ khóa chủ đề thành 1 **Three.js Gameplay Prompt hoàn chỉnh** sẵn sàng ăn trọn 100/100 điểm.
* **Kỹ thuật Prompt Engineering**:
  - **Tree-of-Thoughts (ToT)**: Bắt buộc AI phân nhánh 3 hướng tiếp cận khác nhau (Risk-Reward Twist, Spatial 3D/2.5D Twist, Viral Meme Twist), tự chấm điểm khả thi trong 150 phút trên Three.js rồi mới chọn nhánh tối ưu nhất.
  - **Few-Shot Contrastive Calibration**: Dạy AI phân biệt rõ thế nào là một ý tưởng "Clone tầm thường (15/40đ)" vs "Cú Twist 40/40đ trên Three.js".
  - **XML Schema Enforcement**: Đóng khung chặt chẽ cho Claude 3.5/4, GPT-4o/o1, Grok, Gemini.
* **Khuyến nghị tham số**: `Temperature = 0.75` (Lý tưởng để đột phá ý tưởng nhưng vẫn bám sát ràng buộc kỹ thuật).

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: Chủ đề BTC công bố (`{{THEME}}`).
* **Output**: Một khối `GAMEPLAY PROMPT CHÍNH THỨC` hoàn chỉnh.
* **Nơi nhận tiếp theo**: Lưu vào `02_gameplay_prompt.md`, sau đó truyền đồng thời vào `03_presentation_prompt.md`, `04_style_prompt.md`, `07_function_prompt.md` và `10_analyze_prompt.md`.

---

## 📋 3. NỘI DUNG PROMPT TỐI ƯU HÓA (COPY TOÀN BỘ KHỐI DƯỚI ĐÂY)

```xml
<system_role>
Bạn là Chief Game Jam Architect & Principal Three.js WebGL Game Designer với 10+ năm kinh nghiệm giành giải Nhất tại GMTK Game Jam và Ludum Dare.
</system_role>

<context_constraints>
Chúng tôi đang thi đấu trực tiếp tại cuộc thi "IT GAME JAM WITH AI 2026" (ĐH Khoa học - ĐH Huế) với các điều kiện bất di bất dịch:
1. Thời gian phát triển: ĐÚNG 150 PHÚT trên 01 Laptop duy nhất (Đội 3 người).
2. Nền tảng kỹ thuật DUY NHẤT: Web Game sử dụng **Three.js (WebGL 3D / 2.5D) + HTML5/CSS3 HUD Overlay + Web Audio API** (Không dùng Unity, không dùng tài nguyên 3D ngoài nặng nề; ưu tiên 100% Procedural Three.js Meshes, `THREE.Group`, Dynamic Lights, Emissive Glow, Particle Systems để code chạy ngay lập tức khi bấm F5).
3. Ma trận chấm điểm 100 điểm của Ban Giám Khảo:
   - Ý tưởng sáng tạo (40đ - TRỌNG SỐ LỚN NHẤT): Phải có 01 CÚ TWIST (cơ chế đảo ngược quy luật truyền thống), kết hợp luật chơi hợp lý, tạo ra bài toán đánh đổi (Risk vs Reward) liên tục mỗi giây.
   - Trải nghiệm chơi (20đ): Hiểu luật trong 5 giây đầu, Game Feel/Juice bùng nổ trên không gian 3D (3D Camera Shake, HitStop, Dynamic FOV Zoom, Light Flash, Debris Particles, Web Audio Synth), phím [R] chơi lại tức thì trong 0.01s.
   - Hiện thực hóa (20đ): Hoàn chỉnh trọn vẹn 01 vòng chơi khép kín (Menu -> Play -> Win/Lose -> Score/HighScore -> Instant Replay) mượt 60 FPS, 0 bug.
</context_constraints>

<few_shot_calibration>
Hãy học cách phân biệt giữa một ý tưởng TỆ (Bị loại) và ý tưởng ĐẠT 40/40 ĐIỂM SÁNG TẠO:
- [VÍ DỤ SAI - CLONE TẦM THƯỜNG (15/40đ)]: Chủ đề "Ánh sáng". Người chơi điều khiển nhân vật cầm đèn pin đi bắn quái trong bóng tối, hết pin thì thua. -> Quá cũ, không có sự đánh đổi cơ chế.
- [VÍ DỤ ĐÚNG - CÚ TWIST 40/40đ TRÊN THREE.JS]: Chủ đề "Ánh sáng". Vũ khí duy nhất để tiêu diệt quái chính là "Bán kính nguồn sáng (`THREE.PointLight`)" trên người bạn. Mỗi phát bắn làm thu hẹp bán kính ánh sáng và tầm nhìn 3D của bạn lại, nhưng đạn lại to và nhân hệ số điểm gấp bội (Chiến đấu trong mù lòa = Điểm x10; Giữ đèn sáng rõ = Sát thương yếu). Muốn hồi ánh sáng phải lao vào tâm vụ nổ của quái!
</few_shot_calibration>

<input_variables>
- CHỦ ĐỀ (THEME) TỪ BAN TỔ CHỨC: "{{ĐIỀN_CHỦ_ĐỀ_BTC_VÀO_ĐÂY}}"
- Góc nhìn Camera Three.js ưu tiên (Để trống nếu muốn AI tự chọn tối ưu nhất): "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG: Isometric 3D Top-Down / Tilted 2.5D Arena / Third-Person Corridor Runner / Orbital 3D}}"
</input_variables>

<reasoning_protocol>
Thực hiện suy luận theo phương pháp Tree-of-Thoughts (ToT) qua 3 bước trước khi xuất kết quả:
Bước 1 (Phân nhánh 3 Concept): Tạo 3 phương án game Three.js khác biệt hoàn toàn:
  - Nhánh A (Mechanic Inversion Twist): Đảo ngược một quy luật game kinh điển (Di chuyển, Máu, Đạn, Thời gian, Trọng lực).
  - Nhánh B (Spatial 3D/Light/Camera Twist): Tận dụng thế mạnh không gian 3D, góc xoay Camera hoặc ánh sáng của Three.js làm cơ chế cốt lõi.
  - Nhánh C (High-Octane Viral/Chaos Twist): Cơ chế hài hước, dồn dập, cực kỳ bắt mắt khi chiếu lên màn hình lớn hội trường để hút phiếu bầu khán giả.
Bước 2 (Ma trận chấm điểm khả thi): Chấm điểm từng nhánh theo 3 tiêu chí: `[Điểm Twist /40]`, `[Độ dễ tạo hình bằng Procedural Three.js Geometry /10]`, `[Khả năng code hoàn chỉnh trong 60 phút /10]`.
Bước 3 (Đóng gói): Chọn nhánh có tổng điểm cao nhất (hoặc đóng gói theo yêu cầu của tôi) thành bản `GAMEPLAY PROMPT CHÍNH THỨC`.
</reasoning_protocol>

<output_contract>
Trình bày ngắn gọn Bước 1 & Bước 2, sau đó XUẤT RA KHỐI CODE MARKDOWN CHỨA "GAMEPLAY PROMPT CHÍNH THỨC" theo đúng khuôn mẫu 8 mục dưới đây (không bỏ sót mục nào để tôi copy trực tiếp sang file 02, 03, 04, 07):

```markdown
# GAMEPLAY PROMPT CHÍNH THỨC (THREE.JS WEBGL)
1. Tên Dự Kiến & Góc Nhìn 3D (Title, Genre & Three.js Camera Setup):
   - Thể loại & Góc đặt Camera (`PerspectiveCamera` FOV, góc nghiêng X/Y/Z tạo chiều sâu 3D/2.5D rõ nét).
2. Cốt Truyện & Liên Kết Chủ Đề (1-Sentence Thematic Hook):
   - Giải thích súc tích vì sao cơ chế game là hiện thân hoàn hảo của chủ đề "{{CHỦ_ĐỀ}}".
3. CƠ CHẾ ĐẶC BIỆT / CÚ TWIST 40 ĐIỂM (The Core Contrarian Twist):
   - Quy luật đảo ngược cốt lõi là gì?
   - Bài toán Đánh đổi (Risk vs Reward): Người chơi phải hy sinh cái gì để đổi lấy sức mạnh/điểm số đột biến?
4. Vòng Lặp Gameplay Chính (Core 30-Second Loop):
   - Chuỗi hành động lặp lại gây nghiện từng giây: Quan sát -> Ra quyết định đánh đổi -> Hành động -> Nhận thưởng/Hậu quả.
5. Điều Khiển & Tương Tác Không Gian 3D (Controls & Raycasting):
   - Bộ phím tối giản (WASD + Mouse Raycast trên mặt phẳng 3D `THREE.Plane` hoặc 1-2 phím bấm). Hiểu ngay trong 3 giây.
6. Tiến Trình, Độ Khó & Điều Kiện Thắng/Thua (Progression & Win/Lose Rules):
   - Cách vượt màn / Sinh tồn qua các Wave, chỉ số nào tăng theo thời gian, khi nào Thắng, khi nào Game Over.
7. Công Thức Tính Điểm, Hệ Số Nhân Twist & Động Lực Chơi Lại (Scoring & Combo Multiplier):
   - Cách tính điểm gốc, cách nhân hệ số Combo (`x2 -> x10`) khi người chơi dám mạo hiểm với Cú Twist, lưu kỷ lục `localStorage`.
8. Đặc Tả Game Feel 3D & Juice (Three.js Visual & Audio Feedback):
   - Camera 3D Shake, FOV Punch, HitStop (0.04s freeze), PointLight Flash, 3D Mesh Explosion Particles (`InstancedMesh`/Debris) và âm thanh Web Audio Synth/SFX tương ứng.
```
</output_contract>
```
