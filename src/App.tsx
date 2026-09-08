import { useState } from 'react';

interface StageInfo {
  id: string;
  title: string;
  emoji: string;
  description: string;
  facts: string[];
  color: string;
}

const stagesData: StageInfo[] = [
  {
    id: 'evaporation',
    title: 'Испарение',
    emoji: '💨',
    description: 'Солнце нагревает воду в океанах, реках и озёрах. Вода превращается в пар и поднимается вверх в атмосферу.',
    facts: [
      'Каждый год с поверхности Земли испаряется около 505 000 км³ воды!',
      'Океаны — главный источник испарения: с их поверхности уходит 86% всей испаряемой воды.',
      'При испарении вода очищается — соли и минералы остаются внизу.',
      'Скорость испарения зависит от температуры, ветра и влажности воздуха.'
    ],
    color: 'from-orange-400 to-yellow-300'
  },
  {
    id: 'condensation',
    title: 'Конденсация',
    emoji: '☁️',
    description: 'Водяной пар поднимается высоко в небо, где становится холоднее. Пар охлаждается и превращается в крошечные капельки воды — так рождаются облака.',
    facts: [
      'Облако может весить более 500 тонн! Но оно не падает, потому что капли очень маленькие.',
      'Одна капля дождя содержит около миллиона крошечных облачных капель.',
      'Высота облаков может достигать 18 километров!',
      'Разные типы облаков предсказывают разную погоду: кучевые — хорошую, перистые — изменения.'
    ],
    color: 'from-blue-300 to-gray-300'
  },
  {
    id: 'precipitation',
    title: 'Осадки',
    emoji: '🌧️',
    description: 'Когда капли в облаке становятся слишком тяжёлыми, они падают на землю в виде дождя, снега, града или мокрого снега.',
    facts: [
      'Самая длинная капля дождя была зафиксирована в Бразилии — 8,8 мм в диаметре!',
      'Снежинки всегда имеют 6 лучей — это из-за кристаллической структуры льда.',
      'В среднем на Землю выпадает 505 000 км³ осадков в год.',
      'Град может падать со скоростью до 160 км/ч!'
    ],
    color: 'from-blue-500 to-blue-300'
  },
  {
    id: 'collection',
    title: 'Сбор воды',
    emoji: '🌊',
    description: 'Вода собирается в океанах, реках, озёрах и под землёй. Большая часть воды на Земле — солёная (в океанах), а пресной — всего 3%.',
    facts: [
      '97% воды на Земле — солёная (в океанах). Только 3% — пресная.',
      'Из пресной воды 69% заморожено в ледниках и айсбергах.',
      'Мировой океан занимает 71% поверхности Земли.',
      'Самое глубокое место в океане — Марианская впадина (11 034 метра).'
    ],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'infiltration',
    title: 'Инфильтрация',
    emoji: '⬇️',
    description: 'Часть воды просачивается в почву и уходит глубоко под землю, пополняя подземные водоносные горизонты — огромные подземные «озёра».',
    facts: [
      'Подземные воды — крупнейший запас пресной воды на Земле (30% всей пресной воды).',
      'Вода может просачиваться через почву со скоростью от 1 до 100 см в день.',
      'Некоторые подземные воды могут быть возрастом тысячи лет!',
      'Корни растений помогают воде проникать глубже в почву.'
    ],
    color: 'from-amber-600 to-yellow-700'
  },
  {
    id: 'transpiration',
    title: 'Транспирация',
    emoji: '🌿',
    description: 'Растения «пьют» воду корнями из почвы и «выдыхают» водяной пар через листья. Это как испарение, но через живые организмы!',
    facts: [
      'Одно большое дерево может «выпарить» до 400 литров воды в день!',
      '90% воды, которую поглощает растение, уходит на транспирацию.',
      'Леса Амазонки создают «летающие реки» — огромные потоки водяного пара.',
      'Транспирация помогает охлаждать растения, как пот охлаждает людей.'
    ],
    color: 'from-green-400 to-emerald-500'
  }
];

