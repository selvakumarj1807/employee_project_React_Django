import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);

    try {
      await api.post("auth/register/", form);
      alert("Registration Successful");
      navigate("/");
    } catch {
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`

      *{box-sizing:border-box;font-family:Segoe UI}

      body{
        margin:0;
        background:linear-gradient(135deg,#667eea,#764ba2);
      }

      .auth-container{
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
      }

      .auth-card{
        width:100%;
        max-width:420px;
        background:white;
        border-radius:16px;
        padding:40px 30px;
        box-shadow:0 15px 40px rgba(0,0,0,.2);
      }

      .title{
        text-align:center;
        font-size:26px;
        font-weight:700;
        margin-bottom:25px;
      }

      .input{
        width:100%;
        height:46px;
        padding:10px 14px;
        border-radius:10px;
        border:1px solid #ddd;
        margin-bottom:15px;
      }

      .input:focus{
        outline:none;
        border-color:#667eea;
        box-shadow:0 0 0 2px rgba(102,126,234,.2);
      }

      .btn{
        width:100%;
        height:46px;
        border:none;
        border-radius:10px;
        background:linear-gradient(135deg,#667eea,#764ba2);
        color:white;
        font-weight:600;
        cursor:pointer;
      }

      .btn:hover{
        transform:translateY(-2px);
      }

      .switch{
        text-align:center;
        margin-top:15px;
      }

      .switch a{
        color:#667eea;
        text-decoration:none;
        font-weight:600;
      }

      .switch a:hover{
        text-decoration:underline;
      }

      @media(max-width:480px){
        .auth-card{
          padding:30px 20px;
        }
      }

      `}</style>

      <div className="auth-container">

        <div className="auth-card">

          <div className="title">Create Account</div>

          <input
            className="input"
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            className="btn"
            onClick={register}
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <div className="switch">
            Already have an account? <Link to="/">Login</Link>
          </div>

        </div>

      </div>
    </>
  );
}

export default Register;