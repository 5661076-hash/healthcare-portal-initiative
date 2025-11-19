import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Appointment {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  time: string;
  type: string;
  status: string;
  doctor: string;
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Иванов Иван Иванович',
    date: '2024-12-15',
    time: '09:00',
    type: 'Периодический осмотр',
    status: 'Запланирован',
    doctor: 'Терапевт Соколова А.И.',
  },
  {
    id: 2,
    employeeId: 3,
    employeeName: 'Сидоров Петр Николаевич',
    date: '2024-11-20',
    time: '10:00',
    type: 'Периодический осмотр',
    status: 'Запланирован',
    doctor: 'Терапевт Соколова А.И.',
  },
  {
    id: 3,
    employeeId: 7,
    employeeName: 'Козлов Андрей Викторович',
    date: '2024-12-01',
    time: '11:00',
    type: 'Периодический осмотр',
    status: 'Запланирован',
    doctor: 'Терапевт Соколова А.И.',
  },
  {
    id: 4,
    employeeId: 5,
    employeeName: 'Смирнов Дмитрий Владимирович',
    date: '2024-11-25',
    time: '14:00',
    type: 'Дополнительное обследование',
    status: 'Ожидает подтверждения',
    doctor: 'Кардиолог',
  },
];

const Examinations = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const appointmentsForDate = selectedDate
    ? mockAppointments.filter(
        (app) => app.date === selectedDate.toISOString().split('T')[0]
      )
    : [];

  const datesWithAppointments = mockAppointments.map((app) => new Date(app.date));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Календарь осмотров</h1>
            <p className="text-gray-600 mt-1">Планирование и управление медицинскими осмотрами</p>
          </div>
          <Link to="/">
            <Button variant="outline">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              На главную
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calendar" size={20} />
                Выберите дату
              </CardTitle>
              <CardDescription>Просмотр запланированных осмотров</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  hasAppointment: datesWithAppointments,
                }}
                modifiersStyles={{
                  hasAppointment: {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: '#2563eb',
                  },
                }}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ClipboardList" size={20} />
                Осмотры на {selectedDate?.toLocaleDateString('ru-RU')}
              </CardTitle>
              <CardDescription>
                {appointmentsForDate.length > 0
                  ? `Запланировано осмотров: ${appointmentsForDate.length}`
                  : 'Нет запланированных осмотров на эту дату'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointmentsForDate.length > 0 ? (
                <div className="space-y-3">
                  {appointmentsForDate.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{appointment.employeeName}</h3>
                        <Badge
                          variant={
                            appointment.status === 'Запланирован' ? 'default' : 'secondary'
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Icon name="Clock" size={14} />
                          {appointment.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="FileText" size={14} />
                          {appointment.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="UserRound" size={14} />
                          {appointment.doctor}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Icon name="CalendarX" size={48} className="mx-auto mb-3 opacity-50" />
                  <p>На эту дату нет запланированных осмотров</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="List" size={20} />
              Все предстоящие осмотры
            </CardTitle>
            <CardDescription>Полный список запланированных медицинских осмотров</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Сотрудник</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Время</TableHead>
                  <TableHead>Тип осмотра</TableHead>
                  <TableHead>Врач</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAppointments.map((appointment) => (
                  <TableRow key={appointment.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">{appointment.employeeName}</TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleDateString('ru-RU')}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appointment.status === 'Запланирован' ? 'default' : 'secondary'
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedAppointment && (
          <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Детали осмотра</DialogTitle>
                <DialogDescription>
                  Информация о запланированном медицинском осмотре
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Сотрудник</h4>
                  <p className="text-gray-900">{selectedAppointment.employeeName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Дата</h4>
                    <p className="text-gray-900">
                      {new Date(selectedAppointment.date).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-1">Время</h4>
                    <p className="text-gray-900">{selectedAppointment.time}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Тип осмотра</h4>
                  <p className="text-gray-900">{selectedAppointment.type}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Врач</h4>
                  <p className="text-gray-900">{selectedAppointment.doctor}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Статус</h4>
                  <Badge
                    variant={
                      selectedAppointment.status === 'Запланирован' ? 'default' : 'secondary'
                    }
                  >
                    {selectedAppointment.status}
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Examinations;
