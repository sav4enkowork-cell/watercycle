import { useState } from 'react'

type Stage = 'evaporation' | 'condensation' | 'precipitation' | 'runoff' | 'infiltration' | 'transpiration' | null

interface StageInfo {
  title: string
  emoji: string
  description: string
  facts: string[]
  color: string
  bgColor: string
}

const stagesData: Record<string, StageInfo> = {
  evaporation: {
    title: 'Испарение',
    emoji: '☀️→💨',
    description: 'Солнце нагревает воду в океанах, морях, реках и озёрах. Вода превращается в невидимый водяной пар и поднимается вверх в атмосферу. Это главный «двигатель» всего круговорота!',
    facts: [
      'Океаны — главный источник: с их поверхности испаряется 86% всей влаги',
      'Каждый день с поверхности Земли испаряется около 1,4 триллиона тонн воды',
      'Скорость испарения зависит от температуры, ветра и влажности воздуха',
      'При испарении вода очищается — соли и минералы остаются внизу',
    ],
    color: '#ea580c',
    bgColor: '#fff7ed',
  },
  condensation: {
    title: 'Конденсация',
    emoji: '💨→☁️',
    description: 'Водяной пар поднимается высоко в небо, где температура ниже. Пар охлаждается и превращается в крошечные капельки воды или кристаллики льда вокруг пылинок — так образуются облака.',
    facts: [
      'Облако может весить от нескольких сотен до миллиона тонн!',
      'Капельки в облаке настолько малы (0,01 мм), что почти не падают',
      'Для образования капель нужна «затравка» — пылинки или частицы соли',
      'Высота облаков может достигать 18 км!',
    ],
    color: '#64748b',
    bgColor: '#f1f5f9',
  },
  precipitation: {
    title: 'Осадки',
    emoji: '☁️→🌧️',
    description: 'Когда капельки в облаке сливаются и становятся слишком тяжёлыми, они падают на землю в виде дождя, снега, града или измороси.',
    facts: [
      'Капля дождя падает со скоростью около 30 км/ч',
      'Снежинка — это ледяной кристалл, всегда имеющий 6 лучей',
      'В мире выпадает около 505 000 км³ осадков в год',
      'Град может падать со скоростью до 160 км/ч!',
    ],
    color: '#2563eb',
    bgColor: '#eff6ff',
  },
  runoff: {
    title: 'Поверхностный сток',
    emoji: '🏔️→🌊',
    description: 'Вода, выпавшая на землю, стекает по склонам гор и холмов в ручьи, реки и в итоге попадает обратно в океаны и моря. Так цикл замыкается!',
    facts: [
      'Амазонка — самая полноводная река мира, несёт 20% всей речной воды планеты',
      'Поверхностный сток формирует рельеф: создаёт долины, каньоны, ущелья',
      'Только 35% выпавших осадков возвращается в океан через реки',
      'Нил — самая длинная река мира (6670 км)',
    ],
    color: '#0891b2',
    bgColor: '#ecfeff',
  },
  infiltration: {
    title: 'Инфильтрация (подземный сток)',
    emoji: '💧→⬇️',
    description: 'Часть воды просачивается сквозь почву и горные породы глубоко под землю, пополняя подземные водоносные горизонты. Эти воды могут находиться под землёй годами и тысячелетиями.',
    facts: [
      'Подземные воды составляют около 30% всех пресных вод Земли',
      'Вода проходит через почву со скоростью от мм до метров в сутки',
      'Самые древние подземные воды имеют возраст более миллиона лет!',
      'Подземные воды питают родники и колодцы',
    ],
    color: '#7c3aed',
    bgColor: '#f5f3ff',
  },
  transpiration: {
    title: 'Транспирация',
    emoji: '🌳→💨',
    description: 'Растения «выдыхают» воду! Они впитывают её корнями из почвы и испаряют через листья. Это похоже на испарение, но происходит через живые организмы.',
    facts: [
      'Одно большое дерево может испарить до 400 литров воды в день',
      'Транспирация — около 10% всей влаги в атмосфере',
      'Леса — важнейшие «фабрики» влаги, они создают свой микроклимат',
      'Леса Амазонки создают «летающие реки» — огромные потоки водяного пара',
    ],
    color: '#059669',
    bgColor: '#ecfdf5',
  },
}

