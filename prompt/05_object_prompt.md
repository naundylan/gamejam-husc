# 05. OBJECT PROMPT (BỘ 5 PROMPT CON CHUYÊN BIỆT TẠO THỰC THỂ THREE.JS / SVG / PNG)

## 📌 1. Mục Đích & Kiến Trúc Tối Ưu Hóa ("1 Style Anchor + 5 Sub-Prompts")
* **Giải pháp kiến trúc chống nhiễu ngữ cảnh**:  
  Thay vì nhồi nhét Nhân vật, Quái vật, Vũ khí, Vật phẩm và Giao diện UI vào chung 1 prompt hỗn tạp, file này tách thành **1 Bước Khóa Ngữ Cảnh Chung (`System Style Lock`)** + **5 Prompt Con Chuyên Biệt (`5A` ➡️ `5E`)**:
  - **Prompt 5A**: Chuyên tạo **Nhân vật chính / Đồng minh** (Hình thể, trang phục, giáp, vũ khí cầm tay).
  - **Prompt 5B**: Chuyên tạo **Quái vật / Boss** (Phân cấp Minion/Elite/Boss, hình khối đe dọa, bộ phận tấn công).
  - **Prompt 5C**: Chuyên tạo **Vũ khí, Đạn & Bẫy** (Lõi phát sáng `emissive`, hướng mũi nhọn chuẩn trục `+Z` hoặc `+X`).
  - **Prompt 5D**: Chuyên tạo **Vật phẩm, Buff & Chướng ngại vật** (Icon/Khối 3D thu thập, hào quang nhận diện).
  - **Prompt 5E**: Chuyên tạo **Giao diện UI, Bảng Popup, Thanh Bar & Mặt sàn 3D Arena**.
* **Sức mạnh trên Three.js**: Bạn có thể chọn xuất ra **`Hàm tạo Mesh 3D Three.js (THREE.Group)`** (ghép từ hàng chục khối hình học chi tiết, có ánh sáng phát quang `emissive`, chạy tức thì không cần load file ngoài!) hoặc xuất ra **`File SVG (.svg)`** / **`PNG (.png)`** để đắp làm `THREE.Sprite` / `Texture`.

## 🔗 2. Luồng Kết Nối (Input ➡️ Output)
* **Input**: `[LOCKED STYLE CONTEXT]` từ `04_style_prompt.md` + Từ khóa mô tả chi tiết vật thể.
* **Output**: 01 File / Module độc lập của vật thể theo đúng định dạng đã chọn (`Three.js Mesh JS` / `.svg` / `.png`).
* **Truyền sang**: Đưa vào **`06_motion_prompt.md`** để gắn chuyển động 8 hướng / hoạt ảnh / hiệu ứng, hoặc gắn thẳng vào source code Three.js.

---

## 🔒 3. BƯỚC KHỞI TẠO: KHÓA NGỮ CẢNH PHONG CÁCH (DÁN 1 LẦN ĐẦU PHIÊN CHAT)

```xml
<system_style_lock>
Bạn là Principal Three.js 3D Procedural Artist & Technical SVG/Sprite Designer.
Trong toàn bộ phiên làm việc này, mọi vật thể bạn tạo ra BẮT BUỘC phải tuân thủ 100% bảng màu, chất liệu, ánh sáng và ngôn ngữ thiết kế trong hồ sơ `[LOCKED STYLE CONTEXT]` dưới đây:

"""
{{DÁN_TOÀN_BỘ_OUTPUT_CỦA_FILE_04_STYLE_PROMPT_VÀO_ĐÂY}}
"""

<output_format_rules>
Tùy theo định dạng tôi chọn ở mục `ĐỊNH DẠNG OUTPUT` trong từng lệnh, bạn phải xuất đúng chuẩn sau:
1. Nếu chọn [THREE.JS 3D MESH MODULE (.js)]:
   - Xuất ra một hàm JavaScript độc lập `function createEntityMesh()` trả về một `THREE.Group()` hoàn chỉnh.
   - Tổ hợp từ ít nhất 5-12 bộ phận hình học (`BoxGeometry`, `SphereGeometry`, `CylinderGeometry`, `ConeGeometry`, `TorusGeometry`, `OctahedronGeometry`) được đặt tên `.name` rõ ràng (VD: `body`, `head`, `weapon`, `leftArm`, `rightArm`, `coreGlow`) để bước sau (Motion Prompt) có thể xoay và diễn hoạt từng bộ phận!
   - Bật `castShadow = true`, `receiveShadow = true` và sử dụng `MeshStandardMaterial` có `emissive` đúng bảng màu đã khóa.
   - Đặt tâm đứng (Origin `0, 0, 0`) tại chính giữa đáy chân nhân vật, mặt nhân vật hướng về trục `+Z` (hoặc `+X`).
2. Nếu chọn [FILE CODE SVG (.svg)]:
   - Xuất mã `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">` hoàn chỉnh, phân tách các thẻ `<g id="body">`, `<g id="weapon">` rõ ràng, nền trong suốt, dùng trực tiếp làm `THREE.TextureLoader` / `THREE.Sprite` hoặc UI icon.
