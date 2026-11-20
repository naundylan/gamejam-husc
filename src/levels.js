export function getStageLayout(stageIndex) {
  switch (stageIndex) {
    case 0:
      // Tutorial — Bờ Ao Khô Hạn [0, 180] — Màu bùn đất (Cóc [1] nhảy đơn)
      return {
        spawn: { x: 3.0, y: 1.0 },
        platforms: [
          { x1: -2, x2: 18, topY: 0, h: 4, color: 0x5c3a21, topColor: 0x92400e },
          // Water pit 1: [18, 21.5] (3.5 u)
          { x1: 21.5, x2: 46, topY: 0, h: 4, color: 0x5c3a21, topColor: 0x92400e },
          { x1: 28, x2: 36, topY: 2.2, h: 0.6, color: 0x78350f, topColor: 0xa16207 },
          // Water pit 2: [46, 49.5] (3.5 u)
          { x1: 49.5, x2: 82, topY: 0, h: 4, color: 0x5c3a21, topColor: 0x92400e },
          { x1: 56, x2: 65, topY: 2.2, h: 0.6, color: 0x78350f, topColor: 0xa16207 },
          { x1: 68, x2: 76, topY: 3.8, h: 0.6, color: 0x78350f, topColor: 0xa16207 },
          // Water pit 3: [82, 85.5]
          { x1: 85.5, x2: 120, topY: 0, h: 4, color: 0x5c3a21, topColor: 0x92400e },
          { x1: 95, x2: 105, topY: 2.3, h: 0.6, color: 0x78350f, topColor: 0xa16207 },
          // Water pit 4: [120, 123.5]
          { x1: 123.5, x2: 182, topY: 0, h: 4, color: 0x5c3a21, topColor: 0x92400e },
          { x1: 136, x2: 146, topY: 2.3, h: 0.6, color: 0x78350f, topColor: 0xa16207 },
        ],
        enemies: [
          { type: 'minion', x: 32, y: 0.7, patrolMinX: 23, patrolMaxX: 43 },
          { type: 'minion', x: 60, y: 2.9, patrolMinX: 57, patrolMaxX: 64 },
          { type: 'minion', x: 99, y: 0.7, patrolMinX: 88, patrolMaxX: 116 },
          { type: 'minion', x: 141, y: 0.7, patrolMinX: 127, patrolMaxX: 158 },
          { type: 'minion', x: 158, y: 0.7, patrolMinX: 148, patrolMaxX: 166 },
        ],
        rocks: [],
        spikes: [],
        spikeGates: [],
        cage: { x: 172, y: 1.0, hp: 1.5, unlockFormId: 2 },
      };

    case 1:
      // Màn 1 — Hẻm Núi Đá [0, 240] — Màu đá hẻm núi
      return {
        spawn: { x: 3.0, y: 1.0 },
        platforms: [
          { x1: -2, x2: 26, topY: 0, h: 4, color: 0x44403c, topColor: 0x78716c },
          { x1: 28, x2: 40, topY: 2.0, h: 2.0, color: 0x57534e, topColor: 0xa8a29e },
          { x1: 42, x2: 56, topY: 3.8, h: 2.0, color: 0x57534e, topColor: 0xa8a29e },
          { x1: 59, x2: 75, topY: 2.0, h: 2.0, color: 0x44403c, topColor: 0x78716c },
          { x1: 78, x2: 106, topY: 0, h: 4, color: 0x44403c, topColor: 0x78716c },
          { x1: 109, x2: 124, topY: 2.1, h: 2.1, color: 0x57534e, topColor: 0xa8a29e },
          { x1: 127, x2: 144, topY: 4.0, h: 2.0, color: 0x57534e, topColor: 0xa8a29e },
          { x1: 147, x2: 178, topY: 1.8, h: 3.8, color: 0x44403c, topColor: 0x78716c },
          { x1: 181, x2: 208, topY: 0, h: 4, color: 0x44403c, topColor: 0x78716c },
          { x1: 211, x2: 242, topY: 0, h: 4, color: 0x44403c, topColor: 0x78716c },
        ],
        enemies: [
          { type: 'minion', x: 16, y: 0.7, patrolMinX: 9, patrolMaxX: 24 },
          { type: 'minion', x: 34, y: 2.7, patrolMinX: 29, patrolMaxX: 39 },
          { type: 'elite', x: 49, y: 4.7, patrolMinX: 43, patrolMaxX: 55 },
          { type: 'minion', x: 92, y: 0.7, patrolMinX: 80, patrolMaxX: 104 },
          { type: 'elite', x: 135, y: 4.9, patrolMinX: 128, patrolMaxX: 142 },
          { type: 'minion', x: 162, y: 2.5, patrolMinX: 149, patrolMaxX: 175 },
          { type: 'elite', x: 194, y: 0.9, patrolMinX: 183, patrolMaxX: 205 },
          { type: 'elite', x: 222, y: 0.9, patrolMinX: 213, patrolMaxX: 228 },
        ],
        rocks: [],
        spikes: [],
        spikeGates: [],
        cage: { x: 232, y: 1.0, hp: 2.0, unlockFormId: 3 },
      };

    case 2:
      // Màn 2 — Rừng Mê Cung [0, 280] — Màu xanh lục rừng rậm
      return {
        spawn: { x: 3.0, y: 1.0 },
        platforms: [
          { x1: -2, x2: 56, topY: 0, h: 4, color: 0x14532d, topColor: 0x22c55e },
          { x1: 59, x2: 114, topY: 0, h: 4, color: 0x14532d, topColor: 0x22c55e },
          { x1: 117, x2: 174, topY: 0, h: 4, color: 0x14532d, topColor: 0x22c55e },
          { x1: 177, x2: 230, topY: 0, h: 4, color: 0x14532d, topColor: 0x22c55e },
          { x1: 233, x2: 282, topY: 0, h: 4, color: 0x14532d, topColor: 0x22c55e },
          { x1: 24, x2: 34, topY: 2.2, h: 0.7, color: 0x166534, topColor: 0x4ade80 },
          { x1: 74, x2: 86, topY: 2.2, h: 0.7, color: 0x166534, topColor: 0x4ade80 },
          { x1: 138, x2: 150, topY: 2.2, h: 0.7, color: 0x166534, topColor: 0x4ade80 },
          { x1: 196, x2: 208, topY: 2.2, h: 0.7, color: 0x166534, topColor: 0x4ade80 },
        ],
        enemies: [
          { type: 'minion', x: 18, y: 0.7, patrolMinX: 10, patrolMaxX: 25 },
          { type: 'minion', x: 66, y: 0.7, patrolMinX: 60, patrolMaxX: 74 },
          { type: 'elite', x: 96, y: 0.9, patrolMinX: 88, patrolMaxX: 106 },
          { type: 'minion', x: 128, y: 0.7, patrolMinX: 119, patrolMaxX: 136 },
          { type: 'elite', x: 162, y: 0.9, patrolMinX: 152, patrolMaxX: 170 },
          { type: 'elite', x: 188, y: 0.9, patrolMinX: 179, patrolMaxX: 196 },
          { type: 'minion', x: 248, y: 0.7, patrolMinX: 235, patrolMaxX: 264 },
        ],
        rocks: [
          { x: 42, y: 2.0, w: 2.2, h: 4.0 },
          { x: 108, y: 2.0, w: 2.2, h: 4.0 },
          { x: 156, y: 2.0, w: 2.2, h: 4.0 },
          { x: 220, y: 2.0, w: 2.2, h: 4.0 },
        ],
        spikes: [
          { x: 29, y: 0.25, w: 3.2 },
          { x: 80, y: 0.25, w: 3.2 },
          { x: 144, y: 0.25, w: 3.2 },
          { x: 202, y: 0.25, w: 3.2 },
          { x: 254, y: 0.25, w: 3.2 },
        ],
        spikeGates: [],
        cage: { x: 272, y: 1.0, hp: 2.0, unlockFormId: 4 },
      };

    case 3:
      // Màn 3 — Biển Mây Bão [0, 320] — Địa hình Mây bão âm u & Cột khe gai cho Cáo [4] Dash xuyên qua
      return {
        spawn: { x: 3.0, y: 1.0 },
        platforms: [
          { x1: -2, x2: 52, topY: 0, h: 2.2, color: 0x334155, topColor: 0x64748b },
          { x1: 55, x2: 67, topY: 2.0, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 70, x2: 82, topY: 3.5, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 85, x2: 98, topY: 4.8, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 102, x2: 180, topY: 0, h: 2.2, color: 0x334155, topColor: 0x64748b },
          { x1: 183, x2: 196, topY: 2.1, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 200, x2: 214, topY: 3.8, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 218, x2: 232, topY: 2.1, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 236, x2: 322, topY: 0, h: 2.2, color: 0x334155, topColor: 0x64748b },
        ],
        enemies: [
          { type: 'minion', x: 18, y: 0.7, patrolMinX: 10, patrolMaxX: 25 },
          { type: 'darkcloud', x: 76, y: 6.4, baseY: 6.4, patrolMinX: 68, patrolMaxX: 86 },
          { type: 'elite', x: 146, y: 0.9, patrolMinX: 136, patrolMaxX: 158 },
          { type: 'darkcloud', x: 158, y: 5.2, baseY: 5.2, patrolMinX: 146, patrolMaxX: 172 },
          { type: 'darkcloud', x: 207, y: 6.4, baseY: 6.4, patrolMinX: 196, patrolMaxX: 220 },
          { type: 'minion', x: 250, y: 0.7, patrolMinX: 240, patrolMaxX: 258 },
          { type: 'elite', x: 292, y: 0.9, patrolMinX: 282, patrolMaxX: 302 },
          { type: 'darkcloud', x: 296, y: 5.4, baseY: 5.4, patrolMinX: 282, patrolMaxX: 308 },
        ],
        rocks: [
          { x: 168, y: 2.0, w: 2.2, h: 4.0 },
        ],
        spikes: [
          { x: 16, y: 0.25, w: 4.0 },
        ],
        // Full-height vertical pillars with small spike-filled gap (MUST use Fox [4] Dash)
        spikeGates: [
          { x: 36, w: 3.6, gapBottomY: 0.0, gapTopY: 2.2 },
          { x: 124, w: 3.6, gapBottomY: 0.0, gapTopY: 2.2 },
          { x: 268, w: 3.6, gapBottomY: 0.0, gapTopY: 2.2 },
        ],
        cage: { x: 312, y: 1.0, hp: 2.5, unlockFormId: 5 },
      };

    case 4:
      // Màn 4 — Cổng Thiên Đình [0, 360]
      // Bệ đứng lúc đầu có Cột khe gai Cáo [4] & Đá Gấu [3], phần sau chủ yếu bay Ong [5] né Mây Đen Sấm Sét với rất ít đảo mây nhỏ
      return {
        spawn: { x: 3.0, y: 1.0 },
        platforms: [
          { x1: -2, x2: 46, topY: 0, h: 2.0, color: 0x334155, topColor: 0x64748b },
          // Sparse small cloud perches across the sky for resting / Cóc recharge
          { x1: 92, x2: 102, topY: 3.5, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 162, x2: 172, topY: 4.2, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 232, x2: 242, topY: 3.8, h: 1.0, color: 0x334155, topColor: 0x64748b },
          { x1: 296, x2: 306, topY: 4.0, h: 1.0, color: 0x334155, topColor: 0x64748b },
          // Final cloud platform with Spirit Cage (unlocks Dragon Cutscene)
          { x1: 342, x2: 362, topY: 0, h: 2.0, color: 0x334155, topColor: 0x64748b },
        ],
        enemies: [
          { type: 'minion', x: 16, y: 0.7, patrolMinX: 10, patrolMaxX: 22 },
          { type: 'darkcloud', x: 64, y: 5.5, baseY: 5.5, patrolMinX: 52, patrolMaxX: 78 },
          { type: 'darkcloud', x: 118, y: 6.2, baseY: 6.2, patrolMinX: 106, patrolMaxX: 132 },
          { type: 'darkcloud', x: 144, y: 3.6, baseY: 3.6, patrolMinX: 132, patrolMaxX: 156 },
          { type: 'darkcloud', x: 192, y: 6.4, baseY: 6.4, patrolMinX: 178, patrolMaxX: 206 },
          { type: 'darkcloud', x: 216, y: 3.8, baseY: 3.8, patrolMinX: 204, patrolMaxX: 228 },
          { type: 'darkcloud', x: 266, y: 6.0, baseY: 6.0, patrolMinX: 250, patrolMaxX: 282 },
          { type: 'darkcloud', x: 322, y: 5.2, baseY: 5.2, patrolMinX: 310, patrolMaxX: 336 },
        ],
        rocks: [
          { x: 38, y: 2.0, w: 2.2, h: 4.0 },
        ],
        spikes: [],
        spikeGates: [
          { x: 26, w: 3.6, gapBottomY: 0.0, gapTopY: 2.2 },
        ],
        cage: { x: 352, y: 1.0, hp: 3.0, unlockFormId: null },
      };

    case 5:
    default:
      // Màn 5 — Điện Ngọc Hoàng (Arena [-13, +13])
      return {
        spawn: { x: -8.0, y: 1.0 },
        platforms: [
          { x1: -14.5, x2: 14.5, topY: 0, h: 4, color: 0x312e81, topColor: 0xfacc15 },
          { x1: -11.0, x2: -6.0, topY: 2.8, h: 0.7, color: 0x4338ca, topColor: 0xfde047 },
          { x1: 6.0, x2: 11.0, topY: 2.8, h: 0.7, color: 0x4338ca, topColor: 0xfde047 },
        ],
        enemies: [],
        rocks: [],
        spikes: [],
        spikeGates: [],
        cage: null,
      };
  }
}
