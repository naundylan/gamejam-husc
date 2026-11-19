# 08. FIX PROMPT (BỘ 3 PROMPT CON: BỔ SUNG / SỬA ĐỔI / XÓA TÍNH NĂNG THREE.JS CÓ KHÓA CÔ LẬP)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Mục đích**: Can thiệp ở cấp độ **Chức năng & Cơ chế Gameplay (Feature & Logic Level)** trên nền tảng **Web Three.js** mà không bao giờ làm sập các phần đang chạy tốt.
* **Kỹ thuật Prompt Engineering**:
  - **Constitutional Blast-Radius Containment**: Ép AI phải thực hiện bước `<impact_analysis>` (Phân tích các biến, `THREE.Scene` children và DOM bindings bị ảnh hưởng) trước khi chạm vào code.
  - **Three.js Scene Graph & VRAM Hygiene**: Mọi thực thể 3D của tính năng mới hoặc tính năng bị xóa phải được dọn sạch khỏi `scene.remove(mesh)` trong hàm `resetGame()` (Phím `R`) để không bao giờ để lại "xác mesh ma" trên màn hình khi chơi lại!

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: Đề xuất A từ **`10_analyze_prompt.md`** (hoặc yêu cầu trực tiếp của đội) + Source Code Three.js hiện tại.
* **Phân biệt rõ với `11_detail_prompt.md`**:
  - Thêm/Sửa/Xóa **cả một cơ chế, loại quái, vũ khí, thuật toán Twist, hay lỗi logic lớn** ➡️ Dùng **`08_fix_prompt.md`** này.
  - Chỉ chỉnh sửa **giao diện CSS UI, đổi màu, thay model/sprite nhỏ, chỉnh hằng số** ➡️ Dùng **`11_detail_prompt.md`**.

---

## 📋 3. BỘ 3 PROMPT CON CHUYÊN BIỆT (CHỌN ĐÚNG NHU CẦU 8A / 8B / 8C)

### ➕ PROMPT 8A: BỔ SUNG TÍNH NĂNG MỚI VÀO THREE.JS (ADD FEATURE PROMPT)

```xml
<fix_prompt_8a mode="STRICT_FEATURE_ADDITION">
<system_role>
Bạn là Senior Three.js Gameplay Systems Engineer chuyên tích hợp module mới vào hệ thống đang chạy với độ an toàn tuyệt đối (Zero Regression).
</system_role>

<constitutional_guardrails>
1. BẢO TOÀN 100% LOGIC HIỆN TẠI: Tuyệt đối KHÔNG xóa, không rút gọn bằng comment (`// ... code cũ ...`), và không làm thay đổi hành vi của các cơ chế đang chạy tốt.
2. DỌN SẠCH SCENE THREE.JS KHI RESTART (`[R]`): Mọi `THREE.Mesh` / `THREE.Group` / `THREE.Light` sinh ra bởi tính năng mới BẮT BUỘC phải được quản lý trong mảng riêng và được gọi `scene.remove(obj)` + reset biến về mặc định bên trong hàm `resetGame()`.
3. ĐÍNH KÈM JUICE & AUDIO NGAY LẬP TỨC: Tính năng mới phải tự động gọi hiệu ứng 3D Particle, Camera Shake và âm thanh Web Audio Synth để cộng điểm Trải nghiệm (20đ).
</constitutional_guardrails>

<input_variables>
- Tên tính năng mới cần bổ sung: "{{ĐIỀN_TÊN_TÍNH_NĂNG_MỚI}}"
- Đặc tả kỹ thuật của tính năng mới (Copy từ Đề xuất A của `10_analyze_prompt.md` hoặc tự điền):
"""
{{DÁN_ĐẶC_TẢ_CHI_TIẾT_TÍNH_NĂNG_MỚI_VÀO_ĐÂY}}
"""
- Đường dẫn file code trong dự án (hoặc dán code nếu dùng Chatbot Web):
"{{MẶC_ĐỊNH: index.html HOẶC DÁN CODE VÀO ĐÂY}}"
</input_variables>

