'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CustomField } from '@/components/common/fields/cusInputField.component';
import { ActionButton } from '@/components/common/button/action-button.component';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().optional(),
  age: z.number({ message: 'Required' }).min(1, 'Required').max(150, 'Must be at most 150'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Min 6 characters'),
  role: z.string().min(1, 'Select a role'),
  notify: z.boolean().optional(),
  acceptTerms: z.boolean().refine((v) => v === true, 'You must accept'),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormContainer() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: '', bio: '', age: 0, phone: '', password: '', role: '', notify: false, acceptTerms: false },
  });

  const onSubmit = (data: FormValues) => alert(JSON.stringify(data, null, 2));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">CustomField Form Demo</h1>
        <p className="text-muted-foreground mt-1">All field types with react-hook-form + zod validation.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
        <CustomField.Text form={form} name="fullName" labelName="Full Name" placeholder="Enter your name" required />
        <CustomField.TextArea form={form} name="bio" labelName="Biography" placeholder="Tell us about yourself" rows={3} />
        <CustomField.Number form={form} name="age" labelName="Age" numberType="integer" placeholder="Enter age" required />
        <CustomField.StringNumber form={form} name="phone" labelName="Phone Number" placeholder="Enter digits only" />
        <CustomField.Password form={form} name="password" labelName="Password" placeholder="Min 6 characters" required mode="normal" />
        <CustomField.SingleSelectField form={form} name="role" labelName="Role" placeholder="Select role" options={['Admin', 'Editor', 'Viewer']} required />
        <CustomField.SwitchField form={form} name="notify" labelName="Email Notifications" description="Receive email updates" border />
        <CustomField.SingleCheckField form={form} name="acceptTerms" labelName="I accept the terms and conditions" required />
        <ActionButton type="submit" buttonContent="Submit" btnSize="lg" />
      </form>
    </div>
  );
}
