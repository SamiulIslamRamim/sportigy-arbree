/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.component';
import { Input } from '@/components/ui/input.component';
import { LabelAndPlaceholderTextFormat, passwordRules } from '@/lib/utils.util';
import { Eye, EyeOff } from 'lucide-react';
import type { InputInterface } from '../interface/input-props.type';

/**
 * Password — Reusable password input with:
 * - Show/hide toggle
 * - Optional strength validation rules (mode="validate")
 * - Dual-mode: with or without react-hook-form
 */
export const Password = ({
  form, name, labelName, placeholder, required = false, disabled = false,
  disableLabelFormatting = false, mode = 'normal', customMessage,
}: InputInterface['Password']) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const placeholderText = disableLabelFormatting
    ? placeholder || labelName
    : LabelAndPlaceholderTextFormat(placeholder || labelName || '');

  const LabelEl = () =>
    labelName ? (
      <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
        {disableLabelFormatting ? labelName : LabelAndPlaceholderTextFormat(labelName)}
        {required && <span className="text-destructive">&nbsp;*</span>}
      </label>
    ) : null;

  const renderStrengthRules = () => {
    if (mode !== 'validate' || !passwordValue) return null;
    if (passwordRules.every((rule) => rule.test(passwordValue))) return null;

    return (
      <ul className="mt-2 space-y-1 text-sm">
        {passwordRules.map((rule, index) => {
          const passed = rule.test(passwordValue);
          return (
            <li
              key={index}
              className={`flex items-center gap-2 ${passed ? 'text-green-600' : 'text-muted-foreground'}`}
            >
              <span className={`w-2 h-2 rounded-full inline-block ${passed ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
              {rule.label}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderInput = (fieldProps?: Record<string, any>) => (
    <div className="w-full relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholderText}
        disabled={disabled}
        className="pr-10"
        {...fieldProps}
        onChange={(e) => {
          fieldProps?.onChange?.(e);
          setPasswordValue(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        tabIndex={-1}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

  if (form) {
    return (
      <FormField
        control={form.control}
        name={name || 'password'}
        render={({ field }) => {
          const error = form.formState.errors?.[name || ''];
          return (
            <FormItem>
              <LabelEl />
              <FormControl>
                {renderInput({ ...field, value: passwordValue || field.value || '' })}
              </FormControl>
              {renderStrengthRules()}
              <FormMessage>{error ? String(error?.message || '') : customMessage || ''}</FormMessage>
            </FormItem>
          );
        }}
      />
    );
  }

  return (
    <>
      <LabelEl />
      {renderInput()}
    </>
  );
};
