export const getRandomPosition=(widthContainer,heightContainer,circleSize)=>{
    const width = widthContainer - circleSize;
    const height = heightContainer- circleSize;
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    return { x: randomX, y: randomY };
}

export const getCircleStyle=(position,circleSize)=>({
    left:`${position.x}px`,
    top:`${position.y}px`,
    width: `${circleSize}px`,
    height: `${circleSize}px`,
    lineHeight: `${circleSize}px`,
    position: 'absolute',
})

export const getNumber=(count,i)=>{
    return count-i;
}