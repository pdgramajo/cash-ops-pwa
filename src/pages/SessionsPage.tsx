import { BranchManager } from '../components/branches';

export default function SessionsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sessions</h1>
      <BranchManager />
    </div>
  );
}