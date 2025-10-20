
import { useState } from 'react';
import { Plus, Download, Upload, MoreHorizontal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { UserTable } from '~/components/users/UserTable';
import { UserFilters } from '~/components/users/UserFilters';
import { UserForm } from '~/components/users/UserForm';
import { DeleteConfirmDialog } from '~/components/users/DeleteComfirmDialog';
import { useUsers, useUserActions } from '~/hooks/userUsers';
import type { User, UserFilters as UserFiltersType, CreateUserRequest, UpdateUserRequest } from '~/types/user';
import { DEFAULT_PAGE_SIZE, TABLE_PAGE_SIZES } from '~/utils/constants';
import { toast } from 'sonner';

export default function Users() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [filters, setFilters] = useState<UserFiltersType>({});
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const { data, isLoading, error, refetch } = useUsers(page, pageSize, filters);
  const { createUser, updateUser, deleteUser, bulkUpdateUsers, isLoading: actionLoading } = useUserActions();

  const handleFiltersChange = (newFilters: UserFiltersType) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected && data?.data) {
      setSelectedUsers(data.data.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      await createUser(userData);
      toast.success('User created successfully');
      setShowUserForm(false);
      refetch();
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (userData: UpdateUserRequest) => {
    if (!editingUser) return;

    try {
      await updateUser(editingUser.id, userData);
      toast.success('User updated successfully');
      setEditingUser(null);
      refetch();
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;

    try {
      await deleteUser(deletingUser.id);
      toast.success('User deleted successfully');
      setDeletingUser(null);
      setSelectedUsers(prev => prev.filter(id => id !== deletingUser.id));
      refetch();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleBulkStatusUpdate = async (status: string) => {
    if (selectedUsers.length === 0) return;

    try {
      await bulkUpdateUsers(selectedUsers, {
        status: status as "active" | "inactive" | "suspended" | undefined
      });
      toast.success(`${selectedUsers.length} users updated successfully`);
      setSelectedUsers([]);
      refetch();
    } catch (error) {
      toast.error('Failed to update users');
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500">Error loading users: {error}</div>
        <Button onClick={refetch} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de usuarios</h1>
          <p className="text-gray-600 mt-1">
            Administrar usuarios, roles y permisos del sistema
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button onClick={() => setShowUserForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Usuario
          </Button>
        </div>
      </div>

      {/* Filters */}
      <UserFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm font-medium text-blue-900">
            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Bulk Actions
                  <MoreHorizontal className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate('active')}>
                  Activate Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate('inactive')}>
                  Deactivate Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate('suspended')}>
                  Suspend Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedUsers([])}
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      ) : (
        <UserTable
          users={data?.data || []}
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAll={handleSelectAll}
          onEditUser={setEditingUser}
          onDeleteUser={setDeletingUser}
          onViewUser={(user) => {
            toast.info(`Viewing ${user.firstName} ${user.lastName}`);
          }}
        />
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, data.total)} of {data.total} users
            </span>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TABLE_PAGE_SIZES.map(size => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {page} of {data.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= data.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Create User Dialog */}
      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <UserForm
            // onSubmit={handleCreateUser}
            // onCancel={() => setShowUserForm(false)}
            // isLoading={actionLoading}
            user={editingUser || undefined}
            onSubmit={async (data) => {
              if (editingUser) {
                await handleUpdateUser(data as UpdateUserRequest);
              } else {
                await handleCreateUser(data as CreateUserRequest);
              }
            }}
            onCancel={() => {
              setShowUserForm(false);
              setEditingUser(null);
            }}
            isLoading={actionLoading}

          />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <UserForm
              user={editingUser}
              onSubmit={handleUpdateUser}
              onCancel={() => setEditingUser(null)}
              isLoading={actionLoading}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        user={deletingUser}
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={handleDeleteUser}
        isLoading={actionLoading}
      />
    </div>
  );
}