3. Nếu chọn [HÌNH ẢNH PNG (.png)]:
   - Tạo ảnh trực tiếp (hoặc xuất Prompt tiếng Anh chuẩn cho Recraft/Leonardo) với nền trong suốt tuyệt đối, đúng góc nhìn Camera đã khóa.
</output_format_rules>

Hãy xác nhận: "ĐÃ KHÓA STYLE THREE.JS - SẴN SÀNG NHẬN LỆNH 5A -> 5E".
</system_style_lock>
```

---

## 📋 4. BỘ 5 PROMPT CON CHUYÊN BIỆT (COPY ĐÚNG LOẠI CẦN TẠO)

### 🧍 PROMPT 5A: TẠO NHÂN VẬT CHÍNH / ĐỒNG MINH (PLAYER / ALLY)

```xml
<object_prompt_5a type="PLAYER_OR_ALLY">
Hãy tạo cho tôi 01 tài nguyên Nhân vật bám sát `[LOCKED STYLE CONTEXT]` với đặc tả chi tiết sau:
- Phân loại: [CHỌN: Nhân vật chính (Player) / Đồng minh (Ally)]
- Hình dáng & Chủng tộc: "{{ĐIỀN: VD: Chiến binh Cyber mặc giáp vai góc cạnh / Pháp sư tí hon đội mũ chóp / Chiến cơ phản lực 3 cánh...}}"
- Trang phục & Phụ kiện trên người: "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG: VD: Khăn choàng năng lượng phát sáng phía sau, giáp ngực có lõi lò phản ứng màu xanh cyan...}}"
- Vật cầm tay / Vũ khí gắn kèm: "{{ĐIỀN_HOẶC_ĐỂ_TRỐNG: VD: Tay phải cầm đại kiếm phát quang / Hai vai gắn 2 nòng pháo plasma...}}"
- Điểm nhấn thị giác (Focal Point): "{{ĐIỀN: VD: Đôi mắt kính visor phát sáng vàng rực, nhìn từ Camera trên cao xuống cực kỳ nổi bật}}"
- ĐỊNH DẠNG OUTPUT YÊU CẦU: [CHỌN 1: THREE.JS 3D MESH MODULE (.js) / FILE CODE SVG (.svg) / HÌNH ẢNH PNG (.png)]

<strict_requirements>
- Nếu là `THREE.JS 3D MESH`: Phải tách riêng các nhóm con `group.userData.parts = { head, body, weapon, aura }` để dễ dàng gọi diễn hoạt ở bước Motion.
- Nếu là `SVG / PNG`: Đặt đối tượng chính giữa khung hình, tách lớp rõ ràng, không vẽ nền thừa.
</strict_requirements>
</object_prompt_5a>
```

---

### 👹 PROMPT 5B: TẠO QUÁI VẬT / KẺ ĐỊCH / BOSS (ENEMY / BOSS)

```xml
<object_prompt_5b type="ENEMY_OR_BOSS">
Hãy tạo cho tôi 01 tài nguyên Kẻ địch bám sát `[LOCKED STYLE CONTEXT]` với đặc tả chi tiết sau:
- Cấp bậc quái: [CHỌN: Quái thường (Minion - kích thước 1.0x, gọn, dễ nhận diện số đông) / Quái tinh anh (Elite - kích thước 1.6x, có giáp/vòng xoay) / Trùm cuối (Boss - kích thước 3.0x, hầm hố, nhiều bộ phận)]
- Hình thái & Chủng loài: "{{ĐIỀN: VD: Nhện máy 4 chân có lõi bom / Quái vật khối gai bóng tối / Pháp sư xương bay lơ lửng...}}"
- Bộ phận tấn công / Gây sát thương: "{{ĐIỀN: VD: Gai nhọn đỏ rực đâm ra từ thân / Nòng súng laser trước trán / Hai càng kẹp khổng lồ...}}"
- Màu sắc cảnh báo (Threat Emissive Color): "{{ĐIỀN_HOẶC_LẤY_TỪ_PALETTE: VD: Đỏ cam phát sáng 0xff2255}}"
- ĐỊNH DẠNG OUTPUT YÊU CẦU: [CHỌN 1: THREE.JS 3D MESH MODULE (.js) / FILE CODE SVG (.svg) / HÌNH ẢNH PNG (.png)]