function WaterCycleScene({ onStageClick, activeStage }: { onStageClick: (id: string) => void; activeStage: string | null }) {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl border-4 border-sky-200">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100" />
      
      {/* Sun */}
      <div 
        className="absolute top-6 right-8 md:right-16 cursor-pointer group"
        onClick={() => onStageClick('evaporation')}
      >
        <div className={`relative ${activeStage === 'evaporation' ? 'scale-110' : ''} transition-transform duration-300`}>
          <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/50 animate-pulse-custom flex items-center justify-center">
            <div className="absolute inset-0 animate-sun-rays">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-8 bg-yellow-400 rounded-full origin-bottom"
                  style={{ transform: `translate(-50%, -100%) rotate(${i * 45}deg) translateY(-45px)` }}
                />
              ))}
            </div>
            <span className="text-3xl md:text-4xl relative z-10">☀️</span>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-orange-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Испарение
          </div>
        </div>
      </div>

      {/* Clouds */}
      <div 
        className="absolute top-12 left-16 md:left-32 cursor-pointer group"
        onClick={() => onStageClick('condensation')}
      >
        <div className={`relative animate-float-slow ${activeStage === 'condensation' ? 'scale-110' : ''} transition-transform duration-300`}>
          <div className="flex items-end">
            <div className="w-16 h-10 bg-white rounded-full shadow-md" />
            <div className="w-20 h-14 bg-white rounded-full shadow-md -ml-6 -mt-4" />
            <div className="w-14 h-10 bg-white rounded-full shadow-md -ml-5" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-blue-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Конденсация
          </div>
        </div>
      </div>

      {/* Second cloud */}
      <div className="absolute top-20 left-[55%] md:left-[45%] animate-float-slow" style={{ animationDelay: '2s' }}>
        <div className="flex items-end opacity-80">
          <div className="w-12 h-8 bg-gray-100 rounded-full shadow-sm" />
          <div className="w-16 h-11 bg-gray-100 rounded-full shadow-sm -ml-4 -mt-3" />
          <div className="w-10 h-8 bg-gray-100 rounded-full shadow-sm -ml-3" />
        </div>
      </div>

      {/* Rain drops */}
      <div className="absolute top-32 left-20 md:left-36">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-4 bg-blue-400 rounded-full opacity-70"
            style={{
              left: `${i * 12}px`,
              animation: `dropletFall 1.5s ease-in infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Precipitation click area */}
      <div
        className="absolute top-28 left-12 md:left-28 w-24 h-32 cursor-pointer group"
        onClick={() => onStageClick('precipitation')}
      >
        <div className={`absolute inset-0 rounded-xl ${activeStage === 'precipitation' ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`} />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-blue-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Осадки
        </div>
      </div>

      {/* Mountains */}
      <div className="absolute bottom-28 left-0 right-0">
        <svg viewBox="0 0 800 200" className="w-full h-40 md:h-48">
          {/* Mountain 1 */}
          <polygon points="0,200 150,40 300,200" fill="#6b7280" />
          <polygon points="120,80 150,40 180,80" fill="white" opacity="0.8" />
          {/* Mountain 2 */}
          <polygon points="200,200 380,20 560,200" fill="#4b5563" />
          <polygon points="340,60 380,20 420,60" fill="white" opacity="0.8" />
          {/* Mountain 3 */}
          <polygon points="500,200 650,60 800,200" fill="#6b7280" />
          <polygon points="620,90 650,60 680,90" fill="white" opacity="0.8" />
          {/* Green hills */}
          <ellipse cx="100" cy="200" rx="120" ry="40" fill="#22c55e" />
          <ellipse cx="350" cy="200" rx="150" ry="50" fill="#16a34a" />
          <ellipse cx="650" cy="200" rx="130" ry="45" fill="#22c55e" />
        </svg>
      </div>

      {/* Trees */}
      <div className="absolute bottom-24 left-[15%] flex gap-3">
        {['🌲', '🌳', '🌲'].map((tree, i) => (
          <span key={i} className="text-2xl md:text-3xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{tree}</span>
        ))}
      </div>

      {/* Transpiration click area */}
      <div
        className="absolute bottom-20 left-[12%] w-28 h-20 cursor-pointer group"
        onClick={() => onStageClick('transpiration')}
      >
        <div className={`absolute inset-0 rounded-xl ${activeStage === 'transpiration' ? 'ring-2 ring-green-400 ring-opacity-50' : ''}`} />
        {/* Steam from trees */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-200 rounded-full opacity-50"
            style={{
              left: `${10 + i * 15}px`,
              top: '0px',
              animation: `steamRise 2s ease-out infinite`,
              animationDelay: `${i * 0.6}s`
            }}
          />
        ))}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-green-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Транспирация
        </div>
      </div>

      {/* River flowing to ocean */}
      <div className="absolute bottom-16 left-[40%] w-[20%] h-4">
        <svg viewBox="0 0 200 20" className="w-full h-full">
          <path d="M0,10 Q50,5 100,10 Q150,15 200,10" fill="none" stroke="#38bdf8" strokeWidth="6" opacity="0.7" />
          <path d="M0,10 Q50,5 100,10 Q150,15 200,10" fill="none" stroke="#7dd3fc" strokeWidth="3" opacity="0.5" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Ocean / Water collection */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-700" />
        {/* Waves */}
        <svg className="absolute top-0 left-0 w-[200%] h-6 animate-wave" viewBox="0 0 1200 30">
          <path d="M0,15 Q75,0 150,15 Q225,30 300,15 Q375,0 450,15 Q525,30 600,15 Q675,0 750,15 Q825,30 900,15 Q975,0 1050,15 Q1125,30 1200,15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
        </svg>
        {/* Collection click area */}
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={() => onStageClick('collection')}
        >
          <div className={`absolute inset-0 ${activeStage === 'collection' ? 'bg-white/10' : ''}`} />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            🌊 Сбор воды (Океан)
          </div>
        </div>
      </div>

      {/* Evaporation steam from ocean */}
      <div className="absolute bottom-16 left-[60%] flex gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white rounded-full opacity-40"
            style={{
              animation: `steamRise 2.5s ease-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Underground water (infiltration) */}
      <div
        className="absolute bottom-1 left-[25%] w-16 h-14 cursor-pointer group"
        onClick={() => onStageClick('infiltration')}
      >
        <div className={`absolute inset-0 rounded-xl ${activeStage === 'infiltration' ? 'ring-2 ring-amber-400 ring-opacity-50' : ''}`} />
        {/* Water seeping down */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-amber-300 rounded-full opacity-60"
            style={{
              left: `${5 + i * 8}px`,
              top: '0px',
              animation: `dropletFall 2s ease-in infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-amber-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Инфильтрация
        </div>
      </div>

      {/* ARROWS - SVG overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
        {/* Evaporation arrow (up from ocean) */}
        <defs>
          <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
          </marker>
          <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          <marker id="arrowCyan" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
          </marker>
          <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
          </marker>
          <marker id="arrowAmber" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#d97706" />
          </marker>
        </defs>

        {/* Evaporation arrow */}
        <path 
          d="M520,480 Q540,400 500,320 Q470,260 440,200" 
          fill="none" 
          stroke="#f97316" 
          strokeWidth="3" 
          strokeDasharray="8,4"
          markerEnd="url(#arrowOrange)"
          opacity="0.8"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <text x="530" y="380" fill="#f97316" fontSize="12" fontWeight="bold" className="select-none">Испарение ↑</text>

        {/* Condensation arrow (horizontal to cloud) */}
        <path 
          d="M440,190 Q350,160 250,130" 
          fill="none" 
          stroke="#3b82f6" 
          strokeWidth="3" 
          strokeDasharray="8,4"
          markerEnd="url(#arrowBlue)"
          opacity="0.8"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <text x="310" y="145" fill="#3b82f6" fontSize="12" fontWeight="bold" className="select-none">Конденсация →</text>

        {/* Precipitation arrow (down from cloud) */}
        <path 
          d="M200,170 Q180,220 170,280 Q160,330 155,370" 
          fill="none" 
          stroke="#3b82f6" 
          strokeWidth="3" 
          strokeDasharray="8,4"
          markerEnd="url(#arrowBlue)"
          opacity="0.8"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <text x="100" y="280" fill="#3b82f6" fontSize="12" fontWeight="bold" className="select-none">Осадки ↓</text>

        {/* Collection / Runoff arrow */}
        <path 
          d="M350,430 Q400,450 480,470 Q550,485 600,500" 
          fill="none" 
          stroke="#06b6d4" 
          strokeWidth="3" 
          strokeDasharray="8,4"
          markerEnd="url(#arrowCyan)"
          opacity="0.8"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <text x="380" y="445" fill="#06b6d4" fontSize="12" fontWeight="bold" className="select-none">Сток →</text>

        {/* Transpiration arrow */}
        <path 
          d="M140,400 Q130,350 120,300 Q115,260 130,220" 
          fill="none" 
          stroke="#22c55e" 
          strokeWidth="3" 
          strokeDasharray="8,4"
          markerEnd="url(#arrowGreen)"
          opacity="0.8"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <text x="60" y="320" fill="#22c55e" fontSize="12" fontWeight="bold" className="select-none">Транспирация ↑</text>

        {/* Infiltration arrow */}
        <path 
          d="M250,430 Q240,460 235,490 Q230,510 230,530" 
          fill="none" 
          stroke="#d97706" 
          strokeWidth="3" 
          strokeDasharray="8,4"
          markerEnd="url(#arrowAmber)"
          opacity="0.8"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.5s" repeatCount="indefinite" />
        </path>
        <text x="245" y="480" fill="#d97706" fontSize="12" fontWeight="bold" className="select-none">Инфильтрация ↓</text>
      </svg>
    </div>
  );
}

function InfoPanel({ stage, onClose }: { stage: StageInfo; onClose: () => void }) {
  return (
    <div className="info-panel-enter bg-white rounded-2xl shadow-xl border-2 border-sky-200 p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{stage.emoji}</span>
          <h3 className="text-2xl font-extrabold text-gray-800">{stage.title}</h3>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>
      
      <p className="text-gray-600 text-lg mb-4 leading-relaxed">{stage.description}</p>
      
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-100">
        <h4 className="font-bold text-sky-700 mb-3 flex items-center gap-2">
          <span>🧠</span> Интересные факты:
        </h4>
        <ul className="space-y-2">
          {stage.facts.map((fact, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="text-sky-500 mt-1 flex-shrink-0">💧</span>
              <span className="text-sm md:text-base">{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: 'Какой процент воды на Земле — пресная?',
      options: ['10%', '3%', '25%', '50%'],
      correct: 1
    },
    {
      question: 'Как называется процесс, при котором растения «выдыхают» водяной пар?',
      options: ['Фотосинтез', 'Транспирация', 'Дыхание', 'Осмос'],
      correct: 1
    },
    {
      question: 'Сколько весит среднее облако?',
      options: ['100 кг', '5 тонн', '500 тонн', '50 кг'],
      correct: 2
    },
    {
      question: 'Что происходит с водой при конденсации?',
      options: ['Превращается в лёд', 'Превращается в пар', 'Превращается из пара в капли', 'Исчезает'],
      correct: 2
    },
    {
      question: 'Какой океан самый глубокий?',
      options: ['Атлантический', 'Индийский', 'Тихий', 'Северный Ледовитый'],
      correct: 2
    }
  ];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[currentQ].correct) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 text-center">
        <div className="text-5xl mb-3">{score >= 4 ? '🏆' : score >= 3 ? '👏' : '📚'}</div>
        <h3 className="text-2xl font-bold text-purple-800 mb-2">Результат: {score} из {questions.length}</h3>
        <p className="text-purple-600 mb-4">
          {score >= 4 ? 'Отлично! Ты настоящий эксперт!' : score >= 3 ? 'Хорошо! Но можно лучше!' : 'Попробуй ещё раз — ты справишься!'}
        </p>
        <button 
          onClick={resetQuiz}
          className="px-6 py-2 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 transition-colors"
        >
          Пройти ещё раз 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-purple-800 flex items-center gap-2">
          <span>🧩</span> Проверь себя!
        </h3>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
          Вопрос {currentQ + 1}/{questions.length}
        </span>
      </div>
      
      <p className="text-lg font-semibold text-gray-800 mb-4">{questions[currentQ].question}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions[currentQ].options.map((option, idx) => {
          let btnClass = 'bg-white border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700';
          if (selected !== null) {
            if (idx === questions[currentQ].correct) {
              btnClass = 'bg-green-100 border-2 border-green-400 text-green-800';
            } else if (idx === selected && idx !== questions[currentQ].correct) {
              btnClass = 'bg-red-100 border-2 border-red-400 text-red-800';
            } else {
              btnClass = 'bg-gray-50 border-2 border-gray-200 text-gray-400';
            }
          }
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
              className={`p-3 rounded-xl font-semibold transition-all text-left ${btnClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4 flex gap-1">
        {questions.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 flex-1 rounded-full ${i < currentQ ? 'bg-purple-400' : i === currentQ ? 'bg-purple-300' : 'bg-purple-100'}`} 
          />
        ))}
      </div>
    </div>
  );
}

function StageSelector({ stages, activeStage, onSelect }: { stages: StageInfo[]; activeStage: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stages.map((stage) => (
        <button
          key={stage.id}
          onClick={() => onSelect(stage.id)}
          className={`p-3 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
            activeStage === stage.id 
              ? 'border-sky-400 bg-sky-50 shadow-lg shadow-sky-200/50' 
              : 'border-gray-200 bg-white hover:border-sky-300 hover:bg-sky-50'
          }`}
        >
          <span className="text-2xl block mb-1">{stage.emoji}</span>
          <span className="text-xs md:text-sm font-bold text-gray-700">{stage.title}</span>
        </button>
      ))}
    </div>
  );
}

function FunFacts() {
  const facts = [
    { emoji: '🌍', text: 'Вода на Земле всегда одна и та же — та же вода, что пили динозавры!' },
    { emoji: '💧', text: 'Человеческое тело состоит из воды на 60-70%.' },
    { emoji: '🧊', text: 'Если бы весь лёд на Земле растаял, уровень океана поднялся бы на 70 метров.' },
    { emoji: '🌧️', text: 'В тропических лесах может выпадать до 10 метров осадков в год.' },
    { emoji: '⏰', text: 'Капля воды в океане «путешествует» в среднем 1000-3000 лет до следующего испарения.' },
    { emoji: '🏔️', text: 'Самое большое хранилище пресной воды — озеро Байкал (20% мировых запасов).' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {facts.map((fact, i) => (
        <div 
          key={i} 
          className="bg-gradient-to-br from-white to-sky-50 rounded-xl p-4 border border-sky-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-3xl block mb-2">{fact.emoji}</span>
          <p className="text-gray-700 text-sm font-medium">{fact.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const handleStageClick = (id: string) => {
    setActiveStage(prev => prev === id ? null : id);
  };

  const activeStageData = stagesData.find(s => s.id === activeStage) || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-sky-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💧</span>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-sky-800">Круговорот воды</h1>
              <p className="text-xs text-sky-600 font-medium">Интерактивный урок для школьников</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-sky-100 px-4 py-2 rounded-full">
            <span className="text-lg">🎓</span>
            <span className="text-sm font-bold text-sky-700">География • 5-7 класс</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <section className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800">
            Мировой круговорот воды в природе 🌍💧
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Нажимай на элементы схемы, чтобы узнать больше о каждом этапе! 
            Вода постоянно путешествует по нашей планете — из океана в облака, 
            из облаков на землю и обратно.
          </p>
        </section>

        {/* Stage selector buttons */}
        <section>
          <StageSelector 
            stages={stagesData} 
            activeStage={activeStage} 
            onSelect={handleStageClick} 
          />
        </section>

        {/* Main animation scene */}
        <section>
          <WaterCycleScene onStageClick={handleStageClick} activeStage={activeStage} />
        </section>

        {/* Info panel */}
        {activeStageData && (
          <section>
            <InfoPanel stage={activeStageData} onClose={() => setActiveStage(null)} />
          </section>
        )}

        {/* Quiz */}
        <section>
          <QuizSection />
        </section>

        {/* Fun facts */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>✨</span> Удивительные факты о воде
          </h3>
          <FunFacts />
        </section>

        {/* Water distribution */}
        <section className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📊</span> Распределение воды на Земле
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-blue-700">🌊 Солёная вода (океаны)</span>
                <span className="text-blue-700">97%</span>
              </div>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full" style={{ width: '97%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-cyan-700">🧊 Ледники и айсберги</span>
                <span className="text-cyan-700">2%</span>
              </div>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: '66%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-emerald-700">💧 Подземные воды</span>
                <span className="text-emerald-700">0.6%</span>
              </div>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-sky-700">🏞️ Реки, озёра и другое</span>
                <span className="text-sky-700">0.4%</span>
              </div>
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">
            * Как видишь, пресной воды, доступной для использования, очень мало! Береги воду 💚
          </p>
        </section>

        {/* Cycle summary */}
        <section className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🔄</span> Краткая схема круговорота
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[100px]">
              <span className="text-2xl block">☀️</span>
              <span className="text-xs font-bold">Солнце нагревает</span>
            </div>
            <span className="text-2xl">→</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[100px]">
              <span className="text-2xl block">💨</span>
              <span className="text-xs font-bold">Испарение</span>
            </div>
            <span className="text-2xl">→</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[100px]">
              <span className="text-2xl block">☁️</span>
              <span className="text-xs font-bold">Облака</span>
            </div>
            <span className="text-2xl">→</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[100px]">
              <span className="text-2xl block">🌧️</span>
              <span className="text-xs font-bold">Осадки</span>
            </div>
            <span className="text-2xl">→</span>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[100px]">
              <span className="text-2xl block">🌊</span>
              <span className="text-xs font-bold">Океан</span>
            </div>
            <span className="text-2xl">↻</span>
          </div>
          <p className="text-center mt-4 text-sky-100 text-sm">
            Этот цикл повторяется бесконечно, обеспечивая жизнь на Земле!
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-sky-200 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            💧 Интерактивный урок «Круговорот воды в природе» • Создано для любознательных школьников 🎓
          </p>
        </div>
      </footer>
    </div>
  );
}
