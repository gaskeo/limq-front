import {availableThemes, getSystemTheme, getTheme} from "../../theme";
import {useTypedSelector} from "../useTypedSelector";

const lightConveyor = require('../../images/conveyor-light.png')
const darkConveyor = require('../../images/conveyor-dark.png')


export function useMainBody() {
    const theme = getTheme()
    const conveyorImage = (theme === availableThemes.light ||
        (theme === availableThemes.system && getSystemTheme() === availableThemes.light)) ? darkConveyor : lightConveyor

    const {lang} = useTypedSelector(state => state.lang)
    return {conveyorImage, lang}
}