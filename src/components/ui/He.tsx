'use client';
import { useRef } from 'react';
import TransitionScribble from './Samble';
import { Voicemail } from 'lucide-react';

export default function He() {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    return (
        <header>
            <button ref={triggerRef}>
               Click to Trigger Animation
            </button>
            
            {/* Custom Cursor */}
            <div ref={cursorRef} className="cursor-bubble"></div>
            
            {/* The reusable Transition Component */}
            <TransitionScribble
                triggerRef={triggerRef}
                cursorRef={cursorRef}
                autoPlay={false}
                logoNode={<Voicemail />} 
            />
        </header>
    );
}