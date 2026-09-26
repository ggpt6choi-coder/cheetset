"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Trophy,
  Flame,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Delete,
  SlidersHorizontal,
  Star,
  Clock,
  Award,
  Download,
  Share2,
  Camera,
  Edit3,
  Check,
  X,
  Maximize2,
  Minimize2,
  LogOut,
} from "lucide-react";
import { toPng } from "html-to-image";

interface MathPracticeClientProps {
  labels: {
    title: string;
    description: string;
    mode_challenge: string;
    mode_infinite: string;
    digits_label: string;
    digits_all: string;
    digits_1: string;
    digits_2: string;
    digits_3: string;
    op_label: string;
    op_all: string;
    op_add: string;
    op_sub: string;
    input_placeholder: string;
    submit_btn: string;
    next_btn: string;
    correct_msg: string;
    wrong_msg: string;
    streak: string;
    best_streak: string;
    score: string;
    accuracy: string;
    sound_on: string;
    sound_off: string;
    keypad_toggle: string;
    challenge_complete: string;
    restart_challenge: string;
    reset: string;
    time_taken: string;
    question_num: string;
    combo_cheer: string;
    clear: string;
    perfect: string;
    good_job: string;
  };
  lang: string;
}

type Mode = "challenge" | "infinite";
type DigitRange = "1" | "2" | "3";
type Operation = "mixed" | "add" | "sub";

interface Problem {
  num1: number;
  num2: number;
  op: "+" | "-";
  answer: number;
}

// Web Audio API Synthesizer (No external sound files required)
class SoundPlayer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playCorrect() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 4-note cheerful chime (C5, E5, G5, C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } catch {
      // Audio error ignored
    }
  }

  playWrong() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Gentle warm boop (not harsh for young kids)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio error ignored
    }
  }

  playCelebration() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Fanfare chords
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.12 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.7);
      });
    } catch {
      // Audio error ignored
    }
  }
}

const INITIAL_PROBLEM: Problem = {
  num1: 8,
  num2: 5,
  op: "+",
  answer: 13,
};

