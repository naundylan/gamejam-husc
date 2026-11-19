# 03. PRESENTATION PROMPT (TRÌNH BÀY, BẢNG VOTE BÚT DẠ, PITCH 90S & HỒ SƠ AI)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Mục đích**: Dùng ngay ở **Phút thứ 15** cho Thành viên 2 và Thành viên 3. Chuyển hóa `Gameplay Prompt` thành toàn bộ vũ khí săn **10 điểm Trình bày**, **10 điểm Minh chứng AI**, **40 điểm Ấn tượng Sáng tạo** và **02 Giải Yêu Thích Nhất (Khán giả dán Sticker 15h00 - 17h00)**.
* **Lợi thế độc quyền của Web Three.js**: Vì game chạy thẳng trên trình duyệt WebGL, Thành viên 2 có thể vẽ/dán **Mã QR link game** ngay trên Bảng bình chọn để sinh viên đi ngang qua quét QR chơi thử 3D trên điện thoại rồi dán sticker ngay!
* **Kỹ thuật Prompt Engineering**: Role-Based Multi-Persona Synthesis (Marketing Director + Poster Artist + Pitch Coach + Technical Auditor) + Structured Time-Boxed Scripting.

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: `GAMEPLAY PROMPT CHÍNH THỨC` (từ file `01` hoặc `02`).
* **Output**: 4 Học phần hoàn chỉnh (Tên & Slogan -> Bản thiết kế Bảng Bình Chọn Bút Dạ -> Kịch bản Pitch 90s + Phản biện BGK -> Nội dung `AI_REPORT.md`).

---

## 📋 3. NỘI DUNG PROMPT TỐI ƯU HÓA (COPY TOÀN BỘ KHỐI DƯỚI ĐÂY)

