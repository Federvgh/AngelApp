import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <Container fluid className="py-4">
          {children}
        </Container>
      </main>
    </div>
  );
};

export default MainLayout;

