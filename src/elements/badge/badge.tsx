import './badge.css'
import React from "react";

interface BadgeProps {
    children: React.ReactNode
    classes?: string
}

export function Badge({children, classes}: BadgeProps) {
    return <span className={`badge ${classes}`}>{children}</span>
}