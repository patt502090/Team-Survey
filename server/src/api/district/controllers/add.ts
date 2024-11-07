import { Context } from 'koa';

export default {
  async createdistricts(ctx: Context) {
    const districtsData = ctx.request.body;

    // ตรวจสอบว่าได้รับข้อมูลในรูปแบบ array หรือไม่
    if (!Array.isArray(districtsData)) {
      return ctx.badRequest('Invalid data format. Expected an array of districts.');
    }

    try {
      // ส่งข้อมูลทีละ 1
      for (const district of districtsData) {
        if (district.id && district.name_th && district.name_en && district.province_id) {
          // ตรวจสอบว่า id นี้มีอยู่ในฐานข้อมูลแล้วหรือยัง
          const existingdistrict = await strapi.entityService.findOne('api::district.district', district.id);  // ใช้ id ตรงๆ

          if (existingdistrict) {
            throw new Error(`District with id ${district.id} already exists.`);
          }

          // ใช้ create เพื่อสร้างข้อมูลใหม่
          await strapi.entityService.create('api::district.district', {
            data: {
              id: district.id,
              name_th: district.name_th,
              name_en: district.name_en,
              province_id: district.province_id,
            },
          });

          // อาจจะมีการส่ง response หรือ log หลังจากแต่ละคำสั่งเสร็จ
          console.log(`District with id ${district.id} created successfully.`);
        } else {
          throw new Error('Each district object must contain "id", "name_th", "name_en", and "province_id".');
        }
      }

      // ส่งผลลัพธ์กลับ
      ctx.send({ message: 'Districts created successfully' });

    } catch (error) {
      console.error('Error creating districts:', error);
      ctx.internalServerError(error.message || 'Failed to create districts');
    }
  },
};
