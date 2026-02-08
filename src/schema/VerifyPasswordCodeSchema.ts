import * as zod from "zod";

export const verifyPasswordCodeSchema = zod.object({
  resetCode: zod.string("code must be valid").nonempty("code is required"),
});

export type VerifyPasswordCodeType = zod.infer<typeof verifyPasswordCodeSchema>;
