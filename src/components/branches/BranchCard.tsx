import type { Branch } from '../../types/database';
import { useTranslation } from 'react-i18next';

interface BranchCardProps {
  branch: Branch;
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
}

export function BranchCard({ branch, onEdit, onDelete }: BranchCardProps) {
  const { t } = useTranslation();
  
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{branch.name}</h3>
          <p className="text-gray-600">{branch.address}</p>
          <span className={`text-sm ${branch.isActive ? 'text-green-600' : 'text-gray-400'}`}>
            {branch.isActive ? t('branch.active') : t('branch.inactive')}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(branch)}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            {t('common.edit')}
          </button>
          <button
            type="button"
            onClick={() => onDelete(branch)}
            className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
          >
            {t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  );
}