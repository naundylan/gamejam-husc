# 11. DETAIL PROMPT (PHẪU THUẬT VI MÔ: SỬA CHI TIẾT NHỎ, CSS UI & THREE.JS MICRO-TWEAK)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Mục đích**: Chuyên trị các **chỉnh sửa chi tiết nhỏ (Micro-details)** và **thay thế/làm đẹp giao diện HTML5/CSS3 UI Overlay hoặc Visual Mesh trong Three.js** ở giai đoạn nước rút.
* **Kỹ thuật Prompt Engineering**:
  - **Zero Blast-Radius Isolation Lock (Khóa Khoanh Vùng Phẫu Thuật)**: Tạo ranh giới thép giữa `FORBIDDEN_ZONES` (Vòng lặp vật lý, Raycast, Va chạm, State Machine) và `ALLOWED_TARGET_ZONE` (Chỉ đúng thẻ HTML/CSS, hàm `updateHUD()`, hoặc hàm tạo hình `createMesh()`), cam kết **không bao giờ có chuyện sửa 1 chi tiết nhỏ mà lan ra làm hỏng 10 chỗ khác**.
  - **DOM Binding Preservation Contract**: Ép AI giữ nguyên 100% tên `id` và `class` đang liên kết với JavaScript khi làm mới giao diện UI.
* **Khuyến nghị tham số**: `Temperature = 0.1` (Độ chính xác phẫu thuật 100%).

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: **Khối Đề Xuất B** từ **`10_analyze_prompt.md`** (hoặc yêu cầu chỉnh sửa nhỏ trực tiếp của bạn) + (Tùy chọn) Mã màu/Style từ `04_style_prompt.md` hoặc Mesh/SVG từ `05_object_prompt.md`.
* **Output**: Bản cập nhật vi mô (Surgical Patch) chính xác tuyệt đối, không sinh lỗi phụ.

---

## 📋 3. BỘ 2 PROMPT CON KHOANH VÙNG CỰC MẠNH (CHỌN 11A HOẶC 11B)

### 🎨 PROMPT 11A: PHẪU THUẬT GIAO DIỆN HTML5/CSS3 UI & HUD OVERLAY (SURGICAL UI PATCH)
*(Dùng để sửa khung Popup Menu/Game Over, Thanh máu, Thanh Twist, Điểm số, Hướng dẫn phím bấm, Font chữ, Màu sắc UI)*

```xml
<detail_prompt_11a mode="SURGICAL_UI_AND_HUD_ISOLATION">
<system_role>
Bạn là Surgical Game UI/UX Frontend Engineer chuyên tinh chỉnh lớp giao diện HTML5/CSS3 Overlay đè trên Canvas Three.js WebGL.
</system_role>

<zero_blast_radius_lock>
🛑 LỆNH KHOANH VÙNG CÔ LẬP TUYỆT ĐỐI (CẤM VI PHẠM DƯỚI MỌI HÌNH THỨC):
1. VÙNG CẤM ĐỤNG CHẠM (`FORBIDDEN_ZONES`): Tuyệt đối KHÔNG được sửa đổi, không xóa, không đổi tên biến, và không chạm vào bất kỳ dòng code nào thuộc: Khởi tạo `THREE.Scene/Camera/Renderer`, Vòng lặp `animate()/update(dt)`, Xử lý va chạm 3D, Spawner, hay Điều khiển `Raycaster/Input`.
2. VÙNG CHO PHÉP DUY NHẤT (`ALLOWED_TARGET_ZONE`): Chỉ được phép thay đổi bên trong thẻ `<style>...</style>`, các thẻ HTML thuộc lớp phủ `#uiLayer`, và hàm cập nhật hiển thị DOM `updateHUD()` được chỉ định dưới đây.
3. BẢO TOÀN 100% DOM IDs & POINTER-EVENTS:
   - Giữ nguyên 100% các `id="..."` hiện có để code JavaScript Three.js không bao giờ bị lỗi `Cannot set properties of null`.
   - Mọi khung HUD chỉ hiển thị thông tin phải có `pointer-events: none;` để không chặn chuột ngắm bắn 3D trên Canvas; chỉ có nút bấm (`button`) mới đặt `pointer-events: auto;`.
