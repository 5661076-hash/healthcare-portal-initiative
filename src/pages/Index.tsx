import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const mockEmployees = [
  { id: 1, name: 'Иванов Иван Иванович', position: 'Токарь', healthGroup: 1, lastCheck: '2024-10-15', status: 'Допущен', riskLevel: 'low' },
  { id: 2, name: 'Петрова Мария Сергеевна', position: 'Сварщик', healthGroup: 2, lastCheck: '2024-09-20', status: 'Допущен', riskLevel: 'medium' },
  { id: 3, name: 'Сидоров Петр Алексеевич', position: 'Маляр', healthGroup: 3, lastCheck: '2024-08-12', status: 'Требуется осмотр', riskLevel: 'high' },
  { id: 4, name: 'Козлова Анна Дмитриевна', position: 'Монтажник', healthGroup: 1, lastCheck: '2024-11-01', status: 'Допущен', riskLevel: 'low' },
  { id: 5, name: 'Морозов Сергей Павлович', position: 'Электрик', healthGroup: 2, lastCheck: '2024-10-28', status: 'Допущен', riskLevel: 'medium' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCalculator, setSelectedCalculator] = useState('findrisc');

  const getHealthGroupColor = (group: number) => {
    if (group === 1) return 'bg-green-500';
    if (group === 2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskBadge = (level: string) => {
    if (level === 'low') return <Badge className="bg-green-500 text-white">Низкий</Badge>;
    if (level === 'medium') return <Badge className="bg-yellow-500 text-white">Средний</Badge>;
    return <Badge className="bg-red-500 text-white">Высокий</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Допущен') return <Badge variant="outline" className="border-green-500 text-green-700">Допущен</Badge>;
    return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Требуется осмотр</Badge>;
  };

  const renderFindrisc = () => {
    const [age, setAge] = useState('');
    const [bmi, setBmi] = useState('');
    const [waist, setWaist] = useState('');
    const [activity, setActivity] = useState('');
    const [vegetables, setVegetables] = useState('');
    const [medications, setMedications] = useState('');
    const [glucose, setGlucose] = useState('');
    const [family, setFamily] = useState('');
    const [score, setScore] = useState<number | null>(null);

    const calculateFindrisc = () => {
      let total = 0;
      
      const ageNum = parseInt(age);
      if (ageNum < 45) total += 0;
      else if (ageNum < 55) total += 2;
      else if (ageNum < 65) total += 3;
      else total += 4;

      const bmiNum = parseFloat(bmi);
      if (bmiNum < 25) total += 0;
      else if (bmiNum < 30) total += 1;
      else total += 3;

      const waistNum = parseInt(waist);
      if (waistNum < 94) total += 0;
      else if (waistNum < 102) total += 3;
      else total += 4;

      if (activity === 'yes') total += 0;
      else total += 2;

      if (vegetables === 'daily') total += 0;
      else total += 1;

      if (medications === 'yes') total += 2;
      if (glucose === 'yes') total += 5;

      if (family === 'yes') total += 5;
      else if (family === 'close') total += 3;

      setScore(total);
    };

    const getRiskLevel = (score: number) => {
      if (score < 7) return { level: 'Низкий', desc: 'Риск развития диабета 1%', color: 'text-green-600' };
      if (score < 12) return { level: 'Слегка повышенный', desc: 'Риск 4%', color: 'text-yellow-600' };
      if (score < 15) return { level: 'Умеренный', desc: 'Риск 17%', color: 'text-orange-600' };
      if (score < 20) return { level: 'Высокий', desc: 'Риск 33%', color: 'text-red-600' };
      return { level: 'Очень высокий', desc: 'Риск 50%', color: 'text-red-700' };
    };

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Возраст</Label>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Введите возраст" />
          </div>
          <div>
            <Label>ИМТ (кг/м²)</Label>
            <Input type="number" step="0.1" value={bmi} onChange={(e) => setBmi(e.target.value)} placeholder="Индекс массы тела" />
          </div>
          <div>
            <Label>Окружность талии (см)</Label>
            <Input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="Окружность талии" />
          </div>
          <div>
            <Label>Физическая активность &gt;30 мин/день</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Да</SelectItem>
                <SelectItem value="no">Нет</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Овощи и фрукты ежедневно</Label>
            <Select value={vegetables} onValueChange={setVegetables}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Да</SelectItem>
                <SelectItem value="no">Нет</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Принимали ли препараты от давления</Label>
            <Select value={medications} onValueChange={setMedications}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Да</SelectItem>
                <SelectItem value="no">Нет</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Повышенный уровень глюкозы в анализах</Label>
            <Select value={glucose} onValueChange={setGlucose}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Да</SelectItem>
                <SelectItem value="no">Нет</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Диабет у родственников</Label>
            <Select value={family} onValueChange={setFamily}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">Нет</SelectItem>
                <SelectItem value="close">Да, близкие родственники</SelectItem>
                <SelectItem value="yes">Да, родители/дети</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={calculateFindrisc} className="w-full">Рассчитать риск</Button>
        {score !== null && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Результат оценки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">Сумма баллов: {score}</p>
                <p className={`text-xl font-semibold ${getRiskLevel(score).color}`}>
                  {getRiskLevel(score).level}
                </p>
                <p className="text-muted-foreground">{getRiskLevel(score).desc}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderFogorosCalculator = () => {
    const [lvef, setLvef] = useState('');
    const [nyha, setNyha] = useState('');
    const [vt, setVt] = useState('');
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
      const lvefNum = parseInt(lvef);
      let risk = 'Низкий';
      
      if (lvefNum < 30) risk = 'Высокий';
      else if (lvefNum < 40) risk = 'Средний';
      
      if (nyha === '3' || nyha === '4') risk = 'Высокий';
      if (vt === 'yes') risk = 'Высокий';
      
      setResult(risk);
    };

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Фракция выброса ЛЖ (%)</Label>
            <Input type="number" value={lvef} onChange={(e) => setLvef(e.target.value)} placeholder="LVEF" />
          </div>
          <div>
            <Label>Класс NYHA</Label>
            <Select value={nyha} onValueChange={setNyha}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите класс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">I класс</SelectItem>
                <SelectItem value="2">II класс</SelectItem>
                <SelectItem value="3">III класс</SelectItem>
                <SelectItem value="4">IV класс</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Желудочковая тахикардия в анамнезе</Label>
            <Select value={vt} onValueChange={setVt}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Да</SelectItem>
                <SelectItem value="no">Нет</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={calculate} className="w-full">Рассчитать риск</Button>
        {result && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Оценка риска внезапной сердечной смерти</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-xl font-semibold ${result === 'Высокий' ? 'text-red-600' : result === 'Средний' ? 'text-yellow-600' : 'text-green-600'}`}>
                Риск: {result}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderCHA2DS2VASc = () => {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [chf, setChf] = useState(false);
    const [hypertension, setHypertension] = useState(false);
    const [stroke, setStroke] = useState(false);
    const [vascular, setVascular] = useState(false);
    const [diabetes, setDiabetes] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const calculate = () => {
      let total = 0;
      const ageNum = parseInt(age);
      
      if (ageNum >= 75) total += 2;
      else if (ageNum >= 65) total += 1;
      
      if (sex === 'female') total += 1;
      if (chf) total += 1;
      if (hypertension) total += 1;
      if (stroke) total += 2;
      if (vascular) total += 1;
      if (diabetes) total += 1;
      
      setScore(total);
    };

    const getRiskDescription = (score: number) => {
      if (score === 0) return 'Низкий риск';
      if (score === 1) return 'Средний риск';
      return 'Высокий риск';
    };

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Возраст</Label>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Введите возраст" />
          </div>
          <div>
            <Label>Пол</Label>
            <Select value={sex} onValueChange={setSex}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите пол" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Мужской</SelectItem>
                <SelectItem value="female">Женский</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={chf} onChange={(e) => setChf(e.target.checked)} className="w-4 h-4" />
            <Label>Хроническая сердечная недостаточность</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={hypertension} onChange={(e) => setHypertension(e.target.checked)} className="w-4 h-4" />
            <Label>Артериальная гипертензия</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={stroke} onChange={(e) => setStroke(e.target.checked)} className="w-4 h-4" />
            <Label>Инсульт/ТИА в анамнезе</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={vascular} onChange={(e) => setVascular(e.target.checked)} className="w-4 h-4" />
            <Label>Сосудистые заболевания</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={diabetes} onChange={(e) => setDiabetes(e.target.checked)} className="w-4 h-4" />
            <Label>Сахарный диабет</Label>
          </div>
        </div>
        <Button onClick={calculate} className="w-full">Рассчитать риск</Button>
        {score !== null && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Результат по шкале CHA₂DS₂-VASc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">Баллов: {score}</p>
                <p className={`text-xl font-semibold ${score >= 2 ? 'text-red-600' : score === 1 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {getRiskDescription(score)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

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
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Users" size={16} className="mr-2" />
              Сотрудники
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

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="hover-scale transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Всего сотрудников</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-slate-800">247</p>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="Users" className="text-blue-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Допущены к работе</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-green-600">231</p>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" className="text-green-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Требуется осмотр</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-yellow-600">16</p>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Icon name="AlertCircle" className="text-yellow-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Высокий риск</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-red-600">8</p>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon name="AlertTriangle" className="text-red-600" size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение по группам здоровья</CardTitle>
                  <CardDescription>Структура здоровья сотрудников</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm font-medium">I группа здоровья</span>
                      </div>
                      <span className="text-sm font-bold">145 чел (59%)</span>
                    </div>
                    <Progress value={59} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span className="text-sm font-medium">II группа здоровья</span>
                      </div>
                      <span className="text-sm font-bold">78 чел (32%)</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-sm font-medium">III группа здоровья</span>
                      </div>
                      <span className="text-sm font-bold">24 чел (9%)</span>
                    </div>
                    <Progress value={9} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Вредные производственные факторы</CardTitle>
                  <CardDescription>Воздействие на сотрудников</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Шум</span>
                      <span className="text-sm font-bold">89 чел</span>
                    </div>
                    <Progress value={36} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Вибрация</span>
                      <span className="text-sm font-bold">54 чел</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Химические вещества</span>
                      <span className="text-sm font-bold">67 чел</span>
                    </div>
                    <Progress value={27} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Физические нагрузки</span>
                      <span className="text-sm font-bold">102 чел</span>
                    </div>
                    <Progress value={41} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ближайшие медицинские осмотры</CardTitle>
                <CardDescription>Запланированные мероприятия</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Calendar" className="text-blue-600" size={20} />
                      <div>
                        <p className="font-medium text-sm">Цех №3 - Плановый осмотр</p>
                        <p className="text-xs text-slate-500">18 ноября 2024, 09:00</p>
                      </div>
                    </div>
                    <Badge variant="outline">32 чел</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Calendar" className="text-blue-600" size={20} />
                      <div>
                        <p className="font-medium text-sm">Цех №1 - Периодический</p>
                        <p className="text-xs text-slate-500">22 ноября 2024, 10:00</p>
                      </div>
                    </div>
                    <Badge variant="outline">45 чел</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Реестр сотрудников</CardTitle>
                <CardDescription>Полная база сотрудников с показателями здоровья</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col md:flex-row gap-3">
                  <Input placeholder="Поиск по ФИО или должности..." className="flex-1" />
                  <Select>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Группа здоровья" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все группы</SelectItem>
                      <SelectItem value="1">I группа</SelectItem>
                      <SelectItem value="2">II группа</SelectItem>
                      <SelectItem value="3">III группа</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="cleared">Допущен</SelectItem>
                      <SelectItem value="pending">Требуется осмотр</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">ФИО</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Должность</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Группа</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Последний осмотр</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Риск</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Статус</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {mockEmployees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">{employee.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{employee.position}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${getHealthGroupColor(employee.healthGroup)}`}></div>
                              <span className="text-sm">{employee.healthGroup}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">{employee.lastCheck}</td>
                          <td className="px-4 py-3">{getRiskBadge(employee.riskLevel)}</td>
                          <td className="px-4 py-3">{getStatusBadge(employee.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Калькуляторы медицинских рисков</CardTitle>
                <CardDescription>Инструменты оценки состояния здоровья</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedCalculator} onValueChange={setSelectedCalculator}>
                  <SelectTrigger className="mb-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="findrisc">Риск диабета (FINDRISC)</SelectItem>
                    <SelectItem value="fogoros">Риск внезапной сердечной смерти (Fogoros)</SelectItem>
                    <SelectItem value="cha2ds2vasc">Риск тромбоэмболии (CHA₂DS₂-VASc)</SelectItem>
                  </SelectContent>
                </Select>

                {selectedCalculator === 'findrisc' && renderFindrisc()}
                {selectedCalculator === 'fogoros' && renderFogorosCalculator()}
                {selectedCalculator === 'cha2ds2vasc' && renderCHA2DS2VASc()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Динамика осмотров</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Январь</span>
                      <span className="font-bold">45</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Февраль</span>
                      <span className="font-bold">38</span>
                    </div>
                    <Progress value={63} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Март</span>
                      <span className="font-bold">52</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Профилактика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Вакцинация</span>
                      <Badge className="bg-green-500">89%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Диспансеризация</span>
                      <Badge className="bg-blue-500">76%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Обучение</span>
                      <Badge className="bg-yellow-500">92%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Заболеваемость</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">ОРВИ</span>
                      <span className="font-bold">12 случаев</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Травмы</span>
                      <span className="font-bold">3 случая</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">ССЗ</span>
                      <span className="font-bold">5 случаев</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Отчеты и статистика</CardTitle>
                <CardDescription>Сформированные отчеты за период</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="FileText" className="mr-2" size={18} />
                    Отчет по профосмотрам за квартал
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="FileText" className="mr-2" size={18} />
                    Анализ заболеваемости по цехам
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="FileText" className="mr-2" size={18} />
                    Статистика вредных факторов
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
