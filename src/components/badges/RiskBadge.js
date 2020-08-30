import React from 'react'
import { IconInformation, IconExclamation, IconShieldExclamation } from '../icons'

export default function RiskBadge({ risk }) {
    const RISKS = {
        none: { color: 'green-500', icon: <IconInformation styling='mr-auto' /> },
        low: { color: 'green-500', icon: <IconInformation styling='mr-auto' /> },
        medium: { color: 'yellow-600', icon: <IconExclamation styling='mr-auto' /> },
        high: { color: 'red-500', icon: <IconShieldExclamation styling='mr-auto' /> },
        critical: { color: 'red-500', icon: <IconShieldExclamation styling='mr-auto' /> }
    }
    return (
        <span  className={`px-2 py-1 flex justify-start items-center rounded bg-${RISKS[risk].color} text-white uppercase text-sm font-medium `}>
            {RISKS[risk].icon}
            {risk} 
        </span>
    )
}
