import React from 'react';
import './notificationCard.css';

const NotificationCard = ({ message, type }) => {
    return (
        <div className={`notification-card fixed py-[10px] px-[20px] rounded-md font-semibold z-50 ${type}`}>
            {message}
        </div>
    );
};

export default NotificationCard;
