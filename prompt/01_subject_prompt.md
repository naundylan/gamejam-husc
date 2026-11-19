# 01. SUBJECT PROMPT (PROMPT CHỦ ĐỀ -> SINH GAMEPLAY PROMPT)

## 📌 1. Mục Đích Sử Dụng
* Dùng ngay tại **Phút thứ 00:00** khi Ban Tổ Chức vừa công bố Chủ đề (Theme) của cuộc thi.
* Giúp biến một chủ đề ngắn gọn/trừu tượng của BTC thành một **Gameplay Prompt hoàn chỉnh** đã được cài cắm sẵn toàn bộ tiêu chí ăn điểm tuyệt đối (40đ Sáng tạo Twist, 20đ Trải nghiệm Juice, 20đ Vòng chơi hoàn chỉnh 150 phút).
* Bạn có thể **spam prompt này trên 2-3 tab AI cùng lúc** (Claude, ChatGPT, Grok, Antigravity) để lấy ra các phương án khác nhau và chọn ra 1 concept ưng ý nhất trong vòng 3 phút đầu tiên.

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Đầu vào (Input)**: Chủ đề (Theme) của BTC công bố + (Tùy chọn) Thể loại bạn thích.
* **Đầu ra (Output)**: Một bản **Gameplay Prompt** hoàn chỉnh.
* **Bước tiếp theo**: Copy toàn bộ phần Output của AI dán sang **`02_gameplay_prompt.md`** (để lưu trữ làm gốc), sau đó nạp tiếp vào:
  - `03_presentation_prompt.md` (để Thành viên 2 đi vẽ bảng bình chọn và soạn Pitch).
  - `04_style_prompt.md` (để khóa phong cách UI & Đồ họa).
  - `07_function_prompt.md` (để xuất đặc tả kỹ thuật cho AI code game).
  - `10_analyze_prompt.md` (để chấm điểm thử ý tưởng ngay từ trong trứng nước).

---

## 📋 3. NỘI DUNG PROMPT (COPY TỪ ĐÂY ĐỂ SỬ DỤNG)

