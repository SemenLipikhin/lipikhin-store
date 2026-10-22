import { useRef, useState } from "react";
import { Link } from "react-router";
import { useStore } from "../store/useStore.js";
import { sanitizeProfile, validateProfile } from "../utils/profile.js";
import "./ProductPage.css";
import "./AccountPage.css";

const profileKey = "lipikhin-profile-v1";

function readProfile() {
  try { return sanitizeProfile(JSON.parse(localStorage.getItem(profileKey))); }
  catch { return null; }
}

export default function AccountPage() {
  const { favorites, cart } = useStore();
  const [profile, setProfile] = useState(readProfile);
  const [editing, setEditing] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [errors, setErrors] = useState({});
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function saveProfile(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const { profile: nextProfile, errors: nextErrors } = validateProfile(Object.fromEntries(new FormData(form)));
    setErrors(nextErrors);
    setStorageMessage("");
    if (!nextProfile) {
      (nextErrors.name ? nameInput : emailInput).current?.focus();
      return;
    }
    try {
      localStorage.setItem(profileKey, JSON.stringify(nextProfile));
      setStorageMessage("Профиль сохранён в этом браузере.");
    } catch {
      setStorageMessage("Браузер не разрешил сохранить профиль. Данные доступны до обновления страницы.");
    }
    setProfile(nextProfile);
    setEditing(false);
  }

  function deleteProfile() {
    try { localStorage.removeItem(profileKey); }
    catch {
      setStorageMessage("Не удалось удалить профиль из памяти браузера. Повторите попытку.");
      return;
    }
    setProfile(null);
    setEditing(false);
    setErrors({});
    setStorageMessage("Локальный профиль удалён. Корзина и избранное остались на месте.");
  }

  return (
    <main id="main-content" className="shopping-page container account-page" tabIndex={-1}>
      <h1>Личный кабинет</h1>
      <p>Профиль, избранное и корзина сохраняются в этом браузере.</p>

      <section className="account-profile" aria-labelledby="account-profile-title">
        <div className="account-profile__heading">
          <h2 id="account-profile-title">{profile && !editing ? `Здравствуйте, ${profile.name}` : editing ? "Изменить профиль" : "Создать профиль"}</h2>
          <p>Локальный профиль: без пароля и настоящей регистрации. Данные не отправляются на сервер.</p>
        </div>

        {profile && !editing ? <div className="account-profile__saved">
          <p><span>Имя</span><strong>{profile.name}</strong></p>
          <p><span>Почта</span><strong>{profile.email}</strong></p>
          <div className="account-profile__actions">
            <button type="button" className="account-profile__button" onClick={() => { setStorageMessage(""); setErrors({}); setEditing(true); }}>Изменить данные</button>
            <button type="button" className="account-profile__text-button" onClick={deleteProfile}>Удалить локальный профиль</button>
          </div>
        </div> : <form className="account-profile__form" onSubmit={saveProfile} noValidate>
          <label htmlFor="profile-name">Имя</label>
          <input ref={nameInput} id="profile-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={60} defaultValue={profile?.name || ""} placeholder="Как к вам обращаться" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "profile-name-error" : undefined} onChange={() => setErrors((current) => ({ ...current, name: "" }))} />
          {errors.name && <p className="account-profile__error" id="profile-name-error" role="alert">{errors.name}</p>}
          <label htmlFor="profile-email">Электронная почта</label>
          <input ref={emailInput} id="profile-email" name="email" type="email" autoComplete="email" required maxLength={120} defaultValue={profile?.email || ""} placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "profile-email-error" : undefined} onChange={() => setErrors((current) => ({ ...current, email: "" }))} />
          {errors.email && <p className="account-profile__error" id="profile-email-error" role="alert">{errors.email}</p>}
          <div className="account-profile__actions">
            <button className="account-profile__button" type="submit">{editing ? "Сохранить изменения" : "Сохранить профиль"}</button>
            {editing && <button className="account-profile__text-button" type="button" onClick={() => { setErrors({}); setEditing(false); }}>Отмена</button>}
          </div>
        </form>}
        {storageMessage && <p className="account-profile__status" role="status">{storageMessage}</p>}
      </section>

      <nav className="account-links" aria-label="Разделы кабинета">
        <Link to="/favorites">Избранное ({favorites.length})</Link>
        <Link to="/cart">Корзина ({cartCount})</Link>
      </nav>
    </main>
  );
}
