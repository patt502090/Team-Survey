import { z } from "zod";
export const ocrSchema = z.object({
  address: z.string().optional(),
  address2: z.string().optional(),
  en_dob: z.string().optional(),
  en_expire: z.string().optional(),
  en_fname: z.string().optional(),
  en_issue: z.string().optional(),
  en_lname: z.string().optional(),
  face: z.string().optional(),
  id_number: z.string().optional(),
  message: z.string().optional(),
  religion: z.string().optional(),
  th_dob: z.string().optional(),
  th_expire: z.string().optional(),
  th_issue: z.string().optional(),
  th_name: z.string().optional(),
});

export type OCRResponse = z.infer<typeof ocrSchema>;
