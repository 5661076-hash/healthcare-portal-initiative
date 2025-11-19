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
  {
    id: 6,
    name: 'Волкова Елена Петровна',
    age: 33,
    department: 'Отдел качества',
    position: 'Инженер по качеству',
    healthGroup: 1,
    nextExam: '2025-03-12',
    lastExam: '2024-09-12',
    status: 'Допущен',
    phone: '+7 (900) 678-90-12',
    email: 'volkova@company.com',
    bmi: 21.8,
    bloodPressure: '110/70',
    glucose: 4.8,
    cholesterol: 4.1,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-09-12', doctor: 'Терапевт Иванов П.С.', description: 'Здорова' },
    ],
    metricsHistory: [
      { date: '2024-03-12', bmi: 21.9, bloodPressure: '112/72', glucose: 4.9, cholesterol: 4.2, weight: 58, height: 163 },
      { date: '2024-09-12', bmi: 21.8, bloodPressure: '110/70', glucose: 4.8, cholesterol: 4.1, weight: 58, height: 163 },
    ],
  },
  {
    id: 7,
    name: 'Козлов Андрей Викторович',
    age: 48,
    department: 'Производственный цех №1',
    position: 'Начальник смены',
    healthGroup: 2,
    nextExam: '2024-12-01',
    lastExam: '2024-06-01',
    status: 'Допущен с ограничениями',
    phone: '+7 (900) 789-01-23',
    email: 'kozlov@company.com',
    bmi: 26.5,
    bloodPressure: '130/88',
    glucose: 5.8,
    cholesterol: 5.4,
    contraindications: ['Работа на высоте'],
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-06-01', doctor: 'Терапевт Соколова А.И.', description: 'Гипертония I степени' },
      { id: 2, type: 'ЭКГ', date: '2024-06-01', doctor: 'Кардиолог', description: 'Умеренные изменения' },
    ],
    metricsHistory: [
      { date: '2023-12-01', bmi: 26.0, bloodPressure: '128/85', glucose: 5.6, cholesterol: 5.2, weight: 85, height: 180 },
      { date: '2024-06-01', bmi: 26.5, bloodPressure: '130/88', glucose: 5.8, cholesterol: 5.4, weight: 86, height: 180 },
    ],
  },
  {
    id: 8,
    name: 'Морозова Ольга Дмитриевна',
    age: 29,
    department: 'Бухгалтерия',
    position: 'Бухгалтер',
    healthGroup: 1,
    nextExam: '2025-04-20',
    lastExam: '2024-10-20',
    status: 'Допущен',
    phone: '+7 (900) 890-12-34',
    email: 'morozova@company.com',
    bmi: 20.5,
    bloodPressure: '115/72',
    glucose: 4.7,
    cholesterol: 4.0,
    documents: [
      { id: 1, type: 'Предварительный осмотр', date: '2024-10-20', doctor: 'Терапевт Иванов П.С.', description: 'Практически здорова' },
    ],
    metricsHistory: [
      { date: '2024-10-20', bmi: 20.5, bloodPressure: '115/72', glucose: 4.7, cholesterol: 4.0, weight: 55, height: 166 },
    ],
  },
  {
    id: 9,
    name: 'Лебедев Сергей Александрович',
    age: 56,
    department: 'Производственный цех №2',
    position: 'Токарь',
    healthGroup: 2,
    nextExam: '2024-12-10',
    lastExam: '2024-06-10',
    status: 'Допущен с ограничениями',
    phone: '+7 (900) 901-23-45',
    email: 'lebedev@company.com',
    bmi: 28.2,
    bloodPressure: '138/90',
    glucose: 6.3,
    cholesterol: 5.9,
    contraindications: ['Работа в условиях повышенного шума', 'Ночные смены'],
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-06-10', doctor: 'Терапевт Соколова А.И.', description: 'Гипертония, требует лечения' },
      { id: 2, type: 'Анализ крови', date: '2024-06-10', doctor: 'Лаборант', description: 'Повышен холестерин' },
    ],
    metricsHistory: [
      { date: '2023-12-10', bmi: 27.8, bloodPressure: '135/88', glucose: 6.0, cholesterol: 5.7, weight: 92, height: 181 },
      { date: '2024-06-10', bmi: 28.2, bloodPressure: '138/90', glucose: 6.3, cholesterol: 5.9, weight: 93, height: 181 },
    ],
  },
  {
    id: 10,
    name: 'Новикова Татьяна Ивановна',
    age: 38,
    department: 'Отдел кадров',
    position: 'Специалист по кадрам',
    healthGroup: 1,
    nextExam: '2025-01-15',
    lastExam: '2024-07-15',
    status: 'Допущен',
    phone: '+7 (900) 012-34-56',
    email: 'novikova@company.com',
    bmi: 23.1,
    bloodPressure: '118/75',
    glucose: 5.1,
    cholesterol: 4.4,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-07-15', doctor: 'Терапевт Иванов П.С.', description: 'Здорова' },
    ],
    metricsHistory: [
      { date: '2024-01-15', bmi: 23.3, bloodPressure: '120/76', glucose: 5.2, cholesterol: 4.5, weight: 62, height: 165 },
      { date: '2024-07-15', bmi: 23.1, bloodPressure: '118/75', glucose: 5.1, cholesterol: 4.4, weight: 61.5, height: 165 },
    ],
  },
  {
    id: 11,
    name: 'Орлов Максим Сергеевич',
    age: 31,
    department: 'Ремонтно-механический цех',
    position: 'Электрик',
    healthGroup: 1,
    nextExam: '2025-02-28',
    lastExam: '2024-08-28',
    status: 'Допущен',
    phone: '+7 (900) 123-45-67',
    email: 'orlov@company.com',
    bmi: 24.0,
    bloodPressure: '122/78',
    glucose: 5.0,
    cholesterol: 4.6,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-08-28', doctor: 'Терапевт Соколова А.И.', description: 'Допущен к работам на высоте' },
    ],
    metricsHistory: [
      { date: '2024-02-28', bmi: 24.2, bloodPressure: '120/78', glucose: 5.1, cholesterol: 4.7, weight: 75, height: 177 },
      { date: '2024-08-28', bmi: 24.0, bloodPressure: '122/78', glucose: 5.0, cholesterol: 4.6, weight: 75, height: 177 },
    ],
  },
  {
    id: 12,
    name: 'Павлова Светлана Николаевна',
    age: 44,
    department: 'Лаборатория',
    position: 'Старший лаборант',
    healthGroup: 1,
    nextExam: '2025-03-05',
    lastExam: '2024-09-05',
    status: 'Допущен',
    phone: '+7 (900) 234-56-78',
    email: 'pavlova@company.com',
    bmi: 22.8,
    bloodPressure: '116/74',
    glucose: 4.9,
    cholesterol: 4.3,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-09-05', doctor: 'Терапевт Иванов П.С.', description: 'Здорова' },
      { id: 2, type: 'Флюорография', date: '2024-09-05', doctor: 'Рентгенолог', description: 'Без патологии' },
    ],
    metricsHistory: [
      { date: '2024-03-05', bmi: 23.0, bloodPressure: '118/75', glucose: 5.0, cholesterol: 4.4, weight: 63, height: 166 },
      { date: '2024-09-05', bmi: 22.8, bloodPressure: '116/74', glucose: 4.9, cholesterol: 4.3, weight: 62.5, height: 166 },
    ],
  },
  {
    id: 13,
    name: 'Романов Алексей Петрович',
    age: 50,
    department: 'Склад',
    position: 'Заведующий складом',
    healthGroup: 2,
    nextExam: '2024-11-30',
    lastExam: '2024-05-30',
    status: 'Допущен с ограничениями',
    phone: '+7 (900) 345-67-89',
    email: 'romanov@company.com',
    bmi: 27.8,
    bloodPressure: '136/88',
    glucose: 6.2,
    cholesterol: 5.7,
    contraindications: ['Подъем тяжестей более 15 кг'],
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-05-30', doctor: 'Терапевт Соколова А.И.', description: 'Остеохондроз, ограничения' },
    ],
    metricsHistory: [
      { date: '2023-11-30', bmi: 27.3, bloodPressure: '134/86', glucose: 5.9, cholesterol: 5.5, weight: 89, height: 180 },
      { date: '2024-05-30', bmi: 27.8, bloodPressure: '136/88', glucose: 6.2, cholesterol: 5.7, weight: 90, height: 180 },
    ],
  },
  {
    id: 14,
    name: 'Соловьева Ирина Владимировна',
    age: 36,
    department: 'Отдел качества',
    position: 'Контролер ОТК',
    healthGroup: 1,
    nextExam: '2025-01-22',
    lastExam: '2024-07-22',
    status: 'Допущен',
    phone: '+7 (900) 456-78-90',
    email: 'soloveva@company.com',
    bmi: 21.5,
    bloodPressure: '112/70',
    glucose: 4.8,
    cholesterol: 4.2,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-07-22', doctor: 'Терапевт Иванов П.С.', description: 'Здорова' },
    ],
    metricsHistory: [
      { date: '2024-01-22', bmi: 21.7, bloodPressure: '114/72', glucose: 4.9, cholesterol: 4.3, weight: 57, height: 163 },
      { date: '2024-07-22', bmi: 21.5, bloodPressure: '112/70', glucose: 4.8, cholesterol: 4.2, weight: 57, height: 163 },
    ],
  },
  {
    id: 15,
    name: 'Титов Владимир Николаевич',
    age: 42,
    department: 'Производственный цех №1',
    position: 'Фрезеровщик',
    healthGroup: 1,
    nextExam: '2025-02-14',
    lastExam: '2024-08-14',
    status: 'Допущен',
    phone: '+7 (900) 567-89-01',
    email: 'titov@company.com',
    bmi: 25.2,
    bloodPressure: '124/80',
    glucose: 5.3,
    cholesterol: 4.9,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-08-14', doctor: 'Терапевт Соколова А.И.', description: 'Допущен' },
    ],
    metricsHistory: [
      { date: '2024-02-14', bmi: 25.5, bloodPressure: '126/82', glucose: 5.4, cholesterol: 5.0, weight: 82, height: 180 },
      { date: '2024-08-14', bmi: 25.2, bloodPressure: '124/80', glucose: 5.3, cholesterol: 4.9, weight: 81, height: 180 },
    ],
  },
  {
    id: 16,
    name: 'Ульянова Наталья Андреевна',
    age: 27,
    department: 'Бухгалтерия',
    position: 'Помощник бухгалтера',
    healthGroup: 1,
    nextExam: '2025-04-08',
    lastExam: '2024-10-08',
    status: 'Допущен',
    phone: '+7 (900) 678-90-12',
    email: 'ulyanova@company.com',
    bmi: 20.2,
    bloodPressure: '110/68',
    glucose: 4.6,
    cholesterol: 3.9,
    documents: [
      { id: 1, type: 'Предварительный осмотр', date: '2024-10-08', doctor: 'Терапевт Иванов П.С.', description: 'Здорова' },
    ],
    metricsHistory: [
      { date: '2024-10-08', bmi: 20.2, bloodPressure: '110/68', glucose: 4.6, cholesterol: 3.9, weight: 54, height: 164 },
    ],
  },
  {
    id: 17,
    name: 'Федоров Игорь Сергеевич',
    age: 39,
    department: 'Производственный цех №2',
    position: 'Сварщик',
    healthGroup: 1,
    nextExam: '2024-12-20',
    lastExam: '2024-06-20',
    status: 'Допущен',
    phone: '+7 (900) 789-01-23',
    email: 'fedorov@company.com',
    bmi: 26.1,
    bloodPressure: '128/82',
    glucose: 5.5,
    cholesterol: 5.1,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-06-20', doctor: 'Терапевт Соколова А.И.', description: 'Допущен к работе со сваркой' },
      { id: 2, type: 'Офтальмолог', date: '2024-06-20', doctor: 'Окулист', description: 'Зрение в норме' },
    ],
    metricsHistory: [
      { date: '2023-12-20', bmi: 25.8, bloodPressure: '126/80', glucose: 5.3, cholesterol: 4.9, weight: 84, height: 181 },
      { date: '2024-06-20', bmi: 26.1, bloodPressure: '128/82', glucose: 5.5, cholesterol: 5.1, weight: 85, height: 181 },
    ],
  },
  {
    id: 18,
    name: 'Харитонова Марина Васильевна',
    age: 46,
    department: 'Отдел кадров',
    position: 'Начальник отдела кадров',
    healthGroup: 1,
    nextExam: '2025-03-18',
    lastExam: '2024-09-18',
    status: 'Допущен',
    phone: '+7 (900) 890-12-34',
    email: 'haritonova@company.com',
    bmi: 24.3,
    bloodPressure: '120/78',
    glucose: 5.2,
    cholesterol: 4.7,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-09-18', doctor: 'Терапевт Иванов П.С.', description: 'Здорова' },
    ],
    metricsHistory: [
      { date: '2024-03-18', bmi: 24.5, bloodPressure: '122/78', glucose: 5.3, cholesterol: 4.8, weight: 67, height: 167 },
      { date: '2024-09-18', bmi: 24.3, bloodPressure: '120/78', glucose: 5.2, cholesterol: 4.7, weight: 67, height: 167 },
    ],
  },
  {
    id: 19,
    name: 'Царев Николай Анатольевич',
    age: 53,
    department: 'Ремонтно-механический цех',
    position: 'Начальник цеха',
    healthGroup: 2,
    nextExam: '2024-11-28',
    lastExam: '2024-05-28',
    status: 'Допущен с ограничениями',
    phone: '+7 (900) 901-23-45',
    email: 'tsarev@company.com',
    bmi: 28.5,
    bloodPressure: '142/92',
    glucose: 6.5,
    cholesterol: 6.1,
    contraindications: ['Работа на высоте', 'Тяжелый физический труд'],
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-05-28', doctor: 'Терапевт Соколова А.И.', description: 'Гипертония II степени' },
      { id: 2, type: 'ЭКГ', date: '2024-05-28', doctor: 'Кардиолог', description: 'Гипертрофия левого желудочка' },
    ],
    metricsHistory: [
      { date: '2023-11-28', bmi: 28.0, bloodPressure: '138/90', glucose: 6.2, cholesterol: 5.8, weight: 94, height: 183 },
      { date: '2024-05-28', bmi: 28.5, bloodPressure: '142/92', glucose: 6.5, cholesterol: 6.1, weight: 95.5, height: 183 },
    ],
  },
  {
    id: 20,
    name: 'Чернова Юлия Игоревна',
    age: 32,
    department: 'Лаборатория',
    position: 'Лаборант-химик',
    healthGroup: 1,
    nextExam: '2025-01-25',
    lastExam: '2024-07-25',
    status: 'Допущен',
    phone: '+7 (900) 012-34-56',
    email: 'chernova@company.com',
    bmi: 21.2,
    bloodPressure: '114/72',
    glucose: 4.8,
    cholesterol: 4.1,
    documents: [
      { id: 1, type: 'Периодический осмотр', date: '2024-07-25', doctor: 'Терапевт Иванов П.С.', description: 'Здорова' },
      { id: 2, type: 'Анализ крови', date: '2024-07-25', doctor: 'Лаборант', description: 'Все показатели в норме' },
    ],
    metricsHistory: [
      { date: '2024-01-25', bmi: 21.4, bloodPressure: '116/74', glucose: 4.9, cholesterol: 4.2, weight: 56, height: 162 },
      { date: '2024-07-25', bmi: 21.2, bloodPressure: '114/72', glucose: 4.8, cholesterol: 4.1, weight: 55.5, height: 162 },
    ],
  },
];

