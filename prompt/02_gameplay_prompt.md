# 02. GAMEPLAY PROMPT (KHUÔN MẪU & PROMPT ĐỊNH HÌNH GAMEPLAY CỐT LÕI)

## 📌 1. Mục Đích Sử Dụng
File này có **2 công dụng chính**:
1. **Nơi lưu trữ "Bản Hiến Pháp Gameplay"**: Sau khi bạn chạy `01_subject_prompt.md` và chọn được 1 ý tưởng ưng ý nhất, bạn dán kết quả vào Phần 4 của file này để làm **"Nguồn dữ liệu gốc (Single Source of Truth)"** đem đi nạp vào các prompt `03`, `04`, `07`, `10`.
2. **Prompt tự nhào nặn Gameplay**: Trong trường hợp đội của bạn tự nghĩ ra một ý tưởng trong đầu (chưa qua `01_subject_prompt`), bạn dùng Prompt ở Phần 3 để bắt AI chuẩn hóa ý tưởng thô của bạn thành một bản thiết kế Gameplay đủ 8 tiêu chí chấm điểm của BTC.

## 🔗 2. Cách Kết Hợp Với Các Prompt Khác
* **Nhận Input từ**: Output của `01_subject_prompt.md` (hoặc ý tưởng thô của cả đội).
* **Truyền Output sang**:
  - `03_presentation_prompt.md`: Để làm truyền thông, slogan, bảng bình chọn, kịch bản thuyết trình.
  - `04_style_prompt.md`: Để khóa phong cách đồ họa và UI.
  - `07_function_prompt.md`: Để bóc tách thành đặc tả kỹ thuật chi tiết cho AI viết code.
  - `10_analyze_prompt.md`: Để giám khảo AI chấm điểm thử xem đã đủ ăn 100 điểm chưa.

---

## 📋 3. PROMPT CHUẨN HÓA Ý TƯỞNG THÔ THÀNH GAMEPLAY PROMPT
*(Chỉ dùng khi bạn muốn tự đưa ý tưởng riêng của đội vào để AI hoàn thiện thành bản Gameplay chuẩn)*

```text
=== [CONTEXT CƠ SỞ: IT GAME JAM 2026] ===
Bạn là Lead Game Designer cho cuộc thi IT Game Jam 2026 (150 phút).
Mục tiêu của chúng tôi là đạt điểm tối đa ở 3 hạng mục: Ý tưởng sáng tạo có Twist (40đ), Trải nghiệm chơi có Juice & động lực chơi lại cao (20đ), và Hiện thực hóa trọn vẹn 1 vòng chơi hoàn chỉnh không bug (20đ).

=== [INPUT: Ý TƯỞNG THÔ CỦA ĐỘI] ===
- Chủ đề của BTC: "[ĐIỀN CHỦ ĐỀ BTC]"
- Ý tưởng sơ bộ của đội tôi: "[MÔ TẢ NGẮN GỌN Ý TƯỞNG CỦA BẠN - VD: Điều khiển một cục nam châm hút rác vũ trụ nhưng càng hút nhiều thì càng nặng và khó né thiên thạch]"
- Nền tảng dự kiến: "[Web Game HTML5 Canvas / HOẶC Unity 6 2D]"

=== [NHIỆM VỤ CỦA BẠN] ===
Hãy đánh bóng, nâng cấp và hoàn thiện ý tưởng sơ bộ trên thành một bản "GAMEPLAY PROMPT CHÍNH THỨC" sắc bén, khả thi trong 150 phút, đảm bảo có đầy đủ 8 mục dưới đây (trình bày trong 1 khối markdown sạch để tôi copy):

1. Tên Dự Kiến & Thể Loại (Genre & Camera View): (Góc nhìn 2D Top-down / Side-view / Fixed Arena).
2. Cốt Truyện Cơ Bản (1-Sentence Hook): (1-2 câu dẫn nhập giải thích tại sao game này khớp 100% với chủ đề "[CHỦ ĐỀ]").
3. CƠ CHẾ ĐẶC BIỆT / CÚ TWIST 40 ĐIỂM (The Core Twist): (Làm nổi bật điểm độc đáo nhất: Luật chơi đảo ngược hoặc sự đánh đổi Risk vs Reward khiến BGK phải trầm trồ).
4. Vòng Lặp Gameplay Chính (Core Gameplay Loop): (Chuỗi hành động lặp lại liên tục gây nghiện).
5. Điều Khiển & Thao Tác (Controls): (Bảng phím bấm siêu gọn + Hướng dẫn hiển thị ngay trên màn hình).
6. Cách Vượt Màn / Đạt Mục Tiêu (Win / Lose & Progression): (Làm sao để thắng hoặc trụ hạng, làm sao thì thua, kịch bản tăng độ khó theo mỗi 20 giây/Wave).
7. Hệ Thống Tính Điểm & Combo (Scoring & Replayability): (Công thức cộng điểm, nhân hệ số Combo khi người chơi tận dụng tốt Cú Twist, lưu kỷ lục HighScore).
8. Hiệu Ứng Phản Hồi & Game Feel (Juice Specification): (Danh sách các phản hồi thị giác và âm thanh: Screen Shake, HitStop, Particle, Flash, SFX khi thao tác).
```

---

## 💾 4. BẢN LƯU "GAMEPLAY PROMPT CHÍNH THỨC" CỦA ĐỘI (DÁN VÀO ĐÂY KHI CHỐT)
*(Khi đã chốt được Gameplay từ Prompt 01 hoặc Prompt 02, hãy dán đè vào khung dưới đây để cả 3 thành viên dùng chung xuyên suốt cuộc thi)*

```markdown
# GAMEPLAY PROMPT CHÍNH THỨC CỦA ĐỘI
1. Tên Dự Kiến & Thể Loại: [DÁN NỘI DUNG ĐÃ CHỐT VÀO ĐÂY]
2. Cốt Truyện Cơ Bản: [...]
3. CƠ CHẾ ĐẶC BIỆT / CÚ TWIST 40 ĐIỂM: [...]
4. Vòng Lặp Gameplay Chính: [...]
5. Điều Khiển & Thao Tác: [...]
6. Cách Vượt Màn / Đạt Mục Tiêu: [...]
7. Hệ Thống Tính Điểm & Combo: [...]
8. Hiệu Ứng Phản Hồi & Game Feel: [...]
```
