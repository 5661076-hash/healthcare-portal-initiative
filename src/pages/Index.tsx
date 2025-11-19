import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Icon from '@/components/ui/icon';

interface MedicalDocument {
  id: number;
  type: string;
  date: string;
  doctor: string;
  description: string;
  fileUrl?: string;
}

interface HealthMetric {
  date: string;
  bmi?: number;
  bloodPressure?: string;
  glucose?: number;
  cholesterol?: number;
  weight?: number;
  height?: number;
}

interface Employee {
  id: number;
  name: string;
  age: number;
  department: string;
  position: string;
  healthGroup: number;
  nextExam: string;
  lastExam: string;
  status: string;
  phone: string;
  email: string;
  bmi?: number;
  bloodPressure?: string;
  glucose?: number;
  cholesterol?: number;
  contraindications?: string[];
  medicalHistory?: string;
  documents?: MedicalDocument[];
  metricsHistory?: HealthMetric[];
}

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

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Иванов Иван Иванович',
    age: 35,
    department: 'Производственный цех №1',
    position: 'Оператор станка',
    healthGroup: 1,
    nextExam: '2024-12-15',
    lastExam: '2024-06-15',
    status: 'Допущен',
    phone: '+7 (900) 123-45-67',
    email: 'ivanov@company.com',
    bmi: 24.5,
    bloodPressure: '120/80',
    glucose: 5.2,
    cholesterol: 4.8,
    contraindications: ['Работа на высоте'],
    medicalHistory: 'Без особенностей',
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-06-15', doctor: 'Терапевт Соколова А.И.', description: 'Допущен к работе без ограничений' },
      { id: 2, type: 'Анализ крови', date: '2024-06-15', doctor: 'Лаборант', description: 'Общий анализ крови - норма' },
      { id: 3, type: 'ЭКГ', date: '2024-06-15', doctor: 'Кардиолог', description: 'Ритм синусовый, без патологий' },
    ],
    metricsHistory: [
      { date: '2024-01-15', bmi: 25.1, bloodPressure: '125/82', glucose: 5.4, cholesterol: 5.0, weight: 78, height: 175 },
      { date: '2024-06-15', bmi: 24.5, bloodPressure: '120/80', glucose: 5.2, cholesterol: 4.8, weight: 76, height: 175 },
    ],
  },
  {
    id: 2,
    name: 'Петрова Анна Сергеевна',
    age: 28,
    department: 'Лаборатория',
    position: 'Химик-аналитик',
    healthGroup: 1,
    nextExam: '2025-01-10',
    lastExam: '2024-07-10',
    status: 'Допущен',
    phone: '+7 (900) 234-56-78',
    email: 'petrova@company.com',
    bmi: 22.1,
    bloodPressure: '115/75',
    glucose: 4.9,
    cholesterol: 4.2,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-07-10', doctor: 'Терапевт Соколова А.И.', description: 'Состояние здоровья удовлетворительное' },
      { id: 2, type: 'Флюорография', date: '2024-07-10', doctor: 'Рентгенолог', description: 'Легкие без патологии' },
    ],
    metricsHistory: [
      { date: '2024-01-10', bmi: 22.5, bloodPressure: '118/76', glucose: 5.0, cholesterol: 4.3, weight: 60, height: 164 },
      { date: '2024-07-10', bmi: 22.1, bloodPressure: '115/75', glucose: 4.9, cholesterol: 4.2, weight: 59, height: 164 },
    ],
  },
  {
    id: 3,
    name: 'Сидоров Петр Николаевич',
    age: 52,
    department: 'Производственный цех №2',
    position: 'Мастер участка',
    healthGroup: 2,
    nextExam: '2024-11-20',
    lastExam: '2024-05-20',
    status: 'Допущен с ограничениями',
    phone: '+7 (900) 345-67-89',
    email: 'sidorov@company.com',
    bmi: 27.3,
    bloodPressure: '135/85',
    glucose: 6.1,
    cholesterol: 5.8,
    contraindications: ['Работа в условиях повышенного шума'],
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-05-20', doctor: 'Терапевт Соколова А.И.', description: 'Допущен с ограничениями по шуму' },
      { id: 2, type: 'Аудиометрия', date: '2024-05-20', doctor: 'ЛОР-врач', description: 'Снижение слуха на высоких частотах' },
    ],
    metricsHistory: [
      { date: '2023-11-20', bmi: 26.8, bloodPressure: '132/84', glucose: 5.9, cholesterol: 5.6, weight: 88, height: 180 },
      { date: '2024-05-20', bmi: 27.3, bloodPressure: '135/85', glucose: 6.1, cholesterol: 5.8, weight: 90, height: 180 },
    ],
  },
  {
    id: 4,
    name: 'Кузнецова Мария Александровна',
    age: 41,
    department: 'Склад',
    position: 'Кладовщик',
    healthGroup: 1,
    nextExam: '2025-02-05',
    lastExam: '2024-08-05',
    status: 'Допущен',
    phone: '+7 (900) 456-78-90',
    email: 'kuznetsova@company.com',
    bmi: 23.8,
    bloodPressure: '118/78',
    glucose: 5.0,
    cholesterol: 4.5,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-08-05', doctor: 'Терапевт Соколова А.И.', description: 'Здорова, допущена' },
    ],
    metricsHistory: [
      { date: '2024-02-05', bmi: 24.0, bloodPressure: '120/78', glucose: 5.1, cholesterol: 4.6, weight: 65, height: 165 },
      { date: '2024-08-05', bmi: 23.8, bloodPressure: '118/78', glucose: 5.0, cholesterol: 4.5, weight: 64.5, height: 165 },
    ],
  },
  {
    id: 5,
    name: 'Смирнов Дмитрий Владимирович',
    age: 45,
    department: 'Ремонтно-механический цех',
    position: 'Слесарь-ремонтник',
    healthGroup: 3,
    nextExam: '2024-11-25',
    lastExam: '2024-08-25',
    status: 'Направлен на доп. обследование',
    phone: '+7 (900) 567-89-01',
    email: 'smirnov@company.com',
    bmi: 29.5,
    bloodPressure: '145/95',
    glucose: 7.2,
    cholesterol: 6.5,
    contraindications: ['Работа с вибрацией', 'Тяжелый физический труд'],
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-08-25', doctor: 'Терапевт Соколова А.И.', description: 'Направлен к кардиологу' },
      { id: 2, type: 'ЭКГ', date: '2024-08-25', doctor: 'Кардиолог', description: 'Нарушение ритма, требуется наблюдение' },
    ],
    metricsHistory: [
      { date: '2024-02-25', bmi: 28.8, bloodPressure: '140/92', glucose: 6.8, cholesterol: 6.2, weight: 95, height: 182 },
      { date: '2024-08-25', bmi: 29.5, bloodPressure: '145/95', glucose: 7.2, cholesterol: 6.5, weight: 97.5, height: 182 },
    ],
  },
];

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
];

