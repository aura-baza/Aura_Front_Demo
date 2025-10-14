import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Badge } from '~/components/ui/badge';
import type { UserFilters as UserFiltersType } from '~/types/user';
import { USER_STATUS, DEPARTMENTS } from '~/utils/constants';

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
  onClearFilters: () => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      status: value === 'all' ? undefined : value as 'active' | 'inactive' | 'suspended'
    });
  };

  const handleDepartmentChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      department: value === 'all' ? undefined : value 
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users by name, username, or email..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={USER_STATUS.ACTIVE}>Active</SelectItem>
            <SelectItem value={USER_STATUS.INACTIVE}>Inactive</SelectItem>
            <SelectItem value={USER_STATUS.SUSPENDED}>Suspended</SelectItem>
          </SelectContent>
        </Select>

        {/* Department Filter */}
        <Select value={filters.department || 'all'} onValueChange={handleDepartmentChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{filters.search}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleSearchChange('')}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {filters.status}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleStatusChange('all')}
              />
            </Badge>
          )}
          {filters.department && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Department: {filters.department}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleDepartmentChange('all')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};