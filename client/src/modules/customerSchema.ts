import { z } from "zod";

export const customerSchema = z.object({
  Pic: z.string().optional(),
  Id_Number: z.string().optional(),
  NameTitle: z.string().optional(),
  Name_Th: z.string().optional(),
  Name_Eng: z.string().optional(),
  Address: z.string().optional(),
  birthdate: z.string().optional(),
  estimate: z.string().optional(),
});

export type CustomerProps = z.infer<typeof customerSchema>;
