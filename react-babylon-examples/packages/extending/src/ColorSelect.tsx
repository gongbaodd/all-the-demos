import { ChangeEvent, createContext, useCallback, useContext, useState } from "react";

const RED = 'Red';
const GREEN = 'Green';
const YELLOW = 'Yellow';
type TColor = typeof RED | typeof GREEN | typeof YELLOW;
const COLORS: TColor[] = [RED, GREEN, YELLOW]

const ColorContext = createContext<{
    selectedColor: TColor;
    setSelectedColor: (color: TColor) => void;
}>({
    selectedColor: GREEN,
    setSelectedColor: () => { },
});

export function ColorSelectProvider({ children }: { children: React.ReactNode }) {
    const [selectedColor, setSelectedColor] = useState<TColor>(GREEN);
    return <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
        {children}
    </ColorContext.Provider>
}


export function ColorSelect() {
    const { selectedColor, setSelectedColor } = useContext(ColorContext);

    const onColorChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedColor(e.target.value as TColor);
    }, [selectedColor])

    return (
        <div className="row">
            <label htmlFor="color-select">
                Choose color:
            </label>
            <select
                id="color-select"
                defaultValue={selectedColor}    
                onChange={onColorChange}
            >
                {COLORS.map(color => (
                    <option key={color} value={color}>
                        {color}
                    </option>
                ))}
            </select>
        </div>
    );
}
