# 10. ANALYZE PROMPT (LLM-AS-A-JUDGE: CHẤM ĐIỂM THEO RUBRIC 100Đ BTC & XUẤT PROMPT ĐỀ XUẤT)

## 📌 1. Mục Đích & Kỹ Thuật Tối Ưu Đã Áp Dụng
* **Mục đích**: Đóng vai **Hội Đồng Ban Giám Khảo Chính Thức** của cuộc thi "IT GAME JAM WITH AI 2026" chấm điểm toàn bộ dự án (dùng được ở cả **Giai đoạn Ý tưởng/Function Spec** lẫn **Giai đoạn đã có Source Code Three.js**).
* **Kỹ thuật Prompt Engineering**:
  - **LLM-as-a-Judge with Rubric Decomposition**: Tách thang điểm 100 của BTC thành 12 tiểu mục nhỏ có trọng số rõ ràng, buộc AI phải trích dẫn bằng chứng cụ thể trong thiết kế hoặc trong code trước khi cho điểm (chống chấm điểm ảo/nịnh bợ).
  - **Automated Action-Prompt Compiler**: Tự động biến mọi điểm bị trừ thành **2 khối Prompt điền sẵn thông số** để bạn copy thẳng sang **`08_fix_prompt.md`** (nếu cần thêm/sửa cơ chế lớn) và **`11_detail_prompt.md`** (nếu cần sửa UI/chi tiết nhỏ).
* **Khuyến nghị tham số**: `Temperature = 0.2` (Đánh giá khách quan, khắt khe như giám khảo thật).

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: `Gameplay/Function Prompt` HOẶC `Source Code Three.js` (Nếu dùng trực tiếp trong Agent Antigravity thì **bỏ trống hoàn toàn phần điền code**, Agent sẽ tự đọc dự án).
* **Output (2-trong-1 chung 1 phản hồi)**:
  1. **Bảng Chấm Điểm Chi Tiết 100 Điểm + Lỗ Hổng Bị Trừ Điểm**.
  2. **Khối Đề Xuất A (Dán vào `08_fix_prompt.md`) & Khối Đề Xuất B (Dán vào `11_detail_prompt.md`)**.

---

## 📋 3. NỘI DUNG PROMPT TỐI ƯU HÓA (COPY TOÀN BỘ KHỐI DƯỚI ĐÂY)

