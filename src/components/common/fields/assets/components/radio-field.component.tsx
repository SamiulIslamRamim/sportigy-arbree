import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.component';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.component';
import { LabelAndPlaceholderTextFormat } from '@/lib/utils.util';
import type { RadioProps } from '../interface/input-props.type';

export const RadioField = ({
  form, name, labelName, required = false, disabled = false, options = [],
}: RadioProps) => {
  const LabelEl = () =>
    labelName ? (
      <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
        {LabelAndPlaceholderTextFormat(labelName)}
        {required && <span className="text-destructive">&nbsp;*</span>}
      </label>
    ) : null;

  if (!form) return null;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <LabelEl />
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1" disabled={disabled}>
              {options.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                  <FormLabel htmlFor={`${name}-${opt.value}`} className="font-normal">{opt.label}</FormLabel>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
