import React, { useState } from "react";
import Image from "next/image";

const MAGNIFIER_SIZE = 100;
const ZOOM_LEVEL = 2.5;

interface imageEffectProps {
    image: string;
}

const ImageEffect = ({ image }: imageEffectProps) => {
    const [zoomable, setZoomable] = useState(true);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [position, setPosition] = useState({ x: 100, y: 100, mouseX: 0, mouseY: 0});

    // event handlers
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        let element = e.currentTarget;
        let { width, height } = element.getBoundingClientRect();
        setImageSize({ width, height });
        setZoomable(true);
        updatePosition(e);
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
       setZoomable(false);
       updatePosition(e);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
       updatePosition(e);
    }

    const updatePosition = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY - top;
        setPosition({
            x: -x * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
            y: -y * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
            mouseX: x - (MAGNIFIER_SIZE / 2),
            mouseY: y - (MAGNIFIER_SIZE / 2),
        });
    };


     return (
        <div className='flex justify-center items-center'>
            <div
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                className='w-80 h-96 relative overflow-hidden'>
                            <Image 
                            className='object-cover border z-10'
                             alt="" 
                             src={image} 
                             fill />

                <div
                    style={{
                        backgroundPosition: `${position.x}px ${position.y}px`,
                        backgroundImage: `url(${image})`,
                        backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`,
                        backgroundRepeat: 'no-repeat',
                        display: zoomable ? 'block' : 'none',
                        top: `${position.mouseY}px`,
                        left: `${position.mouseX}px`,
                        width: `${MAGNIFIER_SIZE}px`,
                        height: `${MAGNIFIER_SIZE}px`,
                    }}
                    className={`z-50 border-2 rounded-full pointer-events-none absolute border-gray-500`}
                />
            </div>
        </div>
    );
};

export default ImageEffect;