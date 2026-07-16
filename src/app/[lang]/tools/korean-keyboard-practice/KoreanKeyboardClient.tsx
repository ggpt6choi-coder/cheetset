'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Keyboard, RotateCcw, Share2, Award, Clock, Activity, Volume2, VolumeX } from 'lucide-react';

const WORDS_100 = [
  "하늘", "바다", "구름", "바람", "나무", "꽃잎", "사랑", "행복", "햇살", "별빛",
  "노래", "강아지", "고양이", "아침", "저녁", "컴퓨터", "키보드", "마우스", "모니터", "프로그래머",
  "스마트폰", "인터넷", "웹사이트", "데이터", "소프트웨어", "개발자", "디자인", "연습", "게임", "시작",
  "속도", "정확도", "기록", "도전", "성공", "노력", "꿈", "희망", "우정", "가족",
  "친구", "학교", "공부", "독서", "도서관", "음악", "미술", "영화", "여행", "사진",
  "음식", "커피", "과일", "사과", "바나나", "딸기", "수박", "포도", "오렌지", "토마토",
  "야채", "고기", "밥", "라면", "피자", "치킨", "빵", "우유", "주스", "물",
  "봄", "여름", "가을", "겨울", "눈", "비", "무지개", "태양", "달", "지구",
  "우주", "비행기", "자동차", "자전거", "기차", "버스", "택시", "지하철", "가방", "옷",
  "신발", "안경", "시계", "우산", "연필", "공책", "책상", "의자", "침대", "거울"
];

// Hangul character sets
const CHOSEONG_KEYS = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

const JUNGSEONG_DECOMPOSED: Record<number, string[]> = {
  0: ['ㅏ'], 1: ['ㅐ'], 2: ['ㅑ'], 3: ['ㅒ'], 4: ['ㅓ'], 5: ['ㅔ'], 6: ['ㅕ'], 7: ['ㅖ'],
  8: ['ㅗ'], 9: ['ㅗ', 'ㅏ'], 10: ['ㅗ', 'ㅐ'], 11: ['ㅗ', 'ㅣ'], 12: ['ㅛ'],
  13: ['ㅜ'], 14: ['ㅜ', 'ㅓ'], 15: ['ㅜ', 'ㅔ'], 16: ['ㅜ', 'ㅣ'], 17: ['ㅠ'], 18: ['ㅡ'], 19: ['ㅡ', 'ㅣ'], 20: ['ㅣ']
};

const JONGSEONG_DECOMPOSED: Record<number, string[]> = {
  0: [], 1: ['ㄱ'], 2: ['ㄲ'], 3: ['ㄱ', 'ㅅ'], 4: ['ㄴ'], 5: ['ㄴ', 'ㅈ'], 6: ['ㄴ', 'ㅎ'],
  7: ['ㄷ'], 8: ['ㄹ'], 9: ['ㄹ', 'ㄱ'], 10: ['ㄹ', 'ㅁ'], 11: ['ㄹ', 'ㅂ'], 12: ['ㄹ', 'ㅅ'],
  13: ['ㄹ', 'ㅌ'], 14: ['ㄹ', 'ㅍ'], 15: ['ㄹ', 'ㅎ'], 16: ['ㅁ'], 17: ['ㅂ'], 18: ['ㅂ', 'ㅅ'],
  19: ['ㅅ'], 20: ['ㅆ'], 21: ['ㅇ'], 22: ['ㅈ'], 23: ['ㅊ'], 24: ['ㅋ'], 25: ['ㅌ'], 26: ['ㅍ'], 27: ['ㅎ']
};

interface KeyboardKey {
  code: string;
  char: string;
  shiftChar?: string;
  isModifier?: boolean;
}

