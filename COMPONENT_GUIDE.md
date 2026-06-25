# Custom Component System — Usage Guide

This project includes a complete custom component system built on **shadcn/ui + react-hook-form + zod**. Every component follows a **dual-mode** pattern: works with or without react-hook-form.

---

## 1. CustomField — Dynamic Form Fields

`CustomField` is a compound object with **26 field types**. Import once and access any field:

```tsx
import { CustomField } from '@/components/common/fields/cusInputField.component';
```

### Dual-Mode Pattern

**With react-hook-form** — wraps in `<FormField>` for validation/errors:

```tsx
<CustomField.Text form={form} name="email" labelName="Email" required />
```

**Standalone** — renders with `value`/`onChange`:

```tsx
<CustomField.Text name="email" labelName="Email" value={email} setValue={setEmail} />
```

**View-only** — renders as plain text:

```tsx
<CustomField.Text form={form} name="email" labelName="Email" viewOnly />
```

### Shared Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `form` | `UseFormReturn` | — | react-hook-form instance (omit for standalone) |
| `name` | `string` | — | Field name in form schema |
| `labelName` | `string` | — | Visible label text |
| `required` | `boolean` | `false` | Shows red asterisk |
| `disabled` | `boolean` | `false` | Disables input |
| `viewOnly` | `boolean` | `false` | Renders plain text instead of input |
| `disableLabelFormatting` | `boolean` | `false` | Skip auto-formatting of label text |
| `customMessage` | `ReactNode` | — | Custom message below field |
| `placeholder` | `string` | — | Placeholder text |

### Field Reference

#### `CustomField.Text` — Text Input
- Mode: dual
- Features: left/right icons, array value splitting

```tsx
<CustomField.Text form={form} name="fullName" labelName="Full Name" placeholder="Enter name" required />
<CustomField.Text form={form} name="tags" labelName="Tags" leftIcon={<TagIcon />} placeholder="Comma separated" />
```

#### `CustomField.TextArea` — Multi-line Text
- Mode: dual
- Features: configurable rows

```tsx
<CustomField.TextArea form={form} name="bio" labelName="Biography" rows={5} placeholder="Tell us about yourself" />
```

#### `CustomField.Number` — Number Input
- Mode: dual
- Features: integer/float mode, scroll prevention, key filtering, min=0

```tsx
<CustomField.Number form={form} name="age" labelName="Age" numberType="integer" required />
<CustomField.Number form={form} name="price" labelName="Price" numberType="float" placeholder="0.00" />
```

#### `CustomField.StringNumber` — Numeric String
- Mode: dual
- Features: digits-only input (e.g., roll number, PIN)

```tsx
<CustomField.StringNumber form={form} name="zipCode" labelName="ZIP Code" placeholder="12345" />
```

#### `CustomField.Password` — Password Input
- Mode: dual
- Features: show/hide toggle; `mode="validate"` adds strength rules

```tsx
// Normal mode
<CustomField.Password form={form} name="password" labelName="Password" required mode="normal" />
// With strength validation
<CustomField.Password form={form} name="password" labelName="Password" required mode="validate" />
```

#### `CustomField.PhoneNumber` — Phone Input
- Mode: dual
- Features: country dropdown, flag icons, searchable, maskable view mode

```tsx
<CustomField.PhoneNumber form={form} name="phone" labelName="Phone Number" placeholder="+1 (555) 123-4567" />
```

#### `CustomField.OTP` — One-Time Password
- Mode: dual
- Features: OTP input with configurable length

```tsx
<CustomField.OTP form={form} name="otp" labelName="Verification Code" />
```

#### `CustomField.SingleSelectField` — Single Select
- Mode: dual
- Features: shadcn Select dropdown, loading/empty states

```tsx
<CustomField.SingleSelectField
  form={form}
  name="role"
  labelName="Role"
  options={['Admin', 'Editor', 'Viewer']}
  placeholder="Select role"
  required
/>
```

#### `CustomField.SelectField` — Advanced Select (form-only)
- Mode: form-only
- Features: multi-select, search, avatars, tags, "show more"

```tsx
<CustomField.SelectField
  form={form}
  name="users"
  labelName="Assign Users"
  options={[
    { value: '1', label: 'Alice', avatar: '/alice.jpg' },
    { value: '2', label: 'Bob', avatar: '/bob.jpg' },
  ]}
  mode="multiple"
  placeholder="Select users"
/>
```

