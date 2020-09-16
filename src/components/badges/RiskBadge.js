import React from 'react'
import { IconInformation, IconExclamation, IconShieldExclamation } from '../icons'

export default function RiskBadge({ risk , fontSize='text-sm'}) {
    const RISKS = {
        none: { color: 'green-500', icon: <IconInformation size='4' styling='mr-2' /> },
        low: { color: 'green-500', icon: <IconInformation size='4' styling='mr-2' /> },
        medium: { color: 'yellow-600', icon: <IconExclamation size='4' styling='mr-2' /> },
        high: { color: 'red-500', icon: <IconShieldExclamation size='4' styling='mr-2' /> },
        critical: { color: 'red-500', icon: <IconShieldExclamation size='4' styling='mr-2' /> }
    }
    return (
        <span className={`px-2 py-1 inline-flex justify-start items-center rounded border-2 border-${RISKS[risk].color} text-${RISKS[risk].color} uppercase ${fontSize} font-medium `}>
            {RISKS[risk].icon}
            {risk}
        </span>
    )
}
