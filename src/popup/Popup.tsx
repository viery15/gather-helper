import React, { useState, useEffect } from 'react';
import { Layout, Button, Card, Typography, Badge, Input, Row, Col } from 'antd';
import { CheckCircleOutlined, DisconnectOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { ActionType } from './enums';
import { getTabId } from '../utils';

const { Content } = Layout;

const Popup: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [emoticon, setEmoticon] = useState('');
  const [showPicker, setShowPicker] = useState(false);

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
            <Row gutter={8} style={{ marginTop: 8 }}>
              <Col flex="auto">
                <Input
                  placeholder="Enter emoticon"
                  value={emoticon}
                  onChange={(e) => setEmoticon(e.target.value)}
                  disabled={!isConnected}
                  suffix={
                    <SmileOutlined
                      onClick={() => setShowPicker(!showPicker)}
                      style={{ cursor: 'pointer' }}
                    />
                  }
                />
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  disabled={!isConnected}
                  onClick={async () => {
                    try {
                      const tabId = await getTabId();
                      if (!tabId) {
                        console.error('No active tab found');
                        return;
                      }
                      
                      chrome.tabs.sendMessage(
                        tabId,
                        { action: ActionType.SINGLE_EMOTICON, emoticon },
                        (response) => {
                          if (chrome.runtime.lastError) {
                            console.error('Message sending failed:', chrome.runtime.lastError);
                          } else {
                            console.log('Message sent successfully:', response);
                          }
                        }
                      );
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>

            {showPicker && (
              <div style={{ position: 'absolute', zIndex: 1, marginTop: 8 }}>
                <Picker
                  data={data}
                  onEmojiSelect={(emoji: any) => {
                    setEmoticon(emoji.native);
                    setShowPicker(false);
                  }}
                  theme="light"
                  previewPosition="none"
                  skinTonePosition="none"
                  maxFrequentRows={2}
                />
              </div>
            )}
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default Popup; 