#### `CustomField.SwitchField` — Toggle Switch
- Mode: dual
- Features: with description, border mode

```tsx
<CustomField.SwitchField
  form={form}
  name="notify"
  labelName="Email Notifications"
  description="Receive email updates"
  border
/>
```

#### `CustomField.RadioField` — Radio Group (form-only)
- Mode: form-only

```tsx
<CustomField.RadioField
  form={form}
  name="gender"
  labelName="Gender"
  options={[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ]}
/>
```

#### `CustomField.CheckField` — Checkbox Group (form-only)
- Mode: form-only

```tsx
<CustomField.CheckField
  form={form}
  name="interests"
  labelName="Interests"
  options={[
    { value: 'tech', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
  ]}
/>
```

#### `CustomField.MultiCheckField` — Multi-Checkbox (form-only)
- Mode: form-only
- Same as CheckField, alternative name

#### `CustomField.SingleCheckField` — Single Checkbox
- Mode: form-only

```tsx
<CustomField.SingleCheckField
  form={form}
  name="acceptTerms"
  labelName="I accept the terms and conditions"
  required
/>
```

#### `CustomField.SearchField` — Search Input
- Mode: dual
- Features: search callback, clear button

```tsx
<CustomField.SearchField
  form={form}
  name="query"
  labelName="Search"
  onSearch={(value) => handleSearch(value)}
  placeholder="Search..."
/>
```

#### `CustomField.DatePickerField` — Date Picker
- Mode: dual

```tsx
<CustomField.DatePickerField form={form} name="dob" labelName="Date of Birth" />
```

#### `CustomField.RangeDatePicker` — Date Range (form-only)
- Mode: form-only

```tsx
<CustomField.RangeDatePicker form={form} name="dateRange" labelName="Date Range" />
```

#### `CustomField.LimitField` — Pagination Limit
- Mode: standalone
- Features: URL sync via query parameter

```tsx
<CustomField.LimitField name="pageLimit" />
```

#### `CustomField.TextAreaWithFile` — Textarea + Files (form-only)
- Mode: form-only
- Features: textarea with file attachment support

```tsx
<CustomField.TextAreaWithFile form={form} name="report" labelName="Report" />
```

#### `CustomField.UploadProfilePicture` — Avatar Upload
- Mode: dual
- Features: preview, FileReader data URL (no raw File in form state)

```tsx
<CustomField.UploadProfilePicture form={form} name="avatar" labelName="Profile Picture" />
```

#### `CustomField.UploadVideoFile` — Video Upload
- Mode: dual
- Features: preview, FileReader data URL

```tsx
<CustomField.UploadVideoFile form={form} name="video" labelName="Upload Video" />
```

#### `CustomField.DynamicFileUploadField` — Drag-and-Drop Files (form-only)
- Mode: form-only
- Features: drag-and-drop, optional `onUpload` callback

```tsx
<CustomField.DynamicFileUploadField
  form={form}
  name="files"
  labelName="Attachments"
  onUpload={(files) => handleUpload(files)}
/>
```

#### `CustomField.RichTextEditor` — Rich Text (form-only)
- Mode: form-only

```tsx
<CustomField.RichTextEditor form={form} name="content" labelName="Content" />
```

#### `CustomField.TinyEditor` — Lightweight Editor (form-only)
- Mode: form-only

```tsx
<CustomField.TinyEditor form={form} name="summary" labelName="Summary" />
```

---

## 2. Common Components

### ActionButton

A button with icon positions, loading spinner, and optional tooltip.

```tsx
import { ActionButton } from '@/components/common/button/action-button.component';

// Simple
<ActionButton type="submit" buttonContent="Save" btnSize="lg" />

// With icons
<ActionButton
  buttonContent="Edit"
  icon={<PencilIcon />}
  btnSize="sm"
  handleOpen={() => handleEdit(item)}
/>

// Loading state
<ActionButton
  type="submit"
  buttonContent="Submitting..."
  isPending={isSubmitting}
  btnSize="lg"
/>

// With tooltip
<ActionButton
  buttonContent="Delete"
  icon={<TrashIcon />}
  tooltipContent="Delete this item"
  handleOpen={handleDelete}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `buttonContent` | `ReactNode` | required | Button label |
| `btnSize` | `'sm' \| 'lg' \| 'icon'` | `'sm'` | Button size |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Button variant |
| `isPending` | `boolean` | `false` | Show loading spinner |
| `icon` | `ReactNode` | — | Icon before content |
| `lastIcon` | `ReactNode` | — | Icon after content |
| `tooltipContent` | `string` | — | Tooltip text |
| `handleOpen` | `() => void` | — | Click handler |

---

### DialogWrapper

A scrollable modal with sticky header, close button, optional trigger, and footer slot.

```tsx
import { DialogWrapper } from '@/components/common/dialog/dialog-wrapper.component';

