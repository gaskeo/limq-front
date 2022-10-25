import React from "react";
import {useQuotaSettingsBlock} from "../../hooks/elementHooks/useUserSettings";

export function QuotasBlock() {
    const {mainText} = useQuotaSettingsBlock()

    return (
        <div>
            <span style={{whiteSpace: 'pre-wrap'}} className='text settings-text'>{mainText}</span>
        </div>
    )
}