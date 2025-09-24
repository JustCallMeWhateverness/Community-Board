import { Button } from 'react-bootstrap';
import { useState } from 'react';

import { useUser } from '../hooks/UserContext';
import Login from "./Login";
import Register from "./Register";
import UserPage from "./UserPage";
import { Modal } from 'react-bootstrap';

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


  if (loading) return <p>Loading...</p>;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log in or Sign up! </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <UserPage />
        ) : (
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