import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Icon from '@/components/ui/icon';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Медицинская система предприятия</h1>
            <p className="text-gray-600">Мониторинг здоровья сотрудников и управление медосмотрами</p>
          </div>
          <Link to="/examinations">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Calendar" size={16} className="mr-2" />
              Календарь осмотров
            </Button>
          </Link>
        </div>

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
      </div>
    </div>
  );
};

export default Index;
