export const countAge = (birthday: string) => {
  const birthdayDate = new Date(birthday);
  const dateNow = new Date();
  const ageCount = dateNow.getFullYear() - birthdayDate.getFullYear();
  const monthCount = dateNow.getMonth() - birthdayDate.getMonth();
  const daysCount = dateNow.getDate() - birthdayDate.getDate();
  if (ageCount === 0) return 0;
  if (monthCount < 0) {
    return ageCount - 1;
  } else if (monthCount > 0) {
    return ageCount;
  }
  return daysCount < 0 ? ageCount - 1 : ageCount;
};
