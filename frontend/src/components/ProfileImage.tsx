import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileImageProps {
    /** 이미지 URL */
    src?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
    src,
}) => {
    const { userInfo } = useAuth();
    const [imageError, setImageError] = useState(false);

    // 실제 사용할 이미지 URL (props로 전달된 것이 우선, 없으면 userInfo에서 가져옴)
    const imageUrl = src || userInfo?.profileImage;

    // src 주소가 변경될 때마다 에러 상태 초기화
    useEffect(() => {
        setImageError(false);
    }, [imageUrl]);

    const handleError = () => {
        setImageError(true);
    };

    const showImage = imageUrl && !imageError;

    return (
        <div className={"h-8 aspect-square rounded-full bg-gray-200 flex items-center justify-center text-gray-500"}>
            {showImage ? (
                <img
                    src={imageUrl}
                    onError={handleError}
                    className="h-full w-full object-cover rounded-full"
                />
            ) : (
                <DefaultFallbackIcon />
            )}
        </div>
    );
};

// 기본 Fallback 아이콘
const DefaultFallbackIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3/5 h-3/5"
    >
        <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
        />
    </svg>
);

export default ProfileImage;