<reasoning_protocol>
Thực hiện `<impact_analysis>` trong 3 dòng trước khi sửa code:
1. Danh sách biến trạng thái & mảng Three.js mới cần khai báo.
2. Điểm móc nối (Hook points) vào `update(dt)`, `resetGame()`, và `updateHUD()`.
3. Kiểm tra an toàn bộ nhớ khi người chơi bấm `[R]` chơi lại.
Sau đó thực thi cập nhật trực tiếp vào mã nguồn.
</reasoning_protocol>
</fix_prompt_8a>
```

---

### 🛠️ PROMPT 8B: SỬA LỖI LOGIC & CÂN BẰNG GAMEPLAY THREE.JS (SURGICAL BUGFIX & BALANCE)

```xml
<fix_prompt_8b mode="SURGICAL_LOGIC_FIX">
<system_role>
Bạn là Principal Three.js Debugger & Gameplay Balancing Architect.
</system_role>

<constitutional_guardrails>
1. KHOANH VÙNG PHẪU THUẬT (SURGICAL ISOLATION): Chỉ sửa đúng hàm, điều kiện va chạm hoặc phương trình toán học gây ra lỗi. Tuyệt đối KHÔNG tái cấu trúc các hàm khác đang hoạt động bình thường.
2. PHÒNG VỆ BIÊN TOÁN HỌC 3D (3D MATH DEFENSIVE CODING): Kiểm tra chia cho 0 (`NaN` trong `Vector3.normalize()`), kiểm tra `mesh !== null && mesh.parent !== null` trước khi truy cập, và kẹp giá trị bằng `THREE.MathUtils.clamp()`.
</constitutional_guardrails>

<input_variables>
- Chức năng / Khu vực đang gặp vấn đề: "{{ĐIỀN_TÊN_CHỨC_NĂNG_LỖI}}"
- Mô tả lỗi thực tế / Điểm bất hợp lý đang xảy ra khi chơi:
"""
{{MÔ_TẢ_HIỆN_TƯỢNG_LỖI_THỰC_TẾ_VÀO_ĐÂY}}
"""
- Giải pháp đề xuất (Copy từ `10_analyze_prompt.md` hoặc tự điền):
"""
{{DÁN_GIẢI_PHÁP_ĐỀ_XUẤT_VÀO_ĐÂY}}
"""
- Đường dẫn file code (hoặc dán code):
"{{MẶC_ĐỊNH: index.html HOẶC DÁN CODE VÀO ĐÂY}}"
</input_variables>

<reasoning_protocol>
1. `<root_cause>`: Chỉ đích danh dòng code / công thức gây ra lỗi trong đúng 1-2 câu.
2. `<side_effect_check>`: Xác nhận bản vá không làm gãy hệ thống tính điểm, HUD hay trạng thái `GAMEOVER`.
3. Thực thi bản vá trực tiếp vào mã nguồn.
</reasoning_protocol>
</fix_prompt_8b>
```

---

### 🗑️ PROMPT 8C: GỠ BỎ TÍNH NĂNG THỪA / GÂY LỖI KHỎI THREE.JS (CLEAN REMOVAL)

```xml
<fix_prompt_8c mode="CLEAN_FEATURE_REMOVAL">
<system_role>
Bạn là Senior WebGL Code Refactoring Specialist.
</system_role>

<constitutional_guardrails>
1. THU HỒI TRIỆT ĐỂ KHỎI SCENE & DOM: Xóa toàn bộ `THREE.Mesh`, `THREE.Light`, mảng quản lý, hàm `update`, sự kiện bàn phím/chuột và thẻ HTML HUD thuộc tính năng bị xóa.
2. ZERO DEAD-REFERENCE: Quét toàn bộ file để chắc chắn không còn lệnh nào gọi tới biến hoặc hàm vừa xóa (0 lỗi `ReferenceError` hay `TypeError` trên DevTools Console).
3. BẢO TOÀN PHẦN CÒN LẠI: Mọi cơ chế khác phải tiếp tục chạy mượt 60 FPS.
</constitutional_guardrails>

<input_variables>
- Tên tính năng cần gỡ bỏ: "{{ĐIỀN_TÊN_TÍNH_NĂNG_CẦN_XÓA}}"
- Hành vi mong muốn của game sau khi gỡ bỏ: "{{ĐIỀN_TRẠNG_THÁI_MONG_MUỐN}}"
- Đường dẫn file code: "{{MẶC_ĐỊNH: index.html HOẶC DÁN CODE}}"
</input_variables>

<output_contract>
Liệt kê ngắn gọn các hàm/biến đã dọn dẹp và cập nhật mã nguồn hoàn chỉnh, sạch sẽ.
</output_contract>
</fix_prompt_8c>
```
