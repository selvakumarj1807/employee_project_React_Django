import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("auth/profile/").then((res) => setProfile(res.data));
  }, []);

  if (!profile) return <p className="loading">Loading profile...</p>;

  return (
    <>
      <style>{`

      body{
        margin:0;
        background:#f1f5f9;
        font-family:"Segoe UI",sans-serif;
      }

      .profile-page{
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
      }

      .profile-card{
        background:white;
        width:100%;
        max-width:420px;
        border-radius:20px;
        padding:35px;
        box-shadow:0 15px 40px rgba(0,0,0,0.08);
        text-align:center;
        animation:fadeIn .4s ease;
      }

      @keyframes fadeIn{
        from{opacity:0; transform:translateY(15px);}
        to{opacity:1; transform:translateY(0);}
      }

      .avatar{
        width:80px;
        height:80px;
        background:#6366f1;
        color:white;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:30px;
        font-weight:700;
        margin:auto;
        margin-bottom:15px;
      }

      .title{
        font-size:22px;
        font-weight:700;
        margin-bottom:20px;
      }

      .profile-info{
        text-align:left;
        margin-top:15px;
      }

      .profile-row{
        padding:10px 0;
        border-bottom:1px solid #eee;
      }

      .profile-row span{
        display:block;
        font-size:13px;
        color:#6b7280;
      }

      .profile-row b{
        font-size:15px;
      }

      .back-btn{
        margin-bottom:20px;
        display:inline-block;
        text-decoration:none;
        background:#111827;
        color:white;
        padding:8px 14px;
        border-radius:8px;
        font-size:14px;
        transition:.2s;
      }

      .back-btn:hover{
        background:#000;
      }

      .loading{
        text-align:center;
        padding:40px;
        font-weight:600;
      }

      @media(max-width:480px){

        .profile-card{
          padding:25px;
        }

        .avatar{
          width:65px;
          height:65px;
          font-size:24px;
        }

      }

      `}</style>

      <div className="profile-page">

        <div className="profile-card">

          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>

          {/* AVATAR */}
          <div className="avatar">
            {profile.username?.charAt(0).toUpperCase()}
          </div>

          <div className="title">User Profile</div>

          <div className="profile-info">

            <div className="profile-row">
              <span>Username</span>
              <b>{profile.username}</b>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <b>{profile.email}</b>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;