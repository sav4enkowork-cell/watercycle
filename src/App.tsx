import { useState } from 'react'

type Stage = 'evaporation' | 'condensation' | 'precipitation' | 'runoff' | 'infiltration' | 'transpiration' | null

interface StageInfo {
  title: string
  emoji: string
  description: string
  facts: string[]
  color: string
}

const stagesData: Record<string, StageInfo> = {
  evaporation: {
    title: 'Испарение',
    emoji: '🌊',
    description: 'Солнце нагревает воду в океанах, морях, реках и озёрах. Вода превращается в невидимый водяной пар и поднимается вверх в атмосферу.',
    facts: [
      'Океаны — главный источник испарения: с их поверхности испаряется около 86% всей влаги',
      'Каждый день с поверхности Земли испаряется около 1,4 триллиона тонн воды',
      'Скорость испарения зависит от температуры, ветра и влажности воздуха',
    ],
    color: '#f59e0b',
  },
  condensation: {
    title: 'Конденсация',
    emoji: '☁️',
    description: 'Водяной пар поднимается высоко в небо, где становится холоднее. Пар охлаждается и превращается в крошечные капельки воды или кристаллики льда — так образуются облака.',
    facts: [
      'Облако может весить от нескольких сотен до миллиона тонн!',
      'Капельки в облаке настолько малы (0,01 мм), что падают очень медленно',
      'Для образования капель нужна «затравка» — пылинки или частицы соли',
    ],
    color: '#94a3b8',
  },
  precipitation: {
    title: 'Осадки',
    emoji: '🌧️',
    description: 'Когда капельки в облаке становятся слишком тяжёлыми, они падают на землю в виде дождя, снега, града или измороси.',
    facts: [
      'Капля дождя падает со скоростью около 30 км/ч',
      'Снежинка — это ледяной кристалл с шестью лучами',
      'В мире выпадает около 505 000 км³ осадков в год',
    ],
    color: '#3b82f6',
  },
  runoff: {
    title: 'Сток',
    emoji: '🏞️',
    description: 'Вода, выпавшая на землю, стекает по склонам в ручьи, реки и в итоге попадает обратно в океаны и моря. Так цикл замыкается.',
    facts: [
      'Амазонка — самая полноводная река мира, она несёт 20% всей речной воды планеты',
      'Поверхностный сток формирует рельеф: создаёт долины, каньоны, ущелья',
      'Только 35% выпавших осадков возвращается в океан через реки',
    ],
    color: '#06b6d4',
  },
  infiltration: {
    title: 'Инфильтрация',
    emoji: '💧',
    description: 'Часть воды просачивается в почву и горные породы, пополняя подземные воды. Эти воды могут годами, веками и даже тысячелетиями находиться под землёй.',
    facts: [
      'Подземные воды составляют около 30% всех пресных вод Земли',
      'Вода может проходить через почву со скоростью от нескольких мм до метров в сутки',
      'Самые древние подземные воды имеют возраст более миллиона лет!',
    ],
    color: '#8b5cf6',
  },
  transpiration: {
    title: 'Транспирация',
    emoji: '🌳',
    description: 'Растения «выдыхают» воду! Они впитывают её корнями из почвы и испаряют через листья. Это похоже на испарение, но происходит через живые организмы.',
    facts: [
      'Одно большое дерево может испарить до 400 литров воды в день',
      'Транспирация — это около 10% всей влаги в атмосфере',
      'Леса — важнейшие «фабрики» влаги, они создают свой микроклимат',
    ],
    color: '#10b981',
  },
}

const quizQuestions = [
  {
    question: 'Какой этап круговорота воды происходит при нагреве воды солнцем?',
    options: ['Конденсация', 'Испарение', 'Осадки', 'Инфильтрация'],
    correct: 1,
  },
  {
    question: 'Что такое конденсация?',
    options: [
      'Вода стекает по склонам',
      'Растения испаряют воду',
      'Водяной пар превращается в капли в облаках',
      'Вода просачивается в почву',
    ],
    correct: 2,
  },
  {
    question: 'Сколько процентов воды на Земле — пресная?',
    options: ['50%', '25%', 'около 3%', '10%'],
    correct: 2,
  },
  {
    question: 'Как называется процесс, при котором растения «выдыхают» воду?',
    options: ['Фотосинтез', 'Транспирация', 'Инфильтрация', 'Сублимация'],
    correct: 1,
  },
  {
    question: 'Откуда берётся основная часть водяного пара в атмосфере?',
    options: ['Из вулканов', 'Из рек', 'Из океанов', 'Из ледников'],
    correct: 2,
  },
]