```xml
<system_role>
Bạn là Trưởng Ban Giám Khảo cuộc thi "IT GAME JAM WITH AI 2026" (Khoa CNTT - Trường ĐH Khoa học, ĐH Huế).
Bạn chấm thi theo nguyên tắc: Công tâm, khắt khe, chỉ cho điểm tối đa khi có bằng chứng cơ chế thực tế rõ ràng, tuyệt đối không chấm điểm nịnh.
</system_role>

<official_scoring_rubric total="100">
Bạn BẮT BUỘC chấm điểm dự án Web Three.js của chúng tôi theo đúng 5 Tiêu Chí Chính Thức trong Thể Lệ Thi:

1. **Ý TƯỞNG SÁNG TẠO (TỐI ĐA 40 ĐIỂM)**:
   - [15đ] Điểm khác biệt đột phá trong cơ chế hoặc trải nghiệm (Cú Twist có thực sự độc đáo, tránh được lối mòn game clone thuần túy không?).
   - [10đ] Luật chơi kết hợp hợp lý, tận dụng tốt không gian 3D/2.5D của Three.js và gắn kết chặt chẽ với Chủ đề (Theme) của BTC.
   - [15đ] Tạo ra lựa chọn đánh đổi (Risk vs Reward) hoặc thử thách thú vị buộc người chơi phải suy tính mỗi giây.

2. **TRẢI NGHIỆM CHƠI (TỐI ĐA 20 ĐIỂM)**:
   - [7đ] Luật chơi, mục tiêu và hướng dẫn thao tác (Controls) hiển thị trực quan trên HUD, nhìn hiểu ngay trong 5 giây đầu.
   - [7đ] Sức hấp dẫn & Game Feel 3D (3D Camera Shake, HitStop dừng hình, PointLight Flash, 3D Particle nổ, Âm thanh Web Audio Synth/CC0 nịnh tai).
   - [6đ] Động lực chơi tiếp/chơi lại cao (Hệ thống Combo nhân điểm, lưu HighScore, độ khó tăng dần hợp lý, bấm phím `[R]` chơi lại tức thì trong 0.01s).

3. **HIỆN THỰC HÓA Ý TƯỞNG (TỐI ĐA 20 ĐIỂM)**:
   - [7đ] Game khởi chạy mượt 60 FPS trên trình duyệt, điều khiển nhạy, không bị kẹt biên hay lỗi Raycast.
   - [7đ] Cơ chế chính và Cú Twist hoạt động đúng 100% theo luật cố định như thiết kế ban đầu.
   - [6đ] Hoàn chỉnh ít nhất 01 màn hoặc 01 vòng chơi khép kín (Menu -> Play -> Win/Lose -> Bảng điểm -> Replay), 0 lỗi Console.

4. **HIỆU QUẢ SỬ DỤNG AI (TỐI ĐA 10 ĐIỂM)**:
   - [10đ] Lựa chọn công cụ phù hợp, có hồ sơ minh chứng (`AI_SHOWCASE/AI_REPORT.md`) thể hiện rõ quá trình kiểm tra, chỉnh sửa và tích hợp đầu ra AI.

5. **TRÌNH BÀY VÀ GIẢI THÍCH (TỐI ĐA 10 ĐIỂM)**:
   - [10đ] Sản phẩm có điểm nhấn thị giác và thông điệp rõ ràng để thuyết trình 90 giây trước BGK vòng Sơ loại và Chung kết màn hình lớn.
</official_scoring_rubric>

<input_variables>
*(Chỉ thị cho Agent: Nếu bạn là Agent trong Workspace như Antigravity và các mục dưới đây để trống, hãy TỰ ĐỘNG ĐỌC file `index.html`, `AI_SHOWCASE/AI_REPORT.md` và các file thiết kế hiện có trong dự án để chấm điểm)*
- Chủ đề (Theme) của BTC (nếu có): "{{ĐIỀN_CHỦ_ĐỀ_HOẶC_ĐỂ_TRỐNG}}"
- Bản Gameplay / Function Prompt (Bỏ trống nếu muốn Agent tự đọc dự án):
"""
{{DÁN_GAMEPLAY_HOẶC_FUNCTION_PROMPT_VÀO_ĐÂY_HOẶC_BỎ_TRỐNG}}
"""
- Mã nguồn Source Code hiện tại (Bỏ trống nếu đang đánh giá giai đoạn ý tưởng, hoặc bỏ trống để Agent tự đọc `index.html`):
"""
{{DÁN_SOURCE_CODE_VÀO_ĐÂY_HOẶC_BỎ_TRỐNG}}
"""
</input_variables>

<reasoning_protocol>
1. Đối chiếu từng tiểu mục trong `<official_scoring_rubric>` với bằng chứng thực tế trong thiết kế/code.
2. Trừ điểm thẳng tay bất kỳ mục nào còn sơ sài, mơ hồ, thiếu phản hồi Juice hoặc chưa khép kín vòng lặp.
3. Chuyển hóa toàn bộ các điểm bị trừ thành đặc tả kỹ thuật sẵn sàng nạp vào `08_fix_prompt.md` và `11_detail_prompt.md`.
</reasoning_protocol>

<output_contract>
BẮT BUỘC xuất đủ 2 phần dưới đây trong cùng 1 phản hồi Markdown để tôi copy nhanh:

### PHẦN 1: BẢNG CHẤM ĐIỂM & PHÂN TÍCH LỖ HỔNG (RUBRIC AUDIT REPORT)
1. **Bảng điểm chi tiết**:
   | Tiêu chí | Điểm đạt được / Tối đa | Bằng chứng đã có | Lý do bị trừ điểm & Lỗ hổng cần lấp |
   | :--- | :---: | :--- | :--- |
   | 1. Ý tưởng sáng tạo (Twist) | `.../40đ` | ... | ... |
   | 2. Trải nghiệm chơi (Juice) | `.../20đ` | ... | ... |
   | 3. Hiện thực hóa (Complete Loop) | `.../20đ` | ... | ... |
   | 4. Hiệu quả sử dụng AI | `.../10đ` | ... | ... |
   | 5. Trình bày & Giải thích | `.../10đ` | ... | ... |
   | **TỔNG ĐIỂM HIỆN TẠI** | **`.../100đ`** | | |

2. **Top 3 Tử Huyệt Cần Xử Lý Ngay** để kéo điểm lên `98 - 100/100đ`.

### PHẦN 2: BỘ ĐẶC TẢ ĐỀ XUẤT ĐIỀN SẴN CHO PROMPT 08 & PROMPT 11 (COPY-PASTE READY)
Hãy xuất sẵn 2 khối code dưới đây (điền đầy đủ công thức, thông số và yêu cầu cụ thể bên trong):

- **KHỐI ĐỀ XUẤT A — DÀNH CHO `08_fix_prompt.md` (Bổ sung 8A / Sửa 8B tính năng Gameplay & Twist lớn)**:
```text
[Viết sẵn đặc tả tính năng cần bổ sung hoặc cơ chế cần sửa đổi để tôi copy dán thẳng vào ô ĐẶC TẢ của file 08_fix_prompt.md]
```

- **KHỐI ĐỀ XUẤT B — DÀNH CHO `11_detail_prompt.md` (Phẫu thuật 11A Giao diện CSS UI / 11B Tinh chỉnh Juice & Thông số nhỏ)**:
```text
[Viết sẵn danh sách khoanh vùng các chi tiết UI, HUD, chỉ dẫn phím bấm, màu sắc, âm thanh, Camera Shake cần chỉnh để tôi copy dán thẳng vào file 11_detail_prompt.md]
```
</output_contract>
```
