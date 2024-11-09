import { z } from "zod";
export const ocrSchema = z.object({
  address: z.string(),
  address2: z.string(),
  en_dob: z.string(),
  en_expire: z.string(),
  en_fname: z.string(),
  en_issue: z.string(),
  en_lname: z.string(),
  face: z.string().optional(),
  id_number: z.string(),
  message: z.string(),
  religion: z.string().optional(),
  th_dob: z.string(),
  th_expire: z.string(),
  th_issue: z.string(),
  th_name: z.string(),
});

export type OCRResponse = z.infer<typeof ocrSchema>;
