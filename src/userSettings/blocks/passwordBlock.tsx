export function PasswordBlock(props: {isCurrent: boolean}) {
    if (!props.isCurrent) {
        return null
    }
    return <div>password</div>
}