export default function App() {
  const [activeStage, setActiveStage] = useState<Stage>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const quizQuestions = [
    { question: 'Какой этап круговорота воды происходит при нагреве воды солнцем?', options: ['Конденсация', 'Испарение', 'Осадки', 'Инфильтрация'], correct: 1 },
    { question: 'Что такое конденсация?', options: ['Вода стекает по склонам', 'Растения испаряют воду', 'Водяной пар превращается в капли в облаках', 'Вода просачивается в почву'], correct: 2 },
    { question: 'Сколько процентов воды на Земле — пресная?', options: ['50%', '25%', 'около 3%', '10%'], correct: 2 },
    { question: 'Как называется процесс, при котором растения «выдыхают» воду?', options: ['Фотосинтез', 'Транспирация', 'Инфильтрация', 'Сублимация'], correct: 1 },
    { question: 'Откуда берётся основная часть водяного пара в атмосфере?', options: ['Из вулканов', 'Из рек', 'Из океанов', 'Из ледников'], correct: 2 },
  ]

  const handleStageClick = (stage: Stage) => {
    setActiveStage(activeStage === stage ? null : stage)
  }

  const handleQuizAnswer = (idx: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    if (idx === quizQuestions[quizStep].correct) setScore(score + 1)
    setTimeout(() => {
      if (quizStep < quizQuestions.length - 1) {
        setQuizStep(quizStep + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1200)
  }

  const resetQuiz = () => {
    setQuizStep(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const info = activeStage ? stagesData[activeStage] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-4 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl md:text-4xl font-black flex items-center gap-2">
              💧 Круговорот воды в природе
            </h1>
            <p className="text-blue-100 mt-1 text-sm md:text-base">
              Мировой круговорот воды — интерактивная схема для школьников
            </p>
          </div>
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-yellow-400 text-blue-900 font-black px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform text-sm md:text-base"
          >
            🧠 Проверь себя!
          </button>
        </div>
      </header>

      {/* Hint */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-3 text-center">
          <p className="text-yellow-900 font-bold text-sm md:text-base">
            👆 Нажимай на элементы схемы или на стрелки, чтобы узнать больше о каждом этапе!
          </p>
        </div>
      </div>

      {/* Main scene - full width SVG */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-sky-300">
          <svg viewBox="0 0 1200 700" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gradients */}
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
              <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
              <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#365314" />
              </linearGradient>
              <linearGradient id="mountain1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="30%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="mountain2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="40%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <radialGradient id="sun">
                <stop offset="0%" stopColor="#fef9c3" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#f59e0b" />
              </radialGradient>
              <linearGradient id="underground" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              {/* Arrow markers */}
              <marker id="arrowOrange" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto">
                <path d="M 0 0 L 12 6 L 0 12 z" fill="#ea580c" />
              </marker>
              <marker id="arrowBlue" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto">
                <path d="M 0 0 L 12 6 L 0 12 z" fill="#2563eb" />
              </marker>
              <marker id="arrowCyan" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto">
                <path d="M 0 0 L 12 6 L 0 12 z" fill="#0891b2" />
              </marker>
              <marker id="arrowGreen" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto">
                <path d="M 0 0 L 12 6 L 0 12 z" fill="#059669" />
              </marker>
              <marker id="arrowPurple" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto">
                <path d="M 0 0 L 12 6 L 0 12 z" fill="#7c3aed" />
              </marker>
              <marker id="arrowGray" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto">
                <path d="M 0 0 L 12 6 L 0 12 z" fill="#475569" />
              </marker>
            </defs>

            {/* ===== SKY ===== */}
            <rect width="1200" height="700" fill="url(#sky)" />

            {/* ===== SUN ===== */}
            <g onClick={() => handleStageClick('evaporation')} style={{ cursor: 'pointer' }}>
              {/* Glow */}
              <circle cx="150" cy="120" r="90" fill="#fbbf24" opacity="0.2">
                <animate attributeName="r" values="90;100;90" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="150" cy="120" r="70" fill="#fbbf24" opacity="0.3">
                <animate attributeName="r" values="70;80;70" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Sun body */}
              <circle cx="150" cy="120" r="55" fill="url(#sun)" stroke="#f59e0b" strokeWidth="3" />
              {/* Rays */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180
                const x1 = 150 + Math.cos(angle) * 60
                const y1 = 120 + Math.sin(angle) * 60
                const x2 = 150 + Math.cos(angle) * 85
                const y2 = 120 + Math.sin(angle) * 85
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="4" strokeLinecap="round">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                  </line>
                )
              })}
              {/* Face */}
              <circle cx="135" cy="110" r="5" fill="#92400e" />
              <circle cx="165" cy="110" r="5" fill="#92400e" />
              <path d="M 130 130 Q 150 145 170 130" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            {/* ===== CLOUDS ===== */}
            <g onClick={() => handleStageClick('condensation')} style={{ cursor: 'pointer' }}>
              {/* Main cloud */}
              <g>
                <animateTransform attributeName="transform" type="translate" values="0,0; 20,0; 0,0" dur="10s" repeatCount="indefinite" />
                <ellipse cx="600" cy="100" rx="100" ry="35" fill="white" />
                <ellipse cx="550" cy="90" rx="60" ry="40" fill="white" />
                <ellipse cx="650" cy="85" rx="70" ry="45" fill="white" />
                <ellipse cx="600" cy="75" rx="50" ry="35" fill="#f8fafc" />
                <ellipse cx="580" cy="110" rx="40" ry="25" fill="#f1f5f9" />
              </g>
              {/* Second cloud */}
              <g>
                <animateTransform attributeName="transform" type="translate" values="0,0; -15,0; 0,0" dur="12s" repeatCount="indefinite" />
                <ellipse cx="900" cy="140" rx="80" ry="30" fill="white" />
                <ellipse cx="870" cy="130" rx="50" ry="35" fill="white" />
                <ellipse cx="930" cy="125" rx="55" ry="38" fill="#f8fafc" />
              </g>
              {/* Small cloud */}
              <g>
                <animateTransform attributeName="transform" type="translate" values="0,0; 10,0; 0,0" dur="8s" repeatCount="indefinite" />
                <ellipse cx="350" cy="150" rx="50" ry="20" fill="white" opacity="0.9" />
                <ellipse cx="340" cy="142" rx="35" ry="25" fill="white" opacity="0.9" />
              </g>
            </g>

            {/* ===== MOUNTAINS ===== */}
            {/* Left mountain */}
            <polygon points="0,500 200,200 400,500" fill="url(#mountain1)" />
            <polygon points="170,250 200,200 230,250 215,260 200,245 185,260" fill="white" />
            {/* Right mountain */}
            <polygon points="800,500 1000,220 1200,500" fill="url(#mountain2)" />
            <polygon points="970,270 1000,220 1030,270 1015,280 1000,265 985,280" fill="white" />
            {/* Middle hill */}
            <ellipse cx="600" cy="500" rx="200" ry="80" fill="#65a30d" />

            {/* ===== GROUND ===== */}
            <rect x="0" y="500" width="400" height="200" fill="url(#ground)" />
            <rect x="800" y="500" width="400" height="200" fill="url(#ground)" />

            {/* ===== UNDERGROUND ===== */}
            <rect x="0" y="620" width="400" height="80" fill="url(#underground)" opacity="0.7" />
            <rect x="800" y="620" width="400" height="80" fill="url(#underground)" opacity="0.7" />
            {/* Underground water drops */}
            {[50, 120, 200, 280, 350, 850, 950, 1050, 1150].map((x, i) => (
              <circle key={i} cx={x} cy={650 + (i % 3) * 15} r="4" fill="#60a5fa" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* ===== SEA / OCEAN ===== */}
            <rect x="400" y="500" width="400" height="200" fill="url(#sea)" />
            {/* Waves */}
            <path d="M 400 520 Q 450 510 500 520 T 600 520 T 700 520 T 800 520" stroke="white" strokeWidth="3" fill="none" opacity="0.5">
              <animate attributeName="d" values="M 400 520 Q 450 510 500 520 T 600 520 T 700 520 T 800 520;M 400 520 Q 450 530 500 520 T 600 520 T 700 520 T 800 520;M 400 520 Q 450 510 500 520 T 600 520 T 700 520 T 800 520" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M 400 550 Q 450 540 500 550 T 600 550 T 700 550 T 800 550" stroke="white" strokeWidth="2" fill="none" opacity="0.3">
              <animate attributeName="d" values="M 400 550 Q 450 540 500 550 T 600 550 T 700 550 T 800 550;M 400 550 Q 450 560 500 550 T 600 550 T 700 550 T 800 550;M 400 550 Q 450 540 500 550 T 600 550 T 700 550 T 800 550" dur="4s" repeatCount="indefinite" />
            </path>

            {/* ===== TREES ===== */}
            {/* Left side trees */}
            {[
              { x: 50, y: 460, s: 1.2 },
              { x: 130, y: 470, s: 1 },
              { x: 220, y: 465, s: 1.1 },
              { x: 310, y: 470, s: 0.9 },
            ].map((t, i) => (
              <g key={i} onClick={() => handleStageClick('transpiration')} style={{ cursor: 'pointer' }}>
                <rect x={t.x - 5 * t.s} y={t.y} width={10 * t.s} height={40 * t.s} fill="#78350f" />
                <circle cx={t.x} cy={t.y - 5 * t.s} r={25 * t.s} fill="#16a34a" />
                <circle cx={t.x - 12 * t.s} cy={t.y + 5 * t.s} r={18 * t.s} fill="#15803d" />
                <circle cx={t.x + 12 * t.s} cy={t.y + 5 * t.s} r={18 * t.s} fill="#166534" />
              </g>
            ))}
            {/* Right side trees */}
            {[
              { x: 870, y: 465, s: 1.1 },
              { x: 960, y: 470, s: 1 },
              { x: 1050, y: 460, s: 1.2 },
              { x: 1140, y: 470, s: 0.9 },
            ].map((t, i) => (
              <g key={i} onClick={() => handleStageClick('transpiration')} style={{ cursor: 'pointer' }}>
                <rect x={t.x - 5 * t.s} y={t.y} width={10 * t.s} height={40 * t.s} fill="#78350f" />
                <circle cx={t.x} cy={t.y - 5 * t.s} r={25 * t.s} fill="#16a34a" />
                <circle cx={t.x - 12 * t.s} cy={t.y + 5 * t.s} r={18 * t.s} fill="#15803d" />
                <circle cx={t.x + 12 * t.s} cy={t.y + 5 * t.s} r={18 * t.s} fill="#166534" />
              </g>
            ))}

            {/* ===== RIVER ===== */}
            <g onClick={() => handleStageClick('runoff')} style={{ cursor: 'pointer' }}>
              <path
                d="M 600 420 Q 620 450 640 480 Q 650 500 630 530 Q 610 560 600 600"
                stroke="url(#river)"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 600 420 Q 620 450 640 480 Q 650 500 630 530 Q 610 560 600 600"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
                strokeDasharray="10 10"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="1.5s" repeatCount="indefinite" />
              </path>
            </g>

            {/* ===== RAIN DROPS ===== */}
            <g onClick={() => handleStageClick('precipitation')} style={{ cursor: 'pointer' }}>
              {[...Array(20)].map((_, i) => {
                const x = 500 + (i % 8) * 25
                const startY = 130 + Math.floor(i / 8) * 40
                return (
                  <line
                    key={i}
                    x1={x}
                    y1={startY}
                    x2={x}
                    y2={startY + 15}
                    stroke="#1d4ed8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="y1"
                      values={`${startY};${350 + Math.floor(i / 8) * 30}`}
                      dur={`${1.2 + (i % 4) * 0.2}s`}
                      begin={`${i * 0.1}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y2"
                      values={`${startY + 15};${365 + Math.floor(i / 8) * 30}`}
                      dur={`${1.2 + (i % 4) * 0.2}s`}
                      begin={`${i * 0.1}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.8;0"
                      dur={`${1.2 + (i % 4) * 0.2}s`}
                      begin={`${i * 0.1}s`}
                      repeatCount="indefinite"
                    />
                  </line>
                )
              })}
            </g>

            {/* ===== EVAPORATION PARTICLES ===== */}
            <g onClick={() => handleStageClick('evaporation')} style={{ cursor: 'pointer' }}>
              {[...Array(8)].map((_, i) => (
                <g key={i}>
                  <circle
                    cx={440 + i * 45}
                    cy={500}
                    r="5"
                    fill="#fbbf24"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="cy"
                      values="500;350;200"
                      dur={`${3.5 + i * 0.3}s`}
                      begin={`${i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.7;0.4;0"
                      dur={`${3.5 + i * 0.3}s`}
                      begin={`${i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="5;7;3"
                      dur={`${3.5 + i * 0.3}s`}
                      begin={`${i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </g>

            {/* ===== TRANSPERSION PARTICLES ===== */}
            <g onClick={() => handleStageClick('transpiration')} style={{ cursor: 'pointer' }}>
              {[50, 130, 220, 310, 870, 960, 1050, 1140].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={450}
                  r="4"
                  fill="#4ade80"
                  opacity="0.6"
                >
                  <animate
                    attributeName="cy"
                    values="450;350;250"
                    dur={`${3 + i * 0.2}s`}
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.3;0"
                    dur={`${3 + i * 0.2}s`}
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>

            {/* ===== INFILTRATION PARTICLES ===== */}
            <g onClick={() => handleStageClick('infiltration')} style={{ cursor: 'pointer' }}>
              {[80, 180, 280, 880, 980, 1100].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={510}
                  r="4"
                  fill="#a78bfa"
                  opacity="0.7"
                >
                  <animate
                    attributeName="cy"
                    values="510;580;660"
                    dur={`${3 + i * 0.3}s`}
                    begin={`${i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0.4;0"
                    dur={`${3 + i * 0.3}s`}
                    begin={`${i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>

            {/* ===== BIG ARROWS WITH LABELS ===== */}

            {/* 1. EVAPORATION arrow: sea -> up */}
            <g onClick={() => handleStageClick('evaporation')} style={{ cursor: 'pointer' }}>
              <path
                d="M 500 480 C 480 400 450 320 500 220"
                stroke="#ea580c"
                strokeWidth="6"
                fill="none"
                strokeDasharray="12 8"
                markerEnd="url(#arrowOrange)"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              {/* Label background */}
              <rect x="340" y="300" width="160" height="40" rx="20" fill="white" stroke="#ea580c" strokeWidth="3" opacity="0.95" />
              <text x="420" y="326" textAnchor="middle" fontSize="16" fontWeight="900" fill="#ea580c">ИСПАРЕНИЕ</text>
            </g>

            {/* 2. CONDENSATION arrow: vapor -> cloud */}
            <g onClick={() => handleStageClick('condensation')} style={{ cursor: 'pointer' }}>
              <path
                d="M 520 220 C 540 180 570 150 600 130"
                stroke="#475569"
                strokeWidth="6"
                fill="none"
                strokeDasharray="12 8"
                markerEnd="url(#arrowGray)"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <rect x="560" y="170" width="180" height="40" rx="20" fill="white" stroke="#475569" strokeWidth="3" opacity="0.95" />
              <text x="650" y="196" textAnchor="middle" fontSize="16" fontWeight="900" fill="#475569">КОНДЕНСАЦИЯ</text>
            </g>

            {/* 3. PRECIPITATION arrow: cloud -> down */}
            <g onClick={() => handleStageClick('precipitation')} style={{ cursor: 'pointer' }}>
              <path
                d="M 620 140 C 630 200 640 300 620 400"
                stroke="#2563eb"
                strokeWidth="6"
                fill="none"
                strokeDasharray="12 8"
                markerEnd="url(#arrowBlue)"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <rect x="660" y="260" width="140" height="40" rx="20" fill="white" stroke="#2563eb" strokeWidth="3" opacity="0.95" />
              <text x="730" y="286" textAnchor="middle" fontSize="16" fontWeight="900" fill="#2563eb">ОСАДКИ</text>
            </g>

            {/* 4. RUNOFF arrow: mountain -> sea */}
            <g onClick={() => handleStageClick('runoff')} style={{ cursor: 'pointer' }}>
              <path
                d="M 650 470 C 660 490 650 510 620 530"
                stroke="#0891b2"
                strokeWidth="6"
                fill="none"
                strokeDasharray="12 8"
                markerEnd="url(#arrowCyan)"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <rect x="680" y="470" width="130" height="40" rx="20" fill="white" stroke="#0891b2" strokeWidth="3" opacity="0.95" />
              <text x="745" y="496" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0891b2">СТОК</text>
            </g>

            {/* 5. TRANSPIRATION arrow: trees -> up */}
            <g onClick={() => handleStageClick('transpiration')} style={{ cursor: 'pointer' }}>
              <path
                d="M 200 440 C 220 380 280 300 400 200"
                stroke="#059669"
                strokeWidth="6"
                fill="none"
                strokeDasharray="12 8"
                markerEnd="url(#arrowGreen)"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <rect x="100" y="340" width="200" height="40" rx="20" fill="white" stroke="#059669" strokeWidth="3" opacity="0.95" />
              <text x="200" y="366" textAnchor="middle" fontSize="16" fontWeight="900" fill="#059669">ТРАНСИПРАЦИЯ</text>
            </g>

            {/* 6. INFILTRATION arrow: ground -> down */}
            <g onClick={() => handleStageClick('infiltration')} style={{ cursor: 'pointer' }}>
              <path
                d="M 150 520 L 150 620"
                stroke="#7c3aed"
                strokeWidth="6"
                fill="none"
                strokeDasharray="12 8"
                markerEnd="url(#arrowPurple)"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <rect x="30" y="560" width="220" height="40" rx="20" fill="white" stroke="#7c3aed" strokeWidth="3" opacity="0.95" />
              <text x="140" y="586" textAnchor="middle" fontSize="14" fontWeight="900" fill="#7c3aed">ИНФИЛЬТРАЦИЯ</text>
            </g>

            {/* ===== LOCATION LABELS ===== */}
            <rect x="440" y="560" width="120" height="35" rx="10" fill="#0369a1" opacity="0.8" />
            <text x="500" y="583" textAnchor="middle" fontSize="16" fontWeight="900" fill="white">🌊 ОКЕАН</text>

            <rect x="130" y="480" width="140" height="30" rx="10" fill="#166534" opacity="0.8" />
            <text x="200" y="500" textAnchor="middle" fontSize="14" fontWeight="900" fill="white">🌳 СУША</text>

            <rect x="930" y="480" width="140" height="30" rx="10" fill="#166534" opacity="0.8" />
            <text x="1000" y="500" textAnchor="middle" fontSize="14" fontWeight="900" fill="white">🌳 СУША</text>

            <rect x="50" y="650" width="200" height="30" rx="10" fill="#451a03" opacity="0.8" />
            <text x="150" y="670" textAnchor="middle" fontSize="13" fontWeight="900" fill="white">💧 ПОДЗЕМНЫЕ ВОДЫ</text>

            <rect x="950" y="650" width="200" height="30" rx="10" fill="#451a03" opacity="0.8" />
            <text x="1050" y="670" textAnchor="middle" fontSize="13" fontWeight="900" fill="white">💧 ПОДЗЕМНЫЕ ВОДЫ</text>

            {/* Title */}
            <rect x="350" y="10" width="500" height="50" rx="25" fill="white" opacity="0.9" stroke="#0284c7" strokeWidth="3" />
            <text x="600" y="42" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0c4a6e">МИРОВОЙ КРУГОВОРОТ ВОДЫ</text>

          </svg>
        </div>
      </div>

      {/* Info panel */}
      {info && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="rounded-2xl shadow-xl p-5 md:p-7 border-l-8 animate-fade-in" style={{ borderLeftColor: info.color, backgroundColor: info.bgColor }}>
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex-1 min-w-[250px]">
                <h2 className="text-xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
                  <span className="text-3xl md:text-4xl">{info.emoji}</span>
                  {info.title}
                </h2>
                <p className="mt-3 text-slate-700 text-base md:text-lg leading-relaxed">
                  {info.description}
                </p>
              </div>
              <button
                onClick={() => setActiveStage(null)}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="mt-5 bg-white rounded-xl p-4 shadow-inner">
              <h3 className="font-black text-slate-800 mb-3 text-lg">🌟 Интересные факты:</h3>
              <ul className="space-y-2">
                {info.facts.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-blue-500 font-bold mt-0.5">💧</span>
                    <span className="text-sm md:text-base">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Stage buttons */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <h2 className="text-xl font-black text-slate-800 mb-3 text-center">📚 Изучи каждый этап:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(stagesData).map(([key, stage]) => (
            <button
              key={key}
              onClick={() => handleStageClick(key as Stage)}
              className={`p-3 rounded-xl border-3 transition-all duration-300 hover:scale-105 text-center shadow-md ${
                activeStage === key
                  ? 'border-4 shadow-xl scale-105'
                  : 'border-2 border-gray-200 hover:border-gray-400'
              }`}
              style={{
                borderColor: activeStage === key ? stage.color : undefined,
                backgroundColor: activeStage === key ? stage.bgColor : 'white',
              }}
            >
              <span className="text-2xl block mb-1">{stage.emoji}</span>
              <span className="text-xs md:text-sm font-bold text-slate-700">{stage.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Water stats */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <h2 className="text-xl font-black text-slate-800 mb-3 text-center">📊 Сколько воды на Земле?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-800 text-white rounded-2xl p-5 shadow-lg text-center">
            <div className="text-5xl mb-2">🌊</div>
            <div className="text-4xl font-black">97%</div>
            <div className="text-blue-100 text-sm mt-1">солёная вода в океанах</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-700 text-white rounded-2xl p-5 shadow-lg text-center">
            <div className="text-5xl mb-2">🧊</div>
            <div className="text-4xl font-black">2%</div>
            <div className="text-cyan-100 text-sm mt-1">пресной воды в ледниках</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-800 text-white rounded-2xl p-5 shadow-lg text-center">
            <div className="text-5xl mb-2">💧</div>
            <div className="text-4xl font-black">~1%</div>
            <div className="text-emerald-100 text-sm mt-1">доступна людям и природе</div>
          </div>
        </div>
      </div>

      {/* Fun facts */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <h2 className="text-xl font-black text-slate-800 mb-3 text-center">✨ Удивительные факты о воде</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { emoji: '🦕', text: 'Вода, которую ты пьёшь сегодня, та же самая, что пили динозавры миллионы лет назад! Круговорот воды постоянно её очищает.' },
            { emoji: '🚶', text: 'Человек на 60% состоит из воды. Мозг — на 75%, а кровь — на 92%.' },
            { emoji: '🌊', text: 'В мировом океане столько воды, что если бы ею покрыть всю Землю, слой был бы глубиной около 3 км!' },
            { emoji: '⏳', text: 'Капля воды может «путешествовать» в круговороте от нескольких дней до миллионов лет.' },
            { emoji: '🌡️', text: 'Вода — единственное вещество на Земле, которое в природе встречается сразу в трёх состояниях: жидком, твёрдом и газообразном.' },
            { emoji: '🏔️', text: 'Самые старые ледники Антарктиды содержат лёд возрастом более 800 000 лет!' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-sky-100">
              <div className="text-4xl mb-2">{f.emoji}</div>
              <p className="text-slate-700 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cycle summary */}
      <div className="max-w-7xl mx-auto px-4 mt-6 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-xl font-black mb-4 text-center">🔄 Краткая схема круговорота</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-center">
            {[
              { emoji: '☀️', label: 'Солнце нагревает' },
              { emoji: '💨', label: 'Испарение' },
              { emoji: '☁️', label: 'Облака' },
              { emoji: '🌧️', label: 'Осадки' },
              { emoji: '🏞️', label: 'Сток' },
              { emoji: '🌊', label: 'Океан' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 md:p-3 min-w-[80px] md:min-w-[100px]">
                  <span className="text-2xl md:text-3xl block">{s.emoji}</span>
                  <span className="text-xs md:text-sm font-bold">{s.label}</span>
                </div>
                {i < 5 && <span className="text-xl md:text-2xl">→</span>}
              </div>
            ))}
            <span className="text-xl md:text-2xl">↻</span>
          </div>
          <p className="text-center mt-4 text-blue-100 text-sm">
            Этот цикл повторяется бесконечно, обеспечивая жизнь на Земле!
          </p>
        </div>
      </div>

      <footer className="bg-white/60 backdrop-blur-sm border-t border-sky-200 py-4 text-center">
        <p className="text-slate-500 text-sm">💧 Интерактивный урок «Круговорот воды в природе» • Для школьников 🎓</p>
      </footer>

      {/* Quiz modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowQuiz(false)}>
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!showResult ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-black text-slate-800">🧠 Викторина</h2>
                  <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">
                    {quizStep + 1} / {quizQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-5">
                  {quizQuestions[quizStep].question}
                </h3>
                <div className="space-y-3">
                  {quizQuestions[quizStep].options.map((opt, i) => {
                    const isCorrect = i === quizQuestions[quizStep].correct
                    const isSelected = selectedAnswer === i
                    let cls = 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-700'
                    if (selectedAnswer !== null) {
                      if (isCorrect) cls = 'bg-green-100 border-green-500 text-green-800'
                      else if (isSelected) cls = 'bg-red-100 border-red-500 text-red-800'
                      else cls = 'bg-slate-50 border-slate-200 text-slate-400'
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(i)}
                        className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${cls}`}
                      >
                        <span className="mr-2 font-black">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                        {selectedAnswer !== null && isCorrect && ' ✓'}
                        {selectedAnswer !== null && isSelected && !isCorrect && ' ✗'}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-7xl mb-4">
                  {score === quizQuestions.length ? '🏆' : score >= 3 ? '🎉' : '📚'}
                </div>
                <h2 className="text-3xl font-black text-slate-800 mb-2">
                  {score === quizQuestions.length ? 'Идеально!' : score >= 3 ? 'Отлично!' : 'Неплохо!'}
                </h2>
                <p className="text-xl text-slate-600 mb-6">
                  Правильных ответов: <span className="font-black text-blue-600">{score}</span> из{' '}
                  <span className="font-black">{quizQuestions.length}</span>
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform"
                  >
                    🔄 Пройти ещё раз
                  </button>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-full hover:bg-slate-300 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
