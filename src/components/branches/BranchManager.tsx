import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBranches } from '../../hooks/useBranches';
import { BranchForm } from './BranchForm';
import { BranchList } from './BranchList';
import type { Branch } from '../../types/database';

interface BranchManagerProps {
  onSuccess?: () => void;
}

export function BranchManager({ onSuccess }: BranchManagerProps) {
  const { t } = useTranslation();
  const { branches, loading, error, createBranch, updateBranch, deleteBranch, hasDuplicateName } = useBranches();
  
  const [dialogMode, setDialogMode] = useState<'list' | 'create' | 'edit' | 'delete'>('list');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const handleCreate = async (name: string, address: string) => {
    const isDuplicate = await hasDuplicateName(name);
    if (isDuplicate) {
      setDuplicateError(t('validation.duplicateName'));
      return;
    }
    setDuplicateError(null);
    
    const result = await createBranch(name, address);
    if (result) {
      setDialogMode('list');
      onSuccess?.();
    }
  };

  const handleEdit = async (name: string, address: string) => {
    if (!selectedBranch) return;
    
    const isDuplicate = await hasDuplicateName(name, selectedBranch.id);
    if (isDuplicate) {
      setDuplicateError(t('validation.duplicateName'));
      return;
    }
    setDuplicateError(null);
    
    await updateBranch(selectedBranch.id!, name, address);
    setDialogMode('list');
    setSelectedBranch(null);
    onSuccess?.();
  };

  const handleDelete = async () => {
    if (!selectedBranch) return;
    
    await deleteBranch(selectedBranch.id!);
    setDialogMode('list');
    setSelectedBranch(null);
    onSuccess?.();
  };

  const openEdit = (branch: Branch) => {
    setSelectedBranch(branch);
    setDialogMode('edit');
    setDuplicateError(null);
  };

  const openDelete = (branch: Branch) => {
    setSelectedBranch(branch);
    setDialogMode('delete');
  };

  if (dialogMode === 'create') {
    return (
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">{t('branch.new')}</h2>
        <BranchForm
          onSubmit={handleCreate}
          onCancel={() => setDialogMode('list')}
          submitLabel={t('common.add')}
        />
        {duplicateError && <p className="text-red-500 mt-2">{duplicateError}</p>}
      </div>
    );
  }

  if (dialogMode === 'edit' && selectedBranch) {
    return (
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">{t('branch.edit')}</h2>
        <BranchForm
          initialName={selectedBranch.name}
          initialAddress={selectedBranch.address}
          onSubmit={handleEdit}
          onCancel={() => setDialogMode('list')}
          submitLabel={t('common.save')}
        />
        {duplicateError && <p className="text-red-500 mt-2">{duplicateError}</p>}
      </div>
    );
  }

  if (dialogMode === 'delete' && selectedBranch) {
    return (
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">{t('branch.confirmDelete')}</h2>
        <p className="mb-4">
          {t('branch.deleteMessage', { name: selectedBranch.name })}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {t('common.delete')}
          </button>
          <button
            onClick={() => setDialogMode('list')}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            {t('common.cancel')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{t('branch.title')}</h2>
        <button
          onClick={() => setDialogMode('create')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          {t('branch.new')}
        </button>
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <BranchList
        branches={branches}
        loading={loading}
        onEdit={openEdit}
        onDelete={openDelete}
      />
    </div>
  );
}