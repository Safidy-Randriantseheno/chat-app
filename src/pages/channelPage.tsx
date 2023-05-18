import React from 'react';

interface User {
  name: string;
  // Add any other user properties you need
}

interface ChannelPageProps {
  user: User;
}

const ChannelPage: React.FC<ChannelPageProps> = ({ user }) => {
  return (
    <div>
      <h1>Channel groups 1</h1>
      <p> member: {user.name}!</p>
    </div>
  );
};

export default ChannelPage;
