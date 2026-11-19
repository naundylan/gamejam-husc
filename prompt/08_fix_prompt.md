# 08. FIX PROMPT (BỘ 3 PROMPT CON: BỔ SUNG / SỬA ĐỔI / XÓA TÍNH NĂNG LỚN)

## 📌 1. Mục Đích Sử Dụng
* Trong quá trình thi 150 phút, sau khi có bản game chạy thử đầu tiên (hoặc sau khi dùng `10_analyze_prompt.md` để chấm điểm thử), bạn sẽ phát hiện:
  - **Thiếu tiêu chí ăn điểm**: Cần **BỔ SUNG (ADD)** thêm 1 cơ chế, 1 loại quái, hệ thống Combo, hoặc hiệu ứng Juice.
  - **Gameplay bất hợp lý hoặc có Bug logic**: Cần **SỬA (MODIFY/FIX)** lại công thức tính điểm, độ khó, hoặc sửa lỗi va chạm.
  - **Tính năng rườm rà / Gây lỗi**: Cần **XÓA (REMOVE)** sạch một tính năng thừa để game gọn và mượt hơn.
* **Đặc điểm sống còn của bộ Fix Prompt này**: Được trang bị **"Khóa Cô Lập Phẫu Thuật (Strict Code Isolation Guardrails)"** — bắt buộc AI chỉ được can thiệp đúng phạm vi chức năng được chỉ định, **cấm tuyệt đối việc sửa 1 tính năng mà làm hỏng hay mất các tính năng đang chạy tốt khác!**

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Nhận Input từ**:
  - Báo cáo đánh giá và đề xuất của **`10_analyze_prompt.md`** (hoặc **`09_performance_prompt.md`**).
  - Kết hợp với ngữ cảnh cuộc hội thoại hiện tại + File Source Code (`index.html` / `.js` / `.cs`).
* **Lưu ý phân biệt**:
  - Nếu cần thêm/sửa/xóa **cả một chức năng, cơ chế gameplay, hay lỗi logic lớn** ➡️ Dùng file **`08_fix_prompt.md`** này.
  - Nếu chỉ cần chỉnh sửa **chi tiết nhỏ về giao diện UI, màu sắc, cỡ chữ, vị trí nút bấm** ➡️ Dùng file **`11_detail_prompt.md`**.

---

## 📋 3. BỘ 3 PROMPT CON THEO LỰA CHỌN (CHỌN ĐÚNG PROMPT CẦN DÙNG)

### ➕ PROMPT 8A: BỔ SUNG TÍNH NĂNG MỚI (ADD FEATURE PROMPT)
*(Dùng khi `10_analyze_prompt.md` báo thiếu tiêu chí chấm điểm hoặc bạn muốn thêm cơ chế mới vào game)*

```text
=== [FIX PROMPT 8A: BỔ SUNG TÍNH NĂNG MỚI - STRICT ADDITION MODE] ===
Bạn là Senior Gameplay Engineer. Hãy dựa vào ngữ cảnh cuộc hội thoại và Source Code hiện tại của dự án để BỔ SUNG MỘT TÍNH NĂNG MỚI.

🔒 QUY TẮC KHOANH VÙNG & BẢO TOÀN CODE (MANDATORY GUARDRAILS):
1. BẢO TOÀN 100% LOGIC CŨ: Tuyệt đối KHÔNG xóa, không viết lại thu gọn (không dùng comment `// ... existing code ...` làm mất code), và không làm thay đổi hành vi của các tính năng đang hoạt động bình thường.
2. THIẾT KẾ MODULE HÓA: Viết tính năng mới thành các hàm/biến độc lập, chỉ móc nối (hook) vào vòng lặp chính (`update()`, `render()`, `resetGame()`) tại đúng các điểm giao tiếp cần thiết.
3. ĐỒNG BỘ TRẠNG THÁI: Mọi biến mới sinh ra của tính năng này BẮT BUỘC phải được khởi tạo sạch sẽ và được reset về giá trị gốc bên trong hàm `resetGame() / Restart (Phím R)`.
4. TÍCH HỢP SẴN JUICE & AUDIO: Tính năng mới thêm vào phải kèm ngay hiệu ứng âm thanh (Web Audio Synth / SoundManager) và phản hồi thị giác (Particle / Shake / Flash) để đảm bảo điểm Trải nghiệm (20đ).

=== [ĐẶC TẢ TÍNH NĂNG MỚI CẦN BỔ SUNG] ===
- Tên chức năng mới: "[ĐIỀN TÊN CHỨC NĂNG - VD: Hệ thống Combo Nhân Điểm & Nộ Khí / Hoặc Quái Boss Xuất Hiện Mỗi 60 Giây]"
- Mô tả chi tiết cơ chế hoạt động (Copy từ đề xuất của Analyze Prompt hoặc tự điền):
"""
[DÁN ĐẶC TẢ CHI TIẾT CHỨC NĂNG MỚI: ĐIỀU KIỆN KÍCH HOẠT, CÔNG THỨC TOÁN HỌC, TÁC ĐỘNG LÊN GAMEPLAY, HIỂN THỊ LÊN UI...]
"""
- File code cần can thiệp (Nếu dùng trong Agent như Antigravity thì ghi đường dẫn file; nếu dùng Chatbot web thì dán code vào dưới):
"[ĐIỀN ĐƯỜNG DẪN FILE HOẶC DÁN CODE VÀO ĐÂY]"

