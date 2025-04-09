export const validateTime = (
  start: string,
  end: string,
): { isValid: boolean; error: string; nextDay?: boolean } => {
  const startHour = parseInt(start.split(':')[0] as string, 10);
  const endHour = parseInt(end.split(':')[0] as string, 10);
  let duration = endHour - startHour;

  if (isNaN(startHour) || isNaN(endHour)) {
    return { isValid: false, error: 'Некорректный формат времени' };
  }

  let nextDay = false;
  if (duration < 0) {
    duration += 24;
    nextDay = true;
  }

  if (duration < 2) {
    return { isValid: false, error: 'Минимальная продолжительность бронирования — 2 часа' };
  }
  if (duration > 6) {
    return { isValid: false, error: 'Максимальная продолжительность бронирования — 6 часов' };
  }

  return { isValid: true, error: '', nextDay };
};
