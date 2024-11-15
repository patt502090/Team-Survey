import { Context } from 'koa';
import { compileFunction } from 'vm';
import region from '../../region/controllers/region';
import { METHODS } from 'http';
import { ID } from '@strapi/types/dist/data';

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
        id: S_district.id,
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
        id: Get_District.id,
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
        id: Get_Province.id,
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
    const getAllRegionIds = await strapi.entityService.findMany('api::region.region', {
      fields: ['id', 'name']
    }) as Array<{ id: string; name: string }>;
    console.log(getAllRegionIds)
    const all_region = []
    for (const r_id of getAllRegionIds) {


      const S_RegionData = ctx.request.body;
      try {
        const Get_Region = await strapi.entityService.findMany('api::province.province', {
          filters: {
            geography_id: { name: r_id.name }
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

        all_region.push({
          Region: r_id.name,
          greenCount: statusCount.green,
          yellowCount: statusCount.yellow,
          redCount: statusCount.red,
          total_customer: statusCount.green + statusCount.yellow + statusCount.red
        });

      } catch (error) {
        return error
      }
    }
    return ctx.send({ regions: all_region });

  },


  async estimate_checked_Region_Table(ctx: Context) {
    const getAllProvinces = await strapi.entityService.findMany('api::province.province', {
      filters: {
        geography_id: { name: ctx.request.body.data.Region_id }
      },
      fields: ['id', 'name_th']
    }) as Array<{ id: string; name_th: string }>;
    console.log(getAllProvinces)
    const all_province = []
    for (const r_id of getAllProvinces) {

      const S_provinceData = ctx.request.body;
      try {
        const Get_Province = await strapi.entityService.findOne('api::province.province', r_id.id, {
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

        all_province.push({
          id: Get_Province.id,
          province: Get_Province.name_th,
          greenCount: statusCount.green,
          yellowCount: statusCount.yellow,
          redCount: statusCount.red,
          total_customer: statusCount.green + statusCount.yellow + statusCount.red
        });

      } catch (error) {
        console.error('Error fetching province data:', error);
        ctx.internalServerError('Failed to fetch province data');
      }

    }
    return ctx.send({ provinces: all_province });


  },
  async estimate_checked_Province_Table(ctx: Context) {
    const getAlldistricts = await strapi.entityService.findMany('api::district.district', {
      filters: {
        province_id: ctx.request.body.data.Province_id
      },
      populate: { province_id: true },
      fields: ['id', 'name_th',]
    }) as Array<{ id: string; name_th: string }>;
    console.log("niggga", getAlldistricts)
    const all_district = []
    for (const r_id of getAlldistricts) {


      const S_districtData = ctx.request.body;
      try {
        const Get_District = await strapi.entityService.findOne('api::district.district', r_id.id, {
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
        all_district.push({
          id: Get_District.id,
          district: Get_District.name_th,
          greenCount: statusCount.green,
          yellowCount: statusCount.yellow,
          redCount: statusCount.red,
          total_customer: statusCount.green + statusCount.yellow + statusCount.red
        });
      }
      catch (error) {
        console.error('Error creating Provinces:', error);
        ctx.internalServerError('Failed to create Provinces');
      }


    }
    return ctx.send({ districts: all_district });
  },



  async estimate_checked_district_Table(ctx: Context) {
    console.log(ctx.request.body.data.district_id)
    const getAlls_districts = await strapi.entityService.findMany('api::sub-district.sub-district', {
      filters: {
        amphure_id: ctx.request.body.data.district_id
      },
      populate: { amphure_id: true },
      fields: ['id', 'name_th',]
    }) as Array<{ id: string; name_th: string }>;
    console.log("niggga", getAlls_districts)
    const all_s_district = []
    for (const r_id of getAlls_districts) {
      const S_districtData = ctx.request.body;

      try {
        let Get_s_Districts: any
        let S_district: any
        S_district = await strapi.entityService.findOne('api::sub-district.sub-district', r_id.id);
        if (S_districtData.data.team_id !== null) {
          const Get_team = await strapi.entityService.findOne('api::team.team', S_districtData.data.team_id);
          if (!Get_team) {
            return ("ไม่เจอทีมอะคุณ Id ผิดป่าว")
          }
          Get_s_Districts = await strapi.entityService.findMany('api::customer.customer', {
            filters: {
              sub_district: { id: S_district.id} ,
              business_with: { id: Get_team.id }
            }
          });
          console.log(Get_s_Districts)
        } else {
          Get_s_Districts = await strapi.entityService.findMany('api::customer.customer', {
            filters: {
              sub_district: { id: S_district.id },
            }
          });
        }
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
        all_s_district.push({
          id: S_district.id,
          s_Districts: S_district.name_th,
          greenCount: statusCount.green,
          yellowCount: statusCount.yellow,
          redCount: statusCount.red,
          total_customer: statusCount.green + statusCount.yellow + statusCount.red
        });

      }
      catch (error) {
        console.error('Error creating Provinces:', error);
        ctx.internalServerError('Failed to create Provinces');
      }
    }
    return ctx.send({ s_districts: all_s_district });
  },
}
