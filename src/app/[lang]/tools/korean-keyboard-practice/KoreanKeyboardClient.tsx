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

const JAMO_LIST = [
  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ',
  'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', '요', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ',
  'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅝ', 'ㅢ'
];

interface FingerMapping {
  finger: string;
  hand: 'left' | 'right' | 'both';
  color: string;
}

const KEY_FINGER_MAP: Record<string, FingerMapping> = {
  // Left Hand
  // Pinky (L5)
  'KeyQ': { finger: 'L5', hand: 'left', color: '#ec4899' },
  'KeyA': { finger: 'L5', hand: 'left', color: '#ec4899' },
  'KeyZ': { finger: 'L5', hand: 'left', color: '#ec4899' },
  'ShiftLeft': { finger: 'L5', hand: 'left', color: '#ec4899' },
  
  // Ring (L4)
  'KeyW': { finger: 'L4', hand: 'left', color: '#a855f7' },
  'KeyS': { finger: 'L4', hand: 'left', color: '#a855f7' },
  'KeyX': { finger: 'L4', hand: 'left', color: '#a855f7' },
  
  // Middle (L3)
  'KeyE': { finger: 'L3', hand: 'left', color: '#3b82f6' },
  'KeyD': { finger: 'L3', hand: 'left', color: '#3b82f6' },
  'KeyC': { finger: 'L3', hand: 'left', color: '#3b82f6' },
  
  // Index (L2)
  'KeyR': { finger: 'L2', hand: 'left', color: '#10b981' },
  'KeyF': { finger: 'L2', hand: 'left', color: '#10b981' },
  'KeyV': { finger: 'L2', hand: 'left', color: '#10b981' },
  'KeyT': { finger: 'L2', hand: 'left', color: '#10b981' },
  'KeyG': { finger: 'L2', hand: 'left', color: '#10b981' },
  
  // Thumb
  'Space': { finger: 'Thumb', hand: 'both', color: '#f59e0b' },
  
  // Right Hand
  // Index (R2)
  'KeyY': { finger: 'R2', hand: 'right', color: '#10b981' },
  'KeyU': { finger: 'R2', hand: 'right', color: '#10b981' },
  'KeyH': { finger: 'R2', hand: 'right', color: '#10b981' },
  'KeyJ': { finger: 'R2', hand: 'right', color: '#10b981' },
  'KeyN': { finger: 'R2', hand: 'right', color: '#10b981' },
  'KeyB': { finger: 'R2', hand: 'right', color: '#10b981' },
  
  // Middle (R3)
  'KeyI': { finger: 'R3', hand: 'right', color: '#3b82f6' },
  'KeyK': { finger: 'R3', hand: 'right', color: '#3b82f6' },
  'KeyM': { finger: 'R3', hand: 'right', color: '#3b82f6' },
  
  // Ring (R4)
  'KeyO': { finger: 'R4', hand: 'right', color: '#a855f7' },
  'KeyL': { finger: 'R4', hand: 'right', color: '#a855f7' },
  
  // Pinky (R5)
  'KeyP': { finger: 'R5', hand: 'right', color: '#ec4899' },
  'Backspace': { finger: 'R5', hand: 'right', color: '#ec4899' }
};

const getFingerLabel = (fingerId: string, hand: 'left' | 'right' | 'both', lang: string) => {
  const isKo = lang === 'ko';
  const isJa = lang === 'ja';
  if (fingerId === 'Thumb') {
    return isKo ? '양손 엄지손가락 (Space)' : isJa ? '両親指 (Space)' : 'Both Thumbs (Space)';
  }
  const side = hand === 'left' ? (isKo ? '왼쪽' : isJa ? '左' : 'Left') : (isKo ? '오른쪽' : isJa ? '右' : 'Right');
  let fingerName = '';
  switch (fingerId) {
    case 'L5':
    case 'R5': fingerName = isKo ? '새끼손가락' : isJa ? '小指' : 'Pinky'; break;
    case 'L4':
    case 'R4': fingerName = isKo ? '약지손가락' : isJa ? '薬指' : 'Ring finger'; break;
    case 'L3':
    case 'R3': fingerName = isKo ? '중지손가락' : isJa ? '中指' : 'Middle finger'; break;
    case 'L2':
    case 'R2': fingerName = isKo ? '검지손가락' : isJa ? '人差し指' : 'Index finger'; break;
  }
  return isKo ? `${side} ${fingerName}` : isJa ? `${side}${fingerName}` : `${side} ${fingerName}`;
};

