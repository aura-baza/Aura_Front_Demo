// Importa React y useEffect para manejar efectos secundarios
import React, { useEffect } from 'react';
// Importamos useForm desde react-hook-form para manejar formularios y validaciones
import { useForm } from 'react-hook-form';
// Componentes reutilizables de Shadcn UI
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Checkbox } from '~/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
// Tipos de datos para usuario
import type { User, CreateUserRequest, UpdateUserRequest } from '~/types/user';
// Constantes como estados de usuario y departamentos
import { USER_STATUS, DEPARTMENTS } from '~/utils/constants';
//Interfaz que define la forma de los datos del formulario
interface UserFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  department: string;
  status: 'active' | 'inactive' | 'suspended';
  roleIds: string[];
}
/*
 * Props que recibe este componente:
 * - user: datos del usuario si estamos editando
 * - onSubmit: función que se ejecuta al enviar el formulario
 * - onCancel: función que se ejecuta al cancelar
 * - isLoading: estado de carga para deshabilitar botones
 */
interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}
/* Lista de roles simulada (moqueada),
 * esto luego se cambiaría por datos reales desde backend
 */
const mockRoles = [
  { id: '1', name: 'Admin', description: 'Full system access' },
  { id: '2', name: 'HR Manager', description: 'HR management access' },
  { id: '3', name: 'Supervisor', description: 'Team management access' },
  { id: '4', name: 'Agente', description: 'Basic employee access' },
  { id: '5', name: 'Viewer', description: 'Read-only access' }
];

// Componente principal
export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
   // Si existe un usuario, estamos editando
  const isEditing = !!user;
  // Inicialización de react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<UserFormData>({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      password: '',
      department: user?.department || '',
      status: user?.status || 'active',
      roleIds: user?.roles.map(r => r.id) || []
    }
  });
 // Observar roles seleccionados en tiempo real
  const selectedRoleIds = watch('roleIds') || [];

  /* useEffect se ejecuta si se pasa un usuario (modo edición),
   * y setea nuevamente el formulario con esos valores.
   */
  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
        department: user.department || '',
        status: user.status,
        roleIds: user.roles.map(r => r.id)
      });
    }
  }, [user, reset]);
  // Función para enviar el formulario
  const handleFormSubmit = async (data: UserFormData) => {
    const formData = {
      ...data,
      roleIds: selectedRoleIds // aseguramos roles actualizados
    };

    if (!isEditing) {
      // Si no estamos editando, es creación de usuario
      await onSubmit(formData as CreateUserRequest);
    } else {
      // Si editamos, sólo enviamos password si el usuario lo escribió
      const { password, ...updateData } = formData;
      await onSubmit(password ? formData : updateData as UpdateUserRequest);
    }
  };
   //Maneja agregar o remover roles del estado
  const handleRoleChange = (roleId: string, checked: boolean) => {
    const currentRoles = selectedRoleIds;
    if (checked) {
      setValue('roleIds', [...currentRoles, roleId]);
    } else {
      setValue('roleIds', currentRoles.filter(id => id !== roleId));
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      {/* Encabezado del formulario */}
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit User' : 'Create New User'}</CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Update user information and permissions'
            : 'Add a new user to the system'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Formulario */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register('firstName', { required: 'First name is required' })}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register('lastName', { required: 'Last name is required' })}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register('username', { 
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' }
              })}
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* Mostrar password solo si es creación */}
          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          )}

           {/* Sección: Departamento y Estado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select 
                value={watch('department')} 
                onValueChange={(value) => setValue('department', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Department</SelectItem>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={watch('status')} 
                onValueChange={(value) => setValue('status', value as 'active' | 'inactive' | 'suspended')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={USER_STATUS.ACTIVE}>Active</SelectItem>
                  <SelectItem value={USER_STATUS.INACTIVE}>Inactive</SelectItem>
                  <SelectItem value={USER_STATUS.SUSPENDED}>Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sección: Roles */}
          <div className="space-y-3">
            <Label>Roles & Permissions</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockRoles.map((role) => (
                <div key={role.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={`role-${role.id}`}
                    checked={selectedRoleIds.includes(role.id)}
                    onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={`role-${role.id}`} className="font-medium">
                      {role.name}
                    </Label>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección: Roles */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditing ? 'Update User' : 'Create User'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};