export default function MathPracticeClient({
  labels,
}: MathPracticeClientProps) {
  // Mode & Settings
  const [mode, setMode] = useState<Mode>("challenge"); // 1: challenge, 2: infinite
  const [selectedDigits, setSelectedDigits] = useState<DigitRange[]>([
    "1",
    "2",
    "3",
  ]); // multi-select: ["1"], ["2"], ["1", "2"], etc.
  const [operation, setOperation] = useState<Operation>("mixed"); // +, -, mixed
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Current Problem State
  const [currentProblem, setCurrentProblem] =
    useState<Problem>(INITIAL_PROBLEM);
  const [prevProblem, setPrevProblem] = useState<Problem>(INITIAL_PROBLEM);
  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<{
    type: "correct" | "wrong" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Challenge Mode State (10 questions)
  const [challengeIndex, setChallengeIndex] = useState<number>(1);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeAttempts, setChallengeAttempts] = useState<number>(0);
  const [challengeComplete, setChallengeComplete] = useState<boolean>(false);
  const [elapsedTimeStr, setElapsedTimeStr] = useState<string>("");
  const [challengeSeconds, setChallengeSeconds] = useState<number>(0);
  const startTimeRef = useRef<number>(0);

  // Infinite Mode State & Timer
  const [infiniteTotal, setInfiniteTotal] = useState<number>(0);
  const [infiniteCorrect, setInfiniteCorrect] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [infiniteSeconds, setInfiniteSeconds] = useState<number>(0);

  // Record Snapshot State
  interface CertSnapshot {
    mode: Mode;
    totalQuestions: number;
    correctCount: number;
    accuracy: number;
    bestStreak: number;
    durationSec: number;
    timeFormatted: string;
    avgSpeedSec: number;
    gradeTitle: string;
    gradeRank: "특급" | "1급" | "2급" | "3급" | "수료";
    gradeBadgeColor: string;
    issueDate: string;
    dateTimeFormatted: string;
    opDescription: string;
  }

  const [certificateOpen, setCertificateOpen] = useState<boolean>(false);
  const [certSnapshot, setCertSnapshot] = useState<CertSnapshot | null>(null);
  const [certStudentName, setCertStudentName] = useState<string>("이은우");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isFullScreenCard, setIsFullScreenCard] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Sound player, canvas & card refs
  const soundRef = useRef<SoundPlayer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const certificateCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundRef.current = new SoundPlayer();
  }, []);

  // Real-time Timer for Challenge Mode (runs only when active)
  useEffect(() => {
    if (mode !== "challenge" || challengeComplete || certificateOpen) return;
    const interval = setInterval(() => {
      setChallengeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, challengeComplete, certificateOpen]);

  // Real-time Timer for Infinite Mode (pauses when certificate modal is open)
  useEffect(() => {
    if (mode !== "infinite" || certificateOpen) return;
    const interval = setInterval(() => {
      setInfiniteSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, certificateOpen]);

  // Helper: Generate Random Number based on selected digit ranges
  const getRandomNumber = useCallback((digits: DigitRange[]): number => {
    const pool =
      digits && digits.length > 0 ? digits : (["1", "2", "3"] as DigitRange[]);
    // Randomly pick one digit category from user's selection
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    if (chosen === "1") {
      // 1-digit: 1 ~ 9
      return Math.floor(Math.random() * 9) + 1;
    } else if (chosen === "2") {
      // 2-digit: 10 ~ 99
      return Math.floor(Math.random() * 90) + 10;
    } else {
      // 3-digit: 100 ~ 999
      return Math.floor(Math.random() * 900) + 100;
    }
  }, []);

  // Generate Problem logic
  const generateNewProblem = useCallback((): Problem => {
    let n1 = getRandomNumber(selectedDigits);
    let n2 = getRandomNumber(selectedDigits);

    // Decide operation
    let op: "+" | "-" = "+";
    if (operation === "mixed") {
      op = Math.random() < 0.5 ? "+" : "-";
    } else if (operation === "sub") {
      op = "-";
    } else {
      op = "+";
    }

    // Safe subtraction rule: Ensure n1 >= n2 so result is never negative
    if (op === "-" && n1 < n2) {
      const temp = n1;
      n1 = n2;
      n2 = temp;
    }

    // Avoid exact repeat of previous question
    if (
      prevProblem &&
      prevProblem.num1 === n1 &&
      prevProblem.num2 === n2 &&
      prevProblem.op === op
    ) {
      n1 += 1;
    }

    const answer = op === "+" ? n1 + n2 : n1 - n2;
    return { num1: n1, num2: n2, op, answer };
  }, [selectedDigits, operation, getRandomNumber, prevProblem]);

  // Helper to format duration for UI display (시간, 분, 초 대응)
  const formatDurationDisplay = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
      return m > 0 ? `${h}시간 ${m}분 ${s}초` : `${h}시간 ${s}초`;
    }
    if (m > 0) {
      return `${m}분 ${s}초`;
    }
    return `${s}초`;
  };

  const formatStopwatch = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Helper to get readable digit description for UI & records
  const getDigitDescription = useCallback((digits: DigitRange[]) => {
    const has1 = digits.includes("1");
    const has2 = digits.includes("2");
    const has3 = digits.includes("3");
    if (has1 && has2 && has3) return "1~3자리";
    if (has1 && has2) return "1~2자리";
    if (has2 && has3) return "2~3자리";
    if (has1 && has3) return "1·3자리";
    if (has1) return "1자리수";
    if (has2) return "2자리수";
    if (has3) return "3자리수";
    return "1~3자리";
  }, []);

  // Initialize or Reset Game
  const startNewGame = useCallback(
    (
      targetDigits: DigitRange[] = selectedDigits,
      targetOp: Operation = operation,
      resetInfiniteStats: boolean = false,
    ) => {
      setChallengeIndex(1);
      setChallengeScore(0);
      setChallengeAttempts(0);
      setChallengeComplete(false);
      setChallengeSeconds(0);
      startTimeRef.current = Date.now();
      setElapsedTimeStr("");

      setStreak(0);
      setUserInput("");
      setFeedback({ type: null, message: "" });
      setIsTransitioning(false);

      if (resetInfiniteStats) {
        setInfiniteTotal(0);
        setInfiniteCorrect(0);
        setBestStreak(0);
        setInfiniteSeconds(0);
      }

      let n1 = getRandomNumber(targetDigits);
      let n2 = getRandomNumber(targetDigits);

      let op: "+" | "-" = "+";
      if (targetOp === "mixed") {
        op = Math.random() < 0.5 ? "+" : "-";
      } else if (targetOp === "sub") {
        op = "-";
      } else {
        op = "+";
      }

      if (op === "-" && n1 < n2) {
        const temp = n1;
        n1 = n2;
        n2 = temp;
      }

      const newProb = {
        num1: n1,
        num2: n2,
        op,
        answer: op === "+" ? n1 + n2 : n1 - n2,
      };
      setCurrentProblem(newProb);
      setPrevProblem(newProb);
    },
    [selectedDigits, operation, getRandomNumber],
  );

  // Toggle individual digit length (1, 2, or 3)
  const handleToggleDigit = (digit: DigitRange) => {
    let nextDigits: DigitRange[];
    if (selectedDigits.includes(digit)) {
      if (selectedDigits.length === 1) {
        setToastMessage("최소 1개 이상의 자릿수를 선택해야 해요! 🎯");
        setTimeout(() => setToastMessage(""), 2500);
        return;
      }
      nextDigits = selectedDigits.filter((d) => d !== digit);
    } else {
      nextDigits = ([...selectedDigits, digit] as DigitRange[]).sort();
    }
    setSelectedDigits(nextDigits);
    startNewGame(nextDigits, operation);
  };

  // Select all digits (1, 2, 3)
  const handleSelectAllDigits = () => {
    const nextDigits: DigitRange[] = ["1", "2", "3"];
    setSelectedDigits(nextDigits);
    startNewGame(nextDigits, operation);
  };

  // Confetti effect on canvas
  const triggerConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = canvas.parentElement?.clientHeight || 300;

    const colors = [
      "#f43f5e",
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#8b5cf6",
      "#ec4899",
    ];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      vr: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        alpha: 1,
      });
    }

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vr;
        p.alpha -= 0.018;

        if (p.alpha > 0) {
          active = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          ctx.restore();
        }
      });

      if (active) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Open Certificate handler (can be triggered from Challenge finished or Infinite "그만하기")
  const handleOpenCertificate = useCallback(
    (customMode?: Mode) => {
      const targetMode = customMode || mode;
      let total = 0;
      let correct = 0;
      let duration = 0;
      const maxStreak = bestStreak;

      if (targetMode === "challenge") {
        total = challengeAttempts > 0 ? challengeAttempts : 10;
        correct = challengeScore;
        const now = Date.now();
        duration = Math.max(
          1,
          challengeSeconds || Math.floor((now - (startTimeRef.current || now)) / 1000)
        );
      } else {
        total = infiniteTotal;
        correct = infiniteCorrect;
        duration = Math.max(1, infiniteSeconds);
      }

      if (total < 3) {
        setToastMessage("최소 3문제 이상 풀어야 멋진 기록 카드를 발급받을 수 있어요! 🎯");
        setTimeout(() => setToastMessage(""), 3000);
        return;
      }

      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      const avgSpeed = Number((duration / total).toFixed(1));

      let gradeRank: "특급" | "1급" | "2급" | "3급" | "수료" = "수료";
      let gradeTitle = "열정의 연산러 (수료 🎖️)";
      let gradeBadgeColor = "from-amber-600 to-amber-800 text-amber-100 border-amber-500";

      if (
        (accuracy >= 95 && total >= 10) ||
        (targetMode === "challenge" && correct === 10)
      ) {
        gradeRank = "특급";
        gradeTitle = "연산의 신 (특급 👑)";
        gradeBadgeColor = "from-purple-600 to-indigo-700 text-purple-100 border-purple-400";
      } else if (accuracy >= 90) {
        gradeRank = "1급";
        gradeTitle = "인간 계산기 (1급 🥇)";
        gradeBadgeColor = "from-amber-500 to-yellow-600 text-amber-950 border-amber-300";
      } else if (accuracy >= 80) {
        gradeRank = "2급";
        gradeTitle = "수학 우등생 (2급 🥈)";
        gradeBadgeColor = "from-slate-400 to-slate-600 text-slate-100 border-slate-300";
      } else if (accuracy >= 70) {
        gradeRank = "3급";
        gradeTitle = "연산 꿈나무 (3급 🥉)";
        gradeBadgeColor = "from-amber-700 to-yellow-800 text-amber-100 border-amber-600";
      }

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const dayName = days[today.getDay()];
      const hours = today.getHours();
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const ampm = hours < 12 ? "오전" : "오후";
      const displayHour = hours % 12 === 0 ? 12 : hours % 12;
      const dateTimeFormatted = `${year}.${month}.${day} (${dayName}) ${ampm} ${displayHour}:${minutes}`;

      let opName = "덧셈·뺄셈";
      if (operation === "add") opName = "덧셈 연습";
      else if (operation === "sub") opName = "뺄셈 연습";
      const opDesc = `${opName} (${getDigitDescription(selectedDigits)})`;

      setCertSnapshot({
        mode: targetMode,
        totalQuestions: total,
        correctCount: correct,
        accuracy,
        bestStreak: maxStreak,
        durationSec: duration,
        timeFormatted: formatDurationDisplay(duration),
        avgSpeedSec: avgSpeed,
        gradeTitle,
        gradeRank,
        gradeBadgeColor,
        issueDate: `${year}년 ${today.getMonth() + 1}월 ${today.getDate()}일`,
        dateTimeFormatted,
        opDescription: opDesc,
      });

      setCertificateOpen(true);
      setIsFullScreenCard(false);
      triggerConfetti();
      if (soundEnabled && soundRef.current) {
        soundRef.current.playCelebration();
      }
    },
    [
      mode,
      challengeAttempts,
      challengeScore,
      challengeSeconds,
      infiniteTotal,
      infiniteCorrect,
      infiniteSeconds,
      bestStreak,
      operation,
      selectedDigits,
      getDigitDescription,
      soundEnabled,
      triggerConfetti,
    ]
  );

  // Record PNG Download
  const handleDownloadCertificate = async () => {
    if (!certificateCardRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(certificateCardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      link.download = `연산기록_${certStudentName.trim() || "학생"}_${todayStr}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Record export error", err);
      alert("이미지 저장 중 일시적인 오류가 발생했습니다. 화면 캡처를 이용해주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Record Web Share
  const handleShareCertificate = async () => {
    if (!certificateCardRef.current) return;
    try {
      const targetName = certStudentName.trim() || "학생";
      if (navigator.share) {
        try {
          const dataUrl = await toPng(certificateCardRef.current, {
            pixelRatio: 2,
            cacheBust: true,
          });
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File(
            [blob],
            `연산기록_${targetName}.png`,
            { type: "image/png" }
          );

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `${targetName}님의 오늘 연산 기록`,
              text: `${targetName}님이 ${certSnapshot?.totalQuestions}문제 중 ${certSnapshot?.correctCount}문제를 맞히고 (${certSnapshot?.accuracy}%), ${certSnapshot?.timeFormatted} 동안 열공했어요! 👏`,
            });
            return;
          }
        } catch {
          // Fallback to text share
        }

        await navigator.share({
          title: `${targetName}님의 오늘 연산 기록`,
          text: `${targetName}님이 ${certSnapshot?.totalQuestions}문제 중 ${certSnapshot?.correctCount}문제를 맞히고 (${certSnapshot?.accuracy}%), ${certSnapshot?.timeFormatted} 동안 열공했어요! 👏`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `${targetName}님이 오늘 ${certSnapshot?.totalQuestions}문제 중 ${certSnapshot?.correctCount}문제를 맞히고 (${certSnapshot?.accuracy}%), ${certSnapshot?.timeFormatted} 동안 열공했어요!`
        );
        setToastMessage("공유 내용이 클립보드에 복사되었습니다! 📋");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  // Check Answer
  const handleSubmit = () => {
    if (!currentProblem || isTransitioning) return;
    const trimmed = userInput.trim();
    if (trimmed === "") return;

    const numericAnswer = parseInt(trimmed, 10);
    const isCorrect = numericAnswer === currentProblem.answer;

    if (mode === "challenge") {
      setChallengeAttempts((prev) => prev + 1);
    }

    if (isCorrect) {
      // Correct answer
      if (soundEnabled && soundRef.current) {
        soundRef.current.playCorrect();
      }
      triggerConfetti();

      const cheers = [
        labels.correct_msg,
        "🌟 천재 수학자 등장!",
        "🚀 번개 같은 스피드 정답!",
        "🎯 완벽해요! 최고예요!",
        "👏 척척박사님 대단해요!",
      ];
      const cheerIndex = (challengeScore + streak) % cheers.length;
      const randomCheer = cheers[cheerIndex];

      setFeedback({
        type: "correct",
        message: randomCheer,
      });

      // Update stats
      if (mode === "challenge") {
        setChallengeScore((prev) => prev + 1);
      } else {
        setInfiniteTotal((prev) => prev + 1);
        setInfiniteCorrect((prev) => prev + 1);
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        if (nextStreak > bestStreak) {
          setBestStreak(nextStreak);
        }
      }

      setIsTransitioning(true);

      // Move to next problem smoothly
      setTimeout(() => {
        if (mode === "challenge" && challengeIndex >= 10) {
          // Challenge finished
          const finishTime = Date.now();
          const totalSec = Math.max(
            1,
            challengeSeconds ||
              Math.floor(
                (finishTime - (startTimeRef.current || finishTime)) / 1000,
              ),
          );
          setElapsedTimeStr(formatDurationDisplay(totalSec));
          setChallengeComplete(true);
          if (soundEnabled && soundRef.current) {
            soundRef.current.playCelebration();
          }
          setIsTransitioning(false);
        } else {
          if (mode === "challenge") {
            setChallengeIndex((prev) => prev + 1);
          }
          const nextProb = generateNewProblem();
          setCurrentProblem(nextProb);
          setPrevProblem(nextProb);
          setUserInput("");
          setFeedback({ type: null, message: "" });
          setIsTransitioning(false);
        }
      }, 650);
    } else {
      // Wrong answer
      if (soundEnabled && soundRef.current) {
        soundRef.current.playWrong();
      }

      if (mode === "infinite") {
        setInfiniteTotal((prev) => prev + 1);
        setStreak(0);
      }

      setFeedback({
        type: "wrong",
        message: labels.wrong_msg,
      });
    }
  };

  // Virtual Keypad Button Press (하단 버튼 클릭으로만 입력됨)
  const handleKeypadPress = useCallback(
    (val: string) => {
      if (isTransitioning || challengeComplete) return;

      if (val === "clear") {
        setUserInput("");
      } else if (val === "backspace") {
        setUserInput((prev) => prev.slice(0, -1));
      } else if (val === "enter") {
        handleSubmit();
      } else {
        setUserInput((prev) => {
          if (prev.length < 5) {
            return prev + val;
          }
          return prev;
        });
      }
    },
    [isTransitioning, challengeComplete, handleSubmit]
  );

  // Global Physical Keyboard Listener (PC 키보드 사용자 지원, 화면 터치 시 가상키보드 팝업 없음)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (certificateOpen || isEditingName || isTransitioning || challengeComplete) return;
      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        handleKeypadPress(e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleKeypadPress("backspace");
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [certificateOpen, isEditingName, isTransitioning, challengeComplete, handleKeypadPress, handleSubmit]);

  // Helper to render keypad buttons with consistent 3D styling
  const renderKeypadBtn = (key: string, sizeClasses: string = "") => {
    if (key === "backspace") {
      return (
        <button
          key={key}
          type="button"
          onClick={() => handleKeypadPress("backspace")}
          className={`flex-1 min-w-0 ${sizeClasses} rounded-xl sm:rounded-2xl md:rounded-3xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold border-2 border-b-3 sm:border-b-4 md:border-b-[5px] border-gray-300 dark:border-gray-600 active:border-b-2 active:translate-y-0.5 transition-all shadow-sm flex items-center justify-center cursor-pointer select-none`}
          title="한 글자 지우기"
          aria-label="한 글자 지우기"
        >
          <Delete className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </button>
      );
    }
    return (
      <button
        key={key}
        type="button"
        onClick={() => handleKeypadPress(key)}
        className={`flex-1 min-w-0 ${sizeClasses} rounded-xl sm:rounded-2xl md:rounded-3xl bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-black border-2 border-b-3 sm:border-b-4 md:border-b-[5px] border-gray-300 dark:border-gray-600 active:border-b-2 active:translate-y-0.5 transition-all shadow-sm flex items-center justify-center cursor-pointer select-none`}
      >
        {key}
      </button>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-1.5 sm:py-4 select-none">
      {/* Header: Title & Badges */}
      <div className="text-center mb-2 sm:mb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-semibold mb-1">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>이은우 맞춤형 덧셈·뺄셈</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {labels.title}
        </h1>
        <p className="hidden sm:block mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {labels.description}
        </p>
      </div>

      {/* Mode Selector Tabs (1번: 도전 10문제 / 2번: 무한 연습) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-1.5 sm:p-2 mb-2 sm:mb-4">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("challenge");
              startNewGame(selectedDigits, operation);
            }}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-base transition-all whitespace-nowrap ${
              mode === "challenge"
                ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.01]"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60"
            }`}
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 flex-shrink-0" />
            <span className="truncate">{labels.mode_challenge}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("infinite");
              startNewGame(selectedDigits, operation);
            }}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-base transition-all whitespace-nowrap ${
              mode === "infinite"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-teal-500/20 scale-[1.01]"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60"
            }`}
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300 flex-shrink-0" />
            <span className="truncate">{labels.mode_infinite}</span>
          </button>
        </div>

        {/* Sub Bar: Controls & Quick Stats */}
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between px-1 sm:px-2 text-xs sm:text-sm gap-2">
          {/* Mode Specific Status */}
          {mode === "challenge" ? (
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-gray-300 font-medium">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                {labels.question_num
                  .replace("{cur}", challengeIndex.toString())
                  .replace("{total}", "10")}
              </span>
              <div className="w-16 sm:w-28 md:w-36 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${(challengeIndex / 10) * 100}%` }}
                />
              </div>
              {/* Real-time Challenge Stopwatch */}
              <div
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold tabular-nums text-xs"
                title="도전 10문제 경과 시간"
              >
                <Clock className="w-3.5 h-3.5 animate-pulse text-indigo-600 dark:text-indigo-400" />
                <span>{formatStopwatch(challengeSeconds)}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-gray-300 font-medium flex-wrap">
              {/* Real-time Infinite Stopwatch */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 font-bold tabular-nums">
                <Clock className="w-3.5 h-3.5 animate-pulse text-teal-600 dark:text-teal-400" />
                <span>{formatStopwatch(infiniteSeconds)}</span>
              </div>

              <span className="flex items-center gap-1 font-bold text-orange-600 dark:text-orange-400">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                {streak} {labels.streak}
              </span>
              <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
              <span className="hidden sm:inline text-gray-600 dark:text-gray-400">
                {labels.best_streak}:{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  {bestStreak}
                </strong>
              </span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {labels.score}:{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  {infiniteCorrect}/{infiniteTotal}
                </strong>
              </span>
            </div>
          )}

          {/* Action & Settings Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* "기록 완료 & 인증샷" button - 무한 연습 모드에서만 노출 (도전 10문제는 완주 시 자동 제공) */}
            {mode === "infinite" && (
              <button
                type="button"
                onClick={() => handleOpenCertificate()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-sm shadow-teal-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                title="지금까지의 무한 연습 기록을 확인하고 인증샷을 남깁니다"
              >
                <Award className="w-3.5 h-3.5" />
                <span>기록 완료 📸</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 sm:p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title={soundEnabled ? labels.sound_off : labels.sound_on}
              aria-label={soundEnabled ? labels.sound_off : labels.sound_on}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                showSettings
                  ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              title="설정"
              aria-label="설정"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">설정</span>
            </button>
          </div>
        </div>

        {/* Collapsible Settings Panel: 자릿수 (3자리수까지) & 연산 (+, -) */}
        {showSettings && (
          <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <span>{labels.digits_label}</span>
                  <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-1.5 py-0.5 rounded-md">
                    복수 선택 가능 ✓
                  </span>
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  원하는 자릿수를 함께 누르면 섞여서 출제돼요!
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {/* 1. 전체 (1~3자리) 버튼 */}
                <button
                  type="button"
                  onClick={handleSelectAllDigits}
                  className={`py-2 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 text-center whitespace-nowrap cursor-pointer ${
                    selectedDigits.length === 3
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-400"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                  title="1, 2, 3자리수 모두 출제"
                >
                  <span>{labels.digits_all}</span>
                  {selectedDigits.length === 3 && (
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                </button>

                {/* 2. 1자리수 버튼 */}
                <button
                  type="button"
                  onClick={() => handleToggleDigit("1")}
                  className={`py-2 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 text-center whitespace-nowrap cursor-pointer ${
                    selectedDigits.includes("1")
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-400"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                  title="1자리수 (1~9) 켜기/끄기"
                >
                  <span>{labels.digits_1}</span>
                  {selectedDigits.includes("1") && (
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                </button>

                {/* 3. 2자리수 버튼 */}
                <button
                  type="button"
                  onClick={() => handleToggleDigit("2")}
                  className={`py-2 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 text-center whitespace-nowrap cursor-pointer ${
                    selectedDigits.includes("2")
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-400"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                  title="2자리수 (10~99) 켜기/끄기"
                >
                  <span>{labels.digits_2}</span>
                  {selectedDigits.includes("2") && (
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                </button>

                {/* 4. 3자리수 버튼 */}
                <button
                  type="button"
                  onClick={() => handleToggleDigit("3")}
                  className={`py-2 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 text-center whitespace-nowrap cursor-pointer ${
                    selectedDigits.includes("3")
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-400"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                  title="3자리수 (100~999) 켜기/끄기"
                >
                  <span>{labels.digits_3}</span>
                  {selectedDigits.includes("3") && (
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                {labels.op_label}
              </span>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { id: "mixed", label: labels.op_all },
                  { id: "add", label: labels.op_add },
                  { id: "sub", label: labels.op_sub },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setOperation(item.id as Operation);
                      startNewGame(selectedDigits, item.id as Operation);
                    }}
                    className={`py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center text-center whitespace-nowrap ${
                      operation === item.id
                        ? "bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-500"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl border-2 border-indigo-100 dark:border-gray-700 p-3 sm:p-8 md:p-10 overflow-hidden">
        {/* Canvas for Confetti particle explosion */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* Challenge Finished State Screen */}
        {challengeComplete ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-500 shadow-inner">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                {labels.challenge_complete}
              </h2>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                {challengeScore === 10 ? "🎉 축하합니다! 10문제를 모두 완주했어요!" : labels.good_job}
              </p>
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((starNum) => {
                const isEarned =
                  (starNum === 1 && challengeScore >= 5) ||
                  (starNum === 2 && challengeScore >= 8) ||
                  (starNum === 3 && challengeScore === 10);
                return (
                  <Star
                    key={starNum}
                    className={`w-10 h-10 transition-transform ${
                      isEarned
                        ? "fill-amber-400 text-amber-400 drop-shadow-md scale-110"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                );
              })}
            </div>

            {/* Main Highlight: 10문제 완주 소요 시간 집중 측정 배너 */}
            <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 text-white rounded-3xl max-w-md mx-auto shadow-xl shadow-indigo-500/25 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-extrabold text-indigo-100 mb-2">
                <Clock className="w-4 h-4 text-indigo-200 animate-pulse" />
                <span>10문제 완주 소요 시간</span>
              </span>
              <div className="my-1.5">
                <span className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums">
                  {elapsedTimeStr || "10초"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-100 font-bold mt-2">
                ⚡ 문제당 평균 {(Math.max(1, challengeSeconds) / 10).toFixed(1)}초 만에 풀었어요!
              </p>
            </div>

            {/* Sub Stats: Score & Accuracy */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <div className="p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                <span className="block text-xs text-gray-500 dark:text-gray-400 font-bold">
                  {labels.score}
                </span>
                <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {challengeScore} / 10
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                <span className="block text-xs text-gray-500 dark:text-gray-400 font-bold">
                  {labels.accuracy}
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {challengeAttempts > 0
                    ? Math.round((challengeScore / challengeAttempts) * 100)
                    : 100}
                  %
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenCertificate("challenge")}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-black text-base sm:text-lg shadow-lg shadow-indigo-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>오늘의 연산 기록 보기 📋</span>
              </button>
              <button
                type="button"
                onClick={() => startNewGame()}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-extrabold text-base shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>{labels.restart_challenge}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("infinite");
                  startNewGame(selectedDigits, operation);
                }}
                className="w-full sm:w-auto px-5 py-3.5 sm:py-4 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold transition flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5 text-orange-500" />
                <span>{labels.mode_infinite}로 이어하기</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Quiz Stage */
          <div className="space-y-4">
            {/* 1. Horizontal Equation Card: Problem + Input + Submit Button on ONE row */}
            <div className="relative py-4 sm:py-10 px-2 sm:px-8 bg-gradient-to-b from-indigo-50/60 to-blue-50/30 dark:from-gray-900/60 dark:to-gray-800/40 rounded-2xl sm:rounded-3xl border border-indigo-100/80 dark:border-gray-700/60 flex flex-col items-center justify-center shadow-sm">
              {/* Streak badge in infinite mode */}
              {mode === "infinite" && streak >= 3 && (
                <div className="absolute top-2 right-2 sm:top-3.5 sm:right-4 flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-orange-500 text-white text-[11px] sm:text-xs font-black rounded-full shadow-md animate-pulse">
                  <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
                  <span>{streak} COMBO!</span>
                </div>
              )}

              {/* Horizontal Equation: [Num1] [Op] [Num2] [=] [Input] (Desktop: + [Confirm Button]) */}
              {currentProblem && (
                <div className="w-full flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5 py-1 sm:py-2 flex-nowrap">
                  <span className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white tabular-nums drop-shadow-sm flex-shrink-0">
                    {currentProblem.num1}
                  </span>

                  <span
                    className={`text-2xl sm:text-4xl md:text-6xl font-black flex-shrink-0 ${
                      currentProblem.op === "+"
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-rose-500 dark:text-rose-400"
                    }`}
                  >
                    {currentProblem.op}
                  </span>

                  <span className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white tabular-nums drop-shadow-sm flex-shrink-0">
                    {currentProblem.num2}
                  </span>

                  <span className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-400 dark:text-gray-500 flex-shrink-0">
                    =
                  </span>

                  {/* Inline Answer Display Box (하단 숫자 키패드로만 입력됨, 커서/가상키보드 팝업 없음) */}
                  <div className="relative w-20 sm:w-36 md:w-52 flex-shrink-0">
                    <div
                      role="status"
                      aria-label="입력된 정답"
                      className="w-full text-center py-2 sm:py-3.5 md:py-4 px-1 sm:px-3 text-2xl sm:text-4xl md:text-6xl font-black rounded-xl sm:rounded-2xl md:rounded-3xl border-3 sm:border-4 border-indigo-400 dark:border-indigo-500 bg-white dark:bg-gray-700 text-indigo-950 dark:text-white shadow-inner select-none transition-all flex items-center justify-center min-h-[52px] sm:min-h-[72px] md:min-h-[96px] cursor-default"
                    >
                      {userInput !== "" ? (
                        <span className="tracking-wider">{userInput}</span>
                      ) : (
                        <span className="text-indigo-300 dark:text-gray-500 font-bold">
                          ?
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Desktop Inline Submit Button (sm 이상에서만 인라인) */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isTransitioning || userInput.trim() === ""}
                    className={`hidden sm:flex py-3.5 md:py-4 px-5 md:px-6 rounded-2xl md:rounded-3xl font-black text-base md:text-2xl shadow-lg transition-all items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                      userInput.trim() !== ""
                        ? "bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-orange-500/30 hover:brightness-105 cursor-pointer"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
                    }`}
                  >
                    <span>{labels.submit_btn}</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[3]" />
                  </button>
                </div>
              )}

              {/* Mobile Dedicated Submit Button (모바일 화면에서는 아래에 시원하게 배치하여 수식이 잘리지 않도록 함) */}
              {currentProblem && (
                <div className="w-full sm:hidden pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isTransitioning || userInput.trim() === ""}
                    className={`w-full max-w-xs py-2.5 px-4 rounded-xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                      userInput.trim() !== ""
                        ? "bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-orange-500/30 hover:brightness-105 cursor-pointer"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
                    }`}
                  >
                    <span>확인 🚀</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              )}

              {/* Feedback Banner */}
              {feedback.message && (
                <div
                  className={`mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all transform animate-in fade-in zoom-in-95 ${
                    feedback.type === "correct"
                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                      : "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
                  }`}
                >
                  {feedback.type === "correct" ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <HelpCircle className="w-4 h-4 flex-shrink-0 text-rose-600 dark:text-rose-400" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}
            </div>

            {/* 2. Responsive Keypad: 2 touch-friendly rows on mobile (<sm), 1 sleek horizontal row on desktop (sm+) */}
            <div className="w-full max-w-5xl mx-auto pt-2 sm:pt-4">
              <div className="p-2 sm:p-3 md:p-4 bg-gray-100/95 dark:bg-gray-900/85 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                {/* Mobile layout: 2 rows (5 keys on top, 6 keys on bottom) */}
                <div className="flex sm:hidden flex-col gap-1.5 w-full">
                  <div className="flex w-full items-stretch gap-1.5 justify-center">
                    {["1", "2", "3", "4", "5"].map((k) =>
                      renderKeypadBtn(k, "h-11 text-xl"),
                    )}
                  </div>
                  <div className="flex w-full items-stretch gap-1.5 justify-center">
                    {["6", "7", "8", "9", "0", "backspace"].map((k) =>
                      renderKeypadBtn(k, "h-11 text-xl"),
                    )}
                  </div>
                </div>

                {/* Desktop & Tablet layout: 1 unified horizontal row */}
                <div className="hidden sm:flex w-full items-stretch justify-center gap-2 md:gap-3">
                  {[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "0",
                    "backspace",
                  ].map((k) =>
                    renderKeypadBtn(
                      k,
                      "h-16 md:h-20 text-2xl sm:text-3xl md:text-4xl",
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tip for Parents / Elementary 1st Grader */}
      <div className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        <p>
          💡 <strong>Tip</strong>: 화면 하단의 <strong>숫자 버튼</strong>을 톡톡 눌러서 정답을 입력하고 확인해 보세요!
        </p>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-gray-900/95 text-white text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-md border border-gray-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Record Modal & Photo Shoot Stage */}
      {certificateOpen && certSnapshot && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          {/* 1. Full-screen Photo Shoot View: 화면 가득 기록 카드만 띄워 들고 인증샷 찍기 */}
          {isFullScreenCard ? (
            <div
              onClick={() => setIsFullScreenCard(false)}
              className="relative w-full min-h-screen flex flex-col items-center justify-center py-6 px-2 cursor-pointer select-none"
            >
              {/* Floating Camera Hint Banner */}
              <div className="fixed top-5 left-1/2 -translate-x-1/2 z-20 px-5 py-2.5 rounded-full bg-black/80 text-white text-xs sm:text-base font-bold shadow-xl backdrop-blur-md border border-white/20 flex items-center gap-2 animate-pulse">
                <Camera className="w-5 h-5 text-emerald-400" />
                <span>화면을 든 채 인증샷을 찍어보세요! (터치하면 메뉴 복귀 📸)</span>
              </div>

              {/* Record Card Rendered (Enlarged) */}
              <div
                ref={certificateCardRef}
                className="w-full max-w-[580px] bg-white text-gray-900 rounded-3xl p-6 sm:p-9 shadow-2xl border border-gray-100 relative select-none overflow-hidden my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Glows */}
                <div className="absolute -top-28 -right-28 w-64 h-64 bg-indigo-200/50 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-28 -left-28 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

                {/* 1. Header: Date & Time + Name */}
                <div className="relative pb-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-black text-xs sm:text-sm mb-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      <span>
                        {certSnapshot.mode === "challenge"
                          ? "⚡ 10문제 타임어택 완주"
                          : "오늘의 연산 연습 완료"}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-black text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{certSnapshot.dateTimeFormatted}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block font-bold mb-0.5">참여자</span>
                    <span className="text-base sm:text-2xl font-black text-gray-900 border-b-2 border-indigo-500 pb-0.5 px-1">
                      {certStudentName.trim() || "학생"}
                    </span>
                  </div>
                </div>

                {/* 2. Main Hero Grid */}
                <div className="relative py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {certSnapshot.mode === "challenge" ? (
                    <>
                      {/* Challenge Block 1: 10문제 완주 소요 시간 (메인 하이라이트) */}
                      <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 text-white rounded-3xl p-5 sm:p-6 shadow-lg shadow-indigo-500/25 text-center flex flex-col justify-between">
                        <span className="text-xs sm:text-sm font-extrabold text-indigo-100 flex items-center justify-center gap-1.5">
                          <Clock className="w-4 h-4 text-indigo-200" />
                          <span>10문제 완주 시간</span>
                        </span>
                        <div className="my-2 sm:my-3">
                          <span className="text-4xl sm:text-5xl md:text-6xl font-black tabular-nums tracking-tight">
                            {certSnapshot.timeFormatted}
                          </span>
                        </div>
                        <div className="inline-block mx-auto px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-black text-white">
                          ⚡ 문제당 평균 {certSnapshot.avgSpeedSec}초 돌파
                        </div>
                      </div>

                      {/* Challenge Block 2: 맞힌 문제 & 정답률 */}
                      <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white rounded-3xl p-5 sm:p-6 shadow-lg shadow-teal-500/25 text-center flex flex-col justify-between">
                        <span className="text-xs sm:text-sm font-extrabold text-teal-100 flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-200" />
                          <span>맞힌 문제</span>
                        </span>
                        <div className="my-2 sm:my-3">
                          <span className="text-5xl sm:text-6xl md:text-7xl font-black tabular-nums tracking-tight">
                            {certSnapshot.correctCount}
                          </span>
                          <span className="text-teal-200 text-base sm:text-xl font-extrabold">
                            {" "}/ {certSnapshot.totalQuestions} 문제
                          </span>
                        </div>
                        <div className="inline-block mx-auto px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-black text-white">
                          정답률 {certSnapshot.accuracy}% {certSnapshot.accuracy === 100 ? "🎉 올패스" : ""}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Infinite Block 1: 맞힌 문제 & 정답률 */}
                      <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 text-white rounded-3xl p-5 sm:p-6 shadow-lg shadow-indigo-500/25 text-center flex flex-col justify-between">
                        <span className="text-xs sm:text-sm font-extrabold text-indigo-100 flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-200" />
                          <span>맞힌 문제</span>
                        </span>
                        <div className="my-2 sm:my-3">
                          <span className="text-5xl sm:text-6xl md:text-7xl font-black tabular-nums tracking-tight">
                            {certSnapshot.correctCount}
                          </span>
                          <span className="text-indigo-200 text-base sm:text-xl font-extrabold">
                            {" "}/ {certSnapshot.totalQuestions} 문제
                          </span>
                        </div>
                        <div className="inline-block mx-auto px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-black text-white">
                          정답률 {certSnapshot.accuracy}% {certSnapshot.accuracy === 100 ? "🎉 올패스" : ""}
                        </div>
                      </div>

                      {/* Infinite Block 2: 플레이 시간 */}
                      <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white rounded-3xl p-5 sm:p-6 shadow-lg shadow-teal-500/25 text-center flex flex-col justify-between">
                        <span className="text-xs sm:text-sm font-extrabold text-teal-100 flex items-center justify-center gap-1.5">
                          <Clock className="w-4 h-4 text-teal-200" />
                          <span>집중한 시간</span>
                        </span>
                        <div className="my-2 sm:my-3">
                          <span className="text-4xl sm:text-5xl md:text-6xl font-black tabular-nums tracking-tight">
                            {certSnapshot.timeFormatted}
                          </span>
                        </div>
                        <div className="inline-block mx-auto px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-black text-white">
                          문제당 평균 {certSnapshot.avgSpeedSec}초
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* 3. Sub Details: 연속 정답 & 연산 종류 */}
                <div className="relative grid grid-cols-2 gap-2.5 sm:gap-3 text-center text-xs sm:text-sm font-bold text-gray-700">
                  <div className="bg-orange-50/80 border border-orange-200/80 p-3 rounded-2xl flex items-center justify-center gap-2 text-orange-900">
                    <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 fill-orange-500 flex-shrink-0" />
                    <span>최고 {certSnapshot.bestStreak} 콤보 연속 정답!</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200/80 p-3 rounded-2xl flex items-center justify-center gap-2 text-gray-700">
                    <span>{certSnapshot.opDescription}</span>
                  </div>
                </div>

                {/* 4. Encouragement & Title */}
                <div className="relative mt-4 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
                  <div className="text-left">
                    <div className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                      <span>{certSnapshot.gradeTitle}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-900/90 font-bold mt-1">
                      {certSnapshot.mode === "challenge"
                        ? `10문제를 단 ${certSnapshot.timeFormatted} 만에 멋지게 완주했어요! ⚡`
                        : "오늘도 꾸준히 연습했어요! 실력이 쑥쑥 자라는 중 🌱"}
                    </p>
                  </div>

                  {/* Cute '참 잘했어요' Stamp */}
                  <div className="flex-shrink-0 -rotate-12">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-rose-500 p-0.5 shadow-sm">
                      <div className="w-full h-full rounded-full border border-dashed border-rose-400 flex flex-col items-center justify-center text-rose-500 font-black leading-tight select-none">
                        <span className="text-[11px] sm:text-xs">참 잘했어요</span>
                        <span className="text-[9px] sm:text-[10px]">💯 열공인증</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Exit Button */}
              <button
                type="button"
                onClick={() => setIsFullScreenCard(false)}
                className="mt-5 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold backdrop-blur-sm border border-white/20 flex items-center gap-2 transition"
              >
                <Minimize2 className="w-4 h-4" />
                <span>메뉴로 돌아가기</span>
              </button>
            </div>
          ) : (
            /* 2. Standard Modal View: 대형 기록 카드 미리보기 + 저장/공유/이름변경 컨트롤 */
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden my-4 animate-in fade-in zoom-in-95">
              {/* Modal Header */}
              <div className="px-5 py-3.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Award className="w-6 h-6 text-indigo-200" />
                  <span className="font-black text-base sm:text-lg">
                    오늘의 연산 연습 완료!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCertificateOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition cursor-pointer"
                  title="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Recipient Name Bar */}
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400 font-bold">참여자 이름:</span>
                  {isEditingName ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        maxLength={10}
                        autoFocus
                        value={certStudentName}
                        onChange={(e) => setCertStudentName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setIsEditingName(false);
                        }}
                        className="py-1 px-3 text-xs sm:text-sm font-bold rounded-xl border border-indigo-400 dark:border-indigo-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none ring-2 ring-indigo-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditingName(false)}
                        className="p-1.5 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600"
                        title="확인"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditingName(true)}
                      className="group flex items-center gap-1.5 font-black text-indigo-900 dark:text-indigo-300 hover:text-indigo-600 transition text-sm sm:text-base"
                      title="이름 수정하기"
                    >
                      <span className="underline underline-offset-4">
                        {certStudentName.trim() || "학생"}
                      </span>
                      <Edit3 className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition" />
                    </button>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                  클릭해서 이름 변경 가능 ✍️
                </span>
              </div>

              {/* Card Preview Container (Enlarged) */}
              <div className="p-4 sm:p-7 bg-gray-100/70 dark:bg-gray-900/40 flex justify-center">
                <div
                  ref={certificateCardRef}
                  className="w-full max-w-[580px] bg-white text-gray-900 rounded-3xl p-6 sm:p-9 shadow-xl border border-gray-100 relative select-none overflow-hidden"
                >
                  {/* Background Soft Glow */}
                  <div className="absolute -top-28 -right-28 w-64 h-64 bg-indigo-200/50 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-28 -left-28 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

                  {/* 1. Header: Date & Time + Name */}
                  <div className="relative pb-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-black text-xs sm:text-sm mb-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span>
                          {certSnapshot.mode === "challenge"
                            ? "⚡ 10문제 타임어택 완주"
                            : "오늘의 연산 연습 완료"}
                        </span>
                      </div>
                      <div className="text-sm sm:text-base md:text-lg font-black text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{certSnapshot.dateTimeFormatted}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block font-bold mb-0.5">참여자</span>
                      <span className="text-base sm:text-2xl font-black text-gray-900 border-b-2 border-indigo-500 pb-0.5 px-1">
                        {certStudentName.trim() || "학생"}
                      </span>
                    </div>
                  </div>

                  {/* 2. Main Hero Grid */}
                  <div className="relative py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {certSnapshot.mode === "challenge" ? (
                      <>
                        {/* Challenge Block 1: 10문제 완주 소요 시간 (메인 하이라이트) */}
                        <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 text-white rounded-3xl p-5 sm:p-6 shadow-md shadow-indigo-500/25 text-center flex flex-col justify-between">
                          <span className="text-xs sm:text-sm font-extrabold text-indigo-100 flex items-center justify-center gap-1.5">
                            <Clock className="w-4 h-4 text-indigo-200" />
                            <span>10문제 완주 시간</span>
                          </span>
                          <div className="my-2 sm:my-3">
                            <span className="text-4xl sm:text-5xl md:text-6xl font-black tabular-nums tracking-tight">
                              {certSnapshot.timeFormatted}
                            </span>
                          </div>
                          <div className="inline-block mx-auto px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-black text-white">
                            ⚡ 문제당 평균 {certSnapshot.avgSpeedSec}초 돌파
                          </div>
                        </div>

                        {/* Challenge Block 2: 맞힌 문제 & 정답률 */}
                        <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white rounded-3xl p-5 sm:p-6 shadow-md shadow-teal-500/25 text-center flex flex-col justify-between">
                          <span className="text-xs sm:text-sm font-extrabold text-teal-100 flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-teal-200" />
                            <span>맞힌 문제</span>
                          </span>
                          <div className="my-2 sm:my-3">
                            <span className="text-5xl sm:text-6xl md:text-7xl font-black tabular-nums tracking-tight">
                              {certSnapshot.correctCount}
                            </span>
                            <span className="text-teal-200 text-base sm:text-xl font-extrabold">
                              {" "}/ {certSnapshot.totalQuestions} 문제
                            </span>
                          </div>
                          <div className="inline-block mx-auto px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-black text-white">
                            정답률 {certSnapshot.accuracy}% {certSnapshot.accuracy === 100 ? "🎉 올패스" : ""}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Infinite Block 1: 맞힌 문제 & 정답률 */}
                        <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 text-white rounded-3xl p-5 sm:p-6 shadow-md shadow-indigo-500/25 text-center flex flex-col justify-between">
                          <span className="text-xs sm:text-sm font-extrabold text-indigo-100 flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-indigo-200" />
                            <span>맞힌 문제</span>
                          </span>
                          <div className="my-2 sm:my-3">
                            <span className="text-5xl sm:text-6xl md:text-7xl font-black tabular-nums tracking-tight">
                              {certSnapshot.correctCount}
                            </span>
                            <span className="text-indigo-200 text-base sm:text-xl font-extrabold">
                              {" "}/ {certSnapshot.totalQuestions} 문제
                            </span>
                          </div>
                          <div className="inline-block mx-auto px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-black text-white">
                            정답률 {certSnapshot.accuracy}% {certSnapshot.accuracy === 100 ? "🎉 올패스" : ""}
                          </div>
                        </div>

                        {/* Infinite Block 2: 플레이 시간 */}
                        <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white rounded-3xl p-5 sm:p-6 shadow-md shadow-teal-500/25 text-center flex flex-col justify-between">
                          <span className="text-xs sm:text-sm font-extrabold text-teal-100 flex items-center justify-center gap-1.5">
                            <Clock className="w-4 h-4 text-teal-200" />
                            <span>집중한 시간</span>
                          </span>
                          <div className="my-2 sm:my-3">
                            <span className="text-4xl sm:text-5xl md:text-6xl font-black tabular-nums tracking-tight">
                              {certSnapshot.timeFormatted}
                            </span>
                          </div>
                          <div className="inline-block mx-auto px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-black text-white">
                            문제당 평균 {certSnapshot.avgSpeedSec}초
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* 3. Sub Details: 연속 정답 & 연산 종류 */}
                  <div className="relative grid grid-cols-2 gap-2.5 sm:gap-3 text-center text-xs sm:text-sm font-bold text-gray-700">
                    <div className="bg-orange-50/80 border border-orange-200/80 p-3 rounded-2xl flex items-center justify-center gap-2 text-orange-900">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 fill-orange-500 flex-shrink-0" />
                      <span>최고 {certSnapshot.bestStreak} 콤보 연속 정답!</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200/80 p-3 rounded-2xl flex items-center justify-center gap-2 text-gray-700">
                      <span>{certSnapshot.opDescription}</span>
                    </div>
                  </div>

                  {/* 4. Encouragement & Title */}
                  <div className="relative mt-4 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
                    <div className="text-left">
                      <div className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                        <span>{certSnapshot.gradeTitle}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-amber-900/90 font-bold mt-1">
                        {certSnapshot.mode === "challenge"
                          ? `10문제를 단 ${certSnapshot.timeFormatted} 만에 멋지게 완주했어요! ⚡`
                          : "오늘도 꾸준히 연습했어요! 실력이 쑥쑥 자라는 중 🌱"}
                      </p>
                    </div>

                    {/* Cute '참 잘했어요' Stamp */}
                    <div className="flex-shrink-0 -rotate-12">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-rose-500 p-0.5 shadow-sm">
                        <div className="w-full h-full rounded-full border border-dashed border-rose-400 flex flex-col items-center justify-center text-rose-500 font-black leading-tight select-none">
                          <span className="text-[11px] sm:text-xs">참 잘했어요</span>
                          <span className="text-[9px] sm:text-[10px]">💯 열공인증</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="p-4 sm:p-5 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* 들고 사진찍기 모드 버튼 */}
                <button
                  type="button"
                  onClick={() => setIsFullScreenCard(true)}
                  className="w-full sm:w-auto flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span>📱 들고 사진찍기</span>
                </button>

                {/* 이미지 다운로드 버튼 */}
                <button
                  type="button"
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading}
                  className="w-full sm:w-auto flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white font-black text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  <span>{isDownloading ? "저장 중..." : "💾 이미지 저장"}</span>
                </button>

                {/* 공유하기 버튼 */}
                <button
                  type="button"
                  onClick={handleShareCertificate}
                  className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold text-sm sm:text-base transition flex items-center justify-center gap-2 cursor-pointer"
                  title="공유하기"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">공유</span>
                </button>

                {/* 닫기 버튼 */}
                <button
                  type="button"
                  onClick={() => setCertificateOpen(false)}
                  className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold text-sm sm:text-base transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>닫기</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
