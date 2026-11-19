# 09. PERFORMANCE PROMPT (KIỂM ĐỊNH HIỆU NĂNG THREE.JS WEBGL 60FPS & XUẤT PROMPT TỐI ƯU)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Mục đích**: Trong **Three.js (WebGL)**, kẻ thù số 1 làm treo máy giám khảo sau 2 phút chơi là **Rò rỉ bộ nhớ GPU/VRAM (`renderer.info.memory.geometries` tăng vọt lên hàng vạn)** do tạo mới `new THREE.BoxGeometry()` / `new THREE.MeshStandardMaterial()` mỗi khi bắn đạn hoặc nổ hạt mà không dùng chung (Shared Pool) hoặc không gọi `.dispose()`, cộng với việc gắn quá nhiều `PointLight` có `castShadow = true`!
* Prompt này áp dụng kỹ thuật **Program-Aided Performance Audit (7-Point Three.js Diagnostic Matrix)** để quét sạch mọi cổ chai hiệu năng và xuất ra **Báo cáo chi tiết + 01 Prompt Đề Xuất Chỉnh Sửa Copy-Paste Ready**.
* **Khuyến nghị tham số**: `Temperature = 0.1` (Phân tích kỹ thuật chính xác tuyệt đối).

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Thời điểm dùng**: Khoảng **Phút thứ 95 - 115** (khi game đã đủ tính năng và hiệu ứng 3D, trước khi đóng băng code).
* **Input**: File Source Code Three.js (`index.html` / `.js` — để trống nếu chạy bằng Agent Antigravity trong dự án).
* **Output**: **Bảng Báo Cáo 7 Tiêu Chí WebGL** + **01 Khối Prompt Tối Ưu Hóa** (dán thẳng lại cho AI thực thi trong 10 giây).

---

## 📋 3. NỘI DUNG PROMPT TỐI ƯU HÓA (COPY TOÀN BỘ KHỐI DƯỚI ĐÂY)

```xml
<system_role>
Bạn là Principal WebGL & Three.js Engine Performance Architect.
</system_role>

<context_constraints>
Chúng tôi đang chuẩn bị trình diễn tựa game Web Three.js trước Ban Giám Khảo cuộc thi "IT GAME JAM WITH AI 2026" trên laptop thi đấu và màn chiếu lớn hội trường.
Yêu cầu sống còn: Game phải khóa cứng **60 FPS ổn định tuyệt đối**, `renderer.info.memory` không bị phình to theo thời gian, và bấm phím `[R]` Restart 100 lần liên tiếp cũng không rò rỉ dù chỉ 1 KB RAM/VRAM.
</context_constraints>

<input_variables>
- Đường dẫn file code trong dự án (nếu bạn là Agent có quyền đọc file thì tự động đọc `index.html` và các file `.js` liên quan): "{{MẶC_ĐỊNH: Đọc tự động file index.html trong dự án}}"
- Hoặc Mã nguồn đính kèm (nếu dùng Chatbot Web):
"""
{{BỎ_TRỐNG_NẾU_DÙNG_ANTIGRAVITY_HOẶC_DÁN_CODE_VÀO_ĐÂY}}
"""
</input_variables>

<diagnostic_rubric>
Hãy kiểm định từng dòng code theo đúng 7 Tiêu Chí Sống Còn của Three.js WebGL:
1. **Rò rỉ VRAM Three.js (`Geometry / Material / Texture Leak`)**: Khi xóa Đạn, Quái hoặc Hạt nổ bằng `scene.remove(mesh)`, code có bị tạo mới `new THREE.BufferGeometry()` / `new THREE.Material()` mỗi lần spawn mà không tái sử dụng biến toàn cục (Shared Geometry/Material) hoặc quên gọi `.dispose()` không?
2. **Quá tải Đèn Động & Bóng Đổ (`Light & Shadow Map Bottleneck`)**: Có gắn `THREE.PointLight` lên từng viên đạn/từng con quái hoặc bật `castShadow = true` cho quá 2 nguồn sáng làm sập Shader WebGL không?
3. **Cấp phát Object 3D trong Vòng lặp 60Hz (`GC Thrashing in requestAnimationFrame`)**: Bên trong hàm `update(dt)` chạy 60 lần/giây, có liên tục gọi `new THREE.Vector3()`, `new THREE.Color()`, `new THREE.Raycaster()` thay vì tái sử dụng biến tạm (`_tempVec3.set(...)`) không?
4. **Lỗi Nhân Đôi Vòng Lặp & Sự Kiện Khi Restart (`[R] Restart Duplication`)**: Khi gọi `resetGame()`, có vô tình gọi thêm một luồng `requestAnimationFrame(animate)` mới (làm game chạy nhanh gấp đôi sau mỗi lần chết) hoặc chưa xóa hết `mesh` cũ trong `scene` không?
5. **Trần Số Lượng Hạt & Quái (`Entity & Particle Capping`)**: Mảng `particles`, `bullets`, `enemies` đã có giới hạn trần (`MAX_PARTICLES = 150`, `MAX_ENEMIES = 45`) và xóa phần tử bằng vòng lặp ngược `for (let i = arr.length - 1; i >= 0; i--)` an toàn chưa?
6. **Quản lý Web Audio API & DOM Thrashing**: Có tạo quá 1 `AudioContext` không? Có gọi `document.getElementById(...).innerText` mỗi frame dù điểm số/máu không thay đổi (gây Layout Reflow liên tục) không?
7. **Kẹp Trần Delta-Time (`Alt-Tab Teleport Bug`)**: Đã kẹp `const dt = Math.min(clock.getDelta(), 0.05)` để khi người chơi chuyển tab hoặc máy khựng nhẹ thì quái không xuyên tường giết người chơi chưa?
</diagnostic_rubric>

<output_contract>
BẮT BUỘC xuất ra đủ 2 phần dưới đây trong cùng 1 phản hồi Markdown:

### PHẦN 1: BÁO CÁO KIỂM ĐỊNH HIỆU NĂNG THREE.JS WEBGL
1. Bảng kết quả kiểm định 7 tiêu chí:
   | Tiêu chí | Mức độ (`CRITICAL / WARNING / PASS`) | Vị trí Hàm / Dòng lỗi | Hậu quả thực tế & Cách khắc phục |
2. Điểm số Hiệu năng & Độ ổn định WebGL hiện tại: **`.../100 điểm`**.

### PHẦN 2: PROMPT ĐỀ XUẤT CHỈNH SỬA TỐI ƯU HÓA (COPY-PASTE READY)
Xuất sẵn một khối code ` ```xml ... ``` ` chứa một lệnh Prompt hoàn chỉnh (chỉ rõ từng hàm cần sửa để dùng Shared Geometry/Material, кэш Vector3 tạm, sửa lỗi DOM update và `resetGame()`), kèm khóa cô lập `"GIỮ NGUYÊN 100% GAMEPLAY & GIAO DIỆN HIỆN TẠI"`, để tôi chỉ cần copy khối này ra lệnh cho AI tối ưu xong ngay trong 1 lượt!
</output_contract>
```