=== [YÊU CẦU ĐẦU RA] ===
1. Chỉ rõ ngắn gọn trong 3 gạch đầu dòng: Bạn sẽ thêm biến gì, hàm gì, và gắn vào đâu trong Game Loop.
2. Thực thi cập nhật trực tiếp vào file code (hoặc xuất đoạn code đầy đủ hoàn chỉnh, chạy được ngay không một lỗi syntax).
```

---

### 🛠️ PROMPT 8B: SỬA LỖI LOGIC / ĐIỀU CHỈNH GAMEPLAY (MODIFY & BUGFIX PROMPT)
*(Dùng khi một tính năng chạy sai ý đồ, bị bug, hoặc cân bằng game chưa hợp lý)*

```text
=== [FIX PROMPT 8B: SỬA LỖI & ĐIỀU CHỈNH CHỨC NĂNG - SURGICAL FIX MODE] ===
Bạn là Principal Game Debugger & Gameplay Balancer. Hãy dựa vào ngữ cảnh cuộc hội thoại và Source Code hiện tại để SỬA ĐỔI / KHẮC PHỤC triệt để vấn đề dưới đây.

🔒 QUY TẮC KHOANH VÙNG CÔ LẬP (SURGICAL ISOLATION RULES):
1. CHỈ SỬA ĐÚNG VÙNG BỊ LỖI: Khoanh vùng chính xác hàm, công thức hoặc điều kiện `if/else` gây ra vấn đề. Tuyệt đối KHÔNG đụng chạm hay thay đổi cấu trúc các phần không liên quan.
2. KIỂM TRA HIỆU ỨNG PHỤ (NO SIDE-EFFECTS): Trước khi sửa, phải kiểm tra xem biến bị sửa có đang được dùng bởi hệ thống UI, tính điểm hay va chạm nào khác không để tránh sửa chỗ này làm hỏng chỗ kia.
3. CHỐNG KẸT BIÊN (EDGE-CASE SAFE): Luôn dùng `Math.max`, `Math.min`, kiểm tra `null/undefined` và chia cho `0` (`NaN`) khi sửa công thức toán học.

=== [THÔNG TIN VẤN ĐỀ & GIẢI PHÁP ĐỀ XUẤT] ===
- Khu vực / Chức năng cần sửa: "[ĐIỀN TÊN CHỨC NĂNG ĐANG LỖI - VD: Cơ chế va chạm đạn / Hoặc Tốc độ tăng độ khó của Spawner]"
- Mô tả lỗi thực tế / Điểm bất hợp lý đang xảy ra:
"""
[MÔ TẢ HIỆN TƯỢNG THỰC TẾ - VD: Khi đạn bay quá nhanh thì xuyên qua quái không gây sát thương / Hoặc sau 30 giây quái ra quá đông làm người chơi chết ngay không kịp thở]
"""
- Giải pháp đề xuất (Copy từ Analyze Prompt hoặc tự điền định hướng):
"""
[DÁN GIẢI PHÁP ĐỀ XUẤT - VD: Mở rộng bán kính kiểm tra va chạm hoặc dùng kiểm tra đoạn thẳng / Giảm tốc độ tăng quái xuống một nửa và giới hạn tối đa 35 con]
"""
- File code / Đoạn code hiện tại:
"[ĐIỀN ĐƯỜNG DẪN FILE HOẶC DÁN CODE VÀO ĐÂY]"

=== [YÊU CẦU ĐẦU RA] ===
1. Giải thích đúng 1 câu: Nguyên nhân gốc rễ (Root Cause) nằm ở dòng/hàm nào.
2. Áp dụng bản sửa lỗi chính xác vào file code để khắc phục 100% vấn đề ngay lập tức.
```

---

### 🗑️ PROMPT 8C: XÓA / GỠ BỎ TÍNH NĂNG (CLEAN REMOVAL PROMPT)
*(Dùng khi một tính năng gây rối rắm, làm tụt FPS hoặc không còn phù hợp với hướng đi của game)*

```text
=== [FIX PROMPT 8C: GỠ BỎ TÍNH NĂNG SẠCH SẼ - CLEAN REMOVAL MODE] ===
Bạn là Senior Code Refactoring Engineer. Hãy gỡ bỏ hoàn toàn tính năng được chỉ định dưới đây ra khỏi dự án.

🔒 QUY TẮC GỠ BỎ AN TOÀN (ZERO DEAD-REFERENCE RULES):
1. DỌN SẠCH TẬN GỐC: Xóa toàn bộ biến trạng thái, hàm cập nhật (`update`), hàm vẽ (`render`), sự kiện phím bấm và phần tử UI liên quan đến tính năng bị xóa.
2. KHÔNG ĐỂ LẠI THAM CHIẾU CHẾT (NO UNDEFINED ERRORS): Kiểm tra toàn bộ file xem còn nơi nào gọi đến hàm hoặc biến vừa xóa không; nếu có phải tháo gỡ êm ái để Console tuyệt đối không báo lỗi `ReferenceError` hay `NullReferenceException`.
3. GIỮ NGUYÊN CÁC PHẦN CÒN LẠI: Mọi tính năng khác của game phải tiếp tục chạy trơn tru như chưa từng có cuộc chia ly.

=== [THÔNG TIN TÍNH NĂNG CẦN XÓA] ===
- Tên tính năng cần gỡ bỏ: "[ĐIỀN TÊN TÍNH NĂNG CẦN XÓA]"
- Trạng thái mong muốn sau khi xóa: "[ĐIỀN - VD: Xóa bỏ cơ chế nạp đạn thủ công, cho phép người chơi bắn liên tục không giới hạn băng đạn]"
- File code cần can thiệp: "[ĐIỀN ĐƯỜNG DẪN FILE HOẶC DÁN CODE VÀO ĐÂY]"

=== [YÊU CẦU ĐẦU RA] ===
1. Liệt kê các biến và hàm đã được dọn dẹp.
2. Cập nhật file code sạch sẽ, đảm bảo game khởi chạy mượt mà không lỗi.
```
