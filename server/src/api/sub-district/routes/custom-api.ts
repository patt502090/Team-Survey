// src/api/region/routes/region.ts
export default {
    routes: [
      {
        method: 'POST',
        path: '/create-sub_districts', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'add.createsubdistricts', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  