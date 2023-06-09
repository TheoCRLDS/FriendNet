import "./Register.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({});

  // Récupération des données saisies dans les inputs
  const getData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setData(Object.fromEntries(formData));

    sendDataAPI();
  };

  // Envoi des données dans l'API avec une requête HTML POST
  const sendDataAPI = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.name,
      }),
    };
    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/friend-net/register`,
      options
    );
    const donnees = await response.json();
    console.log("API Response", donnees);

    if (donnees.success == false) {
      return null;
    } else {
      // Si la requête est un succès, connecte l'utilisateur directement
      sendDataLoginAPI();
    }
  };

  // Envoi des données dans l'API avec une requête HTML POST
  const sendDataLoginAPI = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    };
    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/friend-net/login`,
      options
    );
    const donnees = await response.json();
    console.log("API Response", donnees);

    if (donnees.success == false) {
      return null;
    } else {
      // Si la requête est un succès, connecte l'utilisateur et le redirige vers la page de profil, puis récupère le token
      getToken(donnees.token);
      redirectProfile();
    }
  };

  // Récupère le token et le stocke dans le localStorage
  const getToken = (token) => {
    localStorage.setItem("token", token);
  };

  // Fonction utilisé pour rediriger l'utilisateur vers sa page de profil
  let navigate = useNavigate();
  const redirectProfile = () => {
    let path = "/user";
    navigate(path);
  };

  useEffect(() => {
    getData;
    console.log("data : ", data);
  }, [setData, data]);

  useEffect(() => {
    sendDataAPI();
  }, [data]);

  useEffect(() => {
    sendDataLoginAPI();
  }, []);

  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="d-flex justify-content-center mt-5">
        <form
          className="d-flex flex-column w-50 justify-content-center"
          onSubmit={getData}
        >
          <div className="mb-2 d-flex gap-1">
            <input
              type="text"
              name="firstname"
              className="form-control border border-dark"
              id="exampleInputName2"
              aria-describedby="First Name"
              placeholder="First Name"
            />
            <input
              type="text"
              name="name"
              className="form-control border border-dark"
              id="exampleInputName1"
              aria-describedby="Name"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control border border-dark"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-1 ">
            <input
              type="password"
              name="password"
              className="form-control border border-dark"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <label htmlFor="exampleInputEmail1" className="form-label ">
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              className="form-control border border-dark"
              id="exampleInputDate"
              aria-describedby="dateHelp"
            />
            <p>Gender</p>
          </div>
          <div className=" mb-3 ">
            <div className="form-check form-check-inline mb-0 me-4">
              <input
                className="form-check-input border border-dark"
                type="radio"
                name="gender"
                id="femaleGender"
                value="option1"
              />
              <label className="form-check-label" htmlFor="femaleGender">
                Female
              </label>
            </div>

            <div className="form-check form-check-inline mb-0 me-4">
              <input
                className="form-check-input border border-dark"
                type="radio"
                name="gender"
                id="maleGender"
                value="option2"
              />
              <label className="form-check-label" htmlFor="maleGender">
                Male
              </label>
            </div>

            <div className="form-check form-check-inline mb-0">
              <input
                className="form-check-input border border-dark"
                type="radio"
                name="gender"
                id="otherGender"
                value="option3"
              />
              <label className="form-check-label" htmlFor="otherGender">
                Other
              </label>
            </div>
          </div>
          <div className="mb-3"></div>
          <button type="submit" className="btn btn-dark">
            Register
          </button>
        </form>
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default Register;