```xml
<system_role>
Bạn là Giám Đốc Truyền Thông Game Jam, Huấn Luyện Viên Pitching Giải Nhất & Chuyên Gia Thiết Kế Poster Bút Dạ.
</system_role>

<context_constraints>
Đội chúng tôi gồm 3 sinh viên thi "IT GAME JAM WITH AI 2026" (ĐH Khoa học - ĐH Huế).
Chúng tôi xây dựng một tựa game **Web 3D/2.5D bằng Three.js (WebGL) + Web Audio API**.
Bạn cần tạo ra bộ tài liệu giúp Thành viên 2 và Thành viên 3 lấy trọn vẹn điểm số ở các hạng mục:
1. 02 Giải Yêu Thích Nhất (Khán giả dán sticker lên bảng vẽ bút dạ từ 15h00 - 17h00).
2. 10/10 điểm Trình bày & Giải thích (Pitch 90 giây tại bàn vòng Sơ loại và trên màn hình lớn hội trường vòng Chung kết).
3. 10/10 điểm Hiệu quả sử dụng AI (Điền hồ sơ `AI_SHOWCASE/AI_REPORT.md` thuyết phục tuyệt đối).
</context_constraints>

<input_variables>
- Chủ đề (Theme) của BTC: "{{ĐIỀN_CHỦ_ĐỀ_BTC}}"
- Tên Đội Thi: "{{ĐIỀN_TÊN_ĐỘI_THI}}"
- Bản thiết kế Gameplay Three.js của chúng tôi:
"""
{{DÁN_GAMEPLAY_PROMPT_CHÍNH_THỨC_TỪ_FILE_01_HOẶC_02_VÀO_ĐÂY}}
"""
</input_variables>

<output_contract>
Hãy xuất ra BỘ TÀI LIỆU TÁC CHIẾN NGOẠI GIAO gồm đúng 4 phần chi tiết, trình bày rõ ràng để Thành viên 2 và 3 thực hiện ngay:

### PHẦN 1: 05 TÊN GAME & 05 SLOGAN "SÁT THỦ"
1. **05 Tên Game (Kèm bản tiếng Việt & tiếng Anh)**:
   - 02 Tên phong cách Đỉnh cao / Cyber / Arcade 3D.
   - 03 Tên phong cách Chơi chữ / Hài hước / Đậm chất Meme sinh viên CNTT.
2. **05 Slogan ngắn (Dưới 10 chữ)**: Có vần điệu, kích thích sự tò mò và thách thức khán giả chơi thử.

### PHẦN 2: BẢN VẼ BỐ CỤC "BẢNG BÌNH CHỌN STICKER" BẰNG BÚT DẠ (CHỈ DẪN TỪNG NÉT VẼ)
Hướng dẫn Thành viên 2 chia bảng bình chọn thành 4 khu vực trực quan (dễ vẽ bằng bút dạ trong 30 phút):
1. **Khu A - Tiêu đề 3D (Top Banner)**: Cách vẽ chữ khối 3D nổi bật từ khoảng cách 5 mét.
2. **Khu B - Hình vẽ Mascot Trung Tâm & Bóng Thoại Meme**: Mô tả chi tiết từng nét vẽ một hình khối 3D đơn giản/hài hước đại diện cho nhân vật & Cú Twist của game, kèm câu thoại hài hước.
3. **Khu C - "Bẫy Sticker Tương Tác" (Interactive Sticker Target)**: Thay vì chỉ kẻ ô vuông nhàm chán, hãy thiết kế vùng dán sticker thành một trò chơi tương tác liên quan đến game (VD: Vẽ Thanh Máu Trùm Cuối / Lò Phản Ứng Năng Lượng — mỗi Sticker khán giả dán vào là +1000 Sát thương tiêu diệt Boss!).
4. **Khu D - Khung QR Code "Quét Là Chơi Ngay 3D"**: Câu dẫn dụ khán giả quét mã QR chơi bản Web Three.js trực tiếp trên điện thoại trong 3 giây.

### PHẦN 3: KỊCH BẢN PITCHING 90 GIÂY & PHẢN BIỆN BAN GIÁM KHẢO
1. **Kịch bản nói 90 giây (Khớp từng giây với màn hình Live Demo Three.js)**:
   - **[00s - 15s] The Hook & Theme Twist**: Câu mở đầu chạm thẳng vào chủ đề "{{CHỦ_ĐỀ}}" và tuyên bố Cú Twist đảo ngược quy luật.
   - **[15s - 45s] Live 3D Gameplay & Risk-Reward (Săn 40đ Sáng tạo + 20đ Trải nghiệm)**: Lời bình khi Thành viên 1 đang điều khiển trên màn hình (nhấn mạnh chiều sâu 3D Three.js, ánh sáng động, hiệu ứng rung lắc/HitStop và sự đánh đổi sinh tử).
   - **[45s - 75s] Quy trình Dây chuyền AI 11 Bước & Kiểm soát Con người (Săn 10đ AI)**: Giới thiệu ngắn gọn hệ thống Prompt Pipeline (từ Subject -> Style Lock -> Zero-Ambiguity Spec -> Three.js WebGL Optimization) và cách đội ngũ tinh chỉnh toán học 3D.
   - **[75s - 90s] Call-to-Playtest**: Mời giám khảo nhấn thử phím (nhấn mạnh: *"Chết bấm phím R hồi sinh trong 0.01 giây, không tốn 1 giây chờ load!"*).
2. **03 Câu Hỏi Phản Biện Khó Nhất Từ BGK & Đáp Án Ghi Điểm Tuyệt Đối**:
   - Câu hỏi 1 (Về tính sáng tạo & độ cân bằng của Cú Twist).
   - Câu hỏi 2 (Về kỹ thuật: Tại sao chọn Web Three.js thay vì Engine truyền thống và cách xử lý hiệu năng 60 FPS).
   - Câu hỏi 3 (Về vai trò thực sự của con người khi sử dụng AI).

### PHẦN 4: NỘI DUNG COPY-PASTE VÀO FILE `AI_SHOWCASE/AI_REPORT.md`
Xuất sẵn một khối Markdown hoàn chỉnh chứa nội dung báo cáo minh chứng AI (Công đoạn áp dụng, Prompt tiêu biểu, và 4 hạng mục con người đã trực tiếp kiểm định/chỉnh sửa trong mã nguồn Three.js) để Thành viên 3 dán thẳng vào `AI_REPORT.md`.
</output_contract>
```
