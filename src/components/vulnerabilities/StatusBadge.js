import React from 'react'

export default function VulnerabilityStatusBadge({status}) {
    const STATUSES = {
        'open': {
            label: 'Open',
            color: 'yellow'
        },
        'closed': {
            label: 'Closed',
            color: 'green'
        },
    }
    return (
        <div className={`text-${STATUSES[status].color}-500`}>
            {STATUSES[status].label}
        </div>
    )
}
