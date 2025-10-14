import React from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import type { User } from '~/types/user';

interface DeleteConfirmDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  user,
  open,
  onOpenChange,
  onConfirm,
  isLoading = false
}) => {
  if (!user) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <AlertDialogTitle>Delete User</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>?
            </p>
            <p className="text-sm text-gray-600">
              Username: <code className="bg-gray-100 px-1 rounded">{user.username}</code>
            </p>
            <p className="text-sm text-red-600 font-medium">
              This action cannot be undone. The user will lose access to the system immediately.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              'Delete User'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};