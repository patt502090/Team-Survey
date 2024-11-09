import { z } from "zod";

export const customerSchema = z.object({
  Id_Number: z.string(),
  NameTitle: z.string(),
  Name_Th: z.string(),
  Name_Eng: z.string(),
  Address: z.string(),
  birthdate: z.string(),
});

export type CustomerProps = z.infer<typeof customerSchema>;
