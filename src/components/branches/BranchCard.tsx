import type { Branch } from '../../types/database';

interface BranchCardProps {
  branch: Branch;
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
}

export function BranchCard({ branch, onEdit, onDelete }: BranchCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{branch.name}</h3>
          <p className="text-gray-600">{branch.address}</p>
          <span className={`text-sm ${branch.isActive ? 'text-green-600' : 'text-gray-400'}`}>
            {branch.isActive ? 'Activa' : 'Inactiva'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(branch)}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete(branch)}
            className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}