const [open, setOpen] = useState(false);

<DialogWrapper
  open={open}
  setOpen={setOpen}
  title="Edit User"
  description="Update user details"
  triggerContent={<ActionButton buttonContent="Open" />}
  footer={<ActionButton type="submit" buttonContent="Save" />}
>
  <YourFormContent />
</DialogWrapper>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Visibility state |
| `setOpen` | `(v: boolean) => void` | required | State setter |
| `triggerContent` | `ReactNode` | — | Optional trigger element |
| `title` | `ReactNode` | — | Modal title |
| `description` | `string` | — | Subtitle text |
| `children` | `ReactNode` | required | Modal body |
| `closer` | `boolean` | `true` | Show close button |
| `footer` | `ReactNode` | — | Footer content |

---

### DynamicTable

A config-driven table with loading/empty states, row selection, and expandable rows.

```tsx
import { DynamicTable } from '@/components/common/DynamicTable/dynamic-table.component';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'status', header: 'Status',
    render: (row) => <Badge>{row.active ? 'Active' : 'Inactive'}</Badge>,
  },
];

<DynamicTable
  data={items}
  isLoading={loading}
  config={{ columns, emptyMessage: 'No results found' }}
  isCheckBox
  selectedIds={selectedIds}
  setSelectedIds={setSelectedIds}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | required | Table data |
| `isLoading` | `boolean` | required | Loading state |
| `config` | `TableConfig` | required | Column definitions |
| `currentPage` | `number` | — | Current page (for parent control) |
| `setCurrentPage` | `(n: number) => void` | — | Page setter |
| `isCheckBox` | `boolean` | `false` | Enable row checkbox selection |
| `selectedIds` | `string[]` | — | Controlled selected row IDs |
| `setSelectedIds` | `(ids: string[]) => void` | — | Selected IDs setter |
| `rowKey` | `string` | `'id'` | Unique ID field |
| `expandedRowComponent` | `(row: any) => ReactNode` | — | Expandable row renderer |
| `viewPage` | `'list' \| 'grid'` | `'list'` | View mode |

---

### Pagination

Page navigation with ellipsis for large page counts.

```tsx
import { Pagination } from '@/components/common/pagination/pagination.component';

<Pagination
  currentPage={page}
  totalPages={totalPages}
  setCurrentPage={setPage}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | required | Current active page |
| `totalPages` | `number` | required | Total number of pages |
| `setCurrentPage` | `(n: number) => void` | required | Page setter |

---

## 3. Toast Notification System

A unified toast system built on `react-hot-toast`.

```tsx
import {
  ToastMessageShow,
  toastSuccessMessage,
  toastErrorMessage,
  toastLoadingMessage,
  toastCustomMessage,
  ToastMessageChange,
} from '@/components/common/toast';
```

### Functions

| Function | Description |
|----------|-------------|
| `ToastMessageShow(type, message, options)` | Show a toast — success, error, loading, or custom |
| `toastSuccessMessage(msg)` | Shortcut for success toast |
| `toastErrorMessage(msg)` | Shortcut for error toast (auto-extracts API errors) |
| `toastLoadingMessage(msg)` | Shortcut for loading toast |
| `toastCustomMessage(msg)` | Shortcut for custom toast |
| `ToastMessageChange(msg)` | Transform known backend error messages into human-friendly text |

### Examples

```tsx
// Success
toastSuccessMessage('Profile updated successfully');

// Error (handles API response objects)
toastErrorMessage(errorResponse);
// → Extracts: response.data.message → response.message → data.message → message → fallback

// Loading
toastLoadingMessage('Saving...');

// With message transformation
ToastMessageShow('error', 'Prisma: Unique constraint failed on field "name"', {
  changeMessage: true,
});
// → "Duplicate data found. Please change the title and try again."

// Full control
ToastMessageShow('success', 'Completed', {
  duration: 5000,
  position: 'bottom-right',
  textFormat: false,
});
```

The `ToastProvider` is auto-injected into the `Providers` composition.

---

## 4. Form Hooks

### useZodForm

