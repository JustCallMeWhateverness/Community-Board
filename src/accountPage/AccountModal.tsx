import { Button, Modal, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useUser } from '../hooks/UserContext';
import Login from "./Login";
import Register from "./Register";
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

  const handleClose = () => {
    if (showLogin || showRegister) {
      // If user is on login/register, go back to choice screen
      setShowLogin(false);
      setShowRegister(false);
    } else {
      // Otherwise close modal fully
      onHide();
    }
  };

  const getTitle = () => {
    if (showLogin) return "Log In";
    if (showRegister) return "Register";
    return "Log in or Sign up!";
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{getTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!user && (
          <Col>
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
          </Col>
        )}
      </Modal.Body>
    </Modal>
  );
}