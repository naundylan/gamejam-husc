# 02. GAMEPLAY PROMPT (HIẾN PHÁP GAMEPLAY & BỘ CHUẨN HÓA Ý TƯỞNG THREE.JS)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Vai trò kép**:
  1. **Kho Lưu Trữ Gốc (Single Source of Truth)**: Nơi lưu trữ bản `GAMEPLAY PROMPT CHÍNH THỨC` đã chốt từ bước `01_subject_prompt.md` để truyền vào toàn bộ hệ thống (`03`, `04`, `07`, `10`).
  2. **Bộ Chuẩn Hóa Ý Tưởng Thô (Constitutional Concept Refiner)**: Nếu cả đội tự nghĩ ra một ý tưởng thô trên giấy A4, Prompt ở Phần 3 sẽ dùng kỹ thuật **Constitutional Critique & Revise** để tự động đắp thêm Cú Twist 40đ, định hình không gian 3D Three.js và hoàn thiện đủ 8 mục tiêu chuẩn.
* **Khuyến nghị tham số**: `Temperature = 0.6` (Giữ ý tưởng gốc của đội nhưng cấu trúc hóa chặt chẽ).

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: Output từ `01_subject_prompt.md` HOẶC ý tưởng thô tự nghĩ của đội.
* **Output**: Bản `GAMEPLAY PROMPT CHÍNH THỨC (THREE.JS WEBGL)` chuẩn 8 mục.
* **Truyền sang**: `03_presentation_prompt.md`, `04_style_prompt.md`, `07_function_prompt.md`, `10_analyze_prompt.md`.

---

## 📋 3. PROMPT CHUẨN HÓA Ý TƯỞNG THÔ THÀNH THREE.JS GAMEPLAY PROMPT
*(Dùng khi đội đã có ý tưởng sơ bộ và muốn AI nâng cấp lên chuẩn 100/100 điểm trên Three.js)*

```xml
<system_role>
Bạn là Principal Game Jam Mechanics Designer chuyên sâu về kiến trúc WebGL Three.js.
</system_role>

<context_constraints>
Đội chúng tôi có một ý tưởng sơ bộ cho cuộc thi "IT GAME JAM WITH AI 2026" (150 phút, 1 Laptop).
Nền tảng bắt buộc: **Web Three.js (3D / 2.5D WebGL) + HTML5/CSS3 Overlay + Web Audio API**.
Bạn phải nâng cấp ý tưởng thô này sao cho đạt điểm tối đa ở 3 tiêu chí:
- Ý tưởng sáng tạo (40/40đ): Làm sắc bén Cú Twist và cơ chế đánh đổi Risk vs Reward.
- Trải nghiệm chơi (20/20đ): Tận dụng chiều sâu không gian 3D, ánh sáng động và hiệu ứng Juice của Three.js.
- Hiện thực hóa (20/20đ): Đảm bảo toàn bộ hình khối có thể dựng siêu tốc bằng Procedural Three.js Geometry (`BoxGeometry`, `SphereGeometry`, `CylinderGeometry`, `ConeGeometry`, `TorusGeometry`, `THREE.Group`) trong dưới 60 phút.
</context_constraints>

<input_variables>
- Chủ đề (Theme) của BTC: "{{ĐIỀN_CHỦ_ĐỀ_BTC}}"
- Ý tưởng thô ban đầu của đội: "{{MÔ_TẢ_NGẮN_GỌN_Ý_TƯỞNG_THÔ_CỦA_ĐỘI}}"
</input_variables>

<constitutional_self_critique>
Trước khi xuất bản thiết kế cuối cùng, hãy tự kiểm tra (Critique & Revise) theo 3 câu hỏi:
1. Ý tưởng thô của đội có bị giống game truyền thống quá không? Nếu có, hãy bơm thêm 1 quy luật Đánh đổi (Risk vs Reward) gắn liền với Chủ đề để cứu 40 điểm Sáng tạo.
2. Góc đặt Camera Three.js (`PerspectiveCamera` nghiêng 45-60 độ hay `OrthographicCamera` Isometric) nào giúp game nhìn có chiều sâu 3D ấn tượng nhất mà điều khiển bằng Chuột/WASD không bị rối?
3. Vòng chơi đã khép kín từ lúc Start -> Đạt điểm/Thua -> Bấm [R] chơi lại trong 0.01s chưa?
</constitutional_self_critique>

<output_contract>
Xuất kết quả cuối cùng trong một khối code Markdown duy nhất theo đúng chuẩn 8 mục dưới đây:

```markdown
# GAMEPLAY PROMPT CHÍNH THỨC (THREE.JS WEBGL)
1. Tên Dự Kiến & Góc Nhìn 3D (Title, Genre & Three.js Camera Setup):
2. Cốt Truyện & Liên Kết Chủ Đề (1-Sentence Thematic Hook):
3. CƠ CHẾ ĐẶC BIỆT / CÚ TWIST 40 ĐIỂM (The Core Contrarian Twist & Risk-Reward):
4. Vòng Lặp Gameplay Chính (Core 30-Second Loop):
5. Điều Khiển & Tương Tác Không Gian 3D (Controls & Three.js Raycasting/Movement):
6. Tiến Trình, Độ Khó & Điều Kiện Thắng/Thua (Wave Progression & Win/Lose Rules):
7. Công Thức Tính Điểm, Hệ Số Nhân Twist & Động Lực Chơi Lại (Scoring, Combo & LocalStorage):
8. Đặc Tả Game Feel 3D & Juice (Camera Shake, HitStop, Dynamic PointLight, 3D Debris Particles & Web Audio):
```
</output_contract>
```

---

## 💾 4. BẢN LƯU "HIẾN PHÁP GAMEPLAY CHÍNH THỨC" CỦA ĐỘI (DÁN VÀO ĐÂY KHI ĐÃ CHỐT)
*(Sau khi có Output từ file 01 hoặc từ Prompt trên, hãy dán lưu vào đây để copy sang các file 03 -> 11)*

```markdown
# GAMEPLAY PROMPT CHÍNH THỨC (THREE.JS WEBGL)
1. Tên Dự Kiến & Góc Nhìn 3D: [DÁN NỘI DUNG ĐÃ CHỐT VÀO ĐÂY]
2. Cốt Truyện & Liên Kết Chủ Đề: [...]
3. CƠ CHẾ ĐẶC BIỆT / CÚ TWIST 40 ĐIỂM: [...]
4. Vòng Lặp Gameplay Chính: [...]
5. Điều Khiển & Tương Tác Không Gian 3D: [...]
6. Tiến Trình, Độ Khó & Điều Kiện Thắng/Thua: [...]
7. Công Thức Tính Điểm, Hệ Số Nhân Twist & Động Lực Chơi Lại: [...]
8. Đặc Tả Game Feel 3D & Juice: [...]
```