const getLocalText = (lang: string) => {
  const isKo = lang === 'ko';
  const isJa = lang === 'ja';
  return {
    tabJamo: isKo ? '1단계: 자음/모음 연습' : isJa ? '第1段階: 子音・母音' : 'Stage 1: Consonants & Vowels',
    tabWord: isKo ? '2단계: 단어 연습' : isJa ? '第2段階: 単語練習' : 'Stage 2: Word Practice',
    handGuideTitle: isKo ? '손가락 위치 가이드' : isJa ? '指の位置ガイド' : 'Finger Position Guide',
    showHandGuide: isKo ? '손 모양 가이드' : isJa ? '手の形ガイド' : 'Hand Guide',
    stage1Description: isKo 
      ? '한글 자음과 모음을 하나씩 입력하며 키보드 자판 위치를 익힙니다.' 
      : isJa 
      ? 'ハングルの子音と母音を一つずつ入力しながら、キーボードの位置を覚えます。' 
      : 'Practice typing individual Korean consonants and vowels to learn keyboard layout.',
    currentLetter: isKo ? '현재 글자' : isJa ? '現在の文字' : 'Current Letter',
    nextLetter: isKo ? '다음 글자' : isJa ? '次の文字' : 'Next Letter',
    typeLetterHere: isKo ? '자판을 누르세요...' : isJa ? 'キーを押してください...' : 'Press the key...',
  };
};

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
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
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
  } catch {
    // Silent fail on browser policy
  }
};

const playSuccessSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
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
  } catch {
    // Ignore audio issues
  }
};

