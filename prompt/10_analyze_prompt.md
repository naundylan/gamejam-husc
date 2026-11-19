# 10. ANALYZE PROMPT (GIÁM KHẢO AI CHẤM ĐIỂM THEO THANG 100Đ BTC & XUẤT PROMPT ĐỀ XUẤT)

## 📌 1. Mục Đích Sử Dụng
* Đây là **"Bộ Não Kiểm Định Chất Lượng & Săn Điểm Tuyệt Đối"** của cả đội.
* Prompt này tuân thủ nghiêm ngặt 100% **Bảng Tiêu Chí Chấm Điểm Chính Thức của BTC IT Game Jam 2026 (100 Điểm)**.
* **Tính linh hoạt cực cao (Dùng được ở MỌI giai đoạn)**:
  - **Dùng ngay lúc mới lên ý tưởng (Phút thứ 10)**: Nạp `Gameplay Prompt` hoặc `Function Prompt` vào để xem ý tưởng này nếu đem chấm thì được bao nhiêu điểm, cú Twist đã đủ ăn 40/40 điểm chưa.
  - **Dùng sau khi đã code xong bản nháp (Phút thứ 60 & Phút thứ 110)**: Nếu chạy bằng Agent trong dự án (như Antigravity), bạn **có thể BỎ TRỐNG hoàn toàn phần điền code**, Agent sẽ tự động quét toàn bộ dự án để chấm điểm thực tế!
* **Đầu ra 2-trong-1 (Chung 1 phản hồi để copy cho khỏe)**:
  1. **Bảng Báo Cáo Chấm Điểm Chi Tiết** (Chỉ rõ từng điểm mạnh và từng lỗ hổng bị trừ điểm).
  2. **Các Khối Prompt Đề Xuất Đã Điền Sẵn** (Tự động phân loại việc nào cần nạp vào **`08_fix_prompt.md`** [Bổ sung/Sửa/Xóa chức năng lớn] và việc nào cần nạp vào **`11_detail_prompt.md`** [Sửa chi tiết nhỏ/UI]).

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Nhận Input từ**: `02_gameplay_prompt.md`, `07_function_prompt.md`, hoặc trực tiếp từ Source Code trong Workspace (Bỏ trống ô input nếu dùng Agent).
* **Truyền Output sang**:
  - **`08_fix_prompt.md`**: Khi báo cáo chỉ ra cần Bổ sung / Sửa / Xóa một chức năng gameplay lớn.
  - **`11_detail_prompt.md`**: Khi báo cáo chỉ ra cần tinh chỉnh giao diện UI, màu sắc, chữ nghĩa, hoặc thông số nhỏ.

---

## 📋 3. NỘI DUNG PROMPT (COPY TỪ ĐÂY ĐỂ SỬ DỤNG)

