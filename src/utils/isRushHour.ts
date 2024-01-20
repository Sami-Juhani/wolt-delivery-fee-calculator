export default function isRushHour(date: Date): boolean {
    const day = date.getDay();
    const hour = date.getHours();
    return day === 5 && hour >= 15 && hour < 19;
};