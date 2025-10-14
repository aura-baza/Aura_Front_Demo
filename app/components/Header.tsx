import { Bell, Search, Settings, User, LogOut } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
const perfil="/avatar.webp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
  };

  return (
    <header className=" border-b border-gray-200 px-6 py-4 !bg-[#308cc4]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1> */}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="pl-10 w-64"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                <Avatar className="h-8 w-8 ">
                  <AvatarImage src={perfil} alt={user?.firstName} />
                  <AvatarFallback>
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span className='cursor-pointer'>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4 " />
                <span className='cursor-pointer'>Configuracion</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut   className="mr-2 h-4 w-4" />
                <span onClick={()=>navigate("/")} className='cursor-pointer'>Salir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};