const mockAppointments: Appointment[] = [
  { id: 1, employeeId: 1, employeeName: 'Иванов И.И.', date: '2024-11-18', time: '09:00', type: 'Периодический осмотр', status: 'Запланирован', doctor: 'Терапевт' },
  { id: 2, employeeId: 3, employeeName: 'Сидоров П.Н.', date: '2024-11-18', time: '10:30', type: 'Периодический осмотр', status: 'В процессе', doctor: 'Терапевт' },
  { id: 3, employeeId: 5, employeeName: 'Смирнов Д.В.', date: '2024-11-18', time: '14:00', type: 'Дополнительное обследование', status: 'Запланирован', doctor: 'Кардиолог' },
  { id: 4, employeeId: 2, employeeName: 'Петрова А.С.', date: '2024-11-19', time: '09:30', type: 'Предварительный осмотр', status: 'Запланирован', doctor: 'Терапевт' },
];

const getHealthGroupColor = (group: number) => {
  switch (group) {
    case 1: return 'bg-green-100 text-green-800 border-green-300';
    case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 3: return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getStatusColor = (status: string) => {
  if (status.includes('Допущен') && !status.includes('ограничениями')) return 'bg-green-100 text-green-800 border-green-300';
  if (status.includes('ограничениями')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  if (status.includes('Не допущен') || status.includes('обследование')) return 'bg-red-100 text-red-800 border-red-300';
  return 'bg-gray-100 text-gray-800 border-gray-300';
};

const getAppointmentStatusColor = (status: string) => {
  if (status === 'Завершен') return 'bg-green-100 text-green-800';
  if (status === 'В процессе') return 'bg-blue-100 text-blue-800';
  if (status === 'Запланирован') return 'bg-gray-100 text-gray-800';
  if (status === 'Отменен') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [healthGroupFilter, setHealthGroupFilter] = useState('all');
  const [selectedCalculator, setSelectedCalculator] = useState('findrisc');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isMedicalCardDialogOpen, setIsMedicalCardDialogOpen] = useState(false);
  const [selectedCalculatorEmployee, setSelectedCalculatorEmployee] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState('2024-11-18');
  const [inspectionType, setInspectionType] = useState<'preliminary' | 'periodic' | 'indepth'>('periodic');
  const [selectedInspectionEmployee, setSelectedInspectionEmployee] = useState<number | null>(null);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);
  const [selectedDepartmentForCalc, setSelectedDepartmentForCalc] = useState<string>('all');
  const [recommendations, setRecommendations] = useState<string>('Рекомендуется соблюдать здоровый образ жизни, регулярные физические нагрузки, сбалансированное питание.');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesHealthGroup = healthGroupFilter === 'all' || emp.healthGroup.toString() === healthGroupFilter;
    return matchesSearch && matchesDepartment && matchesHealthGroup;
  });

  const departments = Array.from(new Set(employees.map(e => e.department)));

  const filteredAppointments = appointments.filter(app => app.date === selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Icon name="HeartPulse" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">МедПортал</h1>
                <p className="text-sm text-slate-500">Промышленная медицина</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Bell" size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Users" size={16} className="mr-2" />
              Сотрудники
            </TabsTrigger>
            <TabsTrigger value="inspections" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Stethoscope" size={16} className="mr-2" />
              Осмотры
            </TabsTrigger>
            <TabsTrigger value="calculators" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Calculator" size={16} className="mr-2" />
              Калькуляторы
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">Всего сотрудников</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{employees.length}</div>
                    <p className="text-xs text-slate-500 mt-1">Активных работников</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">Осмотры сегодня</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{filteredAppointments.length}</div>
                    <p className="text-xs text-slate-500 mt-1">Запланировано</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">Группа I</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{employees.filter(e => e.healthGroup === 1).length}</div>
                    <p className="text-xs text-slate-500 mt-1">Здоровые</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-600">Требуют внимания</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{employees.filter(e => e.healthGroup >= 2).length}</div>
                    <p className="text-xs text-slate-500 mt-1">Группы II-III</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ближайшие осмотры</CardTitle>
                    <CardDescription>Запланированные на сегодня</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredAppointments.map(appointment => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{appointment.employeeName}</p>
                            <p className="text-xs text-slate-600">{appointment.type}</p>
                          </div>
                          <div className="text-right mr-4">
                            <p className="text-sm font-medium">{appointment.time}</p>
                            <p className="text-xs text-slate-600">{appointment.doctor}</p>
                          </div>
                          <Badge className={getAppointmentStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Распределение по группам здоровья</CardTitle>
                    <CardDescription>Актуальная статистика</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map(group => {
                        const count = employees.filter(e => e.healthGroup === group).length;
                        const percentage = (count / employees.length) * 100;
                        return (
                          <div key={group}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Группа {group}</span>
                              <span className="text-sm text-slate-600">{count} чел ({percentage.toFixed(0)}%)</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>База данных сотрудников</CardTitle>
                    <CardDescription>Управление медицинскими картами</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Добавить сотрудника
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Добавить нового сотрудника</DialogTitle>
                        <DialogDescription>Заполните информацию о сотруднике</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">ФИО</Label>
                            <Input id="name" placeholder="Иванов Иван Иванович" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="age">Возраст</Label>
                            <Input id="age" type="number" placeholder="35" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="department">Подразделение</Label>
                            <Input id="department" placeholder="Производственный цех №1" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="position">Должность</Label>
                            <Input id="position" placeholder="Оператор станка" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input id="phone" placeholder="+7 (900) 123-45-67" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="ivanov@company.com" />
                          </div>
                        </div>
                        <Button className="w-full">Сохранить</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Поиск по ФИО, подразделению или должности..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger className="w-full md:w-[250px]">
                        <SelectValue placeholder="Подразделение" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все подразделения</SelectItem>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={healthGroupFilter} onValueChange={setHealthGroupFilter}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Группа здоровья" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все группы</SelectItem>
                        <SelectItem value="1">Группа I</SelectItem>
                        <SelectItem value="2">Группа II</SelectItem>
                        <SelectItem value="3">Группа III</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ФИО</TableHead>
                          <TableHead>Возраст</TableHead>
                          <TableHead>Подразделение</TableHead>
                          <TableHead>Должность</TableHead>
                          <TableHead>Группа</TableHead>
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
                              <Badge className={getHealthGroupColor(employee.healthGroup)}>
                                {employee.healthGroup}
                              </Badge>
                            </TableCell>
                            <TableCell>{employee.nextExam}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(employee.status)}>
                                {employee.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setIsMedicalCardDialogOpen(true);
                                }}
                              >
                                <Icon name="Eye" size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Dialog open={isMedicalCardDialogOpen} onOpenChange={setIsMedicalCardDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Медицинская карта</DialogTitle>
                  <DialogDescription>Подробная информация о сотруднике</DialogDescription>
                </DialogHeader>
                {selectedEmployee && (
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="general">Общие данные</TabsTrigger>
                      <TabsTrigger value="documents">Документы</TabsTrigger>
                      <TabsTrigger value="dynamics">Динамика</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-600">ФИО</Label>
                          <p className="font-medium">{selectedEmployee.name}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Возраст</Label>
                          <p className="font-medium">{selectedEmployee.age} лет</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Подразделение</Label>
                          <p className="font-medium">{selectedEmployee.department}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Должность</Label>
                          <p className="font-medium">{selectedEmployee.position}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Телефон</Label>
                          <p className="font-medium">{selectedEmployee.phone}</p>
                        </div>
                        <div>
                          <Label className="text-slate-600">Email</Label>
                          <p className="font-medium">{selectedEmployee.email}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3">Текущие показатели</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-slate-600">ИМТ</Label>
                            <p className="font-medium text-lg">{selectedEmployee.bmi || 'Не указано'}</p>
                          </div>
                          <div>
                            <Label className="text-slate-600">Артериальное давление</Label>
                            <p className="font-medium text-lg">{selectedEmployee.bloodPressure || 'Не указано'}</p>
                          </div>
                          <div>
                            <Label className="text-slate-600">Глюкоза</Label>
                            <p className="font-medium text-lg">{selectedEmployee.glucose ? `${selectedEmployee.glucose} ммоль/л` : 'Не указано'}</p>
                          </div>
                          <div>
                            <Label className="text-slate-600">Холестерин</Label>
                            <p className="font-medium text-lg">{selectedEmployee.cholesterol ? `${selectedEmployee.cholesterol} ммоль/л` : 'Не указано'}</p>
                          </div>
                        </div>
                      </div>

                      {selectedEmployee.contraindications && selectedEmployee.contraindications.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-3">Противопоказания</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedEmployee.contraindications.map((item, index) => (
                              <li key={index} className="text-sm text-slate-700">{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="border-t pt-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold mb-2">Группа здоровья</h4>
                          <Badge className={getHealthGroupColor(selectedEmployee.healthGroup)}>
                            Группа {selectedEmployee.healthGroup}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Статус допуска</h4>
                          <Badge className={getStatusColor(selectedEmployee.status)}>
                            {selectedEmployee.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button className="flex-1">
                          <Icon name="Edit" size={16} className="mr-2" />
                          Редактировать
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Icon name="FileText" size={16} className="mr-2" />
                          Печать карты
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">Медицинские документы</h4>
                        <Button size="sm">
                          <Icon name="Plus" size={14} className="mr-2" />
                          Добавить
                        </Button>
                      </div>
                      
                      {selectedEmployee.documents && selectedEmployee.documents.length > 0 ? (
                        <div className="space-y-3">
                          {selectedEmployee.documents.map((doc) => (
                            <Card key={doc.id} className="border-l-4 border-l-blue-500">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Icon name="FileText" size={18} className="text-blue-600" />
                                      <h5 className="font-semibold">{doc.type}</h5>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-1">
                                      <Icon name="Calendar" size={14} className="inline mr-1" />
                                      {doc.date}
                                    </p>
                                    <p className="text-sm text-slate-600 mb-2">
                                      <Icon name="User" size={14} className="inline mr-1" />
                                      {doc.doctor}
                                    </p>
                                    <p className="text-sm">{doc.description}</p>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm">
                                      <Icon name="Download" size={14} />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Icon name="Eye" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          <Icon name="FileX" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Документы отсутствуют</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="dynamics" className="space-y-4 mt-4">
                      <h4 className="font-semibold mb-4">История показателей здоровья</h4>
                      
                      {selectedEmployee.metricsHistory && selectedEmployee.metricsHistory.length > 0 ? (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <h5 className="font-medium flex items-center gap-2">
                              <Icon name="Activity" size={18} className="text-blue-600" />
                              Индекс массы тела (ИМТ)
                            </h5>
                            <div className="space-y-2">
                              {selectedEmployee.metricsHistory.map((metric, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                  <span className="text-sm text-slate-600">{metric.date}</span>
                                  <div className="flex items-center gap-4">
                                    <span className="font-medium">{metric.bmi || 'Н/Д'}</span>
                                    {index > 0 && metric.bmi && selectedEmployee.metricsHistory![index - 1].bmi && (
                                      <span className={`text-xs ${metric.bmi < selectedEmployee.metricsHistory![index - 1].bmi! ? 'text-green-600' : 'text-red-600'}`}>
                                        {metric.bmi < selectedEmployee.metricsHistory![index - 1].bmi! ? '↓' : '↑'} 
                                        {Math.abs(metric.bmi - selectedEmployee.metricsHistory![index - 1].bmi!).toFixed(1)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h5 className="font-medium flex items-center gap-2">
                              <Icon name="Heart" size={18} className="text-red-600" />
                              Артериальное давление
                            </h5>
                            <div className="space-y-2">
                              {selectedEmployee.metricsHistory.map((metric, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                  <span className="text-sm text-slate-600">{metric.date}</span>
                                  <span className="font-medium">{metric.bloodPressure || 'Н/Д'}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h5 className="font-medium flex items-center gap-2">
                              <Icon name="Droplet" size={18} className="text-orange-600" />
                              Глюкоза (ммоль/л)
                            </h5>
                            <div className="space-y-2">
                              {selectedEmployee.metricsHistory.map((metric, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                  <span className="text-sm text-slate-600">{metric.date}</span>
                                  <div className="flex items-center gap-4">
                                    <span className="font-medium">{metric.glucose || 'Н/Д'}</span>
                                    {index > 0 && metric.glucose && selectedEmployee.metricsHistory![index - 1].glucose && (
                                      <span className={`text-xs ${metric.glucose < selectedEmployee.metricsHistory![index - 1].glucose! ? 'text-green-600' : 'text-red-600'}`}>
                                        {metric.glucose < selectedEmployee.metricsHistory![index - 1].glucose! ? '↓' : '↑'} 
                                        {Math.abs(metric.glucose - selectedEmployee.metricsHistory![index - 1].glucose!).toFixed(1)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h5 className="font-medium flex items-center gap-2">
                              <Icon name="Zap" size={18} className="text-purple-600" />
                              Холестерин (ммоль/л)
                            </h5>
                            <div className="space-y-2">
                              {selectedEmployee.metricsHistory.map((metric, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                  <span className="text-sm text-slate-600">{metric.date}</span>
                                  <div className="flex items-center gap-4">
                                    <span className="font-medium">{metric.cholesterol || 'Н/Д'}</span>
                                    {index > 0 && metric.cholesterol && selectedEmployee.metricsHistory![index - 1].cholesterol && (
                                      <span className={`text-xs ${metric.cholesterol < selectedEmployee.metricsHistory![index - 1].cholesterol! ? 'text-green-600' : 'text-red-600'}`}>
                                        {metric.cholesterol < selectedEmployee.metricsHistory![index - 1].cholesterol! ? '↓' : '↑'} 
                                        {Math.abs(metric.cholesterol - selectedEmployee.metricsHistory![index - 1].cholesterol!).toFixed(1)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          <Icon name="TrendingUp" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>История показателей отсутствует</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="inspections">
            <Tabs value={inspectionType} onValueChange={(value) => setInspectionType(value as 'preliminary' | 'periodic' | 'indepth')} className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="preliminary">Предварительные</TabsTrigger>
                  <TabsTrigger value="periodic">Периодические</TabsTrigger>
                  <TabsTrigger value="indepth">Углубленные</TabsTrigger>
                </TabsList>
                <Button onClick={() => setIsInspectionDialogOpen(true)}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать осмотр
                </Button>
              </div>

              <TabsContent value="preliminary" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Предварительные осмотры</CardTitle>
                    <CardDescription>При поступлении на работу и при переводе на другую работу</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employees.filter(e => e.lastExam && new Date(e.lastExam) > new Date('2024-09-01')).slice(0, 3).map(emp => (
                        <Card key={emp.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-semibold mb-2">{emp.name}</h5>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <p className="text-slate-600">Должность: {emp.position}</p>
                                  <p className="text-slate-600">Подразделение: {emp.department}</p>
                                  <p className="text-slate-600">Дата осмотра: {emp.lastExam}</p>
                                  <p className="text-slate-600">Возраст: {emp.age} лет</p>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setSelectedInspectionEmployee(emp.id);
                                  setSelectedEmployee(emp);
                                  setIsMedicalCardDialogOpen(true);
                                }}
                              >
                                Открыть
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="periodic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Периодические осмотры</CardTitle>
                    <CardDescription>Регулярные осмотры работников в течение трудовой деятельности</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employees.map(emp => (
                        <Card key={emp.id} className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 grid grid-cols-3 gap-4">
                                <div>
                                  <h5 className="font-semibold mb-1">{emp.name}</h5>
                                  <p className="text-sm text-slate-600">{emp.position}</p>
                                  <Badge className={`mt-2 ${getHealthGroupColor(emp.healthGroup)}`}>
                                    Группа {emp.healthGroup}
                                  </Badge>
                                </div>
                                <div className="space-y-1 text-sm">
                                  <p className="text-slate-600"><strong>Последний:</strong> {emp.lastExam}</p>
                                  <p className="text-slate-600"><strong>Следующий:</strong> {emp.nextExam}</p>
                                  <p className="text-slate-600"><strong>Возраст:</strong> {emp.age} лет</p>
                                </div>
                                <div className="space-y-1 text-sm">
                                  <p><strong>ИМТ:</strong> {emp.bmi || 'Н/Д'}</p>
                                  <p><strong>АД:</strong> {emp.bloodPressure || 'Н/Д'}</p>
                                  <p><strong>Глюкоза:</strong> {emp.glucose ? `${emp.glucose} ммоль/л` : 'Н/Д'}</p>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setSelectedInspectionEmployee(emp.id);
                                  setSelectedEmployee(emp);
                                  setIsMedicalCardDialogOpen(true);
                                }}
                              >
                                Осмотр
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="indepth" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Углубленные осмотры</CardTitle>
                    <CardDescription>Для работников с факторами риска и хроническими заболеваниями</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employees.filter(e => e.healthGroup >= 2).map(emp => (
                        <Card key={emp.id} className="border-l-4 border-l-orange-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h5 className="font-semibold">{emp.name}</h5>
                                  <Badge className={getHealthGroupColor(emp.healthGroup)}>
                                    Группа {emp.healthGroup}
                                  </Badge>
                                  <Badge variant="outline" className="text-orange-600">
                                    Требует углубленного осмотра
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-2 text-sm">
                                    <p className="text-slate-600"><strong>Должность:</strong> {emp.position}</p>
                                    <p className="text-slate-600"><strong>Подразделение:</strong> {emp.department}</p>
                                    <p className="text-slate-600"><strong>Последний осмотр:</strong> {emp.lastExam}</p>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <p><strong>ИМТ:</strong> <span className={emp.bmi && emp.bmi > 27 ? 'text-red-600 font-semibold' : ''}>{emp.bmi || 'Н/Д'}</span></p>
                                    <p><strong>АД:</strong> {emp.bloodPressure || 'Н/Д'}</p>
                                    <p><strong>Глюкоза:</strong> <span className={emp.glucose && emp.glucose > 6.0 ? 'text-red-600 font-semibold' : ''}>{emp.glucose ? `${emp.glucose} ммоль/л` : 'Н/Д'}</span></p>
                                    <p><strong>Холестерин:</strong> <span className={emp.cholesterol && emp.cholesterol > 5.5 ? 'text-red-600 font-semibold' : ''}>{emp.cholesterol ? `${emp.cholesterol} ммоль/л` : 'Н/Д'}</span></p>
                                  </div>
                                </div>

                                {emp.contraindications && emp.contraindications.length > 0 && (
                                  <div className="bg-orange-50 p-3 rounded-lg mb-3">
                                    <p className="text-sm font-medium text-orange-900 mb-1">Противопоказания:</p>
                                    <ul className="text-sm text-orange-800 list-disc list-inside">
                                      {emp.contraindications.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {emp.metricsHistory && emp.metricsHistory.length >= 2 && (
                                  <div className="grid grid-cols-4 gap-2 text-sm">
                                    <div className="bg-slate-50 p-2 rounded">
                                      <p className="text-xs text-slate-600 mb-1">Динамика ИМТ</p>
                                      {emp.metricsHistory[emp.metricsHistory.length - 1].bmi && emp.metricsHistory[emp.metricsHistory.length - 2].bmi && (
                                        <p className={`font-semibold ${
                                          emp.metricsHistory[emp.metricsHistory.length - 1].bmi! < emp.metricsHistory[emp.metricsHistory.length - 2].bmi! 
                                            ? 'text-green-600' 
                                            : 'text-red-600'
                                        }`}>
                                          {emp.metricsHistory[emp.metricsHistory.length - 1].bmi! < emp.metricsHistory[emp.metricsHistory.length - 2].bmi! ? '↓' : '↑'} 
                                          {Math.abs(emp.metricsHistory[emp.metricsHistory.length - 1].bmi! - emp.metricsHistory[emp.metricsHistory.length - 2].bmi!).toFixed(1)}
                                        </p>
                                      )}
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded">
                                      <p className="text-xs text-slate-600 mb-1">Динамика глюкозы</p>
                                      {emp.metricsHistory[emp.metricsHistory.length - 1].glucose && emp.metricsHistory[emp.metricsHistory.length - 2].glucose && (
                                        <p className={`font-semibold ${
                                          emp.metricsHistory[emp.metricsHistory.length - 1].glucose! < emp.metricsHistory[emp.metricsHistory.length - 2].glucose! 
                                            ? 'text-green-600' 
                                            : 'text-red-600'
                                        }`}>
                                          {emp.metricsHistory[emp.metricsHistory.length - 1].glucose! < emp.metricsHistory[emp.metricsHistory.length - 2].glucose! ? '↓' : '↑'} 
                                          {Math.abs(emp.metricsHistory[emp.metricsHistory.length - 1].glucose! - emp.metricsHistory[emp.metricsHistory.length - 2].glucose!).toFixed(1)}
                                        </p>
                                      )}
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded">
                                      <p className="text-xs text-slate-600 mb-1">Динамика холестерина</p>
                                      {emp.metricsHistory[emp.metricsHistory.length - 1].cholesterol && emp.metricsHistory[emp.metricsHistory.length - 2].cholesterol && (
                                        <p className={`font-semibold ${
                                          emp.metricsHistory[emp.metricsHistory.length - 1].cholesterol! < emp.metricsHistory[emp.metricsHistory.length - 2].cholesterol! 
                                            ? 'text-green-600' 
                                            : 'text-red-600'
                                        }`}>
                                          {emp.metricsHistory[emp.metricsHistory.length - 1].cholesterol! < emp.metricsHistory[emp.metricsHistory.length - 2].cholesterol! ? '↓' : '↑'} 
                                          {Math.abs(emp.metricsHistory[emp.metricsHistory.length - 1].cholesterol! - emp.metricsHistory[emp.metricsHistory.length - 2].cholesterol!).toFixed(1)}
                                        </p>
                                      )}
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded">
                                      <p className="text-xs text-slate-600 mb-1">Измерений</p>
                                      <p className="font-semibold">{emp.metricsHistory.length}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedInspectionEmployee(emp.id);
                                    setSelectedEmployee(emp);
                                    setIsMedicalCardDialogOpen(true);
                                  }}
                                >
                                  <Icon name="Eye" size={14} className="mr-1" />
                                  Карта
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedInspectionEmployee(emp.id);
                                  }}
                                >
                                  <Icon name="FileText" size={14} className="mr-1" />
                                  План
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Dialog open={isInspectionDialogOpen} onOpenChange={setIsInspectionDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Создать осмотр</DialogTitle>
                  <DialogDescription>Выберите сотрудника и заполните данные осмотра</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Выберите сотрудника</Label>
                    <Select 
                      value={selectedInspectionEmployee?.toString() || ''} 
                      onValueChange={(value) => setSelectedInspectionEmployee(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите сотрудника" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.id.toString()}>
                            {emp.name} - {emp.department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedInspectionEmployee && (() => {
                    const emp = employees.find(e => e.id === selectedInspectionEmployee);
                    return emp ? (
                      <div className="space-y-4 border-t pt-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-2">Данные из медицинской карты</h5>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <p><strong>ФИО:</strong> {emp.name}</p>
                            <p><strong>Возраст:</strong> {emp.age} лет</p>
                            <p><strong>Должность:</strong> {emp.position}</p>
                            <p><strong>Подразделение:</strong> {emp.department}</p>
                            <p><strong>Группа здоровья:</strong> {emp.healthGroup}</p>
                            <p><strong>Последний осмотр:</strong> {emp.lastExam}</p>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-2">Текущие показатели</h5>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <p><strong>ИМТ:</strong> {emp.bmi || 'Н/Д'}</p>
                            <p><strong>АД:</strong> {emp.bloodPressure || 'Н/Д'}</p>
                            <p><strong>Глюкоза:</strong> {emp.glucose ? `${emp.glucose} ммоль/л` : 'Н/Д'}</p>
                            <p><strong>Холестерин:</strong> {emp.cholesterol ? `${emp.cholesterol} ммоль/л` : 'Н/Д'}</p>
                          </div>
                        </div>

                        {emp.metricsHistory && emp.metricsHistory.length > 0 && (
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold mb-2">История показателей</h5>
                            <div className="space-y-2">
                              {emp.metricsHistory.slice(-3).map((metric, idx) => (
                                <div key={idx} className="text-sm flex justify-between items-center">
                                  <span className="font-medium">{metric.date}</span>
                                  <div className="flex gap-4 text-xs">
                                    <span>ИМТ: {metric.bmi || 'Н/Д'}</span>
                                    <span>АД: {metric.bloodPressure || 'Н/Д'}</span>
                                    <span>Глюкоза: {metric.glucose || 'Н/Д'}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Тип осмотра</Label>
                            <Select defaultValue={inspectionType}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="preliminary">Предварительный</SelectItem>
                                <SelectItem value="periodic">Периодический</SelectItem>
                                <SelectItem value="indepth">Углубленный</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Дата осмотра</Label>
                            <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Заключение врача</Label>
                          <Textarea placeholder="Введите заключение..." rows={3} />
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1">Сохранить осмотр</Button>
                          <Button variant="outline" onClick={() => setIsInspectionDialogOpen(false)}>Отмена</Button>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="calculators">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Медицинские калькуляторы и шкалы оценки рисков</CardTitle>
                  <CardDescription>Расчет индексов и оценка сердечно-сосудистых рисков</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedCalculator} onValueChange={setSelectedCalculator}>
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-1">
                      <TabsTrigger value="findrisc" className="text-xs">FINDRISC</TabsTrigger>
                      <TabsTrigger value="fogoros" className="text-xs">Fogoros</TabsTrigger>
                      <TabsTrigger value="ryan" className="text-xs">Ryan</TabsTrigger>
                      <TabsTrigger value="cha2ds2" className="text-xs">CHA₂DS₂</TabsTrigger>
                      <TabsTrigger value="hasbled" className="text-xs">HAS-BLED</TabsTrigger>
                      <TabsTrigger value="score" className="text-xs">SCORE</TabsTrigger>
                      <TabsTrigger value="bmi" className="text-xs">ИМТ</TabsTrigger>
                    </TabsList>

                    <TabsContent value="findrisc" className="space-y-4 mt-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Шкала FINDRISC</h4>
                        <p className="text-sm text-blue-800">
                          Финская шкала оценки риска развития сахарного диабета 2 типа в течение 10 лет
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Выберите сотрудника</Label>
                        <Select
                          value={selectedCalculatorEmployee?.toString() || ''}
                          onValueChange={(value) => setSelectedCalculatorEmployee(parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите сотрудника" />
                          </SelectTrigger>
                          <SelectContent>
                            {employees.map(emp => (
                              <SelectItem key={emp.id} value={emp.id.toString()}>
                                {emp.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedCalculatorEmployee && (
                        <div className="space-y-4 border-t pt-4">
                          <div className="space-y-2">
                            <Label>1. Возраст</Label>
                            <Select defaultValue="35-44">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<45">Менее 45 лет (0 баллов)</SelectItem>
                                <SelectItem value="45-54">45-54 года (2 балла)</SelectItem>
                                <SelectItem value="55-64">55-64 года (3 балла)</SelectItem>
                                <SelectItem value=">64">Более 64 лет (4 балла)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>2. Индекс массы тела (ИМТ)</Label>
                            <Select defaultValue="25-30">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<25">Менее 25 кг/м² (0 баллов)</SelectItem>
                                <SelectItem value="25-30">25-30 кг/м² (1 балл)</SelectItem>
                                <SelectItem value=">30">Более 30 кг/м² (3 балла)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>3. Окружность талии</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m-<94">М: &lt;94 см (0 баллов)</SelectItem>
                                <SelectItem value="m-94-102">М: 94-102 см (3 балла)</SelectItem>
                                <SelectItem value="m->102">М: &gt;102 см (4 балла)</SelectItem>
                                <SelectItem value="f-<80">Ж: &lt;80 см (0 баллов)</SelectItem>
                                <SelectItem value="f-80-88">Ж: 80-88 см (3 балла)</SelectItem>
                                <SelectItem value="f->88">Ж: &gt;88 см (4 балла)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>4. Физическая активность (30 мин/день)</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Да (0 баллов)</SelectItem>
                                <SelectItem value="no">Нет (2 балла)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>5. Употребление овощей и фруктов</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Каждый день (0 баллов)</SelectItem>
                                <SelectItem value="no">Не каждый день (1 балл)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button className="w-full">Рассчитать риск</Button>

                          <div className="bg-green-50 p-4 rounded-lg mt-4">
                            <h4 className="font-semibold text-green-900 mb-2">Результат: Низкий риск</h4>
                            <p className="text-sm text-green-800 mb-3">
                              Сумма баллов: 5
                              <br />
                              Риск развития диабета: 1% (1 из 100)
                            </p>
                            <p className="text-xs text-green-700">
                              Рекомендация: Поддерживайте здоровый образ жизни
                            </p>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="fogoros" className="space-y-4 mt-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">Шкала R. Fogoros</h4>
                        <p className="text-sm text-red-800">
                          Оценка риска внезапной сердечной смерти
                        </p>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <Label>Выбор сотрудника/отдела</Label>
                        <div className="flex gap-2">
                          <Select value={selectedDepartmentForCalc} onValueChange={setSelectedDepartmentForCalc}>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Все отделы</SelectItem>
                              {departments.map(dept => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Select value={selectedCalculatorEmployee?.toString() || ''} onValueChange={(value) => setSelectedCalculatorEmployee(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сотрудника" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.filter(e => selectedDepartmentForCalc === 'all' || e.department === selectedDepartmentForCalc).map(emp => (
                            <SelectItem key={emp.id} value={emp.id.toString()}>
                              {emp.name} - {emp.position}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedCalculatorEmployee && (() => {
                        const emp = employees.find(e => e.id === selectedCalculatorEmployee);
                        return emp ? (
                          <div className="space-y-4 border-t pt-4">
                            <div className="bg-slate-50 p-3 rounded-lg text-sm">
                              <strong>{emp.name}</strong> - {emp.age} лет, ИМТ: {emp.bmi}, АД: {emp.bloodPressure}
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-white border rounded">
                                <span className="text-sm">Фракция выброса &lt;35%</span>
                                <Select defaultValue="no">
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="yes">Да (+3)</SelectItem>
                                    <SelectItem value="no">Нет (0)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="flex items-center justify-between p-3 bg-white border rounded">
                                <span className="text-sm">Желудочковая тахикардия</span>
                                <Select defaultValue="no">
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="yes">Да (+2)</SelectItem>
                                    <SelectItem value="no">Нет (0)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="flex items-center justify-between p-3 bg-white border rounded">
                                <span className="text-sm">Синкопальные состояния</span>
                                <Select defaultValue="no">
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="yes">Да (+1)</SelectItem>
                                    <SelectItem value="no">Нет (0)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <Button className="w-full">Рассчитать риск</Button>

                            <div className="bg-green-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-green-900 mb-2">Результат: Низкий риск</h5>
                              <p className="text-sm text-green-800 mb-2">Сумма баллов: 0 — риск &lt;5% в год</p>
                              <div className="mt-3 p-3 bg-white rounded border">
                                <Label className="text-xs font-semibold mb-2 block">Рекомендации (редактируемые)</Label>
                                <Textarea 
                                  value={recommendations} 
                                  onChange={(e) => setRecommendations(e.target.value)}
                                  rows={3}
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </TabsContent>

                    <TabsContent value="ryan" className="space-y-4 mt-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Шкала M. Ryan (модификация W. McKenna)</h4>
                        <p className="text-sm text-purple-800">Оценка риска при желудочковой экстрасистолии</p>
                      </div>

                      <Select value={selectedCalculatorEmployee?.toString() || ''} onValueChange={(value) => setSelectedCalculatorEmployee(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сотрудника" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map(emp => (
                            <SelectItem key={emp.id} value={emp.id.toString()}>
                              {emp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedCalculatorEmployee && (
                        <div className="space-y-4 border-t pt-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white border rounded">
                              <span className="text-sm">Частота экстрасистол &gt;10/час</span>
                              <Select>
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue placeholder="Выбор" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="yes">Да (+2)</SelectItem>
                                  <SelectItem value="no">Нет (0)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-white border rounded">
                              <span className="text-sm">Полиморфные экстрасистолы</span>
                              <Select>
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue placeholder="Выбор" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="yes">Да (+1)</SelectItem>
                                  <SelectItem value="no">Нет (0)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <Button className="w-full">Рассчитать</Button>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-900 mb-2">Низкий риск</h5>
                            <div className="mt-3 p-3 bg-white rounded border">
                              <Label className="text-xs font-semibold mb-2 block">Рекомендации</Label>
                              <Textarea 
                                value={recommendations} 
                                onChange={(e) => setRecommendations(e.target.value)}
                                rows={3}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="cha2ds2" className="space-y-4 mt-4">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-2">Шкала CHA₂DS₂-VASc</h4>
                        <p className="text-sm text-orange-800">Риск тромбоэмболических осложнений при фибрилляции предсердий</p>
                      </div>

                      <Select value={selectedCalculatorEmployee?.toString() || ''} onValueChange={(value) => setSelectedCalculatorEmployee(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сотрудника" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map(emp => (
                            <SelectItem key={emp.id} value={emp.id.toString()}>
                              {emp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedCalculatorEmployee && (
                        <div className="space-y-4 border-t pt-4">
                          <div className="space-y-2">
                            {[
                              'Сердечная недостаточность (+1)',
                              'Гипертония (+1)',
                              'Возраст ≥75 лет (+2)',
                              'Диабет (+1)',
                              'Инсульт/ТИА (+2)',
                              'Сосудистые заболевания (+1)',
                              'Возраст 65-74 (+1)',
                              'Женский пол (+1)'
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-white border rounded text-sm">
                                <span>{item}</span>
                                <input type="checkbox" className="w-5 h-5" />
                              </div>
                            ))}
                          </div>

                          <Button className="w-full">Рассчитать риск</Button>

                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-900 mb-2">Низкий риск (0 баллов)</h5>
                            <p className="text-sm text-green-800 mb-2">Риск инсульта: 0% в год</p>
                            <div className="mt-3 p-3 bg-white rounded border">
                              <Label className="text-xs font-semibold mb-2 block">Рекомендации</Label>
                              <Textarea 
                                value="Антикоагулянтная терапия не требуется. Контроль факторов риска." 
                                onChange={(e) => setRecommendations(e.target.value)}
                                rows={3}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="hasbled" className="space-y-4 mt-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">Шкала HAS-BLED</h4>
                        <p className="text-sm text-red-800">Риск кровотечений при фибрилляции предсердий</p>
                      </div>

                      <Select value={selectedCalculatorEmployee?.toString() || ''} onValueChange={(value) => setSelectedCalculatorEmployee(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сотрудника" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map(emp => (
                            <SelectItem key={emp.id} value={emp.id.toString()}>
                              {emp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedCalculatorEmployee && (
                        <div className="space-y-4 border-t pt-4">
                          <div className="space-y-2">
                            {[
                              'Гипертония (+1)',
                              'Нарушение функции почек/печени (+1 или +2)',
                              'Инсульт (+1)',
                              'Кровотечения в анамнезе (+1)',
                              'Лабильное МНО (+1)',
                              'Возраст >65 лет (+1)',
                              'Препараты/алкоголь (+1 или +2)'
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-white border rounded text-sm">
                                <span>{item}</span>
                                <input type="checkbox" className="w-5 h-5" />
                              </div>
                            ))}
                          </div>

                          <Button className="w-full">Рассчитать риск</Button>

                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-900 mb-2">Низкий риск (0-2 балла)</h5>
                            <p className="text-sm text-green-800 mb-2">Риск больших кровотечений &lt;2% в год</p>
                            <div className="mt-3 p-3 bg-white rounded border">
                              <Label className="text-xs font-semibold mb-2 block">Рекомендации</Label>
                              <Textarea 
                                value="Антикоагулянтная терапия безопасна. Контроль МНО." 
                                onChange={(e) => setRecommendations(e.target.value)}
                                rows={3}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="score" className="space-y-4 mt-4">
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-indigo-900 mb-2">Шкала SCORE / SCORE-2</h4>
                        <p className="text-sm text-indigo-800">Оценка 10-летнего риска фатальных сердечно-сосудистых событий</p>
                      </div>

                      <div className="flex gap-2 mb-4">
                        <Select value={selectedDepartmentForCalc} onValueChange={setSelectedDepartmentForCalc}>
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все отделы</SelectItem>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="outline">
                          <Icon name="Users" size={16} className="mr-2" />
                          Расчет по отделу
                        </Button>
                      </div>

                      <Select value={selectedCalculatorEmployee?.toString() || ''} onValueChange={(value) => setSelectedCalculatorEmployee(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сотрудника" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.filter(e => selectedDepartmentForCalc === 'all' || e.department === selectedDepartmentForCalc).map(emp => (
                            <SelectItem key={emp.id} value={emp.id.toString()}>
                              {emp.name} - {emp.age} лет
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedCalculatorEmployee && (() => {
                        const emp = employees.find(e => e.id === selectedCalculatorEmployee);
                        return emp ? (
                          <div className="space-y-4 border-t pt-4">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <h5 className="font-semibold mb-2">Данные пациента</h5>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <p><strong>Возраст:</strong> {emp.age} лет</p>
                                <p><strong>Пол:</strong> Мужской</p>
                                <p><strong>АД:</strong> {emp.bloodPressure}</p>
                                <p><strong>Холестерин:</strong> {emp.cholesterol} ммоль/л</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label>Курение</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="no">Не курит</SelectItem>
                                    <SelectItem value="yes">Курит</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label>Общий холестерин (ммоль/л)</Label>
                                <Input type="number" defaultValue={emp.cholesterol} step="0.1" />
                              </div>

                              <div className="space-y-2">
                                <Label>Систолическое АД (мм рт.ст.)</Label>
                                <Input type="number" defaultValue={emp.bloodPressure?.split('/')[0]} />
                              </div>
                            </div>

                            <Button className="w-full">Рассчитать SCORE</Button>

                            <div className="bg-yellow-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-yellow-900 mb-2">Умеренный риск (1-5%)</h5>
                              <p className="text-sm text-yellow-800 mb-3">10-летний риск фатальных ССЗ: 3%</p>
                              <div className="mt-3 p-3 bg-white rounded border">
                                <Label className="text-xs font-semibold mb-2 block">Рекомендации для сотрудника</Label>
                                <Textarea 
                                  value="Рекомендуется: отказ от курения, контроль АД, снижение холестерина диетой, регулярная физическая активность 150 мин/неделю, контроль веса." 
                                  onChange={(e) => setRecommendations(e.target.value)}
                                  rows={4}
                                  className="text-sm"
                                />
                                <Button size="sm" className="mt-2 w-full" variant="outline">
                                  <Icon name="Save" size={14} className="mr-2" />
                                  Сохранить рекомендации
                                </Button>
                              </div>
                            </div>

                            {selectedDepartmentForCalc !== 'all' && (
                              <div className="bg-slate-50 p-4 rounded-lg">
                                <h5 className="font-semibold mb-3">Статистика по отделу: {selectedDepartmentForCalc}</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Низкий риск (&lt;1%)</span>
                                    <span className="font-semibold text-green-600">45%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Умеренный риск (1-5%)</span>
                                    <span className="font-semibold text-yellow-600">40%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Высокий риск (&gt;5%)</span>
                                    <span className="font-semibold text-red-600">15%</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : null;
                      })()}
                    </TabsContent>

                    <TabsContent value="bmi" className="space-y-4 mt-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Калькулятор ИМТ</h4>
                        <p className="text-sm text-blue-800">Индекс массы тела (ИМТ) = вес (кг) / рост² (м)</p>
                      </div>

                      <Select value={selectedCalculatorEmployee?.toString() || ''} onValueChange={(value) => setSelectedCalculatorEmployee(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сотрудника или введите вручную" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map(emp => (
                            <SelectItem key={emp.id} value={emp.id.toString()}>
                              {emp.name} - ИМТ: {emp.bmi || 'Н/Д'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Вес (кг)</Label>
                          <Input type="number" placeholder="70" />
                        </div>
                        <div className="space-y-2">
                          <Label>Рост (см)</Label>
                          <Input type="number" placeholder="175" />
                        </div>
                      </div>

                      <Button className="w-full">Рассчитать ИМТ</Button>

                      <div className="space-y-3 pt-4 border-t">
                        <h4 className="font-semibold">Интерпретация:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between p-2 bg-blue-50 rounded">
                            <span>&lt;18.5</span>
                            <span className="font-medium">Недостаточная масса</span>
                          </div>
                          <div className="flex justify-between p-2 bg-green-50 rounded">
                            <span>18.5 - 24.9</span>
                            <span className="font-medium">Нормальная масса</span>
                          </div>
                          <div className="flex justify-between p-2 bg-yellow-50 rounded">
                            <span>25.0 - 29.9</span>
                            <span className="font-medium">Избыточная масса</span>
                          </div>
                          <div className="flex justify-between p-2 bg-orange-50 rounded">
                            <span>30.0 - 34.9</span>
                            <span className="font-medium">Ожирение I степени</span>
                          </div>
                          <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>≥35.0</span>
                            <span className="font-medium">Ожирение II-III степени</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-2xl">Паспорт здоровья предприятия</CardTitle>
                  <CardDescription>Общие показатели за 2024 год</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Всего сотрудников</span>
                        <Icon name="Users" size={20} className="text-blue-500" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">{employees.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Средний возраст</span>
                        <Icon name="Calendar" size={20} className="text-purple-500" />
                      </div>
                      <p className="text-3xl font-bold text-purple-600">
                        {Math.round(employees.reduce((sum, e) => sum + e.age, 0) / employees.length)} лет
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Средний ИМТ</span>
                        <Icon name="Activity" size={20} className="text-green-500" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">
                        {(employees.filter(e => e.bmi).reduce((sum, e) => sum + (e.bmi || 0), 0) / employees.filter(e => e.bmi).length).toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Допущено к работе</span>
                        <Icon name="CheckCircle" size={20} className="text-yellow-500" />
                      </div>
                      <p className="text-3xl font-bold text-yellow-600">
                        {Math.round((employees.filter(e => e.status === 'Допущен').length / employees.length) * 100)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Распределение по группам здоровья</CardTitle>
                    <CardDescription>Актуальные данные</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map(group => {
                        const count = employees.filter(e => e.healthGroup === group).length;
                        const percentage = (count / employees.length) * 100;
                        const color = group === 1 ? 'bg-green-500' : group === 2 ? 'bg-yellow-500' : 'bg-red-500';
                        return (
                          <div key={group}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Группа {group}</span>
                              <span className="text-sm text-slate-600">{count} чел ({percentage.toFixed(0)}%)</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3">
                              <div className={`${color} h-3 rounded-full transition-all`} style={{width: `${percentage}%`}}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">Интерпретация</h5>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p>• Группа I — практически здоровые</p>
                        <p>• Группа II — с функциональными нарушениями</p>
                        <p>• Группа III — с хроническими заболеваниями</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Индекс здоровья по отделам</CardTitle>
                    <CardDescription>Процент здоровых работников</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departments.map(dept => {
                        const deptEmployees = employees.filter(e => e.department === dept);
                        const healthyCount = deptEmployees.filter(e => e.healthGroup === 1).length;
                        const healthIndex = (healthyCount / deptEmployees.length) * 100;
                        
                        return (
                          <div key={dept} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium truncate max-w-[200px]">{dept}</span>
                              <span className={`text-sm font-bold ${healthIndex >= 70 ? 'text-green-600' : healthIndex >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {healthIndex.toFixed(0)}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all ${healthIndex >= 70 ? 'bg-green-500' : healthIndex >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{width: `${healthIndex}%`}}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-semibold mb-2">Средний индекс</h5>
                      <p className="text-3xl font-bold text-blue-600">
                        {Math.round((employees.filter(e => e.healthGroup === 1).length / employees.length) * 100)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Выполнение профилактических мероприятий</CardTitle>
                  <CardDescription>План на 2024 год</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Периодические медосмотры', planned: 20, completed: 20, unit: 'чел' },
                      { name: 'Вакцинация от гриппа', planned: 15, completed: 12, unit: 'чел' },
                      { name: 'Лекции по ЗОЖ', planned: 4, completed: 3, unit: 'шт' },
                      { name: 'Диспансеризация', planned: 20, completed: 18, unit: 'чел' },
                      { name: 'Контроль АД (группа риска)', planned: 10, completed: 10, unit: 'чел' },
                      { name: 'Психологические консультации', planned: 8, completed: 5, unit: 'чел' }
                    ].map((item, idx) => {
                      const percentage = (item.completed / item.planned) * 100;
                      return (
                        <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h5 className="font-semibold mb-1">{item.name}</h5>
                              <p className="text-sm text-slate-600">
                                Выполнено: {item.completed} из {item.planned} {item.unit}
                              </p>
                            </div>
                            <Badge className={percentage >= 100 ? 'bg-green-100 text-green-800' : percentage >= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                              {percentage.toFixed(0)}%
                            </Badge>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all ${percentage >= 100 ? 'bg-green-500' : percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{width: `${Math.min(percentage, 100)}%`}}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-green-900 mb-1">Общий прогресс</h5>
                        <p className="text-sm text-green-700">Среднее выполнение плановых мероприятий</p>
                      </div>
                      <p className="text-4xl font-bold text-green-600">85%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Отчеты и документы</CardTitle>
                  <CardDescription>Доступные отчеты по различным направлениям</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { id: 'inspections', title: 'Отчет по профосмотрам', subtitle: 'IV квартал 2024', icon: 'FileText', color: 'blue' },
                      { id: 'healthgroups', title: 'Анализ групп здоровья', subtitle: 'Динамика за год', icon: 'Heart', color: 'green' },
                      { id: 'prevention', title: 'Профилактические мероприятия', subtitle: 'План-факт анализ', icon: 'Activity', color: 'purple' },
                      { id: 'diseases', title: 'Заболеваемость', subtitle: 'По подразделениям', icon: 'AlertCircle', color: 'red' },
                      { id: 'risks', title: 'Факторы риска', subtitle: 'Оценка ССЗ', icon: 'TrendingUp', color: 'orange' },
                      { id: 'summary', title: 'Сводный отчет', subtitle: 'Паспорт здоровья', icon: 'FileCheck', color: 'indigo' }
                    ].map(report => (
                      <Button 
                        key={report.id}
                        variant="outline" 
                        className="w-full justify-start h-auto py-4 hover:border-blue-500 hover:bg-blue-50"
                        onClick={() => {
                          setSelectedReport(report.id);
                          setIsReportDialogOpen(true);
                        }}
                      >
                        <div className={
                          report.color === 'blue' ? 'w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3' :
                          report.color === 'green' ? 'w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3' :
                          report.color === 'purple' ? 'w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3' :
                          report.color === 'red' ? 'w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3' :
                          report.color === 'orange' ? 'w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mr-3' :
                          'w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3'
                        }>
                          <Icon 
                            name={report.icon as any} 
                            className={
                              report.color === 'blue' ? 'text-blue-600' :
                              report.color === 'green' ? 'text-green-600' :
                              report.color === 'purple' ? 'text-purple-600' :
                              report.color === 'red' ? 'text-red-600' :
                              report.color === 'orange' ? 'text-orange-600' :
                              'text-indigo-600'
                            }
                            size={20} 
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{report.title}</p>
                          <p className="text-xs text-slate-500">{report.subtitle}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Показатели здоровья в динамике</CardTitle>
                  <CardDescription>Изменение за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Icon name="TrendingDown" size={18} className="text-green-600" />
                        Положительная динамика
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                          <span>Группа здоровья I</span>
                          <span className="font-semibold text-green-600">+5%</span>
                        </div>
                        <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                          <span>Средний ИМТ</span>
                          <span className="font-semibold text-green-600">-0.3</span>
                        </div>
                        <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                          <span>Нормальное АД</span>
                          <span className="font-semibold text-green-600">+8%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Icon name="TrendingUp" size={18} className="text-red-600" />
                        Требует внимания
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-3 bg-red-50 rounded-lg">
                          <span>Повышенный холестерин</span>
                          <span className="font-semibold text-red-600">+2 чел</span>
                        </div>
                        <div className="flex justify-between p-3 bg-yellow-50 rounded-lg">
                          <span>Пропуски осмотров</span>
                          <span className="font-semibold text-yellow-600">3 чел</span>
                        </div>
                        <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                          <span>Отказы от вакцинации</span>
                          <span className="font-semibold text-orange-600">3 чел</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {selectedReport === 'inspections' && 'Отчет по профессиональным осмотрам'}
                    {selectedReport === 'healthgroups' && 'Анализ распределения по группам здоровья'}
                    {selectedReport === 'prevention' && 'Отчет по профилактическим мероприятиям'}
                    {selectedReport === 'diseases' && 'Анализ заболеваемости'}
                    {selectedReport === 'risks' && 'Оценка факторов риска ССЗ'}
                    {selectedReport === 'summary' && 'Сводный отчет - Паспорт здоровья'}
                  </DialogTitle>
                  <DialogDescription>За период: IV квартал 2024 года</DialogDescription>
                </DialogHeader>

                {selectedReport === 'inspections' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-slate-600 mb-1">Всего осмотров</p>
                          <p className="text-2xl font-bold text-blue-600">{employees.length}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-slate-600 mb-1">Периодических</p>
                          <p className="text-2xl font-bold text-green-600">{employees.length}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-slate-600 mb-1">Предварительных</p>
                          <p className="text-2xl font-bold text-purple-600">3</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Распределение по статусам допуска</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Допущены без ограничений</span>
                            <span className="font-bold text-green-600">{employees.filter(e => e.status === 'Допущен').length} чел</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Допущены с ограничениями</span>
                            <span className="font-bold text-yellow-600">{employees.filter(e => e.status.includes('ограничениями')).length} чел</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Направлены на доп. обследование</span>
                            <span className="font-bold text-red-600">{employees.filter(e => e.status.includes('обследование')).length} чел</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Icon name="Download" size={16} className="mr-2" />
                        Скачать PDF
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Экспорт в Excel
                      </Button>
                    </div>
                  </div>
                )}

                {selectedReport === 'healthgroups' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map(group => {
                        const count = employees.filter(e => e.healthGroup === group).length;
                        return (
                          <Card key={group}>
                            <CardContent className="p-4">
                              <p className="text-sm text-slate-600 mb-1">Группа {group}</p>
                              <p className="text-2xl font-bold">{count} чел</p>
                              <p className="text-xs text-slate-500 mt-1">{((count / employees.length) * 100).toFixed(0)}% от общего числа</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Динамика за 6 месяцев</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {['Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь'].map((month, idx) => {
                            const values = [
                              { g1: 55, g2: 30, g3: 15 },
                              { g1: 57, g2: 29, g3: 14 },
                              { g1: 58, g2: 28, g3: 14 },
                              { g1: 59, g2: 28, g3: 13 },
                              { g1: 60, g2: 28, g3: 12 },
                              { g1: 60, g2: 30, g3: 10 }
                            ];
                            return (
                              <div key={month} className="flex items-center gap-3">
                                <span className="text-sm w-20">{month}</span>
                                <div className="flex-1 flex h-8 rounded overflow-hidden">
                                  <div className="bg-green-500 flex items-center justify-center text-xs text-white font-semibold" style={{width: `${values[idx].g1}%`}}>
                                    {values[idx].g1}%
                                  </div>
                                  <div className="bg-yellow-500 flex items-center justify-center text-xs text-white font-semibold" style={{width: `${values[idx].g2}%`}}>
                                    {values[idx].g2}%
                                  </div>
                                  <div className="bg-red-500 flex items-center justify-center text-xs text-white font-semibold" style={{width: `${values[idx].g3}%`}}>
                                    {values[idx].g3}%
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Icon name="Download" size={16} className="mr-2" />
                        Скачать отчет
                      </Button>
                    </div>
                  </div>
                )}

                {selectedReport === 'prevention' && (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">План-факт выполнения мероприятий</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { name: 'Периодические осмотры', plan: 20, fact: 20 },
                            { name: 'Вакцинация', plan: 15, fact: 12 },
                            { name: 'Диспансеризация', plan: 20, fact: 18 },
                            { name: 'Лекции по ЗОЖ', plan: 4, fact: 3 }
                          ].map(item => (
                            <div key={item.name} className="p-3 bg-slate-50 rounded">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-sm text-slate-600">{item.fact}/{item.plan}</span>
                              </div>
                              <Progress value={(item.fact / item.plan) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Icon name="Download" size={16} className="mr-2" />
                        Скачать отчет
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;