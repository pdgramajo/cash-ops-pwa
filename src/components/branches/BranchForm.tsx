import { useState, type FormEvent } from 'react';
import { isNotEmpty, minLength } from '../../utils/validators';

interface BranchFormProps {
  initialName?: string;
  initialAddress?: string;
  onSubmit: (name: string, address: string) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function BranchForm({
  initialName = '',
  initialAddress = '',
  onSubmit,
  onCancel,
  submitLabel = 'Guardar',
}: BranchFormProps) {
  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);
  const [errors, setErrors] = useState<{ name?: string; address?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: { name?: string; address?: string } = {};
    
    if (!isNotEmpty(name)) {
      newErrors.name = 'El nombre es requerido';
    } else if (!minLength(name, 2)) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!isNotEmpty(address)) {
      newErrors.address = 'La dirección es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSubmitting(true);
    try {
      await onSubmit(name, address);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Dirección</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? 'Guardando...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}