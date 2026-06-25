'use client';

import { useState } from 'react';
import { DynamicTable, type TableColumn } from '@/components/common/DynamicTable/dynamic-table.component';
import { Pagination } from '@/components/common/pagination/pagination.component';
import { LimitField } from '@/components/common/fields/assets/components/limit-field.component';
import { ActionButton } from '@/components/common/button/action-button.component';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const allUsers: User[] = Array.from({ length: 53 }, (_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
}));

const columns: TableColumn[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', render: (item: User) => (
    <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary capitalize">{item.role}</span>
  )},
];

export default function TableContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState('10');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const perPage = Number(limit);
  const totalPages = Math.ceil(allUsers.length / perPage);
  const paginatedData = allUsers.slice((currentPage - 1) * perPage, currentPage * perPage);

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">DynamicTable Demo</h1>
        <p className="text-muted-foreground mt-1">Config-driven table with loading state, checkbox selection, and pagination.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LimitField setLimit={(v) => { setLimit(v); setCurrentPage(1); }} totalItems={allUsers.length} />
          <ActionButton buttonContent="Refresh" onClick={refresh} variant="outline" btnSize="sm" />
        </div>
        {selectedIds.length > 0 && (
          <p className="text-sm text-muted-foreground">{selectedIds.length} selected</p>
        )}
      </div>

      <DynamicTable
        data={paginatedData}
        isLoading={isLoading}
        config={{ columns }}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isCheckBox
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}
