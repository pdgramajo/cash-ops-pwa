import type { Branch } from '../../types/database';
import { useTranslation } from 'react-i18next';
import { BranchCard } from './BranchCard';

interface BranchListProps {
  branches: Branch[];
  loading: boolean;
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
}

export function BranchList({ branches, loading, onEdit, onDelete }: BranchListProps) {
  const { t } = useTranslation();
  
  if (loading && branches.length === 0) {
    return <div className="p-4 text-gray-500">{t('common.loading')}</div>;
  }

  if (branches.length === 0) {
    return <div className="p-4 text-gray-500">{t('validation.noBranches')}</div>;
  }

  return (
    <div className="grid gap-4">
      {branches.map((branch) => (
        <BranchCard
          key={branch.id}
          branch={branch}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}