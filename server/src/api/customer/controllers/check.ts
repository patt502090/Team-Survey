import { Context } from 'koa';

export default {
  async estimate_checked_sd(ctx: Context) {
    const S_districtData = ctx.request.body;

    try {
        const Get_s_Districts = await strapi.entityService.findMany('api::customer.customer', {
            filters: {
              sub_district: { id: S_districtData.data.S_district_id },
            },
          });
          console.log(Get_s_Districts)
         
          const statusCount = {
            green: 0,
            yellow: 0,
            red: 0,
          };
          Get_s_Districts.forEach(customer => {
            const estimateStatus = customer.estimate; 
            if (estimateStatus.toLowerCase() === 'green') {
              statusCount.green++;
            } else if (estimateStatus.toLowerCase() === 'yellow') {
              statusCount.yellow++;
            } else if (estimateStatus.toLowerCase() === 'red') {
              statusCount.red++;
            }
          });
          ctx.send({
            greenCount: statusCount.green,
            yellowCount: statusCount.yellow,
            redCount: statusCount.red,
          }, 200);

        }
          catch (error) {
      console.error('Error creating Provinces:', error);
      ctx.internalServerError('Failed to create Provinces');
    }
  },
  async estimate_checked_d(ctx: Context) {
    const S_districtData = ctx.request.body;
    try {
      const Get_District = await strapi.entityService.findOne('api::district.district', S_districtData.data.district_id, {
        populate: {
          sub_districts: {
            populate: {
              customers: true, 
            },
          },
        },
      }) as { 
        id: string, 
        documentId: string, 
        locale?: string, 
        createdAt?: string, 
        updatedAt?: string, 
        publishedAt?: string, 
        name_en?: string, 
        name_th?: string,
        sub_districts: Array<{
          id: string,
          documentId: string,
          name_th: string,
          name_en: string,
          customers: any[] 
        }>
      };
  
      if (!Get_District) {
        return ctx.badRequest('ไม่พบข้อมูล District ที่ต้องการ');
      }
      const allCustomers: any[] = [];
      Get_District.sub_districts.forEach(subDistrict => {
        if (subDistrict.customers && subDistrict.customers.length > 0) {
          allCustomers.push(...subDistrict.customers); 
        }
      });
      const statusCount = {
        green: 0,
        yellow: 0,
        red: 0,
      };
      allCustomers.forEach(customer => {
        const estimateStatus = customer.estimate; 
        if (estimateStatus.toLowerCase() === 'green') {
          statusCount.green++;
        } else if (estimateStatus.toLowerCase() === 'yellow') {
          statusCount.yellow++;
        } else if (estimateStatus.toLowerCase() === 'red') {
          statusCount.red++;
        }
      });
      ctx.send({
        greenCount: statusCount.green,
        yellowCount: statusCount.yellow,
        redCount: statusCount.red,
      }, 200);
      }
          catch (error) {
      console.error('Error creating Provinces:', error);
      ctx.internalServerError('Failed to create Provinces');
    }
  },async estimate_checked_p(ctx: Context) {
    const S_provinceData = ctx.request.body;
    try {
      const Get_Province = await strapi.entityService.findOne('api::province.province', S_provinceData.data.Province_id, {
        populate: {
          districts: { 
            populate: {
              sub_districts: {
                populate: {
                  customers: true, 
                },
              },
            },
          },
        },
      }) as {
        id: string;
        documentId: string;
        locale?: string;
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
        name_en?: string;
        name_th?: string;
        districts: Array<{
          id: string;
          documentId: string;
          name_th: string;
          name_en: string;
          sub_districts: Array<{
            id: string;
            documentId: string;
            name_th: string;
            name_en: string;
            customers: any[]; 
          }>;
        }>;
      };
      
      const allCustomers: any[] = [];
      
      Get_Province.districts.forEach(district => {
        district.sub_districts.forEach(subDistrict => {
          if (subDistrict.customers && subDistrict.customers.length > 0) {
            allCustomers.push(...subDistrict.customers); 
          }
        });
      });
  
      const statusCount = {
        green: 0,
        yellow: 0,
        red: 0,
      };
  
      allCustomers.forEach(customer => {
        const estimateStatus = customer.estimate;
        if (estimateStatus.toLowerCase() === 'green') {
          statusCount.green++;
        } else if (estimateStatus.toLowerCase() === 'yellow') {
          statusCount.yellow++;
        } else if (estimateStatus.toLowerCase() === 'red') {
          statusCount.red++;
        }
      });
  
      ctx.send({
        greenCount: statusCount.green,
        yellowCount: statusCount.yellow,
        redCount: statusCount.red,
      }, 200);
  
    } catch (error) {
      console.error('Error fetching province data:', error);
      ctx.internalServerError('Failed to fetch province data');
    }
  },async estimate_checked_r(ctx: Context) {
    const S_RegionData = ctx.request.body;
    try {
      // ดึงข้อมูลจาก Region โดยใช้ Region_id
      const Get_Region = await strapi.entityService.findOne('api::region.region', S_RegionData.data.Region_id, {
        populate: {
          provinces: { // ดึงข้อมูลจาก Relation ของ Provinces
            populate: {
              districts: {
                populate: {
                  sub_districts: {
                    populate: {
                      customers: true, // ดึงข้อมูลลูกค้าจาก sub_districts
                    },
                  },
                },
              },
            },
          },
        },
      }) as {
        id: string;
        documentId: string;
        locale?: string;
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
        name_en?: string;
        name_th?: string;
        provinces: Array<{
          id: string;
          documentId: string;
          name_th: string;
          name_en: string;
          districts: Array<{
            id: string;
            documentId: string;
            name_th: string;
            name_en: string;
            sub_districts: Array<{
              id: string;
              documentId: string;
              name_th: string;
              name_en: string;
              customers: any[];
            }>;
          }>;
        }>;
      };
  
      if (!Get_Region) {
        return ctx.badRequest('ไม่พบข้อมูล Region ที่ต้องการ');
      }
  
      const allCustomers: any[] = [];
  
      Get_Region.provinces.forEach(province => {
        province.districts.forEach(district => {
          district.sub_districts.forEach(subDistrict => {
            if (subDistrict.customers && subDistrict.customers.length > 0) {
              allCustomers.push(...subDistrict.customers);
            }
          });
        });
      });
  
      const statusCount = {
        green: 0,
        yellow: 0,
        red: 0,
      };
  
      allCustomers.forEach(customer => {
        const estimateStatus = customer.estimate;
        if (estimateStatus.toLowerCase() === 'green') {
          statusCount.green++;
        } else if (estimateStatus.toLowerCase() === 'yellow') {
          statusCount.yellow++;
        } else if (estimateStatus.toLowerCase() === 'red') {
          statusCount.red++;
        }
      });
  
      ctx.send({
        greenCount: statusCount.green,
        yellowCount: statusCount.yellow,
        redCount: statusCount.red,
      }, 200);
  
    } catch (error) {
      console.error('Error fetching region data:', error);
      ctx.internalServerError('Failed to fetch region data');
    }
  },
  async estimate_checked_all(ctx: Context) {
    try {
      const allCustomers = await strapi.entityService.findMany('api::customer.customer');
  
      const statusCount = {
        green: 0,
        yellow: 0,
        red: 0,
      };
  
      allCustomers.forEach(customer => {
        const estimateStatus = customer.estimate;

        if (estimateStatus && typeof estimateStatus === 'string') {
          const status = estimateStatus.toLowerCase();
          
          if (status === 'green') {
            statusCount.green++;
          } else if (status === 'yellow') {
            statusCount.yellow++;
          } else if (status === 'red') {
            statusCount.red++;
          }
        }
      });
  
      ctx.send({
        greenCount: statusCount.green,
        yellowCount: statusCount.yellow,
        redCount: statusCount.red,
      }, 200);
  
    } catch (error) {
      console.error('Error fetching customer data:', error);
      ctx.internalServerError('Failed to fetch customer data');
    }
  }
  
  
  
  
  
};
