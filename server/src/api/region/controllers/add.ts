import { Context } from 'koa';

export default {
  async createRegions(ctx: Context) {
    const regionsData = ctx.request.body;

    if (!Array.isArray(regionsData)) {
      return ctx.badRequest('Invalid data format. Expected an array of regions.');
    }

    try {
      for (const region of regionsData) {
        if (region.id && region.name) {
          // ตรวจสอบว่า id นี้มีอยู่ในฐานข้อมูลแล้วหรือยัง
          const existingRegion = await strapi.entityService.findOne('api::region.region', region.id);

          if (existingRegion) {
            return ctx.badRequest(`Region with id ${region.id} already exists.`);
          }

          // ใช้ create เพื่อสร้างข้อมูลใหม่โดยใช้ id และ name ที่ส่งมา
          await strapi.entityService.create('api::region.region', {
            data: {
              id: region.id, // ระบุ id ที่ต้องการเอง
              name: region.name, // ระบุ name ที่ต้องการ
            },
          });
        } else {
          return ctx.badRequest('Each region object must contain "id" and "name" fields.');
        }
      }

      ctx.send({ message: 'Regions created successfully' });
    } catch (error) {
      console.error('Error creating regions:', error);
      ctx.internalServerError('Failed to create regions');
    }
  },
};
