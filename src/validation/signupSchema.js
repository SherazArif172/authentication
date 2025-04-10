import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
  role: z.string()
    .refine((val) => val !== "", "Please select a role")
    .refine((val) => ["customer", "admin"].includes(val), "Role must be either customer or admin")
}); 