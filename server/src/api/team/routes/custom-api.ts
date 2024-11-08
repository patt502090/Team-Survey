// src/api/region/routes/region.ts
export default {
    routes: [
      {
        method: 'PUT',
        path: '/assign_role', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'add.assign_role', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  