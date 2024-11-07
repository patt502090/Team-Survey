export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '50mb', // กำหนดขนาด JSON payload สูงสุด
      formLimit: '50mb', // กำหนดขนาด Form payload สูงสุด
      textLimit: '50mb', // กำหนดขนาด Text payload สูงสุด
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
