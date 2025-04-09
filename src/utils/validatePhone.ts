export const validatePhone = (phone: string): { isValid: boolean; error: string } => {
  const phoneRegex = /^\d{11}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Номер телефона должен содержать 11 цифр' };
  }
  return { isValid: true, error: '' };
};
