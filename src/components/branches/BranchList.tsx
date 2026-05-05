import type { Branch } from '../../types/database';
import { BranchCard } from './BranchCard';

interface BranchListProps {
  branches: Branch[];
  loading: boolean;
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
}

export function BranchList({ branches, loading, onEdit, onDelete }: BranchListProps) {
  if (loading && branches.length === 0) {
    return <div className="p-4 text-gray-500">Cargando...</div>;
  }

  if (branches.length === 0) {
    return <div className="p-4 text-gray-500">No hay sucursales创建</div>;
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