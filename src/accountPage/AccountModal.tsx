import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useUser } from '../hooks/UserContext';
import Login from "./Login";
import Register from "./Register";
import UserPage from "./UserPage";
import { useNavigate } from "react-router-dom";

export default function AccountModal({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
  const { user, loading } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      onHide();
      navigate("/user");
    }
  }, [user]);
  if (loading) return <p>Loading...</p>;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log in or Sign up! </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!user && (
          <div>
            {!showLogin && !showRegister && (
              <>
                <Button onClick={() => setShowLogin(true)}>Log In</Button>
                <Button onClick={() => setShowRegister(true)} className="ms-2">
                  Register
                </Button>
              </>
            )}

            {showLogin && <Login />}
            {showRegister && <Register />}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}