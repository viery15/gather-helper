import React, { useState } from 'react';
import { Input, Row, Col, Button, Slider, InputNumberProps } from 'antd';
import { getTabId } from '../utils';
import { ActionType } from './enums';

const MovementSpeed: React.FC = () => {

    const [inputValue, setInputValue] = useState(1);

    const onChange: InputNumberProps['onChange'] = async (newValue) => {
        setInputValue(newValue as number);

        const tabId = await getTabId();
            if (!tabId) {
                console.error('No active tab found');
                return;
            }

            chrome.tabs.sendMessage(
                tabId,
                { action: ActionType.MOVEMENT_SPEED, data: newValue },
                (response) => { }
            );
    };

    return (
        <div style={{ padding: '16px' }}>
            <Slider
                min={1}
                max={5}
                onChange={onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
            />
        </div>
    );
};

export default MovementSpeed; 