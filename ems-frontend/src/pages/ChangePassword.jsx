import { useState } from "react";
import api from "../api/axios";

function ChangePassword() {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
  });

  const changePassword = async () => {
    try {
      await api.put("auth/change-password/", form);
      alert("Password Changed Successfully");
    } catch {
      alert("Password change failed");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        onChange={(e) =>
          setForm({ ...form, old_password: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) =>
          setForm({ ...form, new_password: e.target.value })
        }
      />

      <button onClick={changePassword}>
        Change Password
      </button>
    </div>
  );
}

export default ChangePassword;