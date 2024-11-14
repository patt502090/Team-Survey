import { Context } from 'koa';
import { compileFunction } from 'vm';
import region from '../../region/controllers/region';

export default {
  async estimate_checked_sd(ctx: Context) {
    const S_districtData = ctx.request.body;

    try {
      let Get_s_Districts: any
      let S_district: any
      if (S_districtData.data.team_id !== null) {
        S_district = await strapi.entityService.findOne('api::sub-district.sub-district', S_districtData.data.S_district_id);
        const Get_team = await strapi.entityService.findOne('api::team.team', S_districtData.data.team_id);
        if (!Get_team) {
          return ("ไม่เจอทีมอะคุณ Id ผิดป่าว")
        }
        Get_s_Districts = await strapi.entityService.findMany('api::customer.customer', {
          filters: {
            sub_district: { id: S_districtData.data.S_district_id },
            business_with: { id: Get_team.id }
          }
        });
        console.log(Get_s_Districts)
      } else {
        Get_s_Districts = await strapi.entityService.findMany('api::customer.customer', {
          filters: {
            sub_district: { id: S_districtData.data.S_district_id },
          }
        });
      }

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
        s_Districts: S_district.name_th,
        greenCount: statusCount.green,
        yellowCount: statusCount.yellow,
        redCount: statusCount.red,
        total_customer: statusCount.green + statusCount.yellow + statusCount.red
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
              customers: {
                populate: {
                  business_with: true
                }
              }
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
          customers: Array<{
            id: string,
            documentId: string,
            estimate: string,
            business_with: {
              id: string,
              documentId: string
            }
          }>
        }>
      };

      if (!Get_District) {
        return ctx.badRequest('ไม่พบข้อมูล District ที่ต้องการ');
      }

      const allCustomers: any[] = [];
      if (S_districtData.data.team_id === null) {
        Get_District.sub_districts.forEach(subDistrict => {
          if (subDistrict.customers && subDistrict.customers.length > 0) {
            allCustomers.push(...subDistrict.customers);
          }
        });
      } else {
        const Get_team = await strapi.entityService.findOne('api::team.team', S_districtData.data.team_id);
        if (!Get_team) {
          return ("ไม่เจอทีมอะคุณ Id ผิดป่าว")
        }
        Get_District.sub_districts.forEach(subDistrict => {
          if (subDistrict.customers && subDistrict.customers.length > 0) {
            subDistrict.customers.forEach(customer => {
              console.log(customer.business_with)
              if (customer.business_with && customer.business_with.id === Get_team.id) {
                allCustomers.push(customer);
              }
            });
          }
        });
      }
      console.log(allCustomers)
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
        district: Get_District.name_th,
        greenCount: statusCount.green,
        yellowCount: statusCount.yellow,
        redCount: statusCount.red,
        total_customer: statusCount.green + statusCount.yellow + statusCount.red
      }, 200);
    }
    catch (error) {
      console.error('Error creating Provinces:', error);
      ctx.internalServerError('Failed to create Provinces');
    }
  }, async estimate_checked_p(ctx: Context) {
    const S_provinceData = ctx.request.body;
    try {
      const Get_Province = await strapi.entityService.findOne('api::province.province', S_provinceData.data.Province_id, {
        populate: {
          districts: {
            populate: {
              sub_districts: {
                populate: {
                  customers: {
                    populate: {
                      business_with: true
                    }
                  }
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
            id: string,
            documentId: string,
            name_th: string,
            name_en: string,
            customers: Array<{
              id: string,
              documentId: string,
              estimate: string,
              business_with: {
                id: string,
                documentId: string
              }
            }>
          }>
        }>;
      };

      const allCustomers: any[] = [];

      if (S_provinceData.data.team_id === null) {
        Get_Province.districts.forEach(district => {
          district.sub_districts.forEach(subDistrict => {
            if (subDistrict.customers && subDistrict.customers.length > 0) {
              allCustomers.push(...subDistrict.customers);
            }
          });
        });

      } else {
        const Get_team = await strapi.entityService.findOne('api::team.team', S_provinceData.data.team_id);
        if (!Get_team) {
          return ("ไม่เจอทีมอะคุณ Id ผิดป่าว")
        }
        Get_Province.districts.forEach(district => {
          district.sub_districts.forEach(subDistrict => {
            if (subDistrict.customers && subDistrict.customers.length > 0) {
              subDistrict.customers.forEach(customer => {
                console.log(customer.business_with)
                if (customer.business_with && customer.business_with.id === Get_team.id) {
                  allCustomers.push(customer);
                }
              });
            }
          });
        });
      }


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
        province: Get_Province.name_th,
        greenCount: statusCount.green,
        yellowCount: statusCount.yellow,
        redCount: statusCount.red,
        total_customer: statusCount.green + statusCount.yellow + statusCount.red
      }, 200);

    } catch (error) {
      console.error('Error fetching province data:', error);
      ctx.internalServerError('Failed to fetch province data');
    }
  }, async estimate_checked_r(ctx: Context) {
    const S_RegionData = ctx.request.body;
    console.log(S_RegionData.data.Region_id)
    try {
      const Get_Region = await strapi.entityService.findMany('api::province.province', {
        filters: {
          geography_id: { name: S_RegionData.data.Region_id }
        },
        populate: {
          geography_id: true,
          districts: {
            populate: {
              sub_districts: {
                populate: {
                  customers: {
                    populate: {
                      business_with: true
                    }
                  }
                },
              },
            },
          },
        },
      }) as Array<{
        id: string;
        documentId: string;
        locale?: string;
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
        name_en?: string;
        name_th?: string;
        geography_id: {
          id: string;
          documentId: string;
          name: string;
          createdAt: string;
          updatedAt: string;
        };
        districts: Array<{
          id: string;
          documentId: string;
          name_th: string;
          name_en: string;
          sub_districts: Array<{
            id: string,
            documentId: string,
            name_th: string,
            name_en: string,
            customers: Array<{
              id: string,
              documentId: string,
              estimate: string,
              business_with: {
                id: string,
                documentId: string
              }
            }>
          }>
        }>;
      }>;


      if (!Get_Region) {
        return ctx.badRequest('ไม่พบข้อมูล Region ที่ต้องการ');
      }

      const allCustomers: any[] = [];


      console.log(Get_Region)
      if (S_RegionData.data.team_id === null) {
        Get_Region.forEach(province => {
          province.districts.forEach(district => {
            district.sub_districts.forEach(subDistrict => {
              if (subDistrict.customers && subDistrict.customers.length > 0) {
                allCustomers.push(...subDistrict.customers);
              }
            });
          });
        })

      } else {
        const Get_team = await strapi.entityService.findOne('api::team.team', S_RegionData.data.team_id);
        if (!Get_team) {
          return ("ไม่เจอทีมอะคุณ Id ผิดป่าว")
        }
        Get_Region.forEach(province => {
          province.districts.forEach(district => {
            district.sub_districts.forEach(subDistrict => {
              if (subDistrict.customers && subDistrict.customers.length > 0) {
                subDistrict.customers.forEach(customer => {
                  console.log(customer.business_with)
                  if (customer.business_with && customer.business_with.id === Get_team.id) {
                    allCustomers.push(customer);
                  }
                });
              }
            });
          });
        })
      }

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
        Region: S_RegionData.data.Region_id,
        greenCount: statusCount.green,
        yellowCount: statusCount.yellow,
        redCount: statusCount.red,
        total_customer: statusCount.green + statusCount.yellow + statusCount.red
      }, 200);

    } catch (error) {
      console.error('Error fetching region data:', error);
      ctx.internalServerError('Failed to fetch region data');
    }
  },
  async estimate_checked_all(ctx: Context) {
    const S_districtData = ctx.request.body;
    try {
      let allCustomers
      if (S_districtData.data.team_id !== null) {
        const Get_team = await strapi.entityService.findOne('api::team.team', S_districtData.data.team_id);
        if (!Get_team) {
          return ("ไม่เจอทีมอะคุณ Id ผิดป่าว")
        }
        allCustomers = await strapi.entityService.findMany('api::customer.customer', {
          filters: {
            business_with: S_districtData.data.team_id
          }
        });
      } else {
        allCustomers = await strapi.entityService.findMany('api::customer.customer');
      }

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
        total_customer: statusCount.green + statusCount.yellow + statusCount.red
      }, 200);

    } catch (error) {
      console.error('Error fetching customer data:', error);
      ctx.internalServerError('Failed to fetch customer data');
    }
  },
  async estimate_checked_all_Table(ctx: Context) {
    let Get_all_region
    try {
      Get_all_region = await strapi.entityService.findMany('api::region.region');
      console.log(Get_all_region)
    }
    catch (error) {
      return error
    }
  }





};
