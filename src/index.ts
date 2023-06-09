import { buildStreak, differenceInDays, formattedDate, KEY, Streak, updateStreak } from "./utils"

function shouldIncrementOrResetStreakCount(
    currentDate: Date,
    lastLoginDate: string,
): 'increment' | 'reset' | 'none' {
    const difference = differenceInDays(currentDate, new Date(lastLoginDate))
    // Same-day login, do nothing
    if (difference === 0) {
        return 'none'
    }
    // This means they logged in the day after the currentDate
    if (difference === 1) {
        return 'increment'
    }
    // Otherwise they logged in after a day, which would
    // break the streak
    return 'reset'
}


export function streakCounter(storage: Storage, date: Date): Streak {
    const streakInLocalStorage = storage.getItem(KEY)
    if (streakInLocalStorage) {
        try {
            const streak = JSON.parse(streakInLocalStorage) as Streak,
                state = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate),
                SHOULD_INCREMENT = state === 'increment',
                SHOULD_RESET = state === 'reset'

            if (SHOULD_INCREMENT) {
                const updatedStreak = buildStreak(date, {
                    startDate: streak.startDate,
                    currentCount: streak.currentCount + 1,
                    lastLoginDate: formattedDate(date)
                })
                // store in localStorage
                updateStreak(storage, updatedStreak)

                return updatedStreak
            }
            if (SHOULD_RESET) {
                const updatedStreak = buildStreak(date)
                // store in localStorage
                updateStreak(storage, updatedStreak)


                return updatedStreak
            }

            return streak
        } catch (error) {
            console.error("Failed to parse streak from localStorage")
        }
    }

    const streak = buildStreak(date)

    // store in localStorage
    updateStreak(storage, streak)

    return streak
}