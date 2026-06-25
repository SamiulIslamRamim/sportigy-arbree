'use client';
import { useZodForm } from '@/forms/react-hook-form/hooks/use-form.hook';
import { loginSchema, type LoginFormData } from '@/forms/react-hook-form/schemas/example.schema';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useZodForm(loginSchema);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register('email')} placeholder="Email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2" />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <input {...register('password')} type="password" placeholder="Password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2" />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
