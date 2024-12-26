export type Props = {
    getValues?: (input: string) => Promise<any[]>;
    renderChild?: any;
    transformData?: (item: any) => string;
};
export declare const setInputValue: (props: any, state: any, value: string) => void;
export declare const handleClick: (props: any, state: any, item: any) => void;
export declare const fetchVals: (props: any, state: any, city: string) => any;
export declare const transform: (props: any, state: any, x: any) => any;
export declare const AutoComplete: import("@builder.io/qwik").Component<Props>;
export default AutoComplete;
export declare const STYLES = "\n.div-AutoComplete {\n  padding: 10px;\n  max-width: 700px;\n}\n.div-AutoComplete-2 {\n  position: relative;\n  display: flex;\n  gap: 16px;\n  align-items: stretch;\n}\n.input-AutoComplete {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  border-radius: 0.25rem;\n  border-width: 1px;\n  border-color: #000000;\n  width: 100%;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06);\n}\n.button-AutoComplete {\n  cursor: pointer;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  border-radius: 0.25rem;\n  color: #ffffff;\n  background-color: #ef4444;\n}\n.ul-AutoComplete {\n  border-radius: 0.25rem;\n  height: 10rem;\n  margin: unset;\n  padding: unset;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06);\n}\n.li-AutoComplete {\n  display: flex;\n  padding: 0.5rem;\n  align-items: center;\n  border-bottom-width: 1px;\n  border-color: #e5e7eb;\n  cursor: pointer;\n}\n.li-AutoComplete:hover {\n  background-color: #f3f4f6;\n}\n";