// Dubeolsik standard keyboard rows
const KEYBOARD_LAYOUT: KeyboardKey[][] = [
  [
    { code: 'KeyQ', char: 'ㅂ', shiftChar: 'ㅃ' },
    { code: 'KeyW', char: 'ㅈ', shiftChar: 'ㅉ' },
    { code: 'KeyE', char: 'ㄷ', shiftChar: 'ㄸ' },
    { code: 'KeyR', char: 'ㄱ', shiftChar: 'ㄲ' },
    { code: 'KeyT', char: 'ㅅ', shiftChar: 'ㅆ' },
    { code: 'KeyY', char: '요' }, // Compatibility jamo helper
    { code: 'KeyU', char: 'ㅕ' },
    { code: 'KeyI', char: 'ㅑ' },
    { code: 'KeyO', char: 'ㅐ', shiftChar: 'ㅒ' },
    { code: 'KeyP', char: 'ㅔ', shiftChar: 'ㅖ' },
  ],
  [
    { code: 'KeyA', char: 'ㅁ' },
    { code: 'KeyS', char: 'ㄴ' },
    { code: 'KeyD', char: 'ㅇ' },
    { code: 'KeyF', char: 'ㄹ' },
    { code: 'KeyG', char: 'ㅎ' },
    { code: 'KeyH', char: 'ㅗ' },
    { code: 'KeyJ', char: 'ㅓ' },
    { code: 'KeyK', char: 'ㅏ' },
    { code: 'KeyL', char: 'ㅣ' },
  ],
  [
    { code: 'ShiftLeft', char: 'Shift', isModifier: true },
    { code: 'KeyZ', char: 'ㅋ' },
    { code: 'KeyX', char: 'ㅌ' },
    { code: 'KeyC', char: 'ㅊ' },
    { code: 'KeyV', char: 'ㅍ' },
    { code: 'KeyB', char: 'ㅠ' },
    { code: 'KeyN', char: 'ㅜ' },
    { code: 'KeyM', char: 'ㅡ' },
    { code: 'Backspace', char: 'Backspace', isModifier: true },
  ],
  [
    { code: 'Space', char: 'Space', isModifier: true }
  ]
];

// Normalize layout keys: map '요' -> 'ㅛ' in Dubeolsik representation
const layoutNormalized = KEYBOARD_LAYOUT.map(row => 
  row.map(key => {
    if (key.char === '요') return { ...key, char: 'ㅛ' };
    return key;
  })
);

function decomposeToKeyboardKeys(text: string): string[] {
  const result: string[] = [];
  
  const COMPAT_MAP: Record<string, string[]> = {
    'ㄳ': ['ㄱ', 'ㅅ'],
    'ㄵ': ['ㄴ', 'ㅈ'],
    'ㄶ': ['ㄴ', 'ㅎ'],
    'ㄺ': ['ㄹ', 'ㄱ'],
    'ㄻ': ['ㄹ', 'ㅁ'],
    'ㄼ': ['ㄹ', 'ㅂ'],
    'ㄽ': ['ㄹ', 'ㅅ'],
    'ㄾ': ['ㄹ', 'ㅌ'],
    'ㄿ': ['ㄹ', 'ㅍ'],
    'ㅀ': ['ㄹ', 'ㅎ'],
    'ㅄ': ['ㅂ', 'ㅅ'],
    'ㅘ': ['ㅗ', 'ㅏ'],
    'ㅙ': ['ㅗ', 'ㅐ'],
    'ㅚ': ['ㅗ', 'ㅣ'],
    'ㅝ': ['ㅜ', 'ㅓ'],
    'ㅞ': ['ㅜ', 'ㅔ'],
    'ㅟ': ['ㅜ', 'ㅣ'],
    'ㅢ': ['ㅡ', 'ㅣ'],
    'ㅛ': ['ㅛ'],
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);
    
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const offset = code - 0xAC00;
      const cho = Math.floor(offset / (28 * 21));
      const jung = Math.floor((offset / 28) % 21);
      const jong = offset % 28;

      result.push(CHOSEONG_KEYS[cho]);
      result.push(...(JUNGSEONG_DECOMPOSED[jung] || []));
      if (jong > 0) {
        result.push(...(JONGSEONG_DECOMPOSED[jong] || []));
      }
    } else if (COMPAT_MAP[char]) {
      result.push(...COMPAT_MAP[char]);
    } else {
      result.push(char);
    }
  }
  return result;
}

function getKeyCodeForJaso(jaso: string): string | null {
  for (const row of layoutNormalized) {
    for (const key of row) {
      if (key.char === jaso || key.shiftChar === jaso) {
        return key.code;
      }
    }
  }
  return null;
}

function getHighlightedKeys(
  inputValue: string,
  currentWord: string
): Set<string> {
  const highlighted = new Set<string>();
  
  const targetKeys = decomposeToKeyboardKeys(currentWord);
  const inputKeys = decomposeToKeyboardKeys(inputValue);
  
  let isPrefixMatch = true;
  for (let i = 0; i < inputKeys.length; i++) {
    if (targetKeys[i] !== inputKeys[i]) {
      isPrefixMatch = false;
      break;
    }
  }
  
  if (!isPrefixMatch) {
    highlighted.add('Backspace');
  } else if (inputValue === currentWord) {
    highlighted.add('Space');
  } else if (inputKeys.length < targetKeys.length) {
    const nextJaso = targetKeys[inputKeys.length];
    
    const shiftKeys = ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅒ', 'ㅖ'];
    if (shiftKeys.includes(nextJaso)) {
      highlighted.add('ShiftLeft');
      const baseMap: Record<string, string> = {
        'ㅃ': 'ㅂ', 'ㅉ': 'ㅈ', 'ㄸ': 'ㄷ', 'ㄲ': 'ㄱ', 'ㅆ': 'ㅅ', 'ㅒ': 'ㅐ', 'ㅖ': 'ㅔ'
      };
      const baseJaso = baseMap[nextJaso];
      const code = getKeyCodeForJaso(baseJaso);
      if (code) highlighted.add(code);
    } else {
      const code = getKeyCodeForJaso(nextJaso);
      if (code) highlighted.add(code);
    }
  }
  
  return highlighted;
}

