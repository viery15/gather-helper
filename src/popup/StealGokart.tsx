import React from 'react';
import { Input, Row, Col, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { ActionType } from './enums';
import { getTabId } from '../utils';

const StealGokart: React.FC = () => {

    const handleSubmit = async () => {
        try {
            const tabId = await getTabId();
            if (!tabId) {
                console.error('No active tab found');
                return;
            }

            chrome.tabs.sendMessage(
                tabId,
                { action: ActionType.STEAL_GOKART },
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
        <div style={{ padding: '16px' }}>
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    <Button
                        type="primary"
                        block
                        onClick={handleSubmit}
                        icon={<SendOutlined />}
                    >
                        Steal Gokart
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default StealGokart; 