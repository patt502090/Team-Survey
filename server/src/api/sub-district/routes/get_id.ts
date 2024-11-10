// src/api/region/routes/region.ts
export default {
    routes: [
      {
        method: 'POST',
        path: '/sub_districts_id', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'add.get_id', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  