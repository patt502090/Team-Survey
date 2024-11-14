// src/api/region/routes/region.ts
export default {
    routes: [
      {
        method: 'POST',
        path: '/check_estimate_sd', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_sd', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      }, {
        method: 'POST',
        path: '/check_estimate_d', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_d', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },{
        method: 'POST',
        path: '/check_estimate_p', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_p', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/check_estimate_r', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_r', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/check_estimate_all', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_all', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/check_estimate_all_T', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_all_Table', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/check_estimate_R_T', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_Region_Table', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/check_estimate_P_T', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_Province_Table', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/check_estimate_D_T', // URL ที่จะใช้เรียกใช้งาน API
        handler: 'check.estimate_checked_district_Table', // ชื่อฟังก์ชันใน Controller
        config: {
          policies: [],
          middlewares: [],
        },
      }
    ],
  };
  