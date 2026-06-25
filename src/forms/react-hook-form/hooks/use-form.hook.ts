import { useForm, type UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useZodForm<T extends z.ZodType<any, any>>(
  schema: T,
  options?: Omit<UseFormProps<z.input<T>>, 'resolver'>
) {
  return useForm<z.input<T>>({
    resolver: zodResolver(schema, undefined, { raw: true }),
    ...options,
  });
}
