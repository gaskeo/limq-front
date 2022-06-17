export const Circle = (props: { active: boolean }) => (
    <svg className="bi bi-dot text-success" width="8" height="8" viewBox="0 0 8 8"
         fill={props.active ? '#28a745' : 'yellow'} xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="4"/>
    </svg>
)

