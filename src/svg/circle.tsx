export const Circle = ({active}: { active: boolean }) => (
    <svg className={active ? 'dot-active' : 'dot-inactive'} width="8" height="8" viewBox="0 0 8 8"
         xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="4"/>
    </svg>
)

