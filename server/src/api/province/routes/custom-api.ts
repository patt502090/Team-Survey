// src/api/region/routes/region.ts
export default {
    routes: [
      {
        method: 'POST',
        path: '/create-provinces', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'add.createProvinces', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  