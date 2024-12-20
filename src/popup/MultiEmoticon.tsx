import React, { useState } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { ActionType } from './enums';
import { getTabId } from '../utils';

interface MultiEmoticonProps {
  isConnected: boolean;
}

const MultiEmoticon: React.FC<MultiEmoticonProps> = ({ isConnected }) => {
  const [emoticon, setEmoticon] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = async () => {
    try {
      const tabId = await getTabId();
      if (!tabId) {
        console.error('No active tab found');
        return;
      }
      
      chrome.tabs.sendMessage(
        tabId,
        { action: ActionType.MULTI_EMOTICON, emoticon },
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
  };

  return (
    <div>
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
            onClick={handleSubmit}
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
  );
};

export default MultiEmoticon; 