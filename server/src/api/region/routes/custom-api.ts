// src/api/region/routes/region.ts
export default {
    routes: [
      {
        method: 'POST',
        path: '/create-regions', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'add.createRegions', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  