import { useEffect } from 'react';

function useOnClickOutside(
    ref: React.RefObject<HTMLDivElement>, 
    display: boolean, 
    callback: (event: MouseEvent | TouchEvent) => void) {

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // Do nothing if clicking ref element or descendent elements
            if(!ref.current || 
                ref.current.contains(event.target as Node) || 
                !display)
                return;

            callback(event);
        };

        // For mice
        document.addEventListener('mousedown', listener);
        // For touch screens
        document.addEventListener('touchstart', listener); 
        
        return () => { // Cleanup listeners
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, callback, display])

}


export default useOnClickOutside;