interface KoreanKeyboardClientProps {
  lang?: string;
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

export default function KoreanKeyboardClient({ lang = 'ko', labels }: KoreanKeyboardClientProps) {
  const [currentTab, setCurrentTab] = useState<'jamo' | 'word'>('jamo');
  const [showHandGuide, setShowHandGuide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
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

  const localText = useMemo(() => getLocalText(lang), [lang]);
  const currentList = useMemo(() => currentTab === 'jamo' ? JAMO_LIST : WORDS_100, [currentTab]);
  const currentWord = currentList[currentIndex] || '';
  const nextWord = currentList[currentIndex + 1] || '';

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

  const activeFingerInfo = (() => {
    if (activeKeys.size === 0) return null;
    
    if (activeKeys.has('Backspace')) {
      return { finger: 'R5', hand: 'right' as const, label: `${getFingerLabel('R5', 'right', lang)} (Backspace)` };
    }
    
    if (activeKeys.has('Space')) {
      return { finger: 'Thumb', hand: 'both' as const, label: getFingerLabel('Thumb', 'both', lang) };
    }
    
    for (const key of activeKeys) {
      if (key !== 'ShiftLeft' && KEY_FINGER_MAP[key]) {
        const info = KEY_FINGER_MAP[key];
        const requiresShift = activeKeys.has('ShiftLeft');
        const fingerLabel = getFingerLabel(info.finger, info.hand, lang);
        const shiftText = requiresShift ? (lang === 'ko' ? ' (+왼쪽 새끼손가락 Shift)' : lang === 'ja' ? ' (+左小指 Shift)' : ' (+Left Pinky Shift)') : '';
        return {
          finger: info.finger,
          hand: info.hand,
          label: `${fingerLabel}${shiftText}`
        };
      }
    }
    
    if (activeKeys.has('ShiftLeft')) {
      return { finger: 'L5', hand: 'left' as const, label: `${getFingerLabel('L5', 'left', lang)} (Shift)` };
    }
    
    return null;
  })();

  // Dynamic calculations
  const cpm = useMemo(() => {
    if (elapsedTime <= 0) return 0;
    return Math.round((correctKeystrokes * 60) / elapsedTime);
  }, [correctKeystrokes, elapsedTime]);

  const accuracy = useMemo(() => {
    if (totalKeystrokes <= 0) return 100;
    return Math.min(100, Math.round((correctKeystrokes / totalKeystrokes) * 1000) / 10);
  }, [correctKeystrokes, totalKeystrokes]);

  const handleTabChange = (tab: 'jamo' | 'word') => {
    setCurrentTab(tab);
    setIsPlaying(false);
    setIsFinished(false);
    setCurrentIndex(0);
    setInputValue('');
    setCorrectKeystrokes(0);
    setTotalKeystrokes(0);
    setStartTime(null);
    setElapsedTime(0);
    setCpmHistory([0]);
  };

  const handleStart = () => {
    setCurrentIndex(0);
    setInputValue('');
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
    if (currentTab === 'word' && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      handleSubmit();
    } else if (currentTab === 'jamo' && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
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
      setCorrectKeystrokes(prev => prev + targetKeys.length);
      setTotalKeystrokes(prev => prev + targetKeys.length);
    } else {
      setTotalKeystrokes(prev => prev + inputKeys.length);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
    const finalIndex = currentList.length - 1;
    // Chart timeline: record every 5 items
    if ((currentIndex + 1) % 5 === 0 || currentIndex === finalIndex) {
      const timeSpent = startTime ? (Date.now() - startTime) / 1000 : 0;
      const currentCorrectStrokes = correctKeystrokes + (isCorrect ? targetKeys.length : 0);
      const calculatedCpm = timeSpent > 0 ? Math.round((currentCorrectStrokes * 60) / timeSpent) : 0;
      setCpmHistory(prev => [...prev, calculatedCpm]);
    }

    setInputValue('');

    if (currentIndex === finalIndex) {
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
            {currentTab === 'jamo' ? localText.stage1Description : labels.description}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowHandGuide(prev => !prev);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              showHandGuide 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-800/40 dark:text-indigo-400' 
                : 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500'
            }`}
          >
            <span className="text-base">🖐️</span>
            {localText.showHandGuide}
          </button>
          
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
      </div>

      {/* Tab Selector */}
      <div className="flex bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl mb-6 max-w-sm mx-auto border border-gray-200/50 dark:border-gray-700/60 shadow-inner">
        <button
          onClick={() => handleTabChange('jamo')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            currentTab === 'jamo'
              ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {localText.tabJamo}
        </button>
        <button
          onClick={() => handleTabChange('word')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            currentTab === 'word'
              ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {localText.tabWord}
        </button>
      </div>

      {!isPlaying && !isFinished ? (
        /* Start Screen */
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-200 dark:border-gray-700/80 shadow-md text-center">
          <div className="w-20 h-20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
            <span className="text-4xl">⌨️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {currentTab === 'jamo' ? localText.tabJamo : '한글 키보드 속도 & 정확도 챌린지'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 text-sm">
            {currentTab === 'jamo' 
              ? localText.stage1Description 
              : '자주 사용하는 실생활 한글 단어 100개를 순서대로 따라치면서 타속을 확인하세요.'}
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
                <span className="text-lg font-bold text-gray-600 dark:text-gray-200">{currentIndex + 1} / {currentList.length}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-10">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / currentList.length) * 100}%` }}
            />
          </div>

          {/* Typing Area */}
          <div className="max-w-xl mx-auto text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-500/80 block mb-2">
              {currentTab === 'jamo' ? localText.currentLetter : labels.current_word}
            </span>
            <div className="mb-4 relative">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-wide select-none drop-shadow-sm">
                {currentWord}
              </h1>
            </div>
            
            {/* Next Word Preview */}
            {nextWord && (
              <div className="flex items-center justify-center gap-1.5 text-sm text-gray-400 mb-8 opacity-75">
                <span className="font-semibold">{currentTab === 'jamo' ? localText.nextLetter : labels.next_word}:</span>
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
                  
                  if (currentTab === 'jamo') {
                    const target = currentWord;
                    if (val === target) {
                      if (soundEnabled) {
                        playKeySound('normal');
                      }
                      const targetKeys = decomposeToKeyboardKeys(target);
                      setCorrectKeystrokes(prev => prev + targetKeys.length);
                      setTotalKeystrokes(prev => prev + targetKeys.length);
                      setInputValue('');
                      
                      const finalIndex = currentList.length - 1;
                      if (currentIndex === finalIndex) {
                        setIsFinished(true);
                        setIsPlaying(false);
                        if (soundEnabled) {
                          playSuccessSound();
                        }
                      } else {
                        setCurrentIndex(prev => prev + 1);
                      }
                    } else {
                      // Check prefix compatibility
                      const targetKeys = decomposeToKeyboardKeys(target);
                      const inputKeys = decomposeToKeyboardKeys(val);
                      const isPrefix = inputKeys.every((k, i) => targetKeys[i] === k);
                      
                      if (isPrefix) {
                        if (soundEnabled && val.length > inputValue.length) {
                          playKeySound('normal');
                        }
                        const addedCount = val.length - inputValue.length;
                        if (addedCount > 0) {
                          setCorrectKeystrokes(prev => prev + addedCount);
                          setTotalKeystrokes(prev => prev + addedCount);
                        }
                        setInputValue(val);
                      } else {
                        if (soundEnabled && val.length > inputValue.length) {
                          playKeySound('backspace');
                        }
                        const addedCount = val.length - inputValue.length;
                        if (addedCount > 0) {
                          setTotalKeystrokes(prev => prev + addedCount);
                          setShake(true);
                          setTimeout(() => setShake(false), 300);
                        }
                        setInputValue(val);
                      }
                    }
                  } else {
                    setInputValue(val);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder={currentTab === 'jamo' ? localText.typeLetterHere : labels.type_here}
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
                    const fingerInfo = KEY_FINGER_MAP[key.code];
                    
                    let btnClass = "relative flex items-center justify-center text-[13px] font-bold rounded-lg select-none transition-all duration-100 h-10 ";
                    
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
                        
                        {/* Finger guide dot/line */}
                        {showHandGuide && fingerInfo && !isSpace && !isBackspace && !isShift && (
                          <div 
                            style={{ backgroundColor: fingerInfo.color }}
                            className="w-1.5 h-1.5 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 opacity-70"
                          />
                        )}
                        {showHandGuide && isSpace && (
                          <div 
                            style={{ backgroundColor: '#f59e0b' }}
                            className="w-12 h-1 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 opacity-70"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Hands Guide Section */}
          {showHandGuide && (
            <div className="flex flex-col items-center mt-6 p-4 bg-gray-50/50 dark:bg-gray-800/10 rounded-2xl border border-gray-150 dark:border-gray-700/30 max-w-md mx-auto transition-all">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3">{localText.handGuideTitle}</span>
              <div className="flex gap-12 items-end justify-center h-[105px]">
                <svg width="200" height="100" viewBox="0 0 200 100" className="overflow-visible text-gray-200 dark:text-gray-700">
                  {/* Left Hand Group */}
                  <g transform="translate(10, 2)">
                    {/* Palm */}
                    <path
                      d="M 22,60 Q 22,50 50,50 Q 78,50 78,60 L 78,85 Q 78,100 50,100 Q 22,100 22,85 Z"
                      fill="currentColor"
                    />
                    
                    {/* L5 Pinky */}
                    <rect
                      x="22"
                      y="28"
                      width="8"
                      height="28"
                      rx="4"
                      fill="#ec4899"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'L5' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    {/* L4 Ring */}
                    <rect
                      x="33"
                      y="16"
                      width="8"
                      height="40"
                      rx="4"
                      fill="#a855f7"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'L4' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    {/* L3 Middle */}
                    <rect
                      x="44"
                      y="10"
                      width="8"
                      height="46"
                      rx="4"
                      fill="#3b82f6"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'L3' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    {/* L2 Index */}
                    <rect
                      x="55"
                      y="18"
                      width="8"
                      height="38"
                      rx="4"
                      fill="#10b981"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'L2' && activeFingerInfo.hand === 'left' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    {/* Left Thumb */}
                    <rect
                      x="66"
                      y="48"
                      width="8"
                      height="22"
                      rx="4"
                      transform="rotate(25 66 48)"
                      fill="#f59e0b"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'Thumb' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    
                    {/* Glowing indicator circles */}
                    {activeFingerInfo?.finger === 'L5' && (
                      <>
                        <circle cx="26" cy="24" r="4" fill="#ec4899" />
                        <circle cx="26" cy="24" r="8" fill="#ec4899" className="animate-ping opacity-75" />
                      </>
                    )}
                    {activeFingerInfo?.finger === 'L4' && (
                      <>
                        <circle cx="37" cy="12" r="4" fill="#a855f7" />
                        <circle cx="37" cy="12" r="8" fill="#a855f7" className="animate-ping opacity-75" />
                      </>
                    )}
                    {activeFingerInfo?.finger === 'L3' && (
                      <>
                        <circle cx="48" cy="6" r="4" fill="#3b82f6" />
                        <circle cx="48" cy="6" r="8" fill="#3b82f6" className="animate-ping opacity-75" />
                      </>
                    )}
                    {activeFingerInfo?.finger === 'L2' && activeFingerInfo?.hand === 'left' && (
                      <>
                        <circle cx="59" cy="14" r="4" fill="#10b981" />
                        <circle cx="59" cy="14" r="8" fill="#10b981" className="animate-ping opacity-75" />
                      </>
                    )}
                    {activeFingerInfo?.finger === 'Thumb' && (
                      <>
                        <circle cx="78" cy="46" r="4" fill="#f59e0b" />
                        <circle cx="78" cy="46" r="8" fill="#f59e0b" className="animate-ping opacity-75" />
                      </>
                    )}
                  </g>

                  {/* Right Hand Group */}
                  <g transform="translate(100, 2)">
                    {/* Palm */}
                    <path
                      d="M 22,60 Q 22,50 50,50 Q 78,50 78,60 L 78,85 Q 78,100 50,100 Q 22,100 22,85 Z"
                      fill="currentColor"
                    />
                    
                    {/* Right Thumb */}
                    <rect
                      x="26"
                      y="48"
                      width="8"
                      height="22"
                      rx="4"
                      transform="rotate(-25 26 48)"
                      fill="#f59e0b"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'Thumb' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    {/* R2 Index */}
                    <rect
                      x="37"
                      y="18"
                      width="8"
                      height="38"
                      rx="4"
                      fill="#10b981"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'R2' && activeFingerInfo.hand === 'right' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    {/* R3 Middle */}
                    <rect
                      x="48"
                      y="10"
                      width="8"
                      height="46"
                      rx="4"
                      fill="#3b82f6"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'R3' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    {/* R4 Ring */}
                    <rect
                      x="59"
                      y="16"
                      width="8"
                      height="40"
                      rx="4"
                      fill="#a855f7"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'R4' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    {/* R5 Pinky */}
                    <rect
                      x="70"
                      y="28"
                      width="8"
                      height="28"
                      rx="4"
                      fill="#ec4899"
                      opacity={activeFingerInfo ? (activeFingerInfo.finger === 'R5' ? 1 : 0.3) : 0.8}
                      className="transition-all duration-150"
                    />
                    
                    {/* Glowing indicator circles */}
                    {activeFingerInfo?.finger === 'R5' && (
                      <>
                        <circle cx="74" cy="24" r="4" fill="#ec4899" />
                        <circle cx="74" cy="24" r="8" fill="#ec4899" className="animate-ping opacity-75" />
                      </>
                    )}
                    {activeFingerInfo?.finger === 'R4' && (
                      <>
                        <circle cx="63" cy="12" r="4" fill="#a855f7" />
                        <circle cx="63" cy="12" r="8" fill="#a855f7" className="animate-ping opacity-75" />
                      </>
                    )}
                    {activeFingerInfo?.finger === 'R3' && (
                      <>
                        <circle cx="52" cy="6" r="4" fill="#3b82f6" />
                        <circle cx="52" cy="6" r="8" fill="#3b82f6" className="animate-ping opacity-75" />
                      </>
                    )}
                    {activeFingerInfo?.finger === 'R2' && activeFingerInfo?.hand === 'right' && (
                      <>
                        <circle cx="41" cy="14" r="4" fill="#10b981" />
                        <circle cx="41" cy="14" r="8" fill="#10b981" className="animate-ping opacity-75" />
                      </>
                    )}
                    {activeFingerInfo?.finger === 'Thumb' && (
                      <>
                        <circle cx="18" cy="46" r="4" fill="#f59e0b" />
                        <circle cx="18" cy="46" r="8" fill="#f59e0b" className="animate-ping opacity-75" />
                      </>
                    )}
                  </g>
                </svg>
              </div>
              
              {activeFingerInfo && isPlaying && (
                <div className="mt-4 text-sm font-black text-indigo-600 dark:text-indigo-400 animate-pulse text-center">
                  {activeFingerInfo.label}
                </div>
              )}
            </div>
          )}
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
