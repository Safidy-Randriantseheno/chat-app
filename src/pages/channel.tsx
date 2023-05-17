import { useEffect, useState } from 'react';

const ChannelPage = () => {
  const [channelInfo, setChannelInfo] = useState({
    name: '',
    description: '',
    subscribers: 0,
  });

  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        const response = await fetch('/api/channel');
        if (response.ok) {
          const data = await response.json();
          setChannelInfo(data);
        } else {
          console.error('Failed to fetch channel information');
        }
      } catch (error) {
        console.error('Error fetching channel information:', error);
      }
    };

    fetchChannelInfo();
  }, []);

  return (
    <div>
      <h1>Channel Page</h1>
      <h2>Channel Name: {channelInfo.name}</h2>
      <p>Channel Description: {channelInfo.description}</p>
      <p>Number of Subscribers: {channelInfo.subscribers}</p>
    </div>
  );
};

export default ChannelPage;
