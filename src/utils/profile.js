export function validateProfile(value) {
  const name = typeof value?.name === "string" ? value.name.trim().replace(/\s+/g, " ") : "";
  const email = typeof value?.email === "string" ? value.email.trim().toLowerCase() : "";
  const errors = {};

  if (name.length < 2 || name.length > 60 || /[<>\p{Cc}\p{Cf}]/u.test(name)) {
    errors.name = "Введите имя от 2 до 60 символов без служебных знаков.";
  }
  if (email.length > 120 || /[<>\p{Cc}\p{Cf}]/u.test(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Введите адрес почты в формате name@example.com.";
  }

  return { profile: Object.keys(errors).length ? null : { name, email }, errors };
}

export function sanitizeProfile(value) {
  return validateProfile(value).profile;
}
