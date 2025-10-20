import React from 'react';
import { Users, UserCheck, UserX, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

const stats = [
  {
    name: 'Total Usuarios',
    value: '1,234',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Usuarios Activos',
    value: '1,180',
    change: '+8%',
    changeType: 'positive',
    icon: UserCheck,
  },
  {
    name: 'Usuarios Usuarios',
    value: '54',
    change: '-2%',
    changeType: 'negative',
    icon: UserX,
  },
  {
    name: 'Usuarios Admin',
    value: '12',
    change: '0%',
    changeType: 'neutral',
    icon: Shield,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hola Admin</h1>
        <p className="text-gray-600 mt-2">
         Bienvenido al panel de administración. Aquí tienes una descripción general de tu sistema.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#a9e770] cursor-pointer'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' :
                stat.changeType === 'negative' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {stat.change} Del mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card  className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#a9e770] cursor-pointer'>
          <CardHeader>
            <CardTitle>Actividad reciente del usuario</CardTitle>
            <CardDescription>Últimos registros de usuarios y actualizaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'Victor Garrido', action: 'Registrado', time: '2 minutes ago' },
                { user: 'Aura Baza ', action: 'Perfil Actualizado', time: '1 hour ago' },
                { user: 'Camila Villera', action: 'Cambió la contraseña', time: '3 hours ago' },
                { user: 'Cristian Cassiani', action: 'Role updated', time: '5 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card  className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-[#a9e770] cursor-pointer'>
          <CardHeader>
            <CardTitle>Estado del sistema</CardTitle>
            <CardDescription>Estado y rendimiento actuales del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Bases De Datos</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Servicios De API </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Autenticaciones</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Activo
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Trabajos en segundo plano</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  En Proceso
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}