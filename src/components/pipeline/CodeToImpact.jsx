import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Users, Building2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Real snippet, not a generic placeholder — pulled from the actual   */
/*  QR-payment + WhatsApp-notification logic described on the CV.      */
/* ------------------------------------------------------------------ */

const CODE_LINES = [
    '// GymSaathi — subscription engine',
    'function verifyPayment(qr) {',
    '  const status = checkQR(qr);',
    '  if (status.ok) {',
    '    activateMember(status.id);',
    '    notifyWhatsApp(status.id);',
    '  }',
    '}',
];

const TYPE_SPEED = 32; // ms per character
const LINE_PAUSE = 220; // pause between lines
const HOLD_AFTER_DONE = 2200; // pause once fully typed, before restarting

/* ------------------------------------------------------------------ */
/*  Count-up hook for the live stat numbers                            */
/* ------------------------------------------------------------------ */

function useCountUp(target, durationMs = 1400, startDelay = 400) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let raf;
        let start;
        const timeout = setTimeout(() => {
            const step = (ts) => {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / durationMs, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setValue(Math.round(eased * target));
                if (progress < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        }, startDelay);

        return () => {
            clearTimeout(timeout);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [target, durationMs, startDelay]);

    return value;
}

/* ------------------------------------------------------------------ */
/*  Typing code panel                                                  */
/* ------------------------------------------------------------------ */

function CodePanel() {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [phase, setPhase] = useState('typing'); // typing | holding

    useEffect(() => {
        let timer;
        const currentLine = CODE_LINES[lineIndex] ?? '';

        if (phase === 'typing') {
            if (charIndex < currentLine.length) {
                timer = setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED);
            } else if (lineIndex < CODE_LINES.length - 1) {
                timer = setTimeout(() => {
                    setLineIndex((l) => l + 1);
                    setCharIndex(0);
                }, LINE_PAUSE);
            } else {
                timer = setTimeout(() => setPhase('holding'), HOLD_AFTER_DONE);
            }
        } else if (phase === 'holding') {
            timer = setTimeout(() => {
                setLineIndex(0);
                setCharIndex(0);
                setPhase('typing');
            }, 500);
        }

        return () => clearTimeout(timer);
    }, [charIndex, lineIndex, phase]);

    const keywordColor = (line) => {
        if (/^\s*\/\//.test(line)) return '#64748b';
        if (/^\s*(function|const|if)\b/.test(line)) return '#c084fc';
        return '#e2e8f0';
    };

    return (
        <div className="w-full rounded-xl bg-obsidian-950/90 border border-cyanGlow/25 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.1)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-gray-800/80">
                {['#F97373', '#F5C451', '#4ADE80'].map((c) => (
                    <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                ))}
                <span className="ml-2 text-[10px] font-mono text-gray-500">payment.js</span>
            </div>
            <div className="px-4 py-3.5 font-mono text-[11px] sm:text-xs leading-relaxed min-h-[150px]">
                {CODE_LINES.map((line, i) => {
                    const isCurrent = i === lineIndex && phase === 'typing';
                    const isDone = i < lineIndex || phase === 'holding';
                    const text = isDone ? line : isCurrent ? line.slice(0, charIndex) : '';
                    return (
                        <div key={i} style={{ color: keywordColor(line), minHeight: '1.4em' }}>
                            {text}
                            {isCurrent && <span className="inline-block w-[6px] h-[11px] bg-cyanGlow ml-0.5 align-middle animate-pulse" />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Flowing particles between the code panel and the dashboard         */
/* ------------------------------------------------------------------ */

function FlowStream({ isMobile }) {
    const particles = [0, 1, 2, 3];

    return (
        <div className={`relative ${isMobile ? 'w-full h-10' : 'w-14 h-full'} flex ${isMobile ? 'flex-row' : 'flex-col'} items-center justify-center`}>
            {particles.map((i) => (
                <motion.span
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-cyanGlow"
                    style={{ boxShadow: '0 0 8px #00F0FF' }}
                    animate={
                        isMobile
                            ? { left: ['0%', '100%'], opacity: [0, 1, 1, 0] }
                            : { top: ['0%', '100%'], opacity: [0, 1, 1, 0] }
                    }
                    transition={{
                        duration: 1.8,
                        delay: i * 0.45,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Live product dashboard mockup                                      */
/* ------------------------------------------------------------------ */

function LiveDashboard() {
    const gyms = useCountUp(20, 1200, 600);
    const members = useCountUp(300, 1500, 800);

    return (
        <div className="w-full rounded-xl bg-obsidian-950/90 border border-emeraldGlow/30 backdrop-blur-md shadow-[0_0_25px_rgba(52,211,153,0.12)] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-gray-800/80">
                <div className="flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-emeraldGlow" />
                    <span className="text-[10px] font-mono text-gray-400">GymSaathi — Live</span>
                </div>
                <span className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emeraldGlow opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emeraldGlow" />
                    </span>
                    <span className="text-[9px] font-mono text-emeraldGlow uppercase tracking-wide">Live</span>
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3 px-4 py-4">
                <div className="flex flex-col items-center gap-1">
                    <Building2 className="w-4 h-4 text-cyanGlow" />
                    <span className="text-xl sm:text-2xl font-heading font-black text-white">{gyms}+</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">Gyms</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Users className="w-4 h-4 text-emeraldGlow" />
                    <span className="text-xl sm:text-2xl font-heading font-black text-white">{members}+</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">Members</span>
                </div>
            </div>

            <div className="px-4 pb-4 space-y-1.5">
                {[70, 45, 90].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-cyanGlow to-emeraldGlow"
                            initial={{ width: '0%' }}
                            animate={{ width: `${w}%` }}
                            transition={{ duration: 1.2, delay: 1 + i * 0.15, ease: 'easeOut' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

export const CodeToImpact = () => {
    const [isMobile, setIsMobile] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-3 sm:gap-4 w-full max-w-xl`}>
                <div className={isMobile ? 'w-full' : 'flex-1'}>
                    <CodePanel />
                </div>

                <FlowStream isMobile={isMobile} />

                <div className={isMobile ? 'w-full' : 'flex-1'}>
                    <LiveDashboard />
                </div>
            </div>
        </div>
    );
};

export default CodeToImpact;