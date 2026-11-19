# 03. PRESENTATION PROMPT (TRÌNH BÀY, SLOGAN, BẢNG BÌNH CHỌN & PITCH 90S)

## 📌 1. Mục Đích Sử Dụng
* Ngay sau khi chốt được `Gameplay Prompt` (ở phút thứ 10 - 15), trong khi **Thành viên 1** bắt đầu cho AI code game, thì **Thành viên 2** dùng ngay Prompt này (tốt nhất chạy trên **Grok**, **ChatGPT-4o** hoặc **Claude**) để lấy trọn bộ nguyên liệu "ngoại giao & săn giải":
  1. **Tên Game & Slogan cực kêu** (vừa hợp đề, vừa hài hước/bắt trend sinh viên).
  2. **Bản thiết kế Bảng Bình Chọn (Sticker Board)** chi tiết đến từng nét vẽ bút dạ để Thành viên 2 ngồi vẽ từ phút 20 đến phút 80 ➡️ Nhắm thẳng vào **02 Giải Yêu Thích Nhất** (bình chọn từ 15h00 - 17h00).
  3. **Kịch bản Thuyết trình (Pitching 90 giây)** cho vòng Sơ loại tại bàn và vòng Chung kết trên sân khấu lớn ➡️ Lấy trọn **10 điểm Trình bày & Giải thích**.
  4. **Bản nháp Báo cáo Minh chứng AI** ➡️ Bảo toàn **10 điểm Hiệu quả sử dụng AI**.

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Đầu vào (Input)**: Bản `GAMEPLAY PROMPT CHÍNH THỨC` lấy từ `01_subject_prompt.md` hoặc `02_gameplay_prompt.md`.
* **Đầu ra (Output)**: Bộ hồ sơ 4 phần dành riêng cho Thành viên 2 và Thành viên 3 thực thi độc lập mà không cần chạm vào máy tính của Thành viên 1.

---

## 📋 3. NỘI DUNG PROMPT (COPY TỪ ĐÂY ĐỂ SỬ DỤNG)

