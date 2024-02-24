import { useState, useEffect } from 'react';

export default function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            setCurrentTime(`${hour}:${minute}:${second}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return currentTime;
}