A convenience hook that sets up `react-hook-form` with `zodResolver`.

```tsx
import { useZodForm } from '@/forms/react-hook-form/hooks/use-form.hook';
import { loginSchema, type LoginFormData } from '@/forms/react-hook-form/schemas/example.schema';

export function LoginForm({ onSubmit }: { onSubmit: (data: LoginFormData) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useZodForm(loginSchema);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

### Form Pattern (recommended)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CustomField } from '@/components/common/fields/cusInputField.component';
import { ActionButton } from '@/components/common/button/action-button.component';

// 1. Schema
const formSchema = z.object({
  title: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Select a category'),
  published: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

// 2. Form
export function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', category: '', published: false },
  });

  const onSubmit = (data: FormData) => alert(JSON.stringify(data, null, 2));

  // 3. Render
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <CustomField.Text form={form} name="title" labelName="Title" required />
      <CustomField.SingleSelectField
        form={form}
        name="category"
        labelName="Category"
        options={['Tech', 'Design', 'Business']}
      />
      <CustomField.SwitchField
        form={form}
        name="published"
        labelName="Publish"
        description="Make visible to everyone"
      />
      <ActionButton type="submit" buttonContent="Save" btnSize="lg" />
    </form>
  );
}
```

---

## 5. Shared Utilities

All utilities are in `src/lib/utils.util.ts`:

### Class Names

```tsx
import { cn } from '@/lib/utils.util';

cn('px-4 py-2', isActive && 'bg-blue-500', className)
// → merges Tailwind classes with clsx + tailwind-merge
```

### String Formatting

| Function | Description | Example |
|----------|-------------|---------|
| `LabelAndPlaceholderTextFormat(str)` | Title-case (preposition-aware) | `"Full Name"` → `"Full Name"` |
| `truncate(str, length)` | Truncate with ellipsis | `truncate("Hello World", 5)` → `"Hello..."` |
| `slugify(str)` | URL-safe slug | `"Hello World!"` → `"hello-world"` |
| `maskString(str, first, last)` | Mask middle chars | `maskString("HelloWorld", 3, 2)` → `"Hel***ld"` |
| `maskEmail(email)` | Mask email | `maskEmail("john@example.com")` → `"j***@example.com"` |

### Date Formatting

| Function | Description | Example |
|----------|-------------|---------|
| `formatDate(date)` | Full date | `"June 17, 2026"` |
| `formatRelativeTime(date)` | Relative time | `"just now"`, `"3m ago"`, `"2h ago"`, `"5d ago"` |
| `toMonthYear(date)` | Month year | `"Jun 2025"` |
| `time12h(date)` | 12h time + relative mode | `"2:30 PM"` |
| `time24h(date)` | 24h time | `"14:30"` |
| `customFormatDate(date, format)` | Custom format | `"YYYY-MM-DD"`, `"DD-MM-YYYY"`, `"YYYY"` |
| `fullDateTime(date)` | Full date-time | `"24 August 2025, 03:30 PM"` |
| `duration(start, end?)` | Duration | `"2y 3m"` |
| `localDateTime(input)` | Local format | `"20-10-2025 at 10:07 am"` |
| `localDateToISO(date?)` | UTC midnight ISO | ISO string |

### Password Validation

```tsx
import { passwordRules, isPasswordStrong } from '@/lib/utils.util';

// Check rules
passwordRules.forEach(rule => console.log(rule.label));
// → "At least 8 characters", "Contains uppercase", "Contains number", etc.

// Validate
isPasswordStrong('MyStr0ng!Pass'); // → true
```

---

## 6. Hooks

| Hook | Description |
|------|-------------|
| `useToggle(initial)` | Boolean toggle with `on`, `off`, `toggle` helpers |
| `useDebounce(value, delay)` | Debounce a value by `delay` ms |
| `useFetch(url, options?)` | Simple fetch with loading/error/data states |
| `useLocalStorage(key, fallback)` | Persist state in localStorage |
| `useMediaQuery(query)` | Match CSS media query |
| `useIntersectionObserver(ref, options?)` | Track element visibility |

```tsx
import { useToggle } from '@/hooks/use-toggle.hook';
const [isOpen, { toggle }] = useToggle(false);

import { useDebounce } from '@/hooks/use-debounce.hook';
const debouncedSearch = useDebounce(search, 300);

import { useLocalStorage } from '@/hooks/use-local-storage.hook';
const [theme, setTheme] = useLocalStorage('theme', 'light');
```
