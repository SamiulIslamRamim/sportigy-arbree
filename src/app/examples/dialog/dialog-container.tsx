'use client';

import { useState } from 'react';
import { DialogWrapper } from '@/components/common/dialog/dialog-wrapper.component';
import { ActionButton } from '@/components/common/button/action-button.component';
import { Pagination } from '@/components/common/pagination/pagination.component';
import { Edit, Trash2, Plus, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.component';

const sampleItems = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  status: ['Active', 'Pending', 'Archived'][i % 3],
}));

export default function DialogContainer() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(sampleItems.length / perPage);
  const paginatedItems = sampleItems.slice((currentPage - 1) * perPage, currentPage * perPage);

  const variants = [
    { variant: 'default' as const, icon: Info, label: 'Info', desc: 'Default variant' },
    { variant: 'destructive' as const, icon: Trash2, label: 'Delete', desc: 'Destructive variant' },
    { variant: 'outline' as const, icon: Edit, label: 'Edit', desc: 'Outline variant' },
    { variant: 'secondary' as const, icon: CheckCircle, label: 'Confirm', desc: 'Secondary variant' },
    { variant: 'ghost' as const, icon: Plus, label: 'Add', desc: 'Ghost variant' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dialog, ActionButton & Pagination Demo</h1>
        <p className="text-muted-foreground mt-1">Reusable DialogWrapper with sticky header, ActionButton variants with tooltips, and pagination.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">ActionButton Variants</h2>
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => (
            <ActionButton key={v.variant} variant={v.variant} icon={<v.icon className="h-4 w-4" />} buttonContent={v.label} tooltipContent={v.desc} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">ActionButton with Loading</h2>
        <ActionButton buttonContent="Save Changes" isPending variant="default" />
        <ActionButton buttonContent="Deleting..." isPending variant="destructive" loadingContent="Please wait..." />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">DialogWrapper</h2>
        <div className="flex flex-wrap gap-3">
          <ActionButton buttonContent="Open Basic Dialog" variant="default" icon={<Info className="h-4 w-4" />} handleOpen={() => setBasicOpen(true)} />
          <ActionButton buttonContent="Confirm Action" variant="destructive" icon={<AlertTriangle className="h-4 w-4" />} handleOpen={() => setConfirmOpen(true)} />
        </div>

        <DialogWrapper open={basicOpen} setOpen={setBasicOpen} title="Basic Dialog" description="This is a reusable dialog with a sticky header and scrollable content.">
          <p className="text-muted-foreground">This dialog demonstrates the DialogWrapper component. The header stays fixed while content scrolls.</p>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="text-sm text-muted-foreground">Scrollable content line {i + 1}.</p>
            ))}
          </div>
        </DialogWrapper>

        <DialogWrapper open={confirmOpen} setOpen={setConfirmOpen} title="Confirm Deletion" description="This action cannot be undone."
          footer={<div className="flex gap-2 ml-auto"><Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button><Button variant="destructive" onClick={() => { alert('Confirmed!'); setConfirmOpen(false); }}>Delete</Button></div>}
        >
          <p className="text-muted-foreground">Are you sure you want to proceed with this action?</p>
        </DialogWrapper>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Pagination</h2>
        <div className="space-y-2">
          {paginatedItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{item.title}</span>
              <span className={`text-xs px-2 py-1 rounded ${item.status === 'Active' ? 'bg-green-100 text-green-700' : item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{item.status}</span>
            </div>
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </section>
    </div>
  );
}
