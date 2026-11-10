export interface Ages {
  korean: number;
  international: number;
}

/** birth, today 모두 "YYYY-MM-DD" 형식 */
export function calculateAges(birth: string, today: string): Ages {
  const [birthYear, birthMonth, birthDay] = birth.split("-").map(Number);
  const [year, month, day] = today.split("-").map(Number);
  const hadBirthday = month > birthMonth || (month === birthMonth && day >= birthDay);
  return {
    korean: year - birthYear + 1,
    international: year - birthYear - (hadBirthday ? 0 : 1),
  };
}

export function todayInSeoul(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}
