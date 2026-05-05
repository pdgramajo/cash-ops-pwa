import { useState, useCallback, useEffect } from 'react';
import { branchRepository } from '../repositories/branchRepository';
import type { Branch } from '../types/database';

interface UseBranchesReturn {
  branches: Branch[];
  loading: boolean;
  error: string | null;
  fetchBranches: () => Promise<void>;
  createBranch: (name: string, address: string) => Promise<Branch | null>;
  updateBranch: (id: number, name: string, address: string) => Promise<void>;
  deleteBranch: (id: number) => Promise<boolean>;
  hasDuplicateName: (name: string, excludeId?: number) => Promise<boolean>;
}

export function useBranches(): UseBranchesReturn {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await branchRepository.getAll();
      const sorted = [...data].sort((a: Branch, b: Branch) => a.name.localeCompare(b.name));
      setBranches(sorted);
    } catch {
      setError('Error loading branches');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBranch = useCallback(async (name: string, address: string): Promise<Branch | null> => {
    setLoading(true);
    setError(null);
    try {
      const id = await branchRepository.create({
        name,
        address,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await fetchBranches();
      return { id: id as number, name, address, isActive: true, createdAt: new Date(), updatedAt: new Date() };
    } catch {
      setError('Error creating branch');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchBranches]);

  const updateBranch = useCallback(async (id: number, name: string, address: string) => {
    setLoading(true);
    setError(null);
    try {
      await branchRepository.update(id, { name, address });
      await fetchBranches();
    } catch {
      setError('Error updating branch');
    } finally {
      setLoading(false);
    }
  }, [fetchBranches]);

  const deleteBranch = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await branchRepository.remove(id);
      await fetchBranches();
      return true;
    } catch {
      setError('Error deleting branch');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBranches]);

  const hasDuplicateName = useCallback(async (name: string, excludeId?: number): Promise<boolean> => {
    const all = await branchRepository.getAll();
    return all.some(
      (b) => b.name.toLowerCase() === name.toLowerCase() && b.id !== excludeId
    );
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return {
    branches,
    loading,
    error,
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    hasDuplicateName,
  };
}