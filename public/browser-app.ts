import axios from "axios";

const formDOM = document.querySelector(".form") as HTMLFormElement;
const usernameInputDOM = document.querySelector(
  ".username-input"
) as HTMLInputElement;
const passwordInputDOM = document.querySelector(
  ".password-input"
) as HTMLInputElement;
const formAlertDOM = document.querySelector(".form-alert") as HTMLDivElement;
const resultDOM = document.querySelector(".result") as HTMLDivElement;
const btnDOM = document.querySelector("#data") as HTMLButtonElement;
const tokenDOM = document.querySelector(".token") as HTMLDivElement;

formDOM.addEventListener("submit", async (e) => {
  formAlertDOM.classList.remove("text-success");
  tokenDOM.classList.remove("text-success");

  e.preventDefault();
  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;

  try {
    const { data } = await axios.post<{ msg: string; token: string }>(
      "/api/v1/login",
      { username, password }
    );

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = data.msg;

    formAlertDOM.classList.add("text-success");
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";

    localStorage.setItem("token", data.token);
    resultDOM.innerHTML = "";
    tokenDOM.textContent = "token present";
    tokenDOM.classList.add("text-success");
  } catch (error: Error | any) {
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = error.response.data.msg;
    localStorage.removeItem("token");
    resultDOM.innerHTML = "";
    tokenDOM.textContent = "no token present";
    tokenDOM.classList.remove("text-success");
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
  }, 2000);
});

btnDOM.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get<{ msg: string; secret: string }>(
      "/api/v1/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;

    data.secret;
  } catch (error: Error | any) {
    localStorage.removeItem("token");
    resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`;
  }
});

const checkToken = () => {
  tokenDOM.classList.remove("text-success");

  const token = localStorage.getItem("token");
  if (token) {
    tokenDOM.textContent = "token present";
    tokenDOM.classList.add("text-success");
  }
};
checkToken();