const healthTrendsData = [
  { month: 'Янв', допущен: 92, ограничения: 6, недопущен: 2 },
  { month: 'Фев', допущен: 91, ограничения: 7, недопущен: 2 },
  { month: 'Мар', допущен: 93, ограничения: 5, недопущен: 2 },
  { month: 'Апр', допущен: 94, ограничения: 4, недопущен: 2 },
  { month: 'Май', допущен: 95, ограничения: 4, недопущен: 1 },
  { month: 'Июн', допущен: 96, ограничения: 3, недопущен: 1 },
];

const avgBMIData = [
  { month: 'Янв', bmi: 25.2 },
  { month: 'Фев', bmi: 25.0 },
  { month: 'Мар', bmi: 24.8 },
  { month: 'Апр', bmi: 24.6 },
  { month: 'Май', bmi: 24.5 },
  { month: 'Июн', bmi: 24.3 },
];

const diseaseDistribution = [
  { name: 'Гипертония', value: 15, color: '#ef4444' },
  { name: 'Диабет', value: 8, color: '#f59e0b' },
  { name: 'ССЗ', value: 12, color: '#3b82f6' },
  { name: 'Респираторные', value: 5, color: '#10b981' },
];

const Index = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const [cvdFormData, setCvdFormData] = useState({
    age: '',
    systolic: '',
    cholesterol: '',
    smoking: false,
    diabetes: false,
  });
  const [cvdRisk, setCvdRisk] = useState<number | null>(null);

  const [diabetesFormData, setDiabetesFormData] = useState({
    age: '',
    bmi: '',
    waist: '',
    activity: false,
    heredity: false,
    hypertension: false,
  });
  const [diabetesRisk, setDiabetesRisk] = useState<number | null>(null);

  const calculateCVDRisk = () => {
    const age = parseInt(cvdFormData.age);
    const systolic = parseInt(cvdFormData.systolic);
    const cholesterol = parseFloat(cvdFormData.cholesterol);

    let risk = 0;

    if (age < 40) risk += 1;
    else if (age < 50) risk += 3;
    else if (age < 60) risk += 5;
    else risk += 8;

    if (systolic < 120) risk += 0;
    else if (systolic < 140) risk += 2;
    else if (systolic < 160) risk += 4;
    else risk += 6;

    if (cholesterol < 5.0) risk += 0;
    else if (cholesterol < 6.0) risk += 2;
    else if (cholesterol < 7.0) risk += 4;
    else risk += 6;

    if (cvdFormData.smoking) risk += 4;
    if (cvdFormData.diabetes) risk += 5;

    const percentage = Math.min(Math.round((risk / 29) * 100), 100);
    setCvdRisk(percentage);
  };

  const calculateDiabetesRisk = () => {
    const age = parseInt(diabetesFormData.age);
    const bmi = parseFloat(diabetesFormData.bmi);
    const waist = parseInt(diabetesFormData.waist);

    let points = 0;

    if (age < 45) points += 0;
    else if (age < 55) points += 2;
    else if (age < 65) points += 3;
    else points += 4;

    if (bmi < 25) points += 0;
    else if (bmi < 30) points += 1;
    else points += 3;

    if (waist < 94) points += 0;
    else if (waist < 102) points += 3;
    else points += 4;

    if (!diabetesFormData.activity) points += 2;
    if (diabetesFormData.heredity) points += 5;
    if (diabetesFormData.hypertension) points += 2;

    const percentage = Math.min(Math.round((points / 23) * 100), 100);
    setDiabetesRisk(percentage);
  };

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(mockEmployees.map((emp) => emp.department)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Медицинская система предприятия</h1>
          <p className="text-gray-600">Мониторинг здоровья сотрудников и управление медосмотрами</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Главная</TabsTrigger>
            <TabsTrigger value="employees">Реестр сотрудников</TabsTrigger>
            <TabsTrigger value="examinations">Осмотры</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="calculators">Калькуляторы</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Допущено к работе</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-green-600">96%</span>
                    <Icon name="CheckCircle" size={32} className="text-green-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">↑ 2% от прошлого месяца</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">С ограничениями</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-orange-600">3%</span>
                    <Icon name="AlertTriangle" size={32} className="text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">↓ 1% от прошлого месяца</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Недопущено</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-red-600">1%</span>
                    <Icon name="XCircle" size={32} className="text-red-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">↓ 1% от прошлого месяца</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Средний ИМТ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-blue-600">24.3</span>
                    <Icon name="Activity" size={32} className="text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">↓ 0.2 от прошлого месяца</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-t-4 border-t-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building2" size={24} />
                  Паспорт здоровья предприятия
                </CardTitle>
                <CardDescription>Общие показатели здоровья трудового коллектива</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Здоровые сотрудники</span>
                        <span className="text-sm font-bold text-green-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Хронические заболевания</span>
                        <span className="text-sm font-bold text-orange-600">12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Группа риска</span>
                        <span className="text-sm font-bold text-red-600">3%</span>
                      </div>
                      <Progress value={3} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">Профзаболевания</h4>
                    {diseaseDistribution.map((disease) => (
                      <div key={disease.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: disease.color }}
                          />
                          <span className="text-sm text-gray-700">{disease.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{disease.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">Ключевые метрики</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon name="Users" size={18} className="text-blue-600" />
                          <span className="text-sm">Всего сотрудников</span>
                        </div>
                        <span className="font-bold text-blue-600">342</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={18} className="text-green-600" />
                          <span className="text-sm">Осмотров в месяц</span>
                        </div>
                        <span className="font-bold text-green-600">28</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon name="TrendingUp" size={18} className="text-purple-600" />
                          <span className="text-sm">Динамика здоровья</span>
                        </div>
                        <span className="font-bold text-purple-600">+4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-t-4 border-t-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Динамика допуска к работе
                  </CardTitle>
                  <CardDescription>Изменение показателей за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={healthTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Line
                        type="monotone"
                        dataKey="допущен"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="ограничения"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="недопущен"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-600">Допущен</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-sm text-gray-600">С ограничениями</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm text-gray-600">Недопущен</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" size={20} />
                    Средний ИМТ коллектива
                  </CardTitle>
                  <CardDescription>Тренд индекса массы тела сотрудников</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={avgBMIData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis domain={[23, 26]} stroke="#6b7280" />
                      <Bar dataKey="bmi" radius={[8, 8, 0, 0]}>
                        {avgBMIData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.bmi > 25 ? '#f59e0b' : '#10b981'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-600">Норма (&lt;25)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-sm text-gray-600">Избыток (≥25)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Реестр сотрудников</CardTitle>
                <CardDescription>База данных медицинских карт работников предприятия</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск по ФИО, должности, отделу..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Выберите цех" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все отделы</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Возраст</TableHead>
                      <TableHead>Отдел</TableHead>
                      <TableHead>Должность</TableHead>
                      <TableHead>Группа здоровья</TableHead>
                      <TableHead>Следующий осмотр</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.age}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <Badge variant={employee.healthGroup === 1 ? 'default' : employee.healthGroup === 2 ? 'secondary' : 'destructive'}>
                            Группа {employee.healthGroup}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(employee.nextExam).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              employee.status === 'Допущен'
                                ? 'default'
                                : employee.status === 'Допущен с ограничениями'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedEmployee(employee)}
                              >
                                <Icon name="Eye" size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Медицинская карта: {employee.name}</DialogTitle>
                                <DialogDescription>
                                  Подробная информация о состоянии здоровья сотрудника
                                </DialogDescription>
                              </DialogHeader>
                              {selectedEmployee && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Возраст</h4>
                                      <p>{selectedEmployee.age} лет</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Отдел</h4>
                                      <p>{selectedEmployee.department}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Должность</h4>
                                      <p>{selectedEmployee.position}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Группа здоровья</h4>
                                      <Badge>{selectedEmployee.healthGroup}</Badge>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Телефон</h4>
                                      <p>{selectedEmployee.phone}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600 mb-1">Email</h4>
                                      <p>{selectedEmployee.email}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold text-sm text-gray-600 mb-2">Текущие показатели</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="p-3 bg-blue-50 rounded-lg">
                                        <p className="text-xs text-gray-600">ИМТ</p>
                                        <p className="text-lg font-bold text-blue-600">{selectedEmployee.bmi}</p>
                                      </div>
                                      <div className="p-3 bg-green-50 rounded-lg">
                                        <p className="text-xs text-gray-600">АД</p>
                                        <p className="text-lg font-bold text-green-600">{selectedEmployee.bloodPressure}</p>
                                      </div>
                                      <div className="p-3 bg-purple-50 rounded-lg">
                                        <p className="text-xs text-gray-600">Глюкоза</p>
                                        <p className="text-lg font-bold text-purple-600">{selectedEmployee.glucose}</p>
                                      </div>
                                      <div className="p-3 bg-orange-50 rounded-lg">
                                        <p className="text-xs text-gray-600">Холестерин</p>
                                        <p className="text-lg font-bold text-orange-600">{selectedEmployee.cholesterol}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {selectedEmployee.contraindications && (
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600 mb-2">Противопоказания</h4>
                                      <div className="flex gap-2 flex-wrap">
                                        {selectedEmployee.contraindications.map((item, index) => (
                                          <Badge key={index} variant="destructive">
                                            {item}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {selectedEmployee.documents && (
                                    <div>
                                      <h4 className="font-semibold text-sm text-gray-600 mb-2">Медицинские документы</h4>
                                      <div className="space-y-2">
                                        {selectedEmployee.documents.map((doc) => (
                                          <div key={doc.id} className="p-3 border rounded-lg">
                                            <div className="flex justify-between items-start mb-1">
                                              <h5 className="font-semibold">{doc.type}</h5>
                                              <span className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString('ru-RU')}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{doc.doctor}</p>
                                            <p className="text-sm mt-1">{doc.description}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examinations" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-t-4 border-t-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" size={20} />
                    Календарь осмотров
                  </CardTitle>
                  <CardDescription>Выберите дату для просмотра запланированных осмотров</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ClipboardList" size={20} />
                    Ближайшие осмотры
                  </CardTitle>
                  <CardDescription>Запланированные медицинские осмотры</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{appointment.employeeName}</h3>
                          <Badge variant={appointment.status === 'Запланирован' ? 'default' : 'secondary'}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Icon name="Calendar" size={14} />
                            {new Date(appointment.date).toLocaleDateString('ru-RU')}
                          </div>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-t-4 border-t-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Динамика допуска к работе
                  </CardTitle>
                  <CardDescription>Изменение показателей за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={healthTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Line
                        type="monotone"
                        dataKey="допущен"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="ограничения"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="недопущен"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" size={20} />
                    Средний ИМТ коллектива
                  </CardTitle>
                  <CardDescription>Тренд индекса массы тела сотрудников</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={avgBMIData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis domain={[23, 26]} stroke="#6b7280" />
                      <Bar dataKey="bmi" radius={[8, 8, 0, 0]}>
                        {avgBMIData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.bmi > 25 ? '#f59e0b' : '#10b981'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calculators" className="space-y-4">
            <Card className="border-t-4 border-t-purple-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" size={24} />
                  Калькуляторы оценки рисков
                </CardTitle>
                <CardDescription>Инструменты для расчёта вероятности заболеваний</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cvd">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cvd">Риск ССЗ</TabsTrigger>
                    <TabsTrigger value="diabetes">Риск диабета</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cvd" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="age">Возраст (лет)</Label>
                          <Input
                            id="age"
                            type="number"
                            value={cvdFormData.age}
                            onChange={(e) => setCvdFormData({ ...cvdFormData, age: e.target.value })}
                            placeholder="45"
                          />
                        </div>
                        <div>
                          <Label htmlFor="systolic">АД систолическое (мм рт.ст.)</Label>
                          <Input
                            id="systolic"
                            type="number"
                            value={cvdFormData.systolic}
                            onChange={(e) => setCvdFormData({ ...cvdFormData, systolic: e.target.value })}
                            placeholder="130"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cholesterol">Холестерин (ммоль/л)</Label>
                          <Input
                            id="cholesterol"
                            type="number"
                            step="0.1"
                            value={cvdFormData.cholesterol}
                            onChange={(e) => setCvdFormData({ ...cvdFormData, cholesterol: e.target.value })}
                            placeholder="5.5"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cvdFormData.smoking}
                              onChange={(e) => setCvdFormData({ ...cvdFormData, smoking: e.target.checked })}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm">Курение</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cvdFormData.diabetes}
                              onChange={(e) => setCvdFormData({ ...cvdFormData, diabetes: e.target.checked })}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm">Сахарный диабет</span>
                          </label>
                        </div>
                        <Button onClick={calculateCVDRisk} className="w-full bg-blue-600 hover:bg-blue-700">
                          Рассчитать риск
                        </Button>
                      </div>

                      <div className="flex items-center justify-center">
                        {cvdRisk !== null ? (
                          <div className="text-center space-y-4">
                            <div className="relative inline-flex items-center justify-center w-48 h-48">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="96"
                                  cy="96"
                                  r="88"
                                  stroke="#e5e7eb"
                                  strokeWidth="16"
                                  fill="none"
                                />
                                <circle
                                  cx="96"
                                  cy="96"
                                  r="88"
                                  stroke={cvdRisk < 30 ? '#10b981' : cvdRisk < 60 ? '#f59e0b' : '#ef4444'}
                                  strokeWidth="16"
                                  fill="none"
                                  strokeDasharray={`${(cvdRisk / 100) * 553} 553`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute">
                                <p className="text-5xl font-bold text-gray-900">{cvdRisk}%</p>
                              </div>
                            </div>
                            <div>
                              <Badge
                                variant={cvdRisk < 30 ? 'default' : 'destructive'}
                                className={cvdRisk < 30 ? 'bg-green-500' : cvdRisk < 60 ? 'bg-orange-500' : 'bg-red-500'}
                              >
                                {cvdRisk < 30 ? 'Низкий риск' : cvdRisk < 60 ? 'Средний риск' : 'Высокий риск'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {cvdRisk < 30 && 'Поддерживайте здоровый образ жизни'}
                              {cvdRisk >= 30 && cvdRisk < 60 && 'Рекомендуется консультация врача'}
                              {cvdRisk >= 60 && 'Необходимо срочное обследование'}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400">
                            <Icon name="Heart" size={64} className="mx-auto mb-4 opacity-30" />
                            <p>Заполните форму и нажмите "Рассчитать"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="diabetes" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="diabetes-age">Возраст (лет)</Label>
                          <Input
                            id="diabetes-age"
                            type="number"
                            value={diabetesFormData.age}
                            onChange={(e) => setDiabetesFormData({ ...diabetesFormData, age: e.target.value })}
                            placeholder="45"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bmi">ИМТ (кг/м²)</Label>
                          <Input
                            id="bmi"
                            type="number"
                            step="0.1"
                            value={diabetesFormData.bmi}
                            onChange={(e) => setDiabetesFormData({ ...diabetesFormData, bmi: e.target.value })}
                            placeholder="25.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="waist">Окружность талии (см)</Label>
                          <Input
                            id="waist"
                            type="number"
                            value={diabetesFormData.waist}
                            onChange={(e) => setDiabetesFormData({ ...diabetesFormData, waist: e.target.value })}
                            placeholder="95"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={diabetesFormData.activity}
                              onChange={(e) => setDiabetesFormData({ ...diabetesFormData, activity: e.target.checked })}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm">Регулярная физическая активность</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={diabetesFormData.heredity}
                              onChange={(e) => setDiabetesFormData({ ...diabetesFormData, heredity: e.target.checked })}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm">Наследственность (диабет у родственников)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={diabetesFormData.hypertension}
                              onChange={(e) => setDiabetesFormData({ ...diabetesFormData, hypertension: e.target.checked })}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm">Гипертония</span>
                          </label>
                        </div>
                        <Button onClick={calculateDiabetesRisk} className="w-full bg-purple-600 hover:bg-purple-700">
                          Рассчитать риск
                        </Button>
                      </div>

                      <div className="flex items-center justify-center">
                        {diabetesRisk !== null ? (
                          <div className="text-center space-y-4">
                            <div className="relative inline-flex items-center justify-center w-48 h-48">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="96"
                                  cy="96"
                                  r="88"
                                  stroke="#e5e7eb"
                                  strokeWidth="16"
                                  fill="none"
                                />
                                <circle
                                  cx="96"
                                  cy="96"
                                  r="88"
                                  stroke={diabetesRisk < 30 ? '#10b981' : diabetesRisk < 60 ? '#f59e0b' : '#ef4444'}
                                  strokeWidth="16"
                                  fill="none"
                                  strokeDasharray={`${(diabetesRisk / 100) * 553} 553`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute">
                                <p className="text-5xl font-bold text-gray-900">{diabetesRisk}%</p>
                              </div>
                            </div>
                            <div>
                              <Badge
                                variant={diabetesRisk < 30 ? 'default' : 'destructive'}
                                className={diabetesRisk < 30 ? 'bg-green-500' : diabetesRisk < 60 ? 'bg-orange-500' : 'bg-red-500'}
                              >
                                {diabetesRisk < 30 ? 'Низкий риск' : diabetesRisk < 60 ? 'Средний риск' : 'Высокий риск'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {diabetesRisk < 30 && 'Продолжайте следить за здоровьем'}
                              {diabetesRisk >= 30 && diabetesRisk < 60 && 'Рекомендуется изменить образ жизни'}
                              {diabetesRisk >= 60 && 'Необходима консультация эндокринолога'}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400">
                            <Icon name="Droplet" size={64} className="mx-auto mb-4 opacity-30" />
                            <p>Заполните форму и нажмите "Рассчитать"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
