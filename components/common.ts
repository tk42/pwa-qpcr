export const hash = () : string => {
    return (
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    )
}

export const now = () : number => {
    return Math.floor( new Date().getTime() / 1000 );
}
