
interface TagProps {
    children: any;
}

const Tag = ({children}: TagProps) => {
    return <span className="tag is-info">{children}</span>
}

export default Tag;
