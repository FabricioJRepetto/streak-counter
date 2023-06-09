// Used when storing in localStorage
export const KEY = "streak"

export interface Streak {
    currentCount: number
    startDate: string
    lastLoginDate: string
}

export function formattedDate(date: Date): string {
    return date.toLocaleDateString('en-US')
}

export function buildStreak(
    date: Date,
    overrideDefaults?: Partial<Streak>,
): Streak {
    const defaultStreak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date),
    }

    return {
        ...defaultStreak,
        ...overrideDefaults,
    }
}

export function updateStreak(storage: Storage, streak: Streak): void {
    storage.setItem(KEY, JSON.stringify(streak))
}

export function differenceInDays(dateLeft: Date, dateRight: Date): number {
    const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime())
    const differenceInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return differenceInDays
}