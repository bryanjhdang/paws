import { createContext, useContext } from 'react';

import { TimerStatus } from "../classes/models";

export const TimerContext = createContext<TimerStatus | undefined>(undefined);

export function useTimerContext(): TimerStatus {
    const timerContext = useContext(TimerContext);

    if (timerContext === undefined) {
        throw new Error("useTimerContext must be used within a TimerContext.Provider");
    }

    return timerContext;
}