'use client';

import React from 'react';

type Props = {
    brand: string;
    className?: string;
};

// Returns a simple SVG representation of brand logos
export function BrandLogo({ brand, className = '' }: Props) {
    const normalized = brand.toLowerCase().trim();

    // Simple, scalable SVG representations of car brands
    switch (normalized) {
        case 'audi':
            return (
                <svg viewBox="0 0 100 40" className={className} fill="none" stroke="currentColor" strokeWidth="4">
                    <circle cx="20" cy="20" r="14" />
                    <circle cx="40" cy="20" r="14" />
                    <circle cx="60" cy="20" r="14" />
                    <circle cx="80" cy="20" r="14" />
                </svg>
            );
        case 'bmw':
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    <circle cx="30" cy="30" r="28" fill="#fff" stroke="#000" strokeWidth="4" />
                    <circle cx="30" cy="30" r="20" fill="#000" />
                    <path d="M30 10 A20 20 0 0 1 50 30 L30 30 Z" fill="#0066b2" />
                    <path d="M30 50 A20 20 0 0 1 10 30 L30 30 Z" fill="#0066b2" />
                    <path d="M50 30 A20 20 0 0 1 30 50 L30 30 Z" fill="#fff" />
                    <path d="M10 30 A20 20 0 0 1 30 10 L30 30 Z" fill="#fff" />
                </svg>
            );
        case 'volkswagen':
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    <circle cx="30" cy="30" r="28" fill="#15214d" />
                    <path d="M20 15 L25 30 L30 15 L35 30 L40 15 L45 15 L35 45 L30 25 L25 45 L15 15 Z" fill="#fff" />
                    <path d="M22 15 L30 40 L38 15" stroke="#fff" strokeWidth="2" fill="none" />
                    <circle cx="30" cy="30" r="26" stroke="#fff" strokeWidth="2" fill="none" />
                </svg>
            );
        case 'mercedes':
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    <circle cx="30" cy="30" r="28" fill="none" stroke="#000" strokeWidth="3" />
                    <path d="M30 4 L40 54 L30 42 L20 54 Z" fill="#000" />
                    <path d="M30 4 L4 20 L27 28 Z" fill="#000" />
                    <path d="M30 4 L56 20 L33 28 Z" fill="#000" />
                </svg>
            );
        case 'renault':
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    <path d="M30 4 L46 30 L30 56 L14 30 Z" fill="none" stroke="#000" strokeWidth="8" strokeLinejoin="miter" />
                    <path d="M30 14 L38 30 L30 46 L22 30 Z" fill="none" stroke="#000" strokeWidth="2" />
                </svg>
            );
        case 'toyota':
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    <ellipse cx="30" cy="30" rx="26" ry="18" fill="none" stroke="#e60000" strokeWidth="4" />
                    <ellipse cx="30" cy="24" rx="16" ry="8" fill="none" stroke="#e60000" strokeWidth="4" />
                    <ellipse cx="30" cy="36" rx="6" ry="16" fill="none" stroke="#e60000" strokeWidth="4" />
                </svg>
            );
        case 'ford':
            return (
                <svg viewBox="0 0 80 40" className={className}>
                    <ellipse cx="40" cy="20" rx="38" ry="18" fill="#003478" stroke="#fff" strokeWidth="2" />
                    <ellipse cx="40" cy="20" rx="36" ry="16" fill="none" stroke="#fff" strokeWidth="1" />
                    <text x="50%" y="58%" fill="#fff" fontSize="22" fontStyle="italic" fontWeight="bold" fontFamily="serif" textAnchor="middle">Ford</text>
                </svg>
            );
        case 'fiat':
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    <circle cx="30" cy="30" r="28" fill="#c3002f" stroke="#eee" strokeWidth="2" />
                    <text x="50%" y="56%" fill="#fff" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">FIAT</text>
                </svg>
            );
        case 'nissan':
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    <circle cx="30" cy="30" r="26" fill="none" stroke="#000" strokeWidth="4" />
                    <rect x="2" y="22" width="56" height="16" fill="#000" />
                    <text x="50%" y="35%" fill="#fff" fontSize="12" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">NISSAN</text>
                </svg>
            );
        case 'peugeot':
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    {/* Simple lion silhouette approximation */}
                    <path d="M20 50 L20 20 L30 10 L40 20 L40 30 L45 25 L50 40 L40 50 Z" fill="#000" />
                    <text x="50%" y="58%" fill="#000" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PEUGEOT</text>
                </svg>
            );
        default:
            // Generic logo fallback (First letter in a stylish circle)
            return (
                <svg viewBox="0 0 60 60" className={className}>
                    <circle cx="30" cy="30" r="28" fill="#1e293b" />
                    <text x="50%" y="54%" fill="#fff" fontSize="28" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                        {brand.charAt(0).toUpperCase()}
                    </text>
                </svg>
            );
    }
}