```text
=== [CONTEXT CƠ SỞ: IT GAME JAM 2026] ===
Bạn là Chief Game Jam Architect (Tổng Công Trình Sư Thiết Kế Game Jam) với kinh nghiệm chiến thắng hàng chục kỳ GMTK và Ludum Dare.
Chúng tôi đang thi đấu trực tiếp tại cuộc thi "IT GAME JAM WITH AI 2026" với các ràng buộc sống còn sau:
1. Thời gian phát triển: ĐÚNG 150 PHÚT trên 1 chiếc laptop duy nhất.
2. Nền tảng kỹ thuật: [CHỌN 1: Web Game HTML5 Canvas/JS chạy trực tiếp trên trình duyệt (Ưu tiên số 1) / HOẶC Unity 6 2D].
3. Ma trận chấm điểm của Ban Giám Khảo (100 điểm):
   - Ý tưởng sáng tạo (40 điểm - QUAN TRỌNG NHẤT): Phải có điểm khác biệt đột phá trong cơ chế (1 CÚ TWIST ngược đời/độc đáo), luật chơi kết hợp hợp lý, tạo ra lựa chọn đánh đổi (Risk vs Reward) thú vị. Tuyệt đối cấm làm game clone đơn thuần.
   - Trải nghiệm chơi (20 điểm): Luật dễ hiểu trong 5 giây đầu, thao tác mượt, phản hồi (Game Feel/Juice: rung màn hình, dừng hình va chạm, hạt nổ, âm thanh synth) cực kỳ đã tay, có nút chơi lại tức thì (Phím R).
   - Hiện thực hóa (20 điểm): Phải hoàn thiện trọn vẹn ít nhất 1 màn/1 vòng chơi khép kín (Menu -> Hướng dẫn -> Chơi -> Thắng/Thua -> Điểm số/Kỷ lục -> Chơi lại) trong 150 phút, 0 bug.

=== [INPUT TỪ BAN TỔ CHỨC] ===
- CHỦ ĐỀ (THEME) VỪA CÔNG BỐ: "[ĐIỀN CHỦ ĐỀ BTC VÀO ĐÂY]"
- Định hướng thể loại ưu tiên (bỏ trống nếu muốn AI tự chọn tối ưu nhất): "[ĐIỀN THỂ LOẠI HOẶC ĐỂ TRỐNG - VD: 2D Top-Down Arena / One-Button Arcade / Physics Puzzle / Tower Defense lai Action]"

=== [NHIỆM VỤ CỦA BẠN] ===
Từ chủ đề trên, hãy thiết kế cho tôi 03 PHƯƠNG ÁN GAME KHÁC NHAU (Phương án 1: An toàn nhưng Twist cực cuốn; Phương án 2: Độc lạ, hài hước, dễ viral câu vote khán giả; Phương án 3: Tập trung vào cơ chế đánh đổi Risk-Reward đỉnh cao).

Sau đó, chọn ra 01 PHƯƠNG ÁN XUẤT SẮC NHẤT (có khả năng đạt 100/100 điểm cao nhất và code xong chắc chắn trong 90 phút) rồi XUẤT RA MỘT "GAMEPLAY PROMPT" HOÀN CHỈNH đặt trong khối code markdown theo đúng cấu trúc dưới đây để tôi copy đi dùng ngay cho các AI tiếp theo:

```markdown
# GAMEPLAY PROMPT CHÍNH THỨC
1. Tên Dự Kiến & Thể Loại (Genre & Camera View): (Ghi rõ góc nhìn Top-down, Side-view hay Fixed-screen).
2. Cốt Truyện Cơ Bản (1-Sentence Hook): (Ngắn gọn, hài hước hoặc kịch tính, gắn chặt với chủ đề "[CHỦ ĐỀ]").
3. CƠ CHẾ ĐẶC BIỆT / CÚ TWIST 40 ĐIỂM (The Core Twist): (Mô tả thật rõ cơ chế này hoạt động ra sao, tại sao nó ngược đời/sáng tạo, và sự đánh đổi Risk vs Reward của người chơi là gì).
4. Vòng Lặp Gameplay Chính (Core Gameplay Loop): (Người chơi làm gì mỗi 5 giây -> 30 giây -> 2 phút).
5. Điều Khiển & Thao Tác (Controls): (Tối giản tối đa: WASD + Chuột hoặc 1-2 phím để bất kỳ giám khảo nào cầm máy lên cũng biết chơi trong 3 giây).
6. Cách Vượt Màn / Đạt Mục Tiêu (Win / Lose & Progression): (Điều kiện thắng, điều kiện thua, cách độ khó tăng dần theo thời gian/wave).
7. Hệ Thống Tính Điểm & Combo (Scoring & Replayability): (Cách tính điểm thường, cách nhân hệ số Combo gắn liền với Cú Twist, lưu HighScore).
8. Hiệu Ứng Phản Hồi & Game Feel (Juice Specification): (Khi nào rung màn hình, khi nào dừng hình HitStop, hiệu ứng hạt và âm thanh gì phát ra để lấy trọn 20 điểm Trải nghiệm).
```
```

---

## 💡 4. Mẹo Sử Dụng Nhanh Trong Giờ Thi
1. Ngay khi MC trên sân khấu đọc chủ đề, Thành viên 1 gõ chủ đề vào ô `"[ĐIỀN CHỦ ĐỀ BTC VÀO ĐÂY]"`.
2. Bấm gửi đồng thời trên **Claude 3.5 Sonnet**, **ChatGPT** và **Grok**.
3. Cả 3 thành viên đọc lướt 3 kết quả trong 2 phút, chọn ra **Cú Twist nào nghe xong thấy "Ồ, cái này lạ mà dễ code!"** nhất.
4. Nếu thích Phương án 2 hoặc 3 của AI hơn Phương án 1, chỉ cần gõ ngắn gọn: *"Hãy xuất khối GAMEPLAY PROMPT CHÍNH THỨC cho Phương án số [2/3]"*.
