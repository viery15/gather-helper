import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getTabId } from '../utils';
import { ActionType } from './enums';
import { Player } from '@gathertown/gather-game-client';

const TeleportToPlayer: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    const getPlayers = async () => {
        try {
            const tabId = await getTabId();
            if (!tabId) {
                console.error('No active tab found');
                return;
            }

            chrome.tabs.sendMessage(
                tabId,
                { action: ActionType.GET_PLAYERS },
                (response) => { }
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case ActionType.GET_PLAYERS:
                    setPlayers(Object.values(request.data));
                    break
            }
        })
    }, [])

    return (
        <div>
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a player"
                options={players.map(player => ({
                    label: player.name,
                    value: player.id,
                }))}
                onDropdownVisibleChange={(open) => {
                    if (open) {
                        getPlayers();
                    }
                }}
                filterOption={(input, option) => {
                    if (!option) return false;
                    return option.label.toLowerCase().includes(input.toLowerCase());
                }}
                dropdownAlign={{
                    overflow: { adjustX: true, adjustY: false }
                }}
                dropdownRender={menu => (
                    <div style={{ maxHeight: 200, overflowY: 'auto' }}> { }
                        {menu}
                    </div>
                )}
            />
        </div>
    );
};

export default TeleportToPlayer; 