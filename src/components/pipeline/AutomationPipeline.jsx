import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Bot, CheckCircle2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const LOOP_DURATION = 4; // seconds for one full pulse cycle
const TRAVEL_FRACTION = 0.75;
const PULSE_COUNT = 3; // multiple staggered pulses = a flowing trail, not a single dot

const DESKTOP_NODES = [
    { x: 60, y: 150, label: 'Client Request', icon: Inbox, color: '#38BDF8' },
    { x: 350, y: 150, label: 'AI Agent', icon: Bot, color: '#00F0FF' },
    { x: 640, y: 150, label: 'Delivered', icon: CheckCircle2, color: '#34D399' },
];

const MOBILE_NODES = [
    { x: 150, y: 70, label: 'Client Request', icon: Inbox, color: '#38BDF8' },
    { x: 150, y: 320, label: 'AI Agent', icon: Bot, color: '#00F0FF' },
    { x: 150, y: 570, label: 'Delivered', icon: CheckCircle2, color: '#34D399' },
];

const DESKTOP_PATH = 'M60,150 C160,90 250,210 350,150 C450,90 540,210 640,150';
const MOBILE_PATH = 'M150,70 C90,170 210,220 150,320 C90,420 210,470 150,570';

const REPLIES = [
    "Got it — booked your slot for Thursday ✅",
    "Thanks for reaching out! Forwarding to the team.",
];

/* ------------------------------------------------------------------ */
/*  Ambient floating background particles                              */
/* ------------------------------------------------------------------ */

