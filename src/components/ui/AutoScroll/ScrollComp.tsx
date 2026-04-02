"use client";
import React from "react";

interface CompanyScrollProps {
  theme?: "light" | "dark" | "colored";
  size?: "sm" | "md" | "lg";
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  customTextColor?: string;
}

const ScrollComp: React.FC<CompanyScrollProps> = ({
  theme = "dark",
  size = "md",
  fontWeight = "medium",
  customTextColor,
}) => {
  const getThemeClasses = () => {
    if (customTextColor) return customTextColor;

    switch (theme) {
      case "light":
        return "text-gray-800";
      case "colored":
        return "text-blue-600";
      case "dark":
      default:
        return "text-white";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          text: "text-sm",
          padding: "px-3 py-2",
          height: "h-8",
        };
      case "lg":
        return {
          text: "text-lg",
          padding: "px-8 py-4",
          height: "h-12",
        };
      case "md":
      default:
        return {
          text: "text-base",
          padding: "px-6 py-3",
          height: "h-10",
        };
    }
  };

  const getFontWeightClass = () => {
    switch (fontWeight) {
      case "normal":
        return "font-normal";
      case "semibold":
        return "font-semibold";
      case "bold":
        return "font-bold";
      case "medium":
      default:
        return "font-medium";
    }
  };

  const themeClass = getThemeClasses();
  const sizeClasses = getSizeClasses();
  const fontWeightClass = getFontWeightClass();

  const baseItemClass = `flex items-center justify-center min-w-fit ${sizeClasses.height}`;
  const baseTextClass = `whitespace-nowrap text-center ${sizeClasses.text} ${fontWeightClass} ${themeClass} ${sizeClasses.padding}`;

    const features = [
    "Naturally soft, skin-friendly & breathable",
    "Sustainably made",
    "Superior products",
    "Amazing price"
  ];


  return (
    <ul className="flex items-center">
      {features.map((feature, index) => (
        <React.Fragment key={index}>
          <li className={baseItemClass}>
            <span className={baseTextClass}>{feature}</span>
          </li>
          {index < features.length && (
            <li
              className={`flex items-center justify-center ${themeClass} ${sizeClasses.text} font-BuenosAiresBold`}
            >
              |
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ScrollComp;
