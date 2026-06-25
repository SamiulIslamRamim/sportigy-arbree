import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.component';
import { Checkbox } from '@/components/ui/checkbox.component';

export const MultiCheckField = ({
  form, name, labelName, options = [],
}: {
  form: any; name: string; labelName?: string; options?: { label: string; value: string }[];
}) => {
  if (!form) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          {labelName && <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">{labelName}</label>}
          {options.map((opt) => (
            <FormField
              key={opt.value}
              control={form.control}
              name={name}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(opt.value)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        field.onChange(
                          checked ? [...current, opt.value] : current.filter((v: string) => v !== opt.value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{opt.label}</FormLabel>
                </div>
              )}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