export default function App() {
  const [activeStage, setActiveStage] = useState<Stage>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleStageClick = (stage: Stage) => {
    setActiveStage(stage)
  }

  const handleQuizAnswer = (idx: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    if (idx === quizQuestions[quizStep].correct) {
      setScore(score + 1)
    }
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
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50 font-[Nunito]">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-5 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3">
              💧 Круговорот воды в природе
            </h1>
            <p className="text-blue-100 mt-1 text-sm md:text-base">
              Интерактивное пространство для юных исследователей
            </p>
          </div>
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-white text-blue-600 font-bold px-5 py-2.5 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            🧠 Пройти викторину
          </button>
        </div>
      </header>

      {/* Main scene */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-center text-slate-700 mb-4 text-sm md:text-base">
          👆 Нажимай на элементы сцены, чтобы узнать больше о каждом этапе круговорота!
        </p>

        <div className="relative w-full bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <svg viewBox="0 0 1000 600" className="w-full h-auto block">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
              <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
              <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="40%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <radialGradient id="sunGrad">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="60%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#f59e0b" />
              </radialGradient>
              <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e40af" />
              </marker>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#047857" />
              </marker>
              <marker id="arrowPurple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
              </marker>
              <marker id="arrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0891b2" />
              </marker>
            </defs>

            {/* Sky */}
            <rect width="1000" height="600" fill="url(#skyGrad)" />

            {/* Sun */}
            <g onClick={() => handleStageClick('evaporation')} style={{ cursor: 'pointer' }}>
              <circle cx="130" cy="100" r="55" fill="url(#sunGrad)" opacity="0.3">
                <animate attributeName="r" values="55;65;55" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="130" cy="100" r="42" fill="url(#sunGrad)" />
              {/* Sun rays */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="130"
                  y1="100"
                  x2={130 + Math.cos((i * 30 * Math.PI) / 180) * 75}
                  y2={100 + Math.sin((i * 30 * Math.PI) / 180) * 75}
                  stroke="#facc15"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.7"
                >
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                </line>
              ))}
              <text x="130" y="195" textAnchor="middle" fontSize="16" fontWeight="800" fill="#92400e">☀️ СОЛНЦЕ</text>
            </g>

            {/* Clouds */}
            <g onClick={() => handleStageClick('condensation')} style={{ cursor: 'pointer' }}>
              <g>
                <animateTransform attributeName="transform" type="translate" values="0,0; 15,0; 0,0" dur="8s" repeatCount="indefinite" />
                <ellipse cx="500" cy="90" rx="70" ry="25" fill="white" />
                <ellipse cx="470" cy="80" rx="40" ry="25" fill="white" />
                <ellipse cx="530" cy="75" rx="45" ry="28" fill="white" />
                <ellipse cx="500" cy="70" rx="35" ry="22" fill="#f8fafc" />
              </g>
              <g>
                <animateTransform attributeName="transform" type="translate" values="0,0; -10,0; 0,0" dur="10s" repeatCount="indefinite" />
                <ellipse cx="750" cy="120" rx="55" ry="20" fill="white" />
                <ellipse cx="730" cy="110" rx="35" ry="22" fill="white" />
                <ellipse cx="770" cy="108" rx="38" ry="22" fill="#f8fafc" />
              </g>
              <text x="600" y="50" textAnchor="middle" fontSize="16" fontWeight="800" fill="#475569">☁️ ОБЛАКА (КОНДЕНСАЦИЯ)</text>
            </g>

            {/* Mountains */}
            <polygon points="300,420 450,200 600,420" fill="url(#mountainGrad)" />
            <polygon points="450,420 580,260 720,420" fill="url(#mountainGrad)" opacity="0.9" />
            {/* Snow caps */}
            <polygon points="420,240 450,200 480,240 465,245 450,235 435,245" fill="white" />
            <polygon points="555,295 580,260 605,295 595,300 580,290 565,300" fill="white" />

            {/* Ground / land */}
            <path d="M 0 420 Q 200 400 400 420 L 400 600 L 0 600 Z" fill="url(#groundGrad)" />
            <path d="M 600 420 Q 800 400 1000 420 L 1000 600 L 600 600 Z" fill="url(#groundGrad)" />

            {/* Sea / Ocean */}
            <path d="M 400 420 Q 500 410 600 420 L 600 600 L 400 600 Z" fill="url(#seaGrad)" />
            {/* Waves */}
            <path d="M 400 440 Q 425 435 450 440 T 500 440 T 550 440 T 600 440" stroke="white" strokeWidth="2" fill="none" opacity="0.6">
              <animate attributeName="d" values="M 400 440 Q 425 435 450 440 T 500 440 T 550 440 T 600 440;M 400 440 Q 425 445 450 440 T 500 440 T 550 440 T 600 440;M 400 440 Q 425 435 450 440 T 500 440 T 550 440 T 600 440" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M 400 470 Q 425 465 450 470 T 500 470 T 550 470 T 600 470" stroke="white" strokeWidth="2" fill="none" opacity="0.4">
              <animate attributeName="d" values="M 400 470 Q 425 465 450 470 T 500 470 T 550 470 T 600 470;M 400 470 Q 425 475 450 470 T 500 470 T 550 470 T 600 470;M 400 470 Q 425 465 450 470 T 500 470 T 550 470 T 600 470" dur="4s" repeatCount="indefinite" />
            </path>

            {/* Trees on the left */}
            <g>
              <rect x="80" y="380" width="10" height="40" fill="#78350f" />
              <circle cx="85" cy="375" r="25" fill="#16a34a" />
              <circle cx="75" cy="385" r="20" fill="#15803d" />
              <circle cx="95" cy="385" r="20" fill="#166534" />
            </g>
            <g>
              <rect x="200" y="390" width="8" height="30" fill="#78350f" />
              <circle cx="204" cy="385" r="20" fill="#16a34a" />
              <circle cx="195" cy="392" r="16" fill="#15803d" />
            </g>
            <g>
              <rect x="320" y="385" width="10" height="35" fill="#78350f" />
              <circle cx="325" cy="380" r="22" fill="#16a34a" />
              <circle cx="315" cy="388" r="18" fill="#15803d" />
            </g>

            {/* Trees on the right */}
            <g>
              <rect x="680" y="385" width="10" height="35" fill="#78350f" />
              <circle cx="685" cy="380" r="22" fill="#16a34a" />
              <circle cx="695" cy="388" r="18" fill="#15803d" />
            </g>
            <g>
              <rect x="820" y="390" width="8" height="30" fill="#78350f" />
              <circle cx="824" cy="385" r="20" fill="#16a34a" />
            </g>
            <g>
              <rect x="920" y="385" width="10" height="35" fill="#78350f" />
              <circle cx="925" cy="380" r="22" fill="#16a34a" />
              <circle cx="915" cy="388" r="18" fill="#15803d" />
            </g>

            {/* River flowing from mountain to sea */}
            <g onClick={() => handleStageClick('runoff')} style={{ cursor: 'pointer' }}>
              <path
                d="M 500 420 Q 520 450 540 480 Q 555 510 530 540 Q 510 570 500 600"
                stroke="#38bdf8"
                strokeWidth="14"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 500 420 Q 520 450 540 480 Q 555 510 530 540 Q 510 570 500 600"
                stroke="white"
                strokeWidth="3"
                fill="none"
                opacity="0.5"
                strokeDasharray="8 8"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="580" y="500" fontSize="14" fontWeight="800" fill="#0c4a6e">🏞️ РЕЧНОЙ СТОК</text>
            </g>

            {/* Rain drops */}
            <g onClick={() => handleStageClick('precipitation')} style={{ cursor: 'pointer' }}>
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1={440 + (i % 6) * 20}
                  y1={140 + Math.floor(i / 6) * 30}
                  x2={440 + (i % 6) * 20}
                  y2={155 + Math.floor(i / 6) * 30}
                  stroke="#1e40af"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.8"
                >
                  <animate
                    attributeName="y1"
                    values={`${140 + Math.floor(i / 6) * 30};${280 + Math.floor(i / 6) * 30}`}
                    dur={`${1 + (i % 3) * 0.3}s`}
                    begin={`${i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y2"
                    values={`${155 + Math.floor(i / 6) * 30};${295 + Math.floor(i / 6) * 30}`}
                    dur={`${1 + (i % 3) * 0.3}s`}
                    begin={`${i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0.8;0"
                    dur={`${1 + (i % 3) * 0.3}s`}
                    begin={`${i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </line>
              ))}
              <text x="480" y="320" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1e3a8a">🌧️ ОСАДКИ</text>
            </g>

            {/* Evaporation arrows (from sea up) */}
            <g onClick={() => handleStageClick('evaporation')} style={{ cursor: 'pointer' }}>
              {[...Array(5)].map((_, i) => (
                <g key={i}>
                  <circle
                    cx={430 + i * 35}
                    cy={430}
                    r="4"
                    fill="#fbbf24"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="cy"
                      values="430;300;200"
                      dur={`${3 + i * 0.3}s`}
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.5;0"
                      dur={`${3 + i * 0.3}s`}
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="4;6;3"
                      dur={`${3 + i * 0.3}s`}
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
              <text x="500" y="410" textAnchor="middle" fontSize="14" fontWeight="800" fill="#92400e">🌊 ИСПАРЕНИЕ</text>
            </g>

            {/* Transpiration arrows (from trees up) */}
            <g onClick={() => handleStageClick('transpiration')} style={{ cursor: 'pointer' }}>
              {[85, 204, 325, 685, 824, 925].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={370}
                  r="3"
                  fill="#10b981"
                  opacity="0.7"
                >
                  <animate
                    attributeName="cy"
                    values="370;280;200"
                    dur={`${3 + i * 0.2}s`}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0.4;0"
                    dur={`${3 + i * 0.2}s`}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              <text x="85" y="345" textAnchor="middle" fontSize="13" fontWeight="800" fill="#065f46">🌳 ТРАНС</text>
              <text x="85" y="360" textAnchor="middle" fontSize="13" fontWeight="800" fill="#065f46">ПИРАЦИЯ</text>
            </g>

            {/* Infiltration arrows (into ground) */}
            <g onClick={() => handleStageClick('infiltration')} style={{ cursor: 'pointer' }}>
              {[100, 250, 700, 850].map((x, i) => (
                <g key={i}>
                  <circle cx={x} cy={430} r="3" fill="#8b5cf6" opacity="0.8">
                    <animate
                      attributeName="cy"
                      values="430;500;570"
                      dur={`${3 + i * 0.3}s`}
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.4;0"
                      dur={`${3 + i * 0.3}s`}
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
              <text x="200" y="560" textAnchor="middle" fontSize="14" fontWeight="800" fill="#5b21b6">💧 ИНФИЛЬТРАЦИЯ</text>
              <text x="200" y="578" textAnchor="middle" fontSize="12" fill="#5b21b6">(подземные воды)</text>
            </g>

            {/* Big cycle arrows */}
            {/* Evaporation: sea -> cloud */}
            <path
              d="M 480 380 Q 400 250 500 150"
              stroke="#1e40af"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="8 6"
              markerEnd="url(#arrowBlue)"
              opacity="0.9"
            >
              <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.5s" repeatCount="indefinite" />
            </path>

            {/* Cloud -> precipitation */}
            <path
              d="M 520 130 Q 540 200 500 280"
              stroke="#1e40af"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="8 6"
              markerEnd="url(#arrowBlue)"
              opacity="0.9"
            >
              <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.5s" repeatCount="indefinite" />
            </path>

            {/* Runoff: mountain -> sea */}
            <path
              d="M 560 430 Q 540 470 520 500"
              stroke="#0891b2"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="8 6"
              markerEnd="url(#arrowCyan)"
              opacity="0.9"
            >
              <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.5s" repeatCount="indefinite" />
            </path>

            {/* Transpiration: trees -> cloud */}
            <path
              d="M 300 350 Q 350 250 450 140"
              stroke="#047857"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="8 6"
              markerEnd="url(#arrowGreen)"
              opacity="0.9"
            >
              <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.5s" repeatCount="indefinite" />
            </path>

            {/* Infiltration: ground -> underground */}
            <path
              d="M 150 430 L 150 540"
              stroke="#7c3aed"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="8 6"
              markerEnd="url(#arrowPurple)"
              opacity="0.9"
            >
              <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.5s" repeatCount="indefinite" />
            </path>

          </svg>
        </div>

        {/* Cycle chain */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-5 border-2 border-blue-100">
          <h2 className="text-xl font-black text-slate-800 mb-3 text-center">🔄 Цепочка круговорота</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base">
            {[
              { key: 'evaporation', label: 'Испарение', emoji: '🌊' },
              { key: 'condensation', label: 'Конденсация', emoji: '☁️' },
              { key: 'precipitation', label: 'Осадки', emoji: '🌧️' },
              { key: 'runoff', label: 'Сток', emoji: '🏞️' },
              { key: 'infiltration', label: 'Инфильтрация', emoji: '💧' },
              { key: 'transpiration', label: 'Транспирация', emoji: '🌳' },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  onClick={() => handleStageClick(s.key as Stage)}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 font-bold text-slate-700 transition-all hover:scale-105"
                >
                  {s.emoji} {s.label}
                </button>
                {i < 5 && <span className="text-blue-400 text-xl">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Info panel */}
        {info && (
          <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 border-l-8 animate-fade-in" style={{ borderLeftColor: info.color }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-[250px]">
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
                  <span className="text-4xl">{info.emoji}</span>
                  {info.title}
                </h2>
                <p className="mt-3 text-slate-700 text-base md:text-lg leading-relaxed">
                  {info.description}
                </p>
              </div>
              <button
                onClick={() => setActiveStage(null)}
                className="text-slate-400 hover:text-slate-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="mt-5">
              <h3 className="font-black text-slate-800 mb-2">🌟 Интересные факты:</h3>
              <ul className="space-y-2">
                {info.facts.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-lg">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Water stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-5 shadow-lg">
            <div className="text-4xl mb-2">🌍</div>
            <div className="text-3xl font-black">97%</div>
            <div className="text-blue-100 text-sm">воды на Земле — солёная (океаны)</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 text-white rounded-2xl p-5 shadow-lg">
            <div className="text-4xl mb-2">🧊</div>
            <div className="text-3xl font-black">2%</div>
            <div className="text-cyan-100 text-sm">пресной воды заперто в ледниках</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl p-5 shadow-lg">
            <div className="text-4xl mb-2">💧</div>
            <div className="text-3xl font-black">~1%</div>
            <div className="text-emerald-100 text-sm">пресной воды доступно людям и природе</div>
          </div>
        </div>

        {/* Fun facts */}
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-100">
          <h2 className="text-2xl font-black text-slate-800 mb-4 text-center">✨ Удивительные факты о воде</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { emoji: '🦕', text: 'Вода, которую ты пьёшь сегодня, та же самая, что пили динозавры миллионы лет назад! Круговорот воды постоянно её очищает.' },
              { emoji: '🚶', text: 'Человек на 60% состоит из воды. Мозг — на 75%, а кровь — на 92%.' },
              { emoji: '🌊', text: 'В мировом океане столько воды, что если бы ею покрыть всю Землю, слой был бы глубиной около 3 км!' },
              { emoji: '⏳', text: 'Капля воды может «путешествовать» в круговороте от нескольких дней до миллионов лет.' },
              { emoji: '🌡️', text: 'Вода — единственное вещество на Земле, которое в природе встречается сразу в трёх состояниях: жидком, твёрдом и газообразном.' },
              { emoji: '🏔️', text: 'Самые старые ледники Антарктиды содержат лёд возрастом более 800 000 лет!' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">{f.emoji}</div>
                <p className="text-slate-700 text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-500 text-sm pb-6">
          <p>💡 Нажимай на элементы схемы, чтобы узнать больше! 🌍</p>
        </footer>
      </div>

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
                    Вопрос {quizStep + 1} / {quizQuestions.length}
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
                      else cls = 'bg-slate-50 border-slate-200 text-slate-500'
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(i)}
                        className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${cls}`}
                      >
                        <span className="mr-2">{String.fromCharCode(65 + i)}.</span>
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
                  Ты ответил правильно на <span className="font-black text-blue-600">{score}</span> из{' '}
                  <span className="font-black">{quizQuestions.length}</span> вопросов
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
