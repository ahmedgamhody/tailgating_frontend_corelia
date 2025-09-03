import { z } from "zod";

export const VehicleDetailsSchema = z.object({
  registration: z.string().min(1, { message: "Registration is required" }),
  make: z.string().optional(),
  primary_colour: z.string().optional(),
  limit: z.number().min(1).optional(),
});

export const VehiclesDetailsSchema = z.object({
  partial_registration: z
    .string()
    .min(1, { message: "Registration is required" }),
  make: z.string().optional(),
  primary_colour: z.string().optional(),
  model: z.string().optional(),
  fuel_type: z.string().optional(),
  limit: z.number().min(1).optional(),
});

export type VehicleDetailsFormData = z.infer<typeof VehicleDetailsSchema>;
export type VehiclesDetailsFormData = z.infer<typeof VehiclesDetailsSchema>;
