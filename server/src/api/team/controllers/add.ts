import { ID } from '@strapi/types/dist/data';
import { Context } from 'koa';

export default {
    async assign_role(ctx: Context) {
        const { teamId, userId, roleId } = ctx.request.body.data;

        try {
            console.log(ctx.request.body)
            console.log(teamId, userId, roleId)

            // ตรวจสอบว่า userId หรือ roleId ไม่มีค่า
            if (!userId || !roleId) {
                return ctx.badRequest('userId และ roleId ต้องถูกกำหนด');
            }

            // หาก userId เป็น array ให้วนลูปตามจำนวน userId
            const userIds = Array.isArray(userId) ? userId : [userId]; // ตรวจสอบให้เป็น array

            for (const id of userIds) {
                // อัปเดตข้อมูลของผู้ใช้
                const updatedUser = await strapi.entityService.update(
                    'plugin::users-permissions.user',
                    id,
                    {
                        data: {
                            team: null,
                            my_team: null,
                            role: roleId,
                        }
                    }
                );

                if (!updatedUser) {
                    return ctx.notFound(`ไม่พบผู้ใช้ที่กำหนด ID: ${id}`);
                }

                if (teamId) {
                    interface Team {
                        id: ID;
                        TeamName?: string;
                        members?: { id: ID }[];
                        manager?: { id: ID };
                    }

                    const team = await strapi.entityService.findOne('api::team.team', teamId, {
                        populate: ['members', 'manager'],
                    }) as Team;

                    if (!team) {
                        return ctx.notFound('ไม่พบทีมที่กำหนด');
                    }

                    if (roleId === 3) {
                        // หาก roleId เป็น 3 เพิ่ม userId ลงในสมาชิกทีม
                        const updatedMembers = team.members
                            ? [...team.members.map((member) => member.id), id]
                            : [id];

                        for (const memberId of updatedMembers) {
                            const response = await strapi.entityService.update('plugin::users-permissions.user', memberId, {
                                data: {
                                    team:{ id: teamId }
                                }
                            });
                            
                            console.log(response)
                        }
                    } else if (roleId === 4) {
                        // หาก roleId เป็น 4 ตั้ง userId เป็น manager ของทีม
                        await strapi.entityService.update('api::team.team', teamId, {
                            data: {
                                manager: { id },
                            },
                        });
                    } else {
                        console.log("nothing")
                    }
                }
            }

            return ctx.send({ message: 'อัปเดตทีมสำเร็จ' });
        } catch (error) {
            console.log(error);
            return ctx.internalServerError('เกิดข้อผิดพลาดในการกำหนด Role');
        }
    },
};
