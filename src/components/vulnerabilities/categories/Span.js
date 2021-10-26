
export const parentChildNames = (parentName, name) => {
    if (name === null) {
        return '-'
    }

    if (parentName !== null) {
        return `${parentName} • ${name}`
    }

    return name
}

const VulnerabilityCategorySpan = ({ name, parentName = null }) => {
    return <>{parentChildNames(parentName, name)}</>
}

export default VulnerabilityCategorySpan;
