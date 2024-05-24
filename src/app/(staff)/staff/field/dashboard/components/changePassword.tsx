import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get the JWT token from local storage or your auth context

      const response = await fetch(
        "http://localhost:8000/field/change-password",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Error changing password");
        return;
      }

      const data = await response.json();
      setMessage(data.message || "Password changed successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error changing password");
    }
  };

  return (
    <div className="grid gap-2">
      <h2>Change your Password</h2>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <div>
          <Label>Old Password</Label>
          <Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>New Password</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Confirm New Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button className="bg-gray-900 text-white" type="submit">
          Change Password
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
