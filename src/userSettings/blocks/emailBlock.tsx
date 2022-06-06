export function EmailBlock(props: {isCurrent: boolean}) {
    if (!props.isCurrent) {
        return null
    }
    return <div>email</div>
}