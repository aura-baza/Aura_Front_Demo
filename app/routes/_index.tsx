import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import auraLogo from '/Aura_Community-1.png';
import { useNavigate } from 'react-router';

export async function loader() {
  return null;
}
interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate("/dashboard")
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center pb-0 w-auto">
          {/* Logo clickeable de AURA */}
          <div 
            className="flex justify-center "
            //cursor-pointer hover:opacity-80 transition-opacity propiedades las tenía el logo
            // onClick={() => navigate("/dashboard")}
            title="Hacer clic para acceder al dashboard"
          >
            <img 
              src={auraLogo} 
              alt="AURA Community" 
              className=" h-auto w-auto max-w-full"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de correo electrónico */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-gray-700 text-sm">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@affinitybpo.com.co"
                className="h-10 bg-gray-50 border-gray-200 focus:border-teal-500 focus:ring-teal-500 text-sm"
                // required
              />
            </div>
            
            {/* Campo de contraseña */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-gray-700 text-sm">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="h-10 bg-gray-50 border-gray-200 focus:border-teal-500 focus:ring-teal-500 pr-10 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Botón de iniciar sesión */}
            <Button onClick={()=>navigate("/dashboard")} type="submit" className="w-full h-10 bg-teal-600 hover:bg-teal-700 text-white text-sm cursor-pointer">
              Iniciar sesión
            </Button>
          </form>
          
          {/* Link de olvido de contraseña */}
          <div className="text-center pt-2">
            <a href="#" className="text-teal-600 hover:text-teal-700 transition-colors text-sm">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          
          {/* Texto de pie */}
          <div className="text-center pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              Plataforma segura para la gestión de recursos humanos
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
