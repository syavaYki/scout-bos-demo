export function validateDate(date: string) {
  const validDate = new Date(date).toDateString() !== 'Invalid Date';
  return validDate ? new Date(date)?.toISOString().split('T')[0] : '';
}