</zero_blast_radius_lock>

<input_variables>
- VÙNG KHOANH ĐỊNH CẦN SỬA (`Target UI Component`): "{{ĐIỀN_CHÍNH_XÁC_PHẦN_TỬ_UI: VD: Cụm Thanh Máu & Thanh Twist góc trên trái / Bảng Popup Game Over / Dòng nhắc phím bấm dưới đáy màn hình}}"
- Đặc tả vấn đề & Chi tiết cần sửa (Copy từ Khối Đề Xuất B của `10_analyze_prompt.md` hoặc tự điền):
"""
{{DÁN_ĐẶC_TẢ_CHI_TIẾT_UI_CẦN_SỬA_VÀO_ĐÂY}}
"""
- Phong cách / Mã màu HEX áp dụng (Lấy từ `04_style_prompt.md` hoặc để trống): "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG}}"
- Đường dẫn file code: "{{MẶC_ĐỊNH: index.html HOẶC DÁN CODE}}"
</input_variables>

<output_contract>
1. `<isolation_check>`: Xác nhận đúng vùng thẻ HTML/CSS/Hàm được phép sửa và cam kết 0% tác động vào Three.js Game Loop.
2. Áp dụng chỉnh sửa chính xác vào file code.
</output_contract>
</detail_prompt_11a>
```

---

### 🔧 PROMPT 11B: TINH CHỈNH VI MÔ HÌNH KHỐI THREE.JS, ÁNH SÁNG, ÂM THANH & THÔNG SỐ NHỎ (MICRO-TWEAK & MESH SWAP)
*(Dùng để thay Mesh 3D/SVG mới cho nhân vật/quái/đạn, chỉnh góc nghiêng Camera, độ sáng đèn, độ rung màn hình, tần số âm thanh hoặc thông số tốc độ nhỏ)*

```xml
<detail_prompt_11b mode="SURGICAL_THREEJS_MICRO_TWEAK">
<system_role>
Bạn là Precision Three.js Visual & Polish Engineer.
</system_role>

<zero_blast_radius_lock>
🛑 LỆNH KHOANH VÙNG CÔ LẬP TUYỆT ĐỐI:
1. KHÔNG THAY ĐỔI THUẬT TOÁN & LUỒNG LOGIC: Giữ nguyên 100% cấu trúc vòng lặp, điều kiện thắng/thua và công thức va chạm.
2. KHI THAY THẾ HÌNH KHỐI 3D (`Mesh / Group Swap`):
   - Chỉ thay đổi bên trong hàm tạo hình (`createPlayerMesh`, `createEnemyMesh`, `createBulletMesh`...).
   - Tâm gốc `(0, 0, 0)` và kích thước tổng thể của `THREE.Group` mới phải khớp với bán kính va chạm `radius` hiện tại để Hitbox vẫn chuẩn xác 100%.
3. KHI TINH CHỈNH HẰNG SỐ (`CONFIG / JUICE / AUDIO`): Chỉ sửa đúng giá trị số của hằng số được yêu cầu.
</zero_blast_radius_lock>

<input_variables>
- VÙNG KHOANH ĐỊNH CẦN CHẠM VÀO: "{{ĐIỀN_HÀM_HOẶC_BIẾN_CẦN_SỬA: VD: Hàm createPlayerMesh() và hằng số CAMERA_OFFSET / độ rung shakeIntensity}}"
- Danh sách chi tiết nhỏ cần tinh chỉnh (Copy từ `10_analyze_prompt.md` hoặc kết quả từ `05_object_prompt.md`):
"""
{{DÁN_DANH_SÁCH_CÁC_CHI_TIẾT_NHỎ_HOẶC_MÃ_MESH_MỚI_VÀO_ĐÂY}}
"""
- Đường dẫn file code: "{{MẶC_ĐỊNH: index.html HOẶC DÁN CODE}}"
</input_variables>

<output_contract>
1. `<isolation_check>`: Liệt kê chính xác các dòng/hàm sẽ sửa, xác nhận giữ nguyên Hitbox và Game Loop.
2. Thực thi bản cập nhật vi mô sạch sẽ vào file code.
</output_contract>
</detail_prompt_11b>
```