<strict_requirements>
- Ngôn ngữ hình khối (Shape Language) phải sắc nhọn, hung dữ, tương phản hoàn toàn với Player để người chơi phân biệt trong 0.1 giây.
- Nếu là `THREE.JS 3D MESH`: Xuất hàm `createEnemyMesh()` có lưu `userData.parts` và hỗ trợ đổi màu chớp trắng (`emissive = 0xffffff`) khi trúng đạn.
</strict_requirements>
</object_prompt_5b>
```

---

### ⚔️ PROMPT 5C: TẠO VŨ KHÍ, ĐẠN & BẪY MÔI TRƯỜNG (WEAPON, PROJECTILE & HAZARD)

```xml
<object_prompt_5c type="WEAPON_PROJECTILE_HAZARD">
Hãy tạo cho tôi 01 tài nguyên Vũ khí / Đạn / Bẫy bám sát `[LOCKED STYLE CONTEXT]` với đặc tả sau:
- Phân loại: [CHỌN: Đạn bay (Projectile) / Vũ khí cận chiến (Melee Slash/Weapon) / Bẫy sàn đấu (Arena Hazard/Trap)]
- Mô tả hình dáng: "{{ĐIỀN: VD: Viên đạn plasma hình thoi kéo dài có vòng năng lượng bao quanh / Lưỡi cưa đĩa tròn xoay trên sàn / Cột sét đánh từ trên xuống...}}"
- Màu lõi & Hào quang (High-Visibility Glow): Lõi trắng sáng (`0xffffff`), hào quang ngoài màu `{{ĐIỀN_MÀU}}` với `emissiveIntensity: 2.0`.
- ĐỊNH DẠNG OUTPUT YÊU CẦU: [CHỌN 1: THREE.JS 3D MESH MODULE (.js) / FILE CODE SVG (.svg) / HÌNH ẢNH PNG (.png)]
</object_prompt_5c>
```

---

### 💎 PROMPT 5D: TẠO VẬT PHẨM, BUFF & ĐẠO CỤ BẢN ĐỒ (ITEM, COLLECTIBLE & PROP)

```xml
<object_prompt_5d type="ITEM_OR_PROP">
Hãy tạo cho tôi 01 tài nguyên Vật phẩm / Đạo cụ bám sát `[LOCKED STYLE CONTEXT]` với đặc tả sau:
- Chức năng: [CHỌN: Vật phẩm hồi máu/năng lượng (Heal/Energy) / Điểm thưởng & Tinh thể (Gem/Score) / Hộp nâng cấp (Power-up Buff) / Chướng ngại vật bản đồ (Pillar/Crate/Obstacle)]
- Mô tả chi tiết: "{{ĐIỀN: VD: Tinh thể năng lượng hình bát diện lơ lửng có vòng tròn ma thuật dưới chân / Hộp tiếp tế y tế phát sáng xanh lá...}}"
- ĐỊNH DẠNG OUTPUT YÊU CẦU: [CHỌN 1: THREE.JS 3D MESH MODULE (.js) / FILE CODE SVG (.svg) / HÌNH ẢNH PNG (.png)]
</object_prompt_5d>
```

---

### 🖼️ PROMPT 5E: TẠO GIAO DIỆN UI, POPUP, THANH BAR & SÀN ĐẤU 3D (UI & ARENA)

```xml
<object_prompt_5e type="UI_OR_ARENA">
Hãy tạo cho tôi 01 thành phần Giao diện UI hoặc Sàn đấu 3D bám sát `[LOCKED STYLE CONTEXT]` với đặc tả sau:
- Hạng mục: [CHỌN 1: Khung Bảng Popup (Menu / Game Over Panel) / Cụm Thanh Máu & Thanh Twist (HUD Bars) / Sàn Đấu 3D & Môi Trường Xung Quanh (Three.js Arena Floor & Environment)]
- Mô tả thiết kế: "{{ĐIỀN: VD: Sàn đấu hình lục giác/vuông chia lưới neon có các cột đèn xung quanh và bầu trời sao / Hoặc Thanh máu kèm đồng hồ đo chỉ số Twist có hiệu ứng rung và phát sáng khi đầy...}}"
- ĐỊNH DẠNG OUTPUT YÊU CẦU: [CHỌN 1: Code HTML5 + CSS3 + SVG Overlay hoàn chỉnh / Hàm Three.js `createArenaEnvironment(scene)`]
</object_prompt_5e>
```