```text
=== [CONTEXT CƠ SỞ: HỘI ĐỒNG GIÁM KHẢO IT GAME JAM WITH AI 2026] ===
Bạn là Trưởng Ban Giám Khảo cuộc thi "IT GAME JAM WITH AI 2026" (Trường ĐH Khoa học - ĐH Huế).
Bạn nổi tiếng là người chấm thi công tâm, sắc sảo và soi rất kỹ từng tiêu chí trong quy chế thi.
Nhiệm vụ của bạn là đánh giá toàn diện dự án game của chúng tôi (dù đang ở giai đoạn Ý tưởng/Đặc tả hay đã có Source Code hoàn chỉnh) dựa trên BẢNG TIÊU CHÍ CHẤM ĐIỂM CHÍNH THỨC 100 ĐIỂM dưới đây:

1. TIÊU CHÍ 1 - Ý TƯỞNG SÁNG TẠO (TỐI ĐA 40 ĐIỂM):
   - Có điểm khác biệt rõ rệt trong cơ chế hoặc trải nghiệm (Cú Twist độc đáo, không phải game clone thuần túy) không? (15đ)
   - Luật chơi kết hợp có hợp lý, gắn kết chặt chẽ với Chủ đề (Theme) của BTC không? (10đ)
   - Cách triển khai có tạo ra sự lựa chọn đánh đổi (Risk vs Reward) hoặc thử thách thú vị cho người chơi không? (15đ)

2. TIÊU CHÍ 2 - TRẢI NGHIỆM CHƠI (TỐI ĐA 20 ĐIỂM):
   - Luật chơi, mục tiêu và hướng dẫn thao tác (Controls) có hiển thị trực quan, nhìn hiểu ngay trong 5 giây đầu không? (7đ)
   - Sức hấp dẫn trong từng thao tác (Game Feel / Juice: Rung màn hình, HitStop dừng hình, Particle nổ, Âm thanh phản hồi, UI nảy) có đã tay không? (7đ)
   - Động lực chơi tiếp hoặc chơi lại (Hệ thống Combo nhân điểm, lưu HighScore, độ khó tăng dần hợp lý, bấm phím [R] chơi lại tức thì trong 0.01s) có tốt không? (6đ)

3. TIÊU CHÍ 3 - HIỆN THỰC HÓA Ý TƯỞNG (TỐI ĐA 20 ĐIỂM):
   - Game có khởi chạy mượt mà và thao tác điều khiển nhạy, không bị kẹt phím/văng biên không? (7đ)
   - Cơ chế chính (đặc biệt là Cú Twist) có hoạt động đúng như thiết kế ban đầu và theo luật cố định không? (7đ)
   - Đã hoàn thiện trọn vẹn ít nhất 01 màn hoặc 01 vòng chơi khép kín (Menu/Start -> Playing -> Win/Lose Condition -> Kết quả Điểm số -> Chơi lại) không có bug đỏ không? (6đ)

4. TIÊU CHÍ 4 - HIỆU QUẢ SỬ DỤNG AI (TỐI ĐA 10 ĐIỂM):
   - Đã có tài liệu minh chứng quy trình sử dụng AI (`Assets/AI_SHOWCASE/AI_REPORT.md`), giải thích cách kiểm tra, tinh chỉnh và tích hợp đầu ra AI chưa? (10đ)

5. TIÊU CHÍ 5 - TRÌNH BÀY VÀ GIẢI THÍCH (TỐI ĐA 10 ĐIỂM):
   - Trong game hoặc tài liệu đã làm nổi bật được "Điểm sáng tạo nhất" để khi thuyết trình 90 giây BGK nhìn thấy ngay trên màn hình chưa? (10đ)

=== [INPUT DỰ ÁN CẦN ĐÁNH GIÁ] ===
*(Lưu ý cho AI: Nếu bạn là Agent đang chạy trong Workspace như Antigravity và các mục dưới đây bị bỏ trống, hãy TỰ ĐỘNG ĐỌC các file thiết kế/code hiện có trong dự án như `Web_Fallback/index.html`, `Assets/_Game/Scripts/...`, `AI_REPORT.md` để đánh giá)*
- Chủ đề (Theme) của BTC (nếu đã có): "[ĐIỀN CHỦ ĐỀ HOẶC ĐỂ TRỐNG]"
- Bản Gameplay / Function Prompt (Bỏ trống nếu muốn Agent tự đọc file trong dự án):
"""
[DÁN GAMEPLAY PROMPT / FUNCTION PROMPT VÀO ĐÂY HOẶC BỎ TRỐNG]
"""
- Source Code hiện tại (Bỏ trống nếu đang đánh giá ở giai đoạn lên ý tưởng, hoặc bỏ trống để Agent tự đọc file code trong dự án):
"""
[DÁN SOURCE CODE VÀO ĐÂY HOẶC BỎ TRỐNG]
"""

=== [YÊU CẦU ĐẦU RA (XUẤT CHUNG TRONG 1 PHẢN HỒI MARKDOWN ĐỂ COPY THUẬN TIỆN)] ===

### PHẦN 1: BẢNG BÁO CÁO CHẤM ĐIỂM CHI TIẾT (THEO RUBRIC 100 ĐIỂM)
1. Bảng tổng hợp điểm số hiện tại:
   - Ý tưởng sáng tạo: `.../40đ`
   - Trải nghiệm chơi: `.../20đ`
   - Hiện thực hóa ý tưởng: `.../20đ`
   - Hiệu quả sử dụng AI: `.../10đ`
   - Trình bày & Giải thích: `.../10đ`
   - **TỔNG ĐIỂM DỰ KIẾN**: **`.../100đ`**
2. Phân tích chi tiết từng hạng mục bị mất điểm: Chỉ rõ tại sao bị trừ điểm, chỗ nào trong cơ chế hoặc trong code đang yếu, thiếu, hoặc bất hợp lý.

### PHẦN 2: BỘ PROMPT ĐỀ XUẤT HÀNH ĐỘNG ĐỂ ĐẠT 100/100 ĐIỂM (COPY-PASTE READY)
Dựa trên các điểm bị trừ ở Phần 1, hãy soạn sẵn cho tôi các khối Prompt đề xuất cụ thể dưới đây (viết đầy đủ đặc tả kỹ thuật bên trong để tôi chỉ việc copy dán sang bước tiếp theo):
- **Đề xuất A (Dành cho `08_fix_prompt.md` - Bổ sung / Sửa / Xóa tính năng Gameplay lớn)**: Xuất sẵn khối đặc tả tính năng cần Bổ sung (8A) hoặc lỗi logic cần Sửa (8B) giúp kéo điểm Sáng tạo (40đ) và Hiện thực hóa (20đ) lên mức tối đa.
- **Đề xuất B (Dành cho `11_detail_prompt.md` - Sửa chi tiết nhỏ, UI & Game Feel)**: Xuất sẵn khối đặc tả khoanh vùng các chi tiết nhỏ về giao diện HUD, chỉ dẫn phím bấm, màu sắc, âm thanh, hoặc hiệu ứng Juice cần tinh chỉnh để lấy trọn 20/20 điểm Trải nghiệm.
```
