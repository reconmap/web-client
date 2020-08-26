import React from 'react'
import { IconInformation, IconExclamation, IconShieldExclamation } from '../icons'

export default function RiskBadge({ risk }) {
    const RISKS = {
        none: { color: 'green', icon: <IconInformation styling='ml-2' /> },
        low: { color: 'green', icon: <IconInformation styling='ml-2' /> },
        medium: { color: 'yellow', icon: <IconExclamation styling='ml-2' /> },
        high: { color: 'red', icon: <IconShieldExclamation styling='ml-2' /> },
        critical: { color: 'red', icon: <IconShieldExclamation styling='ml-2' /> }
    }
    return (
        <div className={`px-1 w-32 flex justify-start items-center  py-1 rounded bg-${RISKS[risk].color}-500 text-black uppercase font-semibold `}>
            {RISKS[risk].icon}
            {risk} 
        </div>
    )
}
