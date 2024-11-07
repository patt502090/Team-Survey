import { Context } from 'koa';

export default {
  async createsubdistricts(ctx: Context) {
    const subdistrictsData = ctx.request.body;

    if (!Array.isArray(subdistrictsData)) {
      return ctx.badRequest('Invalid data format. Expected an array of subdistricts.');
    }

    try {
      for (const subdistrict of subdistrictsData) {
        try {
          if (subdistrict.id && subdistrict.name_th && subdistrict.name_en && subdistrict.amphure_id) {
            // ตรวจสอบว่า id นี้มีอยู่ในฐานข้อมูลแล้วหรือยัง
            const existingSubdistrict = await strapi.entityService.findOne('api::sub-district.sub-district', subdistrict.id);

            if (existingSubdistrict) {
              console.warn(`subDistrict with id ${subdistrict.id} already exists.`);
              continue; // ข้ามรายการนี้ไป
            }

            // ใช้ create เพื่อสร้างข้อมูลใหม่
            await strapi.entityService.create('api::sub-district.sub-district', {
              data: {
                id: subdistrict.id,
                name_th: subdistrict.name_th,
                name_en: subdistrict.name_en,
                amphure_id: subdistrict.amphure_id,
                zip_code: subdistrict.zip_code,
              },
            });

            console.log(`subDistrict with id ${subdistrict.id} created successfully.`);
          } else {
            console.warn(`Invalid subdistrict data: missing required fields for id ${subdistrict.id}`);
          }
        } catch (error) {
          console.error(`Error processing subdistrict with id ${subdistrict.id}:`, error.message);
        }
      }

      ctx.send({ message: 'Subdistricts processed successfully' });

    } catch (error) {
      console.error('Unexpected error in createsubdistricts:', error);
      ctx.internalServerError('Failed to process subdistricts');
    }
  },
};
