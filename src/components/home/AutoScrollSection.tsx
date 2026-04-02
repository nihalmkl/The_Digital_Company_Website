import React from "react";
import ScrollComp from "../ui/AutoScroll/ScrollComp";

interface AutoScrollProps {
  textColor?: string;
  variant?: 'default' | 'reverse';
  speed?: 'slow' | 'normal' | 'fast';
}

const AutoScrollSection: React.FC<AutoScrollProps> = ({ 
  textColor = "text-white", 
  variant = "default",
  speed = "normal" 
}) => {
  const getAnimationClass = () => {
    const baseClass = variant === 'reverse' ? 'animate-infinite-scroll-reverse' : 'animate-infinite-scroll';
    const speedClass = speed === 'slow' ? '-slow' : speed === 'fast' ? '-fast' : '';
    return `${baseClass}${speedClass}`;
  };

  const animationClass = getAnimationClass();

  return (
    <div className="space-y-8">
      {/* Main scrolling section */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_32px,_black_calc(100%-32px),transparent_100%)]">
        <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-6 ${animationClass} ${textColor}`}>
          <ScrollComp />
        </ul>
        <ul
          className={`flex items-center justify-center md:justify-start [&_li]:mx-6 ${animationClass} ${textColor}`}
          aria-hidden="true"
        >
          <ScrollComp />
        </ul>
        <ul
          className={`flex items-center justify-center md:justify-start [&_li]:mx-6 ${animationClass} ${textColor}`}
          aria-hidden="true"
        >
          <ScrollComp />
        </ul>
      </div>
    </div>
  );
};

export default AutoScrollSection;