function AmbientParticles({ count = 10 }) {
    const particles = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                left: `${8 + Math.random() * 84}%`,
                top: `${8 + Math.random() * 84}%`,
                size: 2 + Math.random() * 3,
                duration: 6 + Math.random() * 6,
                delay: Math.random() * 4,
                color: i % 3 === 0 ? '#34D399' : i % 3 === 1 ? '#00F0FF' : '#8B5CF6',
            })),
        [count]
    );

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.span
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        boxShadow: `0 0 8px ${p.color}`,
                    }}
                    animate={{
                        y: [0, -18, 0],
                        opacity: [0.15, 0.8, 0.15],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Live "AI typing a reply" chat bubble                               */
/* ------------------------------------------------------------------ */

function TypingBubble({ isMobile }) {
    const [replyIndex, setReplyIndex] = useState(0);
    const [visibleChars, setVisibleChars] = useState(0);
    const [phase, setPhase] = useState('typing'); // typing | holding | erasing

    useEffect(() => {
        const message = REPLIES[replyIndex];
        let timer;

        if (phase === 'typing') {
            if (visibleChars < message.length) {
                timer = setTimeout(() => setVisibleChars((c) => c + 1), 32);
            } else {
                timer = setTimeout(() => setPhase('holding'), 1400);
            }
        } else if (phase === 'holding') {
            timer = setTimeout(() => setPhase('erasing'), 200);
        } else if (phase === 'erasing') {
            if (visibleChars > 0) {
                timer = setTimeout(() => setVisibleChars((c) => c - 2), 12);
            } else {
                timer = setTimeout(() => {
                    setReplyIndex((i) => (i + 1) % REPLIES.length);
                    setPhase('typing');
                }, 300);
            }
        }

        return () => clearTimeout(timer);
    }, [visibleChars, phase, replyIndex]);

    const message = REPLIES[replyIndex];
    const shown = message.slice(0, Math.max(visibleChars, 0));

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className={`absolute z-20 max-w-[210px] ${isMobile ? 'left-[62%] top-[47%]' : 'left-1/2 -translate-x-1/2 top-[6%]'
                }`}
        >
            <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-obsidian-950/90 border border-cyanGlow/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <p className="text-[11px] font-mono text-gray-200 leading-snug min-h-[2.2em]">
                    {shown}
                    <span className="inline-block w-[6px] h-[12px] bg-cyanGlow ml-0.5 align-middle animate-pulse" />
                </p>
            </div>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main pipeline visual                                               */
/* ------------------------------------------------------------------ */

export const AutomationPipeline = () => {
    const [isMobile, setIsMobile] = useState(false);
    const wrapperRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleMouseMove = (e) => {
        if (!wrapperRef.current || isMobile) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: py * -8, y: px * 10 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const nodes = isMobile ? MOBILE_NODES : DESKTOP_NODES;
    const path = isMobile ? MOBILE_PATH : DESKTOP_PATH;
    const viewBox = isMobile ? '0 0 300 640' : '0 0 700 300';

    return (
        <div
            ref={wrapperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full relative flex items-center justify-center"
            style={{ perspective: 900 }}
        >
            <AmbientParticles />
            <TypingBubble isMobile={isMobile} />

            <motion.div
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: 'spring', stiffness: 80, damping: 14 }}
                className="w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <svg viewBox={viewBox} className="w-full h-full max-w-2xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="pipelineGlow" x="-80%" y="-80%" width="260%" height="260%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={isMobile ? 0 : 700} y2={isMobile ? 640 : 0}>
                            <stop offset="0%" stopColor="#38BDF8" />
                            <stop offset="50%" stopColor="#00F0FF" />
                            <stop offset="100%" stopColor="#34D399" />
                        </linearGradient>
                    </defs>

                    {/* base track */}
                    <path id="pipelinePath" d={path} stroke="#1e293b" strokeWidth="2" fill="none" />

                    {/* animated flowing energy line */}
                    <path
                        d={path}
                        stroke="url(#flowGradient)"
                        strokeWidth="2"
                        strokeDasharray="10 14"
                        fill="none"
                        opacity="0.85"
                    >
                        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="1.6s" repeatCount="indefinite" />
                    </path>

                    {/* multiple staggered traveling pulses = flowing trail */}
                    {Array.from({ length: PULSE_COUNT }).map((_, i) => (
                        <circle key={i} r="5" fill="#00F0FF" filter="url(#pipelineGlow)">
                            <animateMotion
                                dur={`${LOOP_DURATION}s`}
                                repeatCount="indefinite"
                                begin={`${(i * LOOP_DURATION) / PULSE_COUNT}s`}
                                keyPoints="0;1;1"
                                keyTimes={`0;${TRAVEL_FRACTION};1`}
                                calcMode="linear"
                            >
                                <mpath href="#pipelinePath" />
                            </animateMotion>
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.05;0.9;1"
                                dur={`${LOOP_DURATION}s`}
                                begin={`${(i * LOOP_DURATION) / PULSE_COUNT}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    ))}

                    {/* nodes */}
                    {nodes.map((n, i) => {
                        const Icon = n.icon;
                        const beginOffset = (i / (nodes.length - 1)) * (LOOP_DURATION * TRAVEL_FRACTION);
                        return (
                            <g key={n.label} transform={`translate(${n.x}, ${n.y})`}>
                                {/* arrival burst ring */}
                                <circle r="34" stroke={n.color} strokeWidth="2" fill="none" opacity="0">
                                    <animate
                                        attributeName="r"
                                        values="34;58"
                                        dur={`${LOOP_DURATION}s`}
                                        begin={`${beginOffset}s`}
                                        repeatCount="indefinite"
                                    />
                                    <animate
                                        attributeName="opacity"
                                        values="0.6;0"
                                        dur={`${LOOP_DURATION}s`}
                                        begin={`${beginOffset}s`}
                                        repeatCount="indefinite"
                                    />
                                </circle>

                                {/* node body */}
                                <circle r="34" fill="#0b0f1a" stroke={n.color} strokeWidth="1.5" filter="url(#pipelineGlow)">
                                    <animate
                                        attributeName="stroke-opacity"
                                        values="0.35;1;0.35"
                                        dur={`${LOOP_DURATION}s`}
                                        begin={`${beginOffset}s`}
                                        repeatCount="indefinite"
                                    />
                                </circle>

                                {/* slight scale "pop" on arrival, via a nested animated group */}
                                <animateTransform
                                    attributeName="transform"
                                    type="scale"
                                    values="1;1.12;1"
                                    dur={`${LOOP_DURATION}s`}
                                    begin={`${beginOffset}s`}
                                    repeatCount="indefinite"
                                    additive="sum"
                                />

                                <foreignObject x="-14" y="-14" width="28" height="28">
                                    <Icon color={n.color} size={28} strokeWidth={1.6} />
                                </foreignObject>

                                <text x="0" y="58" textAnchor="middle" fill="#94a3b8" fontSize="13" fontFamily="monospace">
                                    {n.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </motion.div>
        </div>
    );
};

export default AutomationPipeline;