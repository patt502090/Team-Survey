import { Context } from 'koa';
import { ID } from '@strapi/types/dist/data';

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


  async get_id(ctx: Context) {
    console.log(ctx.request.body)
    let get_province_id: ID
    let get_District_id: ID
    let province_name : String
    let Discrit_name : String
    const { Province_n, District_n, S_District_n } = ctx.request.body.data;
    console.log(Province_n, District_n, S_District_n)
    
    if (!Province_n || !District_n || !S_District_n) {
      return ctx.badRequest('เอาข้อมูลมาให้ครบครับน้อง');
    }

    try {
      const Get_Province = await strapi.entityService.findMany('api::province.province', {
        filters: {
          name_th: Province_n
        },
      });
      
      if (Get_Province.length === 0) {
        return ctx.badRequest('ไม่พบจังหวัดที่มีชื่อดังกล่าว');
      }

      province_name = Get_Province[0].name_th
      get_province_id = Get_Province[0].id;  

      const Get_Districts = await strapi.entityService.findMany('api::district.district', {
        filters: {
          name_th: District_n,  
          province_id: {id : get_province_id }  
        },
      });
      
      if (Get_Districts.length === 0) {
        return ctx.badRequest('ไม่พบเขตที่ตรงกับชื่อในจังหวัดนี้');
      }
      Discrit_name = Get_Districts[0].name_th
      get_District_id = Get_Districts[0].id;  

      const Get_s_Districts = await strapi.entityService.findMany('api::sub-district.sub-district', {
        filters: {
          name_th: S_District_n,  
          amphure_id: {id : get_District_id }  
        },
      });
      
      if (Get_Districts.length === 0) {
        return ctx.badRequest('ไม่พบเขตที่ตรงกับชื่อในจังหวัดนี้');
      }

      ctx.send({
        district: Get_s_Districts[0],
        province: province_name,
        district_name: Discrit_name
      }, 200); 
      

    } catch (error) {
      console.log("เกิดข้อผิดพลาด:", error);
      ctx.internalServerError('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
}
};