// Synthesize typing clicks using Web Audio API
const playKeySound = (type: 'normal' | 'backspace' | 'space') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const bufferSize = ctx.sampleRate * 0.03; // 30ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    
    if (type === 'normal') {
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);
    } else if (type === 'backspace') {
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);
    } else {
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);
    }
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(type === 'space' ? 0.07 : 0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (type === 'space' ? 0.025 : 0.02));
    
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    source.start();
  } catch (e) {
    // Silent fail on browser policy
  }
};

const playSuccessSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const playNote = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.06, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };
    
    const t = ctx.currentTime;
    playNote(523.25, t, 0.15);       // C5
    playNote(659.25, t + 0.15, 0.15); // E5
    playNote(783.99, t + 0.3, 0.15);  // G5
    playNote(1046.50, t + 0.45, 0.35); // C6
  } catch (e) {
    // Ignore audio issues
  }
};

interface KoreanKeyboardClientProps {
  labels: {
    title: string;
    description: string;
    start_game: string;
    cpm: string;
    accuracy: string;
    time_left: string;
    current_word: string;
    next_word: string;
    type_here: string;
    game_over: string;
    final_cpm: string;
    final_accuracy: string;
    total_time: string;
    retry: string;
    share_result: string;
    share_message: string;
    copied: string;
  };
}

