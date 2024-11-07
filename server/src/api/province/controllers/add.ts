import { Context } from 'koa';

export default {
  async createProvinces(ctx: Context) {
    const ProvincesData = ctx.request.body;

    // ตรวจสอบว่าได้รับข้อมูลในรูปแบบ array หรือไม่
    if (!Array.isArray(ProvincesData)) {
      return ctx.badRequest('Invalid data format. Expected an array of Provinces.');
    }

    try {
      const promises = ProvincesData.map(async (province) => {
        if (province.id && province.name_th && province.name_en && province.geography_id) {
          // ตรวจสอบว่า id นี้มีอยู่ในฐานข้อมูลแล้วหรือยัง
          const existingProvince = await strapi.entityService.findOne('api::province.province', province.id);


          if (existingProvince) {
            return ctx.badRequest(`Province with id ${province.id} already exists.`);
          }

          // ใช้ create เพื่อสร้างข้อมูลใหม่
          await strapi.entityService.create('api::province.province', {
            data: {
              id: province.id,
              name_th: province.name_th,
              name_en: province.name_en,
              geography_id: province.geography_id
            },
          });
        } else {
          return ctx.badRequest('Each province object must contain "id", "name_th", "name_en", and "geography_id".');
        }
      });

      // รอให้ทุกคำสั่ง create เสร็จ
      await Promise.all(promises);

      // ส่งผลลัพธ์กลับ
      ctx.send({ message: 'Provinces created successfully' });

    } catch (error) {
      console.error('Error creating Provinces:', error);
      ctx.internalServerError('Failed to create Provinces');
    }
  },
};