```text
=== [CONTEXT CƠ SỞ: IT GAME JAM 2026 - HUSC] ===
Bạn là Giám Đốc Sáng Tạo & Chuyên Gia Pitching Game Jam.
Đội chúng tôi gồm 3 sinh viên tham gia "IT GAME JAM WITH AI 2026" tại Trường ĐH Khoa học - ĐH Huế.
Trong cuộc thi này, ngoài chất lượng code, có 3 mỏ điểm cực lớn mà bạn phải giúp chúng tôi chinh phục tuyệt đối:
1. Giải Yêu Thích Nhất (Khán giả là sinh viên trong trường đi xem từ 15h00 - 17h00 sẽ được phát Sticker để dán lên "Bảng Bình Chọn" do đội tự vẽ bằng bút dạ của BTC).
2. Tiêu chí Trình bày & Giải thích (10/100 điểm): Giới thiệu rõ cách chơi, điểm sáng tạo (Twist) và trả lời câu hỏi BGK trong 90 giây tại vòng Sơ loại và vòng Chung kết màn hình lớn.
3. Tiêu chí Hiệu quả sử dụng AI (10/100 điểm): Giải thích hợp lý quy trình dùng AI và sự can thiệp tinh chỉnh của con người.

=== [INPUT: GAMEPLAY PROMPT CỦA ĐỘI] ===
- Chủ đề của BTC: "[ĐIỀN CHỦ ĐỀ BTC]"
- Tên đội thi: "[ĐIỀN TÊN ĐỘI THI]"
- Bản thiết kế Gameplay của chúng tôi:
"""
[DÁN TOÀN BỘ GAMEPLAY PROMPT ĐÃ CHỐT TỪ FILE 01 HOẶC 02 VÀO ĐÂY]
"""

=== [NHIỆM VỤ CỦA BẠN] ===
Dựa trên Gameplay trên, hãy xuất ra cho đội tôi BỘ TÀI LIỆU TÁC CHIẾN NGOẠI GIAO gồm đúng 4 phần chi tiết sau:

### PHẦN 1: ĐẶT TÊN GAME & SLOGAN "HÚT VOTE"
1. Đề xuất 05 Tên Game (Gồm cả tiếng Việt và tiếng Anh):
   - 2 tên phong cách Ngầu / Kịch tính / Arcade.
   - 3 tên phong cách Hài hước / Chơi chữ / Đậm chất meme sinh viên IT.
2. Đề xuất 05 Slogan ngắn (dưới 10 chữ) cực kỳ bắt tai để viết to lên Bảng Bình Chọn và màn hình Title của game.

### PHẦN 2: BẢN VẼ THIẾT KẾ "BẢNG BÌNH CHỌN STICKER" (BẰNG BÚT DẠ)
Hãy hướng dẫn chi tiết cho Thành viên 2 (không cần giỏi hội họa vẫn vẽ đẹp bằng bút dạ) cách bố cục tấm bảng bình chọn thành 4 khu vực:
- Khu vực Header (Trên cùng): Cách viết Tên Game & Tên Đội sao cho nổi bật từ khoảng cách 5 mét.
- Khu vực Trung tâm (Mascot & Visual): Mô tả một hình vẽ nhân vật/biểu tượng siêu đơn giản bằng nét bút dạ (kèm câu thoại meme trong bóng thoại) thể hiện đúng Cú Twist của game.
- Khu vực Kêu gọi Hành động (Call-To-Action): Câu văn hài hước dụ khán giả dán sticker + Cách kẻ khung "VÙNG DÁN STICKER ĐỘT PHÁ" (Ví dụ: kẻ thành hình thanh máu Boss, mỗi sticker của khán giả là 1 đòn đánh Boss, hoặc bình sạc năng lượng...).
- Khu vực Mã QR (Nếu làm Web Game): Khung chữ dẫn dụ khán giả rút điện thoại quét QR chơi thử ngay tại chỗ.

### PHẦN 3: KỊCH BẢN THUYẾT TRÌNH (PITCHING 90 GIÂY) & BỘ CÂU HỎI PHẢN BIỆN BGK
1. Kịch bản nói 90 giây chia làm 4 mốc thời gian chuẩn xác:
   - [00s - 15s] Hook & Giải nghĩa Chủ đề: Câu chào ấn tượng + Cách đội biến chủ đề "[CHỦ ĐỀ]" thành góc nhìn độc đáo.
   - [15s - 45s] Trình diễn Cú Twist & Gameplay (Ăn 40đ Sáng tạo + 20đ Trải nghiệm): Lời thuyết minh khớp với lúc Thành viên 1 đang chơi live demo trên màn hình. Chỉ rõ sự đánh đổi (Risk vs Reward) và hiệu ứng Juice.
   - [45s - 75s] Minh chứng Sức mạnh AI & Dấu ấn Con người (Ăn 10đ AI): Giải thích ngắn gọn quy trình phối hợp hệ thống Prompt tuần tự và cách đội kiểm soát/tinh chỉnh code.
   - [75s - 90s] Lời mời Trải nghiệm (Call to Play): Mời BGK chạm tay vào phím chơi thử (nhấn mạnh thao tác dễ hiểu trong 3 giây và phím R chơi lại tức thì).
2. Dự đoán 03 Câu hỏi hóc búa nhất mà Ban Giám Khảo sẽ hỏi về tựa game này + Gợi ý câu trả lời thông minh, lễ phép, ghi điểm tuyệt đối.

### PHẦN 4: NỘI DUNG ĐIỀN NHANH VÀO BÁO CÁO AI_REPORT.MD
Viết sẵn 3 đoạn văn ngắn gọn, chuyên nghiệp để Thành viên 3 copy thẳng vào file báo cáo nộp BTC:
- Đoạn 1: Lý do lựa chọn kiến trúc và công cụ AI cho tựa game này.
- Đoạn 2: Minh chứng quá trình con người kiểm tra, sửa lỗi logic và cân bằng thông số (Balancing) từ đầu ra của AI.
- Đoạn 3: Giá trị cốt lõi giúp game vận hành theo luật cố định, ổn định 60 FPS.
```