export default function KoreanKeyboardClient({ labels }: KoreanKeyboardClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctWordCount, setCorrectWordCount] = useState(0);
  
  // Real-time statistics tracking
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cpmHistory, setCpmHistory] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shake, setShake] = useState(false);
  const [showShareAlert, setShowShareAlert] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Timer Hook
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && startTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, startTime]);

  // Keep input focused automatically
  useEffect(() => {
    if (isPlaying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isPlaying]);

  const currentWord = WORDS_100[currentIndex] || '';
  const nextWord = WORDS_100[currentIndex + 1] || '';

  // Decompose values to find highlighted keyboard keys
  const activeKeys = useMemo(() => {
    if (isFinished || !isPlaying) return new Set<string>();
    return getHighlightedKeys(inputValue, currentWord);
  }, [inputValue, currentWord, isPlaying, isFinished]);

  // Check prefix compatibility to flag errors in real-time
  const isInputCorrectSoFar = useMemo(() => {
    if (!inputValue) return true;
    const targetKeys = decomposeToKeyboardKeys(currentWord);
    const inputKeys = decomposeToKeyboardKeys(inputValue);
    return inputKeys.every((key, index) => targetKeys[index] === key);
  }, [inputValue, currentWord]);

  // Dynamic calculations
  const cpm = useMemo(() => {
    if (elapsedTime <= 0) return 0;
    return Math.round((correctKeystrokes * 60) / elapsedTime);
  }, [correctKeystrokes, elapsedTime]);

  const accuracy = useMemo(() => {
    if (totalKeystrokes <= 0) return 100;
    return Math.min(100, Math.round((correctKeystrokes / totalKeystrokes) * 1000) / 10);
  }, [correctKeystrokes, totalKeystrokes]);

  const handleStart = () => {
    setCurrentIndex(0);
    setInputValue('');
    setCorrectWordCount(0);
    setCorrectKeystrokes(0);
    setTotalKeystrokes(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setCpmHistory([0]);
    setIsPlaying(true);
    setIsFinished(false);
    setShowShareAlert(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else {
      if (soundEnabled) {
        if (e.key === 'Backspace') {
          playKeySound('backspace');
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          playKeySound('normal');
        }
      }
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim() === '') return;

    if (soundEnabled) {
      playKeySound('space');
    }

    const isCorrect = inputValue === currentWord;
    const targetKeys = decomposeToKeyboardKeys(currentWord);
    const inputKeys = decomposeToKeyboardKeys(inputValue);

    if (isCorrect) {
      setCorrectWordCount(prev => prev + 1);
      setCorrectKeystrokes(prev => prev + targetKeys.length);
      setTotalKeystrokes(prev => prev + targetKeys.length);
    } else {
      setTotalKeystrokes(prev => prev + inputKeys.length);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }

    // Chart timeline: record every 5 words
    if ((currentIndex + 1) % 5 === 0 || currentIndex === 99) {
      const timeSpent = startTime ? (Date.now() - startTime) / 1000 : 0;
      const currentCorrectStrokes = correctKeystrokes + (isCorrect ? targetKeys.length : 0);
      const calculatedCpm = timeSpent > 0 ? Math.round((currentCorrectStrokes * 60) / timeSpent) : 0;
      setCpmHistory(prev => [...prev, calculatedCpm]);
    }

    setInputValue('');

    if (currentIndex === 99) {
      setIsFinished(true);
      setIsPlaying(false);
      if (soundEnabled) {
        playSuccessSound();
      }
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleShare = () => {
    const finalAccuracy = totalKeystrokes <= 0 ? 100 : Math.min(100, Math.round((correctKeystrokes / totalKeystrokes) * 1000) / 10);
    const finalCpm = elapsedTime > 0 ? Math.round((correctKeystrokes * 60) / elapsedTime) : 0;
    
    const message = labels.share_message
      .replace('{cpm}', finalCpm.toString())
      .replace('{accuracy}', finalAccuracy.toString())
      .replace('{time}', elapsedTime.toString());
      
    navigator.clipboard.writeText(message + '\nhttps://www.cheetset.com/tools/korean-keyboard-practice');
    setShowShareAlert(true);
    setTimeout(() => setShowShareAlert(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // SVG Line Chart Builder
  const chartSvgPath = useMemo(() => {
    if (cpmHistory.length < 2) return { line: '', area: '' };
    
    const width = 500;
    const height = 120;
    const maxVal = Math.max(...cpmHistory, 300);
    const stepX = width / (cpmHistory.length - 1);
    
    const points = cpmHistory.map((val, idx) => {
      const x = idx * stepX;
      const y = height - (val / maxVal) * (height - 24) - 12;
      return { x, y };
    });
    
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
    
    return { line: linePath, area: areaPath };
  }, [cpmHistory]);

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in" onClick={() => isPlaying && inputRef.current?.focus()}>
      {/* Sound & Title Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all">
        <div className="text-left w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Keyboard className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {labels.title}
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {labels.description}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSoundEnabled(prev => !prev);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
            soundEnabled 
              ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-800/40 dark:text-indigo-400' 
              : 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          {soundEnabled ? 'Click Sound ON' : 'Click Sound OFF'}
        </button>
      </div>

      {!isPlaying && !isFinished ? (
        /* Start Screen */
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-200 dark:border-gray-700/80 shadow-md text-center">
          <div className="w-20 h-20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Keyboard className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            한글 키보드 속도 & 정확도 챌린지
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            자주 사용하는 실생활 한글 단어 100개를 순서대로 따라치면서 타속을 확인하세요.
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-lg rounded-2xl shadow-lg shadow-indigo-600/30 dark:shadow-none transition-all duration-150"
          >
            {labels.start_game}
          </button>
        </div>
      ) : isFinished ? (
        /* Results Screen */
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700/80 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {labels.game_over}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 text-center">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{labels.final_cpm}</p>
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {cpm} <span className="text-lg font-medium text-gray-500">타</span>
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 text-center">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{labels.final_accuracy}</p>
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {accuracy}%
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 text-center">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{labels.total_time}</p>
              <p className="text-3xl font-extrabold text-gray-700 dark:text-gray-200">
                {formatTime(elapsedTime)}
              </p>
            </div>
          </div>

          {/* Performance Timeline Chart */}
          {cpmHistory.length > 1 && (
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-indigo-500" />
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">구간별 타속 변동 추이</h4>
              </div>
              <div className="relative w-full h-[150px] flex items-center justify-center">
                <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cpmGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="12" x2="500" y2="12" stroke="#e5e7eb" strokeDasharray="3 3" className="dark:stroke-gray-700" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#e5e7eb" strokeDasharray="3 3" className="dark:stroke-gray-700" />
                  <line x1="0" y1="108" x2="500" y2="108" stroke="#e5e7eb" strokeDasharray="3 3" className="dark:stroke-gray-700" />
                  
                  {/* Chart Areas */}
                  <path d={chartSvgPath.area} fill="url(#cpmGrad)" />
                  <path d={chartSvgPath.line} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Dot on final value */}
                  {cpmHistory.length > 0 && (
                    <circle
                      cx="500"
                      cy={(120 - (cpmHistory[cpmHistory.length - 1] / Math.max(...cpmHistory, 300)) * 96 - 12).toFixed(1)}
                      r="4.5"
                      fill="#6366f1"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 px-1">
                <span>시작</span>
                <span>진행 50%</span>
                <span>완료</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleStart}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl shadow-md transition-all duration-150"
            >
              <RotateCcw className="w-4 h-4" />
              {labels.retry}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 active:scale-95 text-gray-700 dark:text-gray-200 font-bold rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-150"
            >
              <Share2 className="w-4 h-4" />
              {labels.share_result}
            </button>
          </div>
          
          {showShareAlert && (
            <div className="mt-4 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
              {labels.copied}
            </div>
          )}
        </div>
      ) : (
        /* Active Game Play Screen */
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700/80 shadow-md">
          {/* Top progress and stats row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-400 block leading-none">{labels.cpm}</span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{cpm}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-400 block leading-none">{labels.accuracy}</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{accuracy}%</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-400 block leading-none">Progress</span>
                <span className="text-lg font-bold text-gray-600 dark:text-gray-200">{currentIndex + 1} / 100</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-10">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${currentIndex + 1}%` }}
            />
          </div>

          {/* Typing Area */}
          <div className="max-w-xl mx-auto text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-500/80 block mb-2">
              {labels.current_word}
            </span>
            <div className="mb-4 relative">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-wide select-none drop-shadow-sm">
                {currentWord}
              </h1>
            </div>
            
            {/* Next Word Preview */}
            {nextWord && (
              <div className="flex items-center justify-center gap-1.5 text-sm text-gray-400 mb-8 opacity-75">
                <span className="font-semibold">{labels.next_word}:</span>
                <span className="font-bold text-gray-500 dark:text-gray-300">{nextWord}</span>
              </div>
            )}

            {/* Input Element */}
            <div className={`relative max-w-md mx-auto ${shake ? 'animate-shake' : ''}`}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!startTime && val.length > 0) {
                    setStartTime(Date.now());
                    setIsPlaying(true);
                  }
                  setInputValue(val);
                }}
                onKeyDown={handleKeyDown}
                placeholder={labels.type_here}
                className={`w-full px-6 py-4 text-center text-2xl font-bold rounded-2xl border-2 shadow-sm focus:outline-none transition-all duration-150 bg-gray-50/50 dark:bg-gray-900/40 ${
                  inputValue === ''
                    ? 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
                    : isInputCorrectSoFar
                    ? 'border-emerald-400 dark:border-emerald-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-red-600 dark:text-red-400'
                }`}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Virtual Keyboard Guide */}
          <div className="w-full max-w-2xl mx-auto p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-150 dark:border-gray-700/40 shadow-inner mt-8">
            <div className="flex flex-col gap-1.5">
              {layoutNormalized.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1 w-full">
                  {row.map((key) => {
                    const isHighlighted = activeKeys.has(key.code);
                    const isShift = key.char === 'Shift';
                    const isBackspace = key.char === 'Backspace';
                    const isSpace = key.char === 'Space';
                    
                    let btnClass = "flex items-center justify-center text-[13px] font-bold rounded-lg select-none transition-all duration-100 h-10 ";
                    
                    if (isSpace) {
                      btnClass += "w-48 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 shadow-sm";
                    } else if (isShift) {
                      btnClass += "w-16 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 shadow-sm";
                    } else if (isBackspace) {
                      btnClass += "w-16 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 shadow-sm";
                    } else {
                      btnClass += "w-9 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 shadow-sm";
                    }
                    
                    if (isHighlighted) {
                      if (isBackspace) {
                        btnClass += " !bg-red-500 !text-white !border-red-500 shadow-md ring-2 ring-red-400/30 scale-95";
                      } else {
                        btnClass += " !bg-amber-400 dark:!bg-amber-500 !text-gray-900 dark:!text-white !border-amber-400 dark:!border-amber-500 shadow-md ring-2 ring-amber-400/30 scale-95";
                      }
                    }
                    
                    return (
                      <div
                        key={key.code}
                        className={btnClass}
                      >
                        {isSpace ? 'Space' : isBackspace ? 'Backspace' : isShift ? 'Shift' : (
                          <div className="flex flex-col items-center justify-center leading-none">
                            {key.shiftChar && (
                              <span className={`text-[9px] font-medium leading-none mb-0.5 ${isHighlighted && activeKeys.has('ShiftLeft') ? 'text-amber-100' : 'opacity-40'}`}>
                                {key.shiftChar}
                              </span>
                            )}
                            <span className="leading-none">{key.char}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global CSS Inject for Shake Animation */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-6px); }
          30%, 60%, 90% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
