import React, { useState, useEffect } from 'react';
import { Layout, Button, Card, Typography, Badge, Input, Row, Col } from 'antd';
import { CheckCircleOutlined, DisconnectOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import SingleEmoticon from './SingleEmoticon';

const { Content } = Layout;

const Popup: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      setIsConnected(currentTab.url?.includes('gather.town') ?? false);
    });
  }, []);

  return (
    <Layout className="popup-container">
      <Content>
        <Card>
          <Badge
            status={isConnected ? "success" : "error"}
            text={
              <span style={{ marginLeft: 8 }}>
                {isConnected ? (
                  <><CheckCircleOutlined /> Connected to Gather</>
                ) : (
                  <><DisconnectOutlined /> Not on Gather</>
                )}
              </span>
            }
          />

          <div style={{ marginTop: 10 }}>
            <Typography.Text strong>Single Emoticon</Typography.Text>
            <SingleEmoticon isConnected={isConnected} />